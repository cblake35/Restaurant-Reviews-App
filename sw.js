/*Array of cache files*/
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];


/* Event listener that waits until sw is done installing, which then caches files
and adds them to the cacheFiles array for later use*/
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});


/*Event listener which listens to fetch requests*/
self.addEventListener('fetch', function(e) {
  e.respondWith(
/*checks to see if the request made has a match within the cache files, if so
used that cache file*/
    caches.match(e.request).then(function(response) {
      if (response) {
        return response;
      } else {
/*if no matches were found, use the browers fetch method instead and add it to
cache*/
        return fetch(e.request).then(function(response) {
/*response.clone() method is used because response is already being used above*/
          const responseClone = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(e.request, responseClone);
          })
          return response;
        })
        .catch(function(error) {
          console.log(error);
        })
      }
    })
  );
});
