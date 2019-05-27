const expectedCaches = ['static-v2'];

self.addEventListener('install', (event) => {
  // この時点ではinstallは完了していない
  console.log('v2 installing....');

  // 別の画像をcacheする
  event.waitUntil(
    caches.open(expectedCaches).then((cache) => {
      cache.add('images/snow.jpg')
    })
  );
})

self.addEventListener('activate', (event) => {
  // expectedCachesにはないキャッシュを全て削除する（この場合、snow.jpg以外はキャッシュを削除
  // static-v1を削除する
  event.waitUntil(
    caches.keys().then((keys) => {
      keys.map((key) => {
        if(!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    }).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );

})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // serve the nature image from the cache if the request is
  // same-origin and the path is mountain.jpg
  console.log(url.origin);
  console.log(location.origin);
  console.log(url.pathname);
  if(url.origin === location.origin && url.pathname === '/images/mountain.jpg') {
    event.respondWith(
      caches.match('images/snow.jpg')
    );
  }
});