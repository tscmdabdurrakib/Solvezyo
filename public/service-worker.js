const STATIC_CACHE_NAME = 'static-cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1';
const API_CACHE_NAME = 'api-cache-v1';
const MAX_DYNAMIC_CACHE_SIZE = 50;

// Updated static assets list to ensure all paths exist
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png' // Updated from logo192.png and logo512.png which may not exist
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Precaching App Shell');
        // Use Promise.all to handle all caching operations
        return Promise.all(
          STATIC_ASSETS.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.warn(`[Service Worker] Failed to cache ${url}:`, error);
                // Don't fail the entire cache operation if one asset fails
                return null;
              });
          })
        );
      })
      .catch(error => {
        console.error('[Service Worker] Failed to open cache:', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME && key !== API_CACHE_NAME) {
          console.log('[Service Worker] Removing old cache.', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Cache-First for static assets with better error handling
const cacheFirst = async (request) => {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${request.url}: ${response.status} ${response.statusText}`);
    }
    
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    cache.put(request, response.clone());
    limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
    return response;
  } catch (error) {
    console.error('[Service Worker] cacheFirst failed:', error);
    // Return a basic response if both cache and network fail
    return new Response('Network error occurred', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

// Stale-While-Revalidate for API calls with error handling
const staleWhileRevalidate = async (request) => {
  try {
    const cache = await caches.open(API_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request)
      .then(response => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(error => {
        console.warn('[Service Worker] Fetch failed for:', request.url, error);
        throw error;
      });
    
    return cachedResponse || fetchPromise;
  } catch (error) {
    console.error('[Service Worker] staleWhileRevalidate failed:', error);
    return new Response('API request failed', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

// Network-First for other requests with fallback to cache
const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
      limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
      return response;
    }
    // If response is not ok, try cache
    const cachedResponse = await caches.match(request);
    return cachedResponse || response;
  } catch (error) {
    // Network failed, try cache
    try {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      return new Response('Network error occurred', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    } catch (cacheError) {
      console.error('[Service Worker] Both network and cache failed:', error, cacheError);
      return new Response('Both network and cache failed', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for requests to other origins
  if (url.origin !== location.origin) {
    return;
  }

  if (STATIC_ASSETS.includes(url.pathname) || url.pathname === '/') {
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Function to limit cache size with proper error handling
const limitCacheSize = (name, size) => {
  caches.open(name)
    .then(cache => {
      return cache.keys()
        .then(keys => {
          if (keys.length > size) {
            return cache.delete(keys[0])
              .then(() => limitCacheSize(name, size)); // Recursively call to check again
          }
        });
    })
    .catch(error => {
      console.error('[Service Worker] Error limiting cache size:', error);
    });
};