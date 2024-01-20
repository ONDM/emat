const cacheName = 'E-cache-v2';

self.addEventListener('install', (event) =>
{
  console.log('Service Worker Installed');
  event.waitUntil(
  caches.open(cacheName).then((cache) =>
  {
    return cache.addAll([
      '/E/',
      '/E/manifest.json',
      '/E/style.css',
      '/E/script.js',
      '/E/favicon.png',
      '/E/font.woff2',
      '/E/sw.js',
      '/E/folder/PV/PV1.jpg', '/E/folder/PV/PV2.jpg', '/E/folder/PV/PV3.jpg', '/E/folder/PV/PV4.jpg'
      '/E/folder/EMGV/EMGV1.jpg', '/E/folder/EMGV/EMGV2.jpg', '/E/folder/EMGV/EMGV3.jpg', '/E/folder/EMGV/EMGV4.jpg'
      //DALŠÍ
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
