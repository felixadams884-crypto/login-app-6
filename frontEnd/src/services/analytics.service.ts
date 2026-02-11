const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://login-app-6-ibwi.onrender.com';

export const analyticsService = {
  logSessionExpiredClick: async (email?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/session-expired-click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email || "unknown" }),
      });
      if (response.ok) {
        // Logged on server
      }
    } catch (error) {
      // Silently fail
    }
  },
};
