const cacheName = 'v1';

//Assets to cache
const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
  //   "/favicon/*"
];

//Call install event

//Attach event listener to the service worker
self.addEventListener('install', (e) => {
  console.log('Service worker installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Activate event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');

  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Calll Fetch Event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker : Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
