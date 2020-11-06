importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1'},
    { url: '/manifest.json', revision: '1'},
    { url: '/index.js', revision: '1'},
  ]);

  workbox.routing.registerRoute(
    /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/4.7.0\/css\/font-awesome\.min\.css/,
    workbox.strategies.cacheFirst({
      cacheName: 'font-awesome-v4.7.0',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/3.5.1\/jquery\.min\.js/,
    workbox.strategies.cacheFirst({
      cacheName: 'jquery-v3.5.1',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),  
    workbox.strategies.staleWhileRevalidate({
      networkTimeoutSeconds: 3,     // 3 detik
      cacheName: 'pages',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/css/'),  
    workbox.strategies.staleWhileRevalidate({
      networkTimeoutSeconds: 3,     // 3 detik
      cacheName: 'css',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/js/'),  
    workbox.strategies.staleWhileRevalidate({
      networkTimeoutSeconds: 3,     // 3 detik
      cacheName: 'js',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/images/'),  
    workbox.strategies.staleWhileRevalidate({
      networkTimeoutSeconds: 3,     // 3 detik
      cacheName: 'images',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}
// END WORKBOX

const CACHE_NAME = "football-v1";
const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/klasemen.html",
    "/pages/favorites.html",
    "/css/custom.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    "/css/materialize.min.css",
    "/js/nav.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/materialize.min.js",
    "/js/apiFootball.js",
    "/js/favorite.js",
    "/js/main.js",
    "/images/bell.png",
    "/images/logo-laliga.png",
    "/manifest.json",
    "/index.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org";
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
        })
      )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'images/bell.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
}); 