/**
 * Bubble's Brain service worker, served as /sw.js by src/pages/sw.js.ts.
 *
 * It exists so the site can be installed to the home screen, and it is deliberately timid:
 * a reader must never be shown an old page.
 *
 * - Pages always come from the network. Only when the network is gone does a navigation get
 *   the offline page (/offline/), which is stored when the worker installs.
 * - The one exception is the home-screen launch (the manifest's start_url, /?source=pwa): an app
 *   should open at once, so it gets the home page stored on the last launch, with its
 *   stylesheets and scripts, while a fresh copy is fetched for next time. A copy older than
 *   SHELL_MAX_AGE is not used; the launch then waits for the network like any page.
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
// The home page a home-screen launch opens on, and the /_astro/ files that page links to.
const SHELL_URL = '/?source=pwa';
const SHELL_CACHE = 'bubble-shell-v1';
const SHELL_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const STORED_AT = 'x-bubble-stored-at';

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(OFFLINE_CACHE);
			await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
			// So even the first launch after installing can open at once; not worth failing over.
			await storeShell(await fetch(new Request(SHELL_URL, { cache: 'reload' }))).catch(() => {});
			await self.skipWaiting();
		})(),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keep = new Set([OFFLINE_CACHE, ASSET_CACHE, SHELL_CACHE]);
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
		const launch = url.pathname === '/' && url.searchParams.get('source') === 'pwa';
		event.respondWith(launch ? shellFirst(event) : networkOrOffline(event));
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
		return offlinePage();
	}
}

async function offlinePage() {
	const offline = await caches.match(OFFLINE_URL, { cacheName: OFFLINE_CACHE });
	return offline ?? Response.error();
}

/**
 * The home-screen launch: the stored home page at once when there is a recent one, and a fresh
 * copy stored for the next launch either way.
 * @param {FetchEvent} event
 */
async function shellFirst(event) {
	const cache = await caches.open(SHELL_CACHE);
	const stored = await cache.match(SHELL_URL);
	const fresh = (async () => {
		const response = (await event.preloadResponse) ?? (await fetch(event.request));
		await storeShell(response.clone());
		return response;
	})();
	const age = Date.now() - Number(stored?.headers.get(STORED_AT) ?? 0);
	if (stored && age < SHELL_MAX_AGE) {
		event.waitUntil(fresh.catch(() => {}));
		return stored;
	}
	try {
		return await fresh;
	} catch {
		return stored ?? offlinePage();
	}
}

/**
 * Keeps a good home page and every /_astro/ file it links to, fetching those first so the stored
 * page never points at a file that is not stored; files of older copies are dropped.
 * @param {Response} response
 */
async function storeShell(response) {
	if (!response.ok || response.redirected) return;
	const html = await response.text();
	const cache = await caches.open(SHELL_CACHE);
	const files = [
		...new Set([...html.matchAll(/(?:href|src)="(\/_astro\/[^"]+)"/g)].map((m) => m[1])),
	];
	for (const file of files) {
		if (await cache.match(file)) continue;
		const asset = await fetch(new Request(file));
		if (!asset.ok) return;
		await cache.put(new Request(file), asset);
	}
	// Only the type and our date: the network's length and encoding describe a body we decoded.
	const headers = {
		'content-type': response.headers.get('content-type') ?? 'text/html; charset=utf-8',
		[STORED_AT]: String(Date.now()),
	};
	await cache.put(new Request(SHELL_URL), new Response(html, { status: 200, headers }));
	const keep = new Set(
		[SHELL_URL, ...files].map((path) => new URL(path, self.location.origin).href),
	);
	for (const request of await cache.keys()) {
		if (!keep.has(request.url)) await cache.delete(request);
	}
}

/** @param {FetchEvent} event */
async function cacheFirst(event) {
	const cache = await caches.open(ASSET_CACHE);
	const shell = await caches.open(SHELL_CACHE);
	const cached = (await cache.match(event.request)) ?? (await shell.match(event.request));
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
