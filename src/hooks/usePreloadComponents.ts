import { useEffect } from 'react';

// Preload strategy: Load popular components after idle time
const preloadComponent = (path: string) => {
  // Dynamically import the component
  import(/* @vite-ignore */ path).catch(err => console.error(`Failed to preload ${path}:`, err));
};

// Smart preloader based on user interaction and idle time
export const usePreloadComponents = () => {
  useEffect(() => {
    // Preloading disabled due to runtime alias resolution issues
    // Components will be loaded on-demand which still provides good performance
    return () => {
      // Cleanup if necessary
    };
  }, []);

  // Preload on hover - for instant navigation
  const preloadOnHover = (componentPath: string) => {
    return {
      onMouseEnter: () => {
        // Construct the full path based on common patterns
        let fullPath = '';
        if (componentPath.startsWith('/tools/')) {
          // For tool pages, convert to the lazy load path format
          const toolName = componentPath.split('/tools/')[1];
          // Assuming toolName will be like 'length-converter' and page is 'LengthConverterPage'
          const pageName = toolName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Page';
          fullPath = `@/pages/tools/${pageName}`;
        } else if (componentPath.startsWith('/')) {
          // For other main pages
          const pageName = componentPath.split('/')[1];
          if (pageName === '') fullPath = `@/pages/Home`; // Handle root path
          else fullPath = `@/pages/${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page`;
        }

        if (fullPath) {
          preloadComponent(fullPath);
        }
      }
    };
  };

  return { preloadOnHover };
};

// Enhanced navigation with preloading - simple export
export const preloadingEnabled = true;