export const analyticsService = {
  logSessionExpiredClick: async () => {
    try {
      const response = await fetch("/api/visit");
      if (response.ok) {
        console.log("[SESSION_EXPIRED]", "Button clicked");
      }
    } catch (error) {
      console.error("[SESSION_EXPIRED] Failed to log:", error);
    }
  },
};
