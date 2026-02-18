"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

const ALLOWED_SCREENS = new Set([
  "onboarding",
  "signup",
  "login",
  "otp",
  "forgot-password",
  "new-password",
  "password-success",
]);

const sanitizeScreen = (screen) => {
  if (typeof screen !== "string") {
    return undefined;
  }

  return ALLOWED_SCREENS.has(screen) ? screen : undefined;
};

const sanitizeUserType = (type) => {
  if (type === "hirer" || type === "talent") {
    return type;
  }

  return undefined;
};

export default function RegisterClient() {
  const searchParams = useSearchParams();

  const { initialScreen, initialUserType } = useMemo(() => {
    const requestedScreen = sanitizeScreen(searchParams?.get("screen"));
    const requestedType = sanitizeUserType(searchParams?.get("type"));

    return {
      initialUserType: requestedType ?? "talent",
      initialScreen: requestedScreen ?? (requestedType ? "signup" : "onboarding"),
    };
  }, [searchParams]);

  return (
    <OnboardingFlow
      key={`${initialScreen}-${initialUserType}`}
      initialScreen={initialScreen}
      initialUserType={initialUserType}
    />
  );
}
