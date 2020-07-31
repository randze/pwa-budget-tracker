const CACHE_NAME = 'site-cache';
const DATA_CACHE_NAME = 'data-cache';

const filesToCache = [
    '/',
    '/assets/db.js',
    '/assets/index.js',
    '/manifest.json',
    '/assets/styles.css',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    // init cache
    event.waitUntil(
        caches.open(CACHE_NAME).then( cache => {
            console.log('caching files');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('fetch', event => {
    // cache all get requests
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(event.request)
                    .then(response => {
                        // If the response was good, clone it and store it in the cache
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                        }

                        return response;
                    })
                    .catch(err => {
                        // on network request failure, get it from the cache
                        return cache.match(event.request);
                    });
            }).catch(err => console.log(err))
        );

        return;
    }


    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request).then( response => {
                if (response) {
                    return response;
                } else if (event.request.headers.get('accept').includes('text/html')) {
                    // return the cached home pages
                    return caches.match('/');
                }
            });
        })
    );
});