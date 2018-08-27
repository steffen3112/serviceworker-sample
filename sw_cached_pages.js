const cacheName = "v1";

const cacheAssets = [
    "index.html",
    "/html/info.html",
    "/css/style.css",
    "js/main.js"
]

// Call Install Event
self.addEventListener("install", (evt) => {
    console.log("Service Worker installed", evt)

    evt.waitUntil(
        caches
            .open(cacheName)
            .then( cache => {
                console.log("Service Worker: Caching Files")
                cache.addAll(cacheAssets)
            })
            .then( () => self.skipWaiting())
    )
})

// Call Activate Event
self.addEventListener("activate", (evt) => {
    console.log("Activated", evt)
    // Remove unwanted caches
    evt.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            console.log("Deleting old Cache", cache)
                            return caches.delete(cache)
                        }
                    })
                )
            })
    )
})

// Call Fetch Event
self.addEventListener("fetch", (evt) => {
    console.log("Service Worker: Fetching", evt);
    evt.respondWith(
        fetch(evt.request)
            .catch( () => caches.match(evt.request))
    )
})