import type { ReactNode } from "react";
import styles from "./AuthShellLayout.module.css";

interface AuthShellLayoutProps {
  title: string;
  subtitle?: string;
  emailHint?: string;
  children: ReactNode;
}

export const AuthShellLayout = ({
  title,
  subtitle,
  emailHint,
  children,
}: AuthShellLayoutProps) => {
  return (
    <div className={styles.authShellContainer}>
      <div className={styles.authShellCard}>
        <div className={styles.authShellLogo} aria-hidden="true">
          <span className={styles.authShellLogoMark}>G</span>
        </div>
        <h1 className={styles.authShellTitle}>{title}</h1>
        {subtitle && <p className={styles.authShellSubtitle}>{subtitle}</p>}
        {emailHint && <p className={styles.authShellEmailHint}>{emailHint}</p>}
        <div className={styles.authShellContent}>{children}</div>
      </div>
    </div>
  );
};
