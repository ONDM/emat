const cacheName = 'offline-emat';
const offlinePage = 'offlineemat.html';
const assets = [
      '/emat/',
      '/emat/manifest.json',
      '/emat/style.css',
      '/emat/script.js',
      '/emat/favicon.png',
      '/emat/font.woff2',
      '/emat/logo.png',
      '/emat/folder/PV/PV1.jpg', '/emat/folder/PV/PV2.jpg', '/emat/folder/PV/PV3.jpg', '/emat/folder/PV/PV4.jpg',
      '/emat/folder/EMGV/EMGV1.jpg', '/emat/folder/EMGV/EMGV2.jpg', '/emat/folder/EMGV/EMGV3.jpg', '/emat/folder/EMGV/EMGV4.jpg',
      '/emat/folder/FSFZ/FSFZ1.jpg',
];

self.addEventListener('install', event =>
  {
  event.waitUntil(
    caches.open(cacheName).then(cache =>
      {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event =>
  {
  event.respondWith(
    caches.match(event.request).then(response =>
      {
      return response || fetch(event.request);
      }).catch(() =>
      {
      return caches.match(offlinePage);
    })
  );
});
