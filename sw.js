const CACHE_NAME = 'v1'

const FILES_TO_CACHE = [
  '/javascript_my_lib/serviceworker.html',
  '/javascript_my_lib/css/materialize.css',
  '/javascript_my_lib/js/materialize.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// activateイベントを使って古いキャッシュをクリーンアップする
// App Shellファイルのいずれかが変更されるたびにservice workerがそのキャッシュを更新するようにする
// これを機能させるには、CACHE_NAME変数を増やす必要がある
self.addEventListener('activate', (event) => {
  // event.waitUntil(
  //   caches.keys().then((keyList) => {
  //     return Promise.all(keyList.map((key) => {
  //       if(key !== CACHE_NAME) {
  //         console.log('[ServiceWorker] Removing old cache', key);
  //         return caches.delete(key);
  //       }
  //     }));
  //   })
  // );
  console.log('activated!');
});

self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
});
