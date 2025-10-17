import { useEffect, useRef } from 'react';

interface AutoSaveOptions {
  key: string;
  data: any;
  delay?: number;
  enabled?: boolean;
}

export function useAutoSave({ key, data, delay = 1000, enabled = true }: AutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef<string>();

  useEffect(() => {
    if (!enabled) return;

    const dataString = JSON.stringify(data);
    
    if (dataString === previousDataRef.current) return;
    previousDataRef.current = dataString;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, dataString);
        console.log(`✅ Auto-saved: ${key}`);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, data, delay, enabled]);

  const clearSaved = () => {
    localStorage.removeItem(key);
  };

  const getSaved = (): any => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  return { clearSaved, getSaved };
}
