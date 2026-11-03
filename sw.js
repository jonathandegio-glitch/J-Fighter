/* J-Fighter alpha: do not cache stale previews */
self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
