"use client";

import { useMemo, useState } from "react";
import { SignUpScreen } from "./screens/SignUpScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";
import { OtpVerificationScreen } from "./screens/OtpVerificationScreen";
import { NewPasswordScreen } from "./screens/NewPasswordScreen";
import { authApi } from "@/lib/api/auth";
import { tokenStorage } from "@/lib/api/token-storage";

import { MainLayout } from "./ui/MainLayout";
import { OnboardingContent, CustomizeContent, SuccessContent } from "./ui/ScreenContents";
import { CustomizeOrganization } from "./screens/CustomizeOrganization";
import { UploadPhoto } from "./screens/UploadPhoto";

const POST_LOGIN_REDIRECT = process.env.NEXT_PUBLIC_POST_LOGIN_REDIRECT || "/dashboard";

const LAYOUTLESS_SCREENS = new Set([
  "customize",
  "customize-organization",
  "upload-photo",
  "success",
  "password-success",
]);

const VALID_SCREENS = new Set([
  "onboarding",
  "login",
  "signup",
  "otp",
  "customize",
  "customize-organization",
  "upload-photo",
  "success",
  "forgot-password",
  "new-password",
  "password-success",
]);

const PasswordUpdatedScreen = ({ onLogin }) => (
  <div className="password-success-container">
    <div className="password-success-content">
      <img className="password-success-logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />

      <div className="password-success-icon">
        <img alt="Success" src="/checked.png" />
      </div>

      <h1 className="password-success-title">Password Updated successfully!</h1>
      <p className="password-success-subtitle">
        Your password has been updated successfully. Login using your new password
      </p>

      <button className="login-btn" onClick={onLogin}>
        Login
      </button>
    </div>
  </div>
);

function formatPayload(payload) {
  return {
    email: payload.email,
    full_name: payload.full_name,
    gender: payload.gender || null,
    phone: payload.phone || "",
    nationality: payload.nationality || "",
    password: payload.password,
  };
}

export const OnboardingFlow = ({ initialScreen = "onboarding", initialUserType = "talent" }) => {
  const safeInitialScreen = useMemo(() => (VALID_SCREENS.has(initialScreen) ? initialScreen : "onboarding"), [
    initialScreen,
  ]);
  const safeInitialUserType = initialUserType === "hirer" ? "hirer" : "talent";

  const [currentScreen, setCurrentScreen] = useState(safeInitialScreen);
  const [userType, setUserType] = useState(safeInitialUserType);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingOtpCode, setPendingOtpCode] = useState("");
  const [otpContext, setOtpContext] = useState(null);

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const handleSignup = async (payload) => {
    const normalized = formatPayload(payload);
    if (payload.variant === "hirer") {
      await authApi.registerRecruiter(normalized);
      setUserType("hirer");
    } else {
      await authApi.registerTalent(normalized);
      setUserType("talent");
    }
    setPendingEmail(normalized.email);
    setOtpContext({ type: "signup", userType: payload.variant === "hirer" ? "hirer" : "talent" });
    navigateToScreen("otp");
  };

  const finalizeAuthSession = (data) => {
    const access = data?.access || data?.access_token;
    const refresh = data?.refresh || data?.refresh_token;
    if (!access && !refresh) {
      throw new Error("Login successful but no session token was returned.");
    }
    tokenStorage.setTokens({ access, refresh });
    if (data?.user) {
      tokenStorage.setUser(data.user);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("talenxify:auth", {
          detail: { status: "login", user: data?.user || null },
        })
      );
      window.setTimeout(() => {
        window.location.href = POST_LOGIN_REDIRECT;
      }, 600);
    }
  };

  const handleLogin = async (credentials) => {
    const data = await authApi.login(credentials);
    finalizeAuthSession(data);
  };

  const handleGoogleLogin = async ({ idToken, variant }) => {
    if (!idToken) {
      throw new Error("Missing Google credentials. Please try again.");
    }

    const normalizedVariant = variant === "hirer" ? "hirer" : variant === "talent" ? "talent" : null;

    const loginWithVariant = async (selectedVariant) => {
      if (selectedVariant === "hirer") {
        return authApi.googleLoginRecruiter({ id_token: idToken });
      }
      return authApi.googleLoginTalent({ id_token: idToken });
    };

    let data;

    if (normalizedVariant) {
      data = await loginWithVariant(normalizedVariant);
    } else {
      try {
        data = await loginWithVariant("talent");
      } catch (error) {
        if (error?.status === 400 || error?.status === 404) {
          data = await loginWithVariant("hirer");
        } else {
          throw error;
        }
      }
    }

    finalizeAuthSession(data);
  };

  const handleForgotPassword = async ({ email }) => {
    await authApi.forgotPassword({ email });
    setPendingEmail(email);
    setOtpContext({ type: "forgot-password" });
    navigateToScreen("otp");
  };

  const handleOtpSubmit = async (code) => {
    if (!otpContext || !pendingEmail) {
      throw new Error("We could not locate your request. Please try again.");
    }

    if (otpContext.type === "signup") {
      await authApi.confirmEmail({ email: pendingEmail, confirmation_code: code });
      setPendingOtpCode("");
      if (otpContext.userType === "hirer") {
        navigateToScreen("customize-organization");
        return;
      }
      navigateToScreen("customize");
      return;
    }

    setPendingOtpCode(code);
    navigateToScreen("new-password");
  };

  const handleOtpResend = async () => {
    if (!pendingEmail) {
      throw new Error("Email address missing. Please restart the process.");
    }

    if (otpContext?.type === "signup") {
      await authApi.resendConfirmation({ email: pendingEmail });
      return;
    }

    await authApi.forgotPassword({ email: pendingEmail });
  };

  const handlePasswordReset = async (newPassword) => {
    if (!pendingEmail || !pendingOtpCode) {
      throw new Error("Invalid reset request. Please request a new code.");
    }
    await authApi.resetPassword({
      email: pendingEmail,
      confirmation_code: pendingOtpCode,
      new_password: newPassword,
    });
    setPendingOtpCode("");
    setOtpContext(null);
    navigateToScreen("password-success");
  };

  const renderContent = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            onSubmit={handleLogin}
            onSwitchToSignUp={() => navigateToScreen("signup")}
            onForgotPassword={() => navigateToScreen("forgot-password")}
            onGoogleLogin={(payload) => handleGoogleLogin(payload)}
          />
        );
      case "signup":
        return (
          <SignUpScreen
            variant={userType === "hirer" ? "hirer" : "talent"}
            onSubmit={handleSignup}
            onSwitchToSignIn={() => navigateToScreen("login")}
            onGoogleLogin={(payload) => handleGoogleLogin({ ...payload, variant: payload?.variant || userType })}
          />
        );
      case "forgot-password":
        return <ForgotPasswordScreen onSubmit={handleForgotPassword} />;
      case "new-password":
        return <NewPasswordScreen onSubmit={handlePasswordReset} email={pendingEmail} />;
      case "password-success":
        return <PasswordUpdatedScreen onLogin={() => navigateToScreen("login")} />;
      case "otp":
        return (
          <OtpVerificationScreen
            email={pendingEmail}
            contextLabel={otpContext?.type === "forgot-password" ? "reset" : "verification"}
            onSubmit={handleOtpSubmit}
            onResend={handleOtpResend}
          />
        );
      case "customize-organization":
        return <CustomizeOrganization onNavigate={() => navigateToScreen("upload-photo")} />;
      case "upload-photo":
        return <UploadPhoto onNavigate={() => navigateToScreen("success")} />;
      case "customize":
        return <CustomizeContent onNavigate={() => navigateToScreen("success")} />;
      case "success":
        return <SuccessContent />;
      default:
        return (
          <OnboardingContent
            onNavigate={(type) => {
              setUserType(type);
              navigateToScreen("signup");
            }}
          />
        );
    }
  };

  const content = renderContent();
  const shouldBypassLayout = LAYOUTLESS_SCREENS.has(currentScreen);

  if (shouldBypassLayout) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};
