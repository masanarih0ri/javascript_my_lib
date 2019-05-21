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
    // ServiceWorkerではCacheAPIを利用する
    // cachesは特定のServiceWorkerの範囲内でデータを保存を可能にする特別なCacheStorageオブジェクト。
    //CacheStorageインタフェースのopen()メソッドは、CACHE_NAMEに一致するCacheオブジェクトに解決されるPromiseを返す。
    // caches.open(CACHE_NAME)でPromiseが返ってくる
    // cache.addAllでURLの配列(FILES_TO_CACHE)を受け取り、取得、指定されたキャッシュに結果のレスポンスオブジェクトを返す
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Precache offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
    // console.log(caches.keys());
  );
  // console.table(caches);
  self.skipWaiting();
});

// activateイベントを使って古いキャッシュをクリーンアップする
// App Shellファイルのいずれかが変更されるたびにservice workerがそのキャッシュを更新するようにする
// これを機能させるには、CACHE_NAME変数を増やす必要がある
// caches.keys()はcachesが持つnamesプロパティの値の配列を通常のループで取得するのと同じ順序で返す
// Promise.all(iterable)メソッドでは単一のPromiseを返し、iterableの中の全てのPromiseが解決されるか、iterableの中に値がない場合にresolveとなる
// keyList.map()でmap()内部の処理で返ってきたものを配列として返す
// keyを引数にした関数の中身は
// keyがCACHE_NAMEと違っていて、かつDATA_CACHE_NAMEとも違う場合
// caches.delete()では、キーがリクエストCacheエントリを見つけて、それがあった場合は削除する
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if(key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('Remove old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim()
});

// fetchイベント
self.addEventListener('fetch', (event) => {
  console.log(caches);
  // ブラウザに結果を返す
  event.respondWith(
    // caches.openが成功したらcacheを引数にする関数を走らせる
    // その関数はevent.requestにマッチしたcacheを返す
    // responseを引数にしてresponseを返すか、あるいはfetchでリクエストを送り、レスポンスをクローンしてputで更新する
    // ||は左辺の値が真(true)の場合は左辺の値を、偽(false)の場合は右辺の値を返す。
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.match(event.request)
      .then(function (response) {
        return response || fetch(event.request)
        .then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
