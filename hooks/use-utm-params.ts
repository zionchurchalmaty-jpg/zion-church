"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function useUtmParams(): UtmParams {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const params: UtmParams = {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    };

    for (const key of UTM_KEYS) {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    }

    return params;
  }, [searchParams]);
}

export function utmParamsToFields(
  params: UtmParams
): { name: string; value: string }[] {
  return UTM_KEYS.filter((key) => params[key]).map((key) => ({
    name: key,
    value: params[key],
  }));
}
