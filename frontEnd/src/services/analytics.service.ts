export const analyticsService = {
  logSessionExpiredClick: async (email?: string) => {
    try {
      const response = await fetch("/api/session-expired-click", {
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
