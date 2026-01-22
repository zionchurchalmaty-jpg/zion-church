import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { CreateCourseRequestSubmissionInput } from "./form-submission-types";

interface SimpleCourseInput {
  name: string;
  email: string;
  course: string;
  consent: boolean;
}

export async function submitCourseRequest(data: SimpleCourseInput) {
  if (!db) {
    console.error("Firebase initialized error");
    return { success: false, error: "No DB" };
  }

  try {
    const firestoreData: CreateCourseRequestSubmissionInput = {
      formType: "course-request",
      firstName: data.name,
      email: data.email,
      course: data.course,
      consent: data.consent,
      recaptchaScore: 1.0,
    };

    await addDoc(collection(db, "course_requests"), {
      ...firestoreData,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting request:", error);
    return { success: false, error };
  }
}
