const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

// app shellになりうるファイルをいれることも考えられる
const FILES_TO_CACHE = [
  '/serviceworker.html',
  '/css/materialize.css',
  '/js/materialize.js'
];

self.addEventListener('install', (event) => {
  // ServiceWorkerはwaitUntil内のコードが実行されるまでinstallされない
  event.waitUntil(
    // cachesは特定のServiceWorkerの範囲内でデータを保存を可能にする特別なCacheStorageオブジェクト。ServiceWorkerではCacheAPIを利用する
    // このコードではcacheを開き、アプリが使用する全てのファイルをキャッシュに追加する
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// activateイベントを使って古いキャッシュをクリーンアップする
// App Shellファイルのいずれかが変更されるたびにservice workerがそのキャッシュを更新するようにする
// これを機能させるには、CACHE_NAME変数を増やす必要がある
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if(key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
          console.log('delete!');
        }
      }));
    })
  );
  console.log('activated!');
});

// fetchイベント
self.addEventListener('fetch', (event) => {
  console.log('fetch!');
  console.log(event.request.mode);
  console.log('Fetch intercepted for:', event.request.url);
  // event.respondWith(
  //   caches.match(event.request)
  //     .then((response) => {
  //       if(response) {
  //         return response;
  //       }
  //
  //       return fetch(event.request)
  //       .then((response) => {
  //         // レスポンスがない場合（オフラインの場合）
  //         if(!response || response.status !== 200 || response.type !== 'basic') {
  //           return response;
  //         }
  //
  //         let responseTocache = response.clone();
  //
  //         caches.open(CACHE_NAME)
  //         .then((cache) => {
  //           cache.put(event.request, responseTocache);
  //         });
  //         return response;
  //       });
  //     })
  //   );

  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
