interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export interface RecaptchaVerificationResult {
  success: boolean;
  score: number;
  errorCodes?: string[];
}

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MINIMUM_SCORE = 0.5; // 0.0 = likely bot, 1.0 = likely human

export async function verifyRecaptchaToken(
  token: string
): Promise<RecaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return { success: false, score: 0, errorCodes: ["missing-secret-key"] };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      return {
        success: false,
        score: 0,
        errorCodes: data["error-codes"],
      };
    }

    const score = data.score ?? 0;

    return {
      success: score >= MINIMUM_SCORE,
      score,
      errorCodes: score < MINIMUM_SCORE ? ["score-too-low"] : undefined,
    };
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return { success: false, score: 0, errorCodes: ["verification-error"] };
  }
}
