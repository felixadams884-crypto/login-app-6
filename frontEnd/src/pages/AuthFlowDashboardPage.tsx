import styles from './AuthFlowDashboardPage.module.css';

export const AuthFlowDashboardPage = () => {
  return (
    <div className={styles.authFlowDashboardContainer}>
      <div className={styles.authFlowDashboardCard}>
        <h1 className={styles.authFlowDashboardTitle}>Dashboard</h1>
        <div className={styles.authFlowDashboardContent}>
          <div className={styles.authFlowDashboardUserInfo}>
            <h2 className={styles.authFlowDashboardUserInfoTitle}>Demo Page</h2>
            <p className={styles.authFlowDashboardUserInfoText}>
              This page is not used in the no-token flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
