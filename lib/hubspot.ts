import { logger } from "./logger";

export interface HubSpotField {
  name: string;
  value: string;
}

export interface HubSpotSubmissionContext {
  hutk?: string;
  pageUri: string;
  pageName: string;
}

export interface HubSpotSubmission {
  portalId: string;
  formId: string;
  fields: HubSpotField[];
  context: HubSpotSubmissionContext;
}

export async function submitHubSpotForm(
  data: HubSpotSubmission
): Promise<void> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${data.portalId}/${data.formId}`;

  logger.debug("Submitting form to HubSpot", {
    portalId: data.portalId,
    formId: data.formId,
    fieldCount: data.fields.length,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: data.fields,
      context: data.context,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger.error("HubSpot form submission failed", {
      status: response.status,
      error: errorText,
    });
    throw new Error(`Form submission failed: ${response.status}`);
  }

  logger.info("HubSpot form submitted successfully", {
    formId: data.formId,
  });
}

export function getHubspotCookie(): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("hubspotutk="))
    ?.split("=")[1];
}
