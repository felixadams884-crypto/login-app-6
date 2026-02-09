import React, { createContext, useState, useEffect } from 'react';

interface AppAuthContextType {
  sessionReady: boolean;
  isSessionExpired: boolean;
  isLoading: boolean;
}

export const AppAuthContext = createContext<AppAuthContextType>({
  sessionReady: true,
  isSessionExpired: false,
  isLoading: true,
});

export const AppAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionReady, setSessionReady] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionValidity = async () => {
      // Check if we should test session expired page
      const searchParams = new URLSearchParams(window.location.search);
      const testSessionExpired = searchParams.get('testSessionExpired') === 'true';

      try {
        if (testSessionExpired) {
          // Skip actual check and show expired page for testing
          setIsSessionExpired(true);
          setSessionReady(false);
          setIsLoading(false);
          return;
        }

        // Try to verify if there's an active session
        // This endpoint should return 200 if session is valid, or appropriate error if expired
        const response = await fetch('https://login-app-6-ibwi.onrender.com/api/auth/check-session', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Session is valid
          setSessionReady(true);
          setIsSessionExpired(false);
        } else if (response.status === 401) {
          // Session is expired or not authenticated
          setIsSessionExpired(true);
          setSessionReady(false);
        } else {
          // Other errors - proceed with normal flow
          setSessionReady(true);
          setIsSessionExpired(false);
        }
      } catch (error) {
        // Network error or endpoint doesn't exist yet - proceed normally
        console.warn('Session check failed:', error);
        setSessionReady(true);
        setIsSessionExpired(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionValidity();
  }, []);

  return (
    <AppAuthContext.Provider
      value={{
        sessionReady,
        isSessionExpired,
        isLoading,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};
