// Caution! Be sure you understand the caveats before publishing an application with
// offline support. See https://aka.ms/blazor-offline-considerations

self.importScripts('./service-worker-assets.js');
self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));

const cacheNamePrefix = 'offline-cache-';
const cacheName = `${cacheNamePrefix}${self.assetsManifest.version}`;
const offlineAssetsInclude = [ /\.dll$/, /\.pdb$/, /\.wasm/, /\.html/, /\.js$/, /\.json$/, /\.css$/, /\.woff$/, /\.png$/, /\.jpe?g$/, /\.gif$/, /\.ico$/, /\.blat$/, /\.dat$/, /\.br$/, /\.gz$/, /\.svg$/ ];
const offlineAssetsExclude = [ /^service-worker\.js$/ ];

// Add offline support - cache first, then network
async function onInstall(event) {
    console.info('Service Worker: Installing...');

    // Cache all static assets required for offline support
    const assetsRequests = self.assetsManifest.assets
        .filter(asset => offlineAssetsInclude.some(pattern => pattern.test(asset.url)))
        .filter(asset => !offlineAssetsExclude.some(pattern => pattern.test(asset.url)))
        .map(asset => new Request(asset.url, { integrity: asset.hash, cache: 'no-cache' }));

    // Cache essential files
    const essentialFiles = [
        './',
        './index.html',
        './manifest.json',
        './assets/images/logo.png',
        './_framework/blazor.webassembly.js',
        './_framework/dotnet.wasm',
        './_content/MudBlazor/MudBlazor.min.css',
        './_content/MudBlazor/MudBlazor.min.js'
    ];

    assetsRequests.push(...essentialFiles.map(file => new Request(file)));

    const cache = await caches.open(cacheName);
    await cache.addAll(assetsRequests);
}

async function onActivate(event) {
    console.info('Service Worker: Activating...');

    // Delete unused caches
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys
        .filter(key => key.startsWith(cacheNamePrefix) && key !== cacheName)
        .map(key => caches.delete(key)));
}

async function onFetch(event) {
    if (event.request.method !== 'GET')
        return fetch(event.request);

    try {
        // For navigation requests, try network first, then cache
        if (event.request.mode === 'navigate') {
            const networkResponse = await fetch(event.request);
            if (networkResponse.ok)
                return networkResponse;
            
            return await caches.match('./index.html');
        }

        // For other requests, try cache first, then network
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse)
            return cachedResponse;

        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            await cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
    }
    catch (error) {
        console.error('Fetch failed; returning offline page instead.', error);
        const cache = await caches.open(cacheName);
        return await cache.match('./index.html');
    }
} 