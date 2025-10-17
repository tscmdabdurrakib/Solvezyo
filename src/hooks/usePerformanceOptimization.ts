import { useEffect, useCallback, useRef } from 'react';

// Performance monitoring and optimization hook
export const usePerformanceOptimization = () => {
  const performanceRef = useRef<{
    navigationStart: number;
    loadComplete: number;
  }>({
    navigationStart: performance.now(),
    loadComplete: 0
  });

  // Measure and log performance metrics
  useEffect(() => {
    const measurePerformance = () => {
      // Measure initial load time
      if (document.readyState === 'complete') {
        performanceRef.current.loadComplete = performance.now();
        const loadTime = performanceRef.current.loadComplete - performanceRef.current.navigationStart;
        
        // Log performance metrics (only in development)
        if (import.meta.env.DEV) {
          console.log(`📊 Page Load Time: ${loadTime.toFixed(2)}ms`);
          
          // Measure LCP (Largest Contentful Paint)
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`🎨 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
          }).observe({ entryTypes: ['largest-contentful-paint'] });

          // Measure FID (First Input Delay)
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              console.log(`⚡ FID: ${entry.processingStart - entry.startTime}ms`);
            });
          }).observe({ entryTypes: ['first-input'] });
        }
      }
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  // Optimized scroll handler with throttling
  const useOptimizedScroll = useCallback((callback: () => void, delay = 16) => {
    const throttledCallback = useRef<() => void>();
    const lastRun = useRef<number>(Date.now());

    throttledCallback.current = () => {
      if (Date.now() - lastRun.current >= delay) {
        callback();
        lastRun.current = Date.now();
      }
    };

    useEffect(() => {
      const handler = () => {
        requestAnimationFrame(() => {
          throttledCallback.current?.();
        });
      };

      window.addEventListener('scroll', handler, { passive: true });
      return () => window.removeEventListener('scroll', handler);
    }, []);
  }, []);

  // Intersection Observer for lazy loading
  const useIntersectionObserver = useCallback((
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = { threshold: 0.1 }
  ) => {
    const targetRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        callback(entry);
      }, options);

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, [callback, options]);

    return targetRef;
  }, []);

  // Memory usage optimization
  const useMemoryOptimization = useCallback(() => {
    useEffect(() => {
      // Clean up heavy objects on component unmount
      return () => {
        // Force garbage collection hint (in development)
        if (import.meta.env.DEV && 'gc' in window) {
          (window as any).gc();
        }
      };
    }, []);
  }, []);

  return {
    useOptimizedScroll,
    useIntersectionObserver,
    useMemoryOptimization,
    performanceMetrics: performanceRef.current
  };
};

// Bundle analyzer helper (development only)
export const analyzeBundleSize = () => {
  if (import.meta.env.DEV) {
    import('vite').then(vite => {
      console.log('📦 Bundle analysis available in development mode');
    });
  }
};