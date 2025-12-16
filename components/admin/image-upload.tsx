"use client";

import { useCallback, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  uploadImage,
  validateImageFile,
  type ImageFolder,
  type UploadProgress,
} from "@/lib/firebase/storage";
import { cn } from "@/lib/utils";
import { Upload, X, Link as LinkIcon, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: ImageFolder;
  label?: string;
  description?: string;
  aspectRatio?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder,
  label,
  description,
  aspectRatio = "16/9",
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      const validationError = validateImageFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      try {
        const { promise } = uploadImage(file, folder, (progress: UploadProgress) => {
          setUploadProgress(progress.progress);
        });

        const result = await promise;
        onChange(result.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
      // Reset input so the same file can be selected again
      e.target.value = "";
    },
    [handleFile]
  );

  const handleUrlSubmit = useCallback(() => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  }, [urlInput, onChange]);

  const handleRemove = useCallback(() => {
    onChange("");
    setError(null);
  }, [onChange]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}

      {value ? (
        // Image preview
        <div className="relative rounded-lg border overflow-hidden bg-muted/20">
          <div
            className="relative w-full"
            style={{ aspectRatio }}
          >
            <img
              src={value}
              alt="Uploaded image"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setError("Failed to load image")}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Upload zone
        <div
          className={cn(
            "relative rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            isUploading && "pointer-events-none opacity-50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={handleFileSelect}
          />

          <div
            className="flex flex-col items-center justify-center gap-3 p-8 cursor-pointer"
            style={{ aspectRatio }}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                <div className="text-center">
                  <p className="text-sm font-medium">Uploading...</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(uploadProgress)}%
                  </p>
                </div>
                {/* Progress bar */}
                <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-muted p-3">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Drop an image here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPEG, PNG, GIF, or WebP up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* URL input toggle */}
          {!isUploading && (
            <div className="absolute bottom-2 right-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUrlInput(!showUrlInput);
                }}
              >
                <LinkIcon className="h-3 w-3 mr-1" />
                Use URL
              </Button>
            </div>
          )}
        </div>
      )}

      {/* URL input */}
      {showUrlInput && !value && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
          />
          <Button type="button" onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Description */}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
