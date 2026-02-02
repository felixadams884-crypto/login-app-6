import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { emailSchema, type EmailFormData } from "../../schemas/authFlow.schema";
import {
  authFlowService,
  AuthFlowApiRequestError,
} from "../../services/authApi.service";
import { AuthCardShell } from "./AuthCardShell";
import styles from "./AuthFlowFields.module.css";

export const AuthEmailEntryStep = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await authFlowService.submitEmail({ email: data.email });
      navigate(`/auth/password?email=${encodeURIComponent(data.email)}`);
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

  return (
    <AuthCardShell
      title="Sign in"
      subtitle="Use your Google Account"
      footerLeft={
        <button type="button" className={styles.authFlowLinkButton}>
          Create account
        </button>
      }
      footerRight={
        <button
          type="submit"
          form="email-form"
          className={styles.authFlowPrimaryButton}
        >
          {isLoading ? "Sending..." : "Next"}
        </button>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authFlowForm}
        id="email-form"
      >
        <div className={styles.authFlowFloatingGroup}>
          <input
            id="email"
            type="email"
            placeholder=" "
            {...register("email", {
              onChange: () => {
                if (apiError) {
                  setApiError(null);
                }
              },
            })}
            className={`${styles.authFlowInput} ${errors.email ? styles.authFlowInputError : ""}`}
            autoComplete="email"
          />
          <label htmlFor="email" className={styles.authFlowLabel}>
            Email or phone
          </label>
          {errors.email && (
            <span className={styles.authFlowErrorText}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={styles.authFlowForgotWrapper}>
          <button
            type="button"
            className={`${styles.authFlowLinkButton} ${styles.authFlowForgotLink}`}
          >
            Forgot email?
          </button>
        </div>

        {apiError && <div className={styles.authFlowApiError}>{apiError}</div>}
        <div className={styles.authFlowInfoBlockContainer}>
          <p className={styles.authFlowInfoBlock}>
            Not your computer? Use Guest mode to sign in privately.{" "}
            <a
              href="https://support.google.com/chrome/answer/6130773?hl=en-US"
              target="_blank"
              className={styles.authFlowInfoLink}
            >
              Learn more about using Guest mode
            </a>
          </p>
        </div>
      </form>
    </AuthCardShell>
  );
};
