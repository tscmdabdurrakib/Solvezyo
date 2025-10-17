import { useEffect } from "react";

// Generate session ID for user session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session-id');
  if (!sessionId) {
    sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('session-id', sessionId);
  }
  return sessionId;
};

export function useWebsiteTracking() {
  useEffect(() => {
    const recordWebsiteVisit = async () => {
      try {
        await fetch('/api/website/visit', {
          method: 'POST',
          headers: {
            'x-session-id': getSessionId(),
          },
        });
      } catch (error) {
        console.error('Failed to record website visit:', error);
      }
    };

    // Record visit when hook is first used
    recordWebsiteVisit();
  }, []);
}