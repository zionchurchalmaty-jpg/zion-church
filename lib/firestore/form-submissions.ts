import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/client";
import type {
  FormSubmission,
  FormType,
  CreateSubmissionInput,
} from "./form-submission-types";

const FORM_SUBMISSIONS_COLLECTION = "formSubmissions";

function ensureFirebase() {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase is not configured. Set environment variables.");
    return false;
  }
  return true;
}

/**
 * Create a new form submission
 */
export async function createFormSubmission(
  input: CreateSubmissionInput
): Promise<string> {
  if (!ensureFirebase() || !db) {
    throw new Error("Firebase not configured");
  }

  const docData = {
    ...input,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(db, FORM_SUBMISSIONS_COLLECTION),
    docData
  );
  return docRef.id;
}

/**
 * Get form submissions with optional filtering (for admin viewing)
 */
export async function getFormSubmissions(
  formType?: FormType,
  limitCount?: number
): Promise<FormSubmission[]> {
  if (!ensureFirebase() || !db) return [];

  try {
    const constraints = [];

    if (formType) {
      constraints.push(where("formType", "==", formType));
    }

    constraints.push(orderBy("createdAt", "desc"));

    if (limitCount) {
      constraints.push(firestoreLimit(limitCount));
    }

    const q = query(
      collection(db, FORM_SUBMISSIONS_COLLECTION),
      ...constraints
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as FormSubmission
    );
  } catch (error) {
    console.error("Error fetching form submissions:", error);
    return [];
  }
}
