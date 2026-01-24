"use server";

import { db } from "@/lib/firebase/client";
import { doc, setDoc, increment } from "firebase/firestore";

export async function incrementViewCount(contentId: string) {
  if (!contentId || !db) return;

  try {
    const docRef = doc(db, "content", contentId);
    await setDoc(docRef, {
      views: increment(1),
    }, { merge: true });

  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
}