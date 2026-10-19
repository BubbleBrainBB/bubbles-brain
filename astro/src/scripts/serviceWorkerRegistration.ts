/**
 * Registers the service worker (/sw.js, from src/scripts/serviceWorker.js) that makes the site
 * installable and shows /offline/ when there is no network.
 *
 * The browser looks for a new worker on every real page load, but under the client router a
 * reader can stay in one document for a long time, so a page change also asks for a check now
 * and then. A new worker takes over by itself; there is no "update available" prompt.
 */

const UPDATE_CHECK_MS = 30 * 60_000;

function register() {
	navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).catch(() => {
		/* Installing is an extra; the site works the same without it. */
	});
}

// Development serves unbundled modules, which the worker's /_astro/ cache does not describe.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
	// After load, so the worker's own download never competes with the first page.
	if (document.readyState === 'complete') register();
	else window.addEventListener('load', register, { once: true });

	let lastCheck = Date.now();
	document.addEventListener('astro:page-load', () => {
		if (Date.now() - lastCheck < UPDATE_CHECK_MS) return;
		lastCheck = Date.now();
		navigator.serviceWorker
			.getRegistration()
			.then((registration) => registration?.update())
			.catch(() => {});
	});
}
