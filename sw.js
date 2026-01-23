const CACHE = 'app-v1';
const ASSETS = ['/', '/index.html', '/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match('/index.html')));return;}
 e.respondWith(caches.match(r).then(res=>res||fetch(r).then(n=>{caches.open(CACHE).then(c=>c.put(r,n.clone()));return n})));
});
