import { useNavigate } from 'react-router-dom';
import { analyticsService } from '../services/analytics.service';
import styles from './SessionExpiredPage.module.css';

export const SessionExpiredPage = () => {
  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    analyticsService.logSessionExpiredClick();
    navigate('/auth/email', { replace: true });
  };

  return (
    <div className={styles.sessionExpiredContainer}>
      <div className={styles.sessionExpiredCard}>
        <div className={styles.iconContainer}>
          <svg
            className={styles.sessionIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <h1 className={styles.title}>Session Expired</h1>

        <p className={styles.message}>
          Your session has expired for security reasons. Please log in again to continue.
        </p>

        <button
          onClick={handleReturnToLogin}
          className={styles.returnButton}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};
