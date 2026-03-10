"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentEditor } from "./content-editor";
import { SEOFields } from "./seo-fields";
import { ImageUpload } from "./image-upload";
import { useAuth } from "./auth-provider";
import {
  createContent,
  updateContent,
  deleteContent,
} from "@/lib/firestore/content";
import type {
  Content,
  ContentInput,
  ContentType,
  SEOData,
  ContentStatus,
  ContentLanguage,
} from "@/lib/firestore/types";
import {
  Loader2,
  Save,
  Trash2,
  Eye,
  Lock,
  Unlock,
  ShieldCheck,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContentFormProps {
  contentType: ContentType;
  initialData?: Content;
  isEditing?: boolean;
}

export function ContentForm({
  contentType,
  initialData,
  isEditing = false,
}: ContentFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || "",
  );
  const [status, setStatus] = useState<ContentStatus>(
    initialData?.status || "draft",
  );
  const [language, setLanguage] = useState<string>(initialData?.language || "");

  const [isLocked, setIsLocked] = useState(initialData?.isLocked || false);
  const [password, setPassword] = useState(initialData?.password || "");
  const [previewContent, setPreviewContent] = useState(
    initialData?.previewContent || "",
  );

  const [seo, setSeo] = useState<SEOData>(
    initialData?.seo || {
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      canonicalUrl: "",
      noIndex: false,
    },
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeConfig: Record<string, { label: string; backPath: string }> = {
    blog: { label: "Blog Post", backPath: "/admin/blog" },
    sermon: { label: "Sermon", backPath: "/admin/sermons" },
    song: { label: "Song", backPath: "/admin/songs" },
    event: { label: "Event", backPath: "/admin/events" },
  };

  const config = typeConfig[contentType] || typeConfig.blog;
  const contentTypeLabel = config.label;
  const backPath = config.backPath;

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const parsed = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setTags(parsed);
  };

  const handleSubmit = async (submitStatus?: ContentStatus) => {
    if (!user) return;
    const finalStatus = submitStatus || status;

    if (!title.trim() || !content.trim() || !language) {
      setError("Title, Content and Language are required");
      return;
    }

    if (isLocked && !password.trim()) {
      setError("Password is required for paid content");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const input: ContentInput = {
        contentType,
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || undefined,
        coverImage: coverImage.trim() || undefined,
        tags,
        status: finalStatus,
        language: language as ContentLanguage,
        seo,
        isLocked,
        password: isLocked ? password : "",
        previewContent: isLocked ? previewContent : "",
      };

      if (isEditing && initialData) {
        await updateContent(initialData.id, input);
      } else {
        await createContent(
          input,
          user.uid,
          user.displayName || user.email || "Unknown",
        );
      }

      router.push(backPath);
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
  if (!initialData) return;

  setDeleting(true);
  setError(null);
  try {
    await deleteContent(initialData.id);
    
    router.push(backPath);
    router.refresh();
  } catch (err) {
    const error = err as Error;
    setError(error.message || "Failed to delete content");
    setDeleting(false);
  }
};

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">
          {isEditing ? `Edit ${contentTypeLabel}` : `New ${contentTypeLabel}`}
        </h1>

        <div className="flex items-center gap-2">
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete {contentTypeLabel}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {deleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSubmit("draft")}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Draft
          </Button>

          <Button
            size="sm"
            variant="orange"
            onClick={() => handleSubmit("published")}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${contentTypeLabel.toLowerCase()} title...`}
              className="text-lg"
            />
          </div>

          {isLocked && (
            <div className="space-y-2 p-4 bg-orange-50/50 border border-orange-100 rounded-xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 mb-2">
                <Unlock className="w-4 h-4 text-orange-600" />
                <Label className="text-orange-700 font-bold uppercase tracking-wider text-[10px]">
                  Free Preview (Visible to all)
                </Label>
              </div>
              <ContentEditor
                content={previewContent}
                onChange={setPreviewContent}
                placeholder="Write the introduction that everyone will see..."
              />
            </div>
          )}

          <div className="space-y-2">
            <Label
              className={
                isLocked ? "text-navy font-bold flex items-center gap-2" : ""
              }
            >
              {isLocked && <Lock className="w-4 h-4" />}
              {isLocked ? "Locked Content (Password Required)" : "Content"}
            </Label>
            <ContentEditor
              content={content}
              onChange={setContent}
              placeholder={`Write your ${contentTypeLabel.toLowerCase()} content here...`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary for previews..."
              rows={3}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* ACCESS SETTINGS BOX */}
          {contentType === "blog" && (
          <div className="space-y-4 rounded-lg border border-orange-200 bg-orange-50/30 p-4">
            <div className="flex items-center gap-2 text-navy mb-2">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <h3 className="font-bold text-sm uppercase tracking-wide">
                Access Control
              </h3>
            </div>

            <div className="flex items-center justify-between p-2 bg-white rounded-md border border-orange-100">
              <Label
                htmlFor="paid-toggle"
                className="cursor-pointer text-xs font-medium"
              >
                Paid Content
              </Label>
              <input
                type="checkbox"
                id="paid-toggle"
                className="w-4 h-4 accent-orange-600 cursor-pointer"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
              />
            </div>

            {isLocked && (
              <div className="space-y-2 animate-in zoom-in-95 duration-200">
                <Label htmlFor="password">Access Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set password..."
                    className="bg-white pr-8"
                  />
                  <Lock className="w-3.5 h-3.5 absolute right-2.5 top-3 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
          )}

          <div className="space-y-4 rounded-lg border bg-card p-4">
            <h3 className="font-medium text-navy">General Settings</h3>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as ContentStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Russian (Русский)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              folder="covers"
              label="Cover Image"
              aspectRatio="16/9"
            />

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="tag1, tag2..."
              />
            </div>
          </div>

          <SEOFields
            value={seo}
            onChange={setSeo}
            defaultTitle={title}
            coverImage={coverImage}
          />
        </div>
      </div>
    </div>
  );
}
