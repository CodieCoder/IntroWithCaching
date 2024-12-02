const cacheName = 'v2';

//Call install event

//Attach event listener to the service worker
self.addEventListener('install', (e) => {
  console.log('Service worker installed');
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
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        //Make copy (clone_ of response)
        const responseClone = response.clone();

        //Open cache
        caches.open(cacheName).then((cache) => {
          //Add response to cache
          cache.put(e.request, responseClone);
        });

        return response;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
