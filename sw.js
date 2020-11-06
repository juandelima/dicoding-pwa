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