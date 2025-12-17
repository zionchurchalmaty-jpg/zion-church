import { NextRequest, NextResponse } from "next/server";
import { formSubmissionSchema } from "@/lib/validations/form-schemas";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { createFormSubmission } from "@/lib/firestore/form-submissions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validationResult = formSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptchaToken(data.recaptchaToken);

    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "reCAPTCHA verification failed. Please try again.",
          code: "RECAPTCHA_FAILED",
        },
        { status: 400 }
      );
    }

    // Extract optional metadata
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;

    // Prepare submission data (exclude recaptchaToken from storage)
    const { recaptchaToken, ...submissionData } = data;

    // Create the submission
    const submissionId = await createFormSubmission({
      ...submissionData,
      email: submissionData.email.toLowerCase(),
      recaptchaScore: recaptchaResult.score,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      id: submissionId,
      message:
        data.formType === "newsletter"
          ? "Thank you for subscribing!"
          : "Thank you for your message. We will be in touch soon!",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
