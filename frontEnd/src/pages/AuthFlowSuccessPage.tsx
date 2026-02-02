import { Link } from 'react-router-dom';
import styles from './AuthFlowSuccessPage.module.css';

export const AuthFlowSuccessPage = () => {
  return (
    <div className={styles.authFlowSuccessContainer}>
      <div className={styles.authFlowSuccessCard}>
        <div className={styles.authFlowSuccessIcon}>✅</div>
        <h1 className={styles.authFlowSuccessTitle}>Success</h1>
        <p className={styles.authFlowSuccessSubtitle}>
          Your password was accepted. You can continue.
        </p>
        <Link
          to="/auth/email"
          className={`${styles.authFlowSuccessAction} ${styles.authFlowSuccessActionPrimary}`}
        >
          Start Over
        </Link>
      </div>
    </div>
  );
};
