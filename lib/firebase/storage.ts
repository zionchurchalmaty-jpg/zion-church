import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTask,
} from "firebase/storage";
import { storage, isFirebaseConfigured } from "./client";

export interface UploadResult {
  url: string;
  path: string;
}

export interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}

export type ImageFolder = "covers" | "content" | "og";

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.";
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_FILE_SIZE_MB) {
    return `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
  }

  return null;
}

export function uploadImage(
  file: File,
  folder: ImageFolder,
  onProgress?: (progress: UploadProgress) => void
): { task: UploadTask; promise: Promise<UploadResult> } {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase Storage is not configured");
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  // Generate unique filename with timestamp and sanitized original name
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filename = `${Date.now()}-${sanitizedName}`;
  const path = `images/${folder}/${filename}`;
  const storageRef = ref(storage, path);

  // Create upload task with metadata for CDN caching
  const task = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
    cacheControl: "public, max-age=31536000", // 1 year cache
  });

  const promise = new Promise<UploadResult>((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          onProgress({
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
          });
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ url, path });
        } catch (error) {
          reject(error);
        }
      }
    );
  });

  return { task, promise };
}

export async function deleteImage(path: string): Promise<void> {
  if (!isFirebaseConfigured || !storage) {
    console.warn("Firebase Storage is not configured");
    return;
  }

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    // Ignore errors for non-existent files
    console.warn("Failed to delete image:", error);
  }
}

export function getStoragePathFromUrl(url: string): string | null {
  // Extract path from Firebase Storage URL
  // URL format: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/PATH?token=...
  try {
    const match = url.match(/\/o\/([^?]+)/);
    if (match) {
      return decodeURIComponent(match[1]);
    }
  } catch {
    // Invalid URL format
  }
  return null;
}
