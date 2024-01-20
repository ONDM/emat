const cacheName = 'E-cache-v2';

self.addEventListener('install', (event) =>
{
  console.log('Service Worker Installed');
  event.waitUntil(
  caches.open(cacheName).then((cache) =>
  {
    return cache.addAll([
      '/emat/',
      '/emat/manifest.json',
      '/emat/style.css',
      '/emat/script.js',
      '/emat/favicon.png',
      '/emat/font.woff2',
      '/emat/sw.js',
      '/emat/folder/PV/PV1.jpg', '/emat/folder/PV/PV2.jpg', '/emat/folder/PV/PV3.jpg', '/emat/folder/PV/PV4.jpg',
      '/emat/folder/EMGV/EMGV1.jpg', '/emat/folder/EMGV/EMGV2.jpg', '/emat/folder/EMGV/EMGV3.jpg', '/emat/folder/EMGV/EMGV4.jpg',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) =>
{
  event.respondWith(
  caches.match(event.request).then((response) =>
  {
    return response || fetch(event.request);
  })
  );
});
