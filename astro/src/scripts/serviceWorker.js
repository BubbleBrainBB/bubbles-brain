/**
 * Bubble's Brain service worker, served as /sw.js by src/pages/sw.js.ts.
 *
 * It exists so the site can be installed to the home screen, and it is deliberately timid:
 * a reader must never be shown an old page.
 *
 * - Pages always come from the network. Only when the network is gone does a navigation get
 *   the offline page (/offline/), which is stored when the worker installs.
 * - Files under /_astro/ carry a content hash in their name, so a stored copy can never be
 *   stale; they are served from the cache first.
 * - Everything else — pages the client router fetches, JSON, images, podcast audio, APIs and
 *   Workers on other origins — is left alone and reaches the network as if there were no worker.
 *
 * A new build changes VERSION, so the browser installs the new worker; it takes over at once
 * (skipWaiting + clients.claim) and serves the next navigation without asking the reader.
 */

const VERSION = '__SW_VERSION__';
const OFFLINE_URL = '/offline/';
const OFFLINE_CACHE = `bubble-offline-${VERSION}`;
// Hashed file names never change meaning, so this cache outlives worker versions.
const ASSET_CACHE = 'bubble-astro-assets-v1';
const MAX_ASSETS = 150;

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(OFFLINE_CACHE);
			await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
			await self.skipWaiting();
		})(),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keep = new Set([OFFLINE_CACHE, ASSET_CACHE]);
			for (const name of await caches.keys()) {
				if (name.startsWith('bubble-') && !keep.has(name)) await caches.delete(name);
			}
			// Starts the page request while the worker boots, so navigations are not slowed down.
			await self.registration.navigationPreload?.enable();
			await self.clients.claim();
		})(),
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET' || request.headers.has('range')) return;
	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;
	if (request.mode === 'navigate') {
		event.respondWith(networkOrOffline(event));
		return;
	}
	if (url.pathname.startsWith('/_astro/')) event.respondWith(cacheFirst(event));
});

/** @param {FetchEvent} event */
async function networkOrOffline(event) {
	try {
		const preloaded = await event.preloadResponse;
		return preloaded ?? (await fetch(event.request));
	} catch {
		// Only a failed connection lands here; a 404 or 500 from the server is passed through.
		const offline = await caches.match(OFFLINE_URL, { cacheName: OFFLINE_CACHE });
		return offline ?? Response.error();
	}
}

/** @param {FetchEvent} event */
async function cacheFirst(event) {
	const cache = await caches.open(ASSET_CACHE);
	const cached = await cache.match(event.request);
	if (cached) return cached;
	const response = await fetch(event.request);
	if (response.ok && response.type === 'basic') {
		event.waitUntil(cache.put(event.request, response.clone()).then(() => trim(cache)));
	}
	return response;
}

/** Forgets the oldest files once the cache holds more than MAX_ASSETS. */
async function trim(cache) {
	const keys = await cache.keys();
	for (const request of keys.slice(0, Math.max(0, keys.length - MAX_ASSETS))) {
		await cache.delete(request);
	}
}
