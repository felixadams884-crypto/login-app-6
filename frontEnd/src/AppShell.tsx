import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthEmailEntryStep } from "./components/auth/AuthEmailEntryStep";
import { AuthPasswordEntryStep } from "./components/auth/AuthPasswordEntryStep";
import { AuthFlowSuccessPage } from "./pages/AuthFlowSuccessPage";
import styles from "./AppShell.module.css";

function AppShell() {
  return (
    <div className={styles.appShellContainer}>
      <Router>
        <Routes>
          {/* Redirect root to email step */}
          <Route path="/" element={<Navigate to="/auth/email" replace />} />

          {/* Auth routes */}
          <Route path="/auth/email" element={<AuthEmailEntryStep />} />
          <Route path="/auth/password" element={<AuthPasswordEntryStep />} />

          {/* Success route */}
          <Route path="/success" element={<AuthFlowSuccessPage />} />

          {/* Catch all - redirect to email */}
          <Route path="*" element={<Navigate to="/auth/email" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppShell;
