// Service to keep the backend awake by pinging it periodically
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export const startBackendPing = (backendUrl: string) => {
  const pingBackend = async () => {
    try {
      await fetch(`${backendUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.debug('Backend ping failed (expected if offline):', error);
    }
  };

  // Ping immediately on startup
  pingBackend();

  // Then ping every 5 minutes
  const intervalId = setInterval(pingBackend, PING_INTERVAL);

  // Return cleanup function
  return () => clearInterval(intervalId);
};
