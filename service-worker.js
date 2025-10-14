const CACHE_NAME = 'garbage-mon-v1';
const urlsToCache = [
  '/SWM/',
  '/SWM/index.html',
  '/SWM/My_token.py',
  '/SWM/token_server.py',
  '/SWM/icon-192.png',
  '/SWM/icon-512.png',
  '/SWM/truck.png'
];

// Install SW and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate SW and remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});

// Fetch handler for offline support
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});



