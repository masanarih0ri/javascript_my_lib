const CACHE_NAME = 'v1'

const FILES_TO_CACHE = [
  '/javascript_my_lib/serviceworker.html',
  '/javascript_my_lib/css/materialize.css',
  '/javascript_my_lib/js/materialize.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});