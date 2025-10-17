import { useEffect, useState } from "react";

// Generate session ID for user session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session-id');
  if (!sessionId) {
    sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('session-id', sessionId);
  }
  return sessionId;
};

export function useVisitTracking(toolId: string) {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Record visit when component mounts
  useEffect(() => {
    if (!hasRecorded && toolId) {
      const recordVisit = async () => {
        try {
          const response = await fetch('/api/tool/' + toolId + '/visit', {
            method: 'POST',
            headers: {
              'x-session-id': getSessionId(),
            },
          });
          if (response.ok) {
            setHasRecorded(true);
          }
        } catch (error) {
          console.error('Failed to record visit:', error);
        }
      };

      recordVisit();
    }
  }, [toolId, hasRecorded]);

  // Fetch current visit count
  useEffect(() => {
    if (toolId) {
      const fetchVisitCount = async () => {
        try {
          const response = await fetch('/api/tool/' + toolId + '/visits');
          const data = await response.json();
          setVisitCount(data.count);
        } catch (error) {
          console.error('Failed to fetch visit count:', error);
        }
      };

      fetchVisitCount();
    }
  }, [toolId]);

  return { visitCount };
}