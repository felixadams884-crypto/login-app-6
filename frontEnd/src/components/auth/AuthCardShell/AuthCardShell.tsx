import type { ReactNode } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthCardShell.module.css";
import googleLogo from "../../../assets/image/icons8-google-48.png";

type AuthCardShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
  titleVariant?: "default" | "welcome";
};

export const AuthCardShell = ({
  title,
  subtitle,
  children,
  footerLeft,
  footerRight,
  titleVariant = "default",
}: AuthCardShellProps) => {
  const navigate = useNavigate();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const languageOptions = [
    { value: "en-US", label: "English (United States)" },
    { value: "en-GB", label: "English (United Kingdom)" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt-BR", label: "Português (Brasil)" },
    { value: "pt-PT", label: "Português (Portugal)" },
    { value: "nl", label: "Nederlands" },
    { value: "sv", label: "Svenska" },
    { value: "no", label: "Norsk" },
    { value: "da", label: "Dansk" },
    { value: "pl", label: "Polski" },
    { value: "cs", label: "Čeština" },
    { value: "hu", label: "Magyar" },
    { value: "ro", label: "Română" },
    { value: "tr", label: "Türkçe" },
    { value: "ru", label: "Русский" },
    { value: "uk", label: "Українська" },
    { value: "ar", label: "العربية" },
    { value: "hi", label: "हिन्दी" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "zh-CN", label: "中文（简体）" },
    { value: "zh-TW", label: "中文（繁體）" },
  ];

  const selectedLanguageLabel =
    languageOptions.find((option) => option.value === selectedLanguage)
      ?.label ?? languageOptions[0].label;

  return (
    <div className={styles.authCardShellPage}>
      <div className={styles.authCardShellCard}>
        <div
          className={`${styles.authCardShellLeft} ${
            titleVariant === "welcome" ? styles.authCardShellLeftWelcome : ""
          }`}
        >
          <div className={styles.authCardShellLogo} aria-hidden="true">
            <img
              src={googleLogo}
              alt="Google"
              className={styles.authCardShellLogoMark}
            />
          </div>
          <h1
            className={`${styles.authCardShellTitle} ${
              titleVariant === "welcome" ? styles.authCardShellTitleWelcome : ""
            }`}
          >
            {title}
          </h1>
          {subtitle && titleVariant !== "welcome" && (
            <p className={styles.authCardShellSubtitle}>{subtitle}</p>
          )}
          {subtitle && titleVariant === "welcome" && (
            <button
              type="button"
              className={styles.authCardShellEmailChip}
              aria-label={`Signed in as ${subtitle}`}
              onClick={() => navigate("/auth/email")}
            >
              <span className={styles.authCardShellEmailChipAvatar} aria-hidden="true" />
              <span className={styles.authCardShellEmailChipText}>
                {subtitle}
              </span>
              <span className={styles.authCardShellEmailChipIcon} aria-hidden="true">
                ▾
              </span>
            </button>
          )}
        </div>
        <div
          className={`${styles.authCardShellRight} ${
            titleVariant === "welcome" ? styles.authCardShellRightWelcome : ""
          }`}
        >
          <div className={styles.authCardShellContent}>{children}</div>
        </div>
        {(footerLeft || footerRight) && (
          <div className={styles.authCardShellFooter}>
            <div className={styles.authCardShellFooterLeft}>{footerLeft}</div>
            <div className={styles.authCardShellFooterRight}>{footerRight}</div>
          </div>
        )}
      </div>
      <div className={styles.authCardShellBottom}>
        <div className={styles.authCardShellLanguage}>
          <label className={styles.authCardShellLanguageLabel}>
            <span className={styles.srOnly}>Language</span>
            <div
              className={styles.authCardShellLanguageDropdown}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget as Node)
                ) {
                  setIsLanguageOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={styles.authCardShellLanguageSelect}
                aria-haspopup="listbox"
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen((prev) => !prev)}
              >
                {selectedLanguageLabel}
              </button>
              {isLanguageOpen && (
                <ul className={styles.authCardShellLanguageList} role="listbox">
                  {languageOptions.map((option) => (
                    <li key={option.value} role="option">
                      <button
                        type="button"
                        className={styles.authCardShellLanguageOption}
                        onClick={() => {
                          setSelectedLanguage(option.value);
                          setIsLanguageOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>
        </div>
        <div className={styles.authCardShellBottomLinks}>
          <a
            target="blank"
            href="https://support.google.com"
            className={styles.authCardShellBottomLink}
          >
            Help
          </a>
          <a
            href="https://policies.google.com/privacy"
            target="blank"
            className={styles.authCardShellBottomLink}
          >
            Privacy
          </a>
          <a
            href="https://policies.google.com/terms"
            target="blank"
            className={styles.authCardShellBottomLink}
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};
