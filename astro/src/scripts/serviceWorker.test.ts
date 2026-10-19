import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

import { describe, expect, it, vi } from 'vitest';

const source = readFileSync(new URL('./serviceWorker.js', import.meta.url), 'utf8');
const origin = 'https://bubblenews.today';

/** Like the browser's, which resolves relative URLs against the worker's location. */
class WorkerRequest extends Request {
	constructor(input: string | URL, init?: RequestInit) {
		super(new URL(input, origin), init);
	}
}

/** A same-origin network response, as the browser types it. */
function basic(body: string, init?: ResponseInit) {
	const response = new Response(body, init);
	Object.defineProperty(response, 'type', { value: 'basic' });
	return response;
}

/** A Cache Storage stand-in keyed by URL. */
function fakeCaches() {
	const stores = new Map<string, Map<string, Response>>();
	const open = async (name: string) => {
		if (!stores.has(name)) stores.set(name, new Map());
		const store = stores.get(name)!;
		const key = (request: Request | string) =>
			typeof request === 'string' ? new URL(request, origin).href : request.url;
		return {
			add: async (request: Request) => {
				store.set(key(request), new Response(`stored ${key(request)}`));
			},
			match: async (request: Request | string) => store.get(key(request))?.clone(),
			put: async (request: Request, response: Response) => {
				store.set(key(request), response);
			},
			keys: async () => [...store.keys()].map((url) => new Request(url)),
			delete: async (request: Request) => store.delete(key(request)),
		};
	};
	return {
		stores,
		open,
		keys: async () => [...stores.keys()],
		delete: async (name: string) => stores.delete(name),
		match: async (request: string, options: { cacheName: string }) =>
			(await open(options.cacheName)).match(request),
	};
}

function loadWorker(fetchImpl: (request: Request) => Promise<Response>) {
	const listeners = new Map<string, (event: unknown) => void>();
	const caches = fakeCaches();
	const self = {
		location: new URL(`${origin}/sw.js`),
		addEventListener: (type: string, listener: (event: unknown) => void) =>
			listeners.set(type, listener),
		skipWaiting: vi.fn(async () => undefined),
		clients: { claim: vi.fn(async () => undefined) },
		registration: { navigationPreload: { enable: vi.fn(async () => undefined) } },
	};
	const fetch = vi.fn(fetchImpl);
	runInNewContext(source.replace('__SW_VERSION__', 'test'), {
		self,
		caches,
		fetch,
		Request: WorkerRequest,
		Response,
		URL,
		Set,
		Math,
		Date,
		Number,
		String,
	});

	async function lifecycle(type: 'install' | 'activate') {
		let done: Promise<unknown> = Promise.resolve();
		listeners.get(type)!({ waitUntil: (promise: Promise<unknown>) => (done = promise) });
		await done;
	}

	/** Dispatches a fetch; resolves to the worker's response, or null when it stays out of the way. */
	async function request(url: string, init: RequestInit & { mode?: string } = {}) {
		const { mode = 'cors', ...rest } = init;
		const request = new Request(new URL(url, origin), rest);
		Object.defineProperty(request, 'mode', { value: mode });
		let responded = null as Promise<Response> | null;
		const pending: Promise<unknown>[] = [];
		listeners.get('fetch')!({
			request,
			preloadResponse: Promise.resolve(undefined),
			respondWith: (response: Promise<Response>) => (responded = response),
			waitUntil: (promise: Promise<unknown>) => pending.push(promise),
		});
		const response = responded ? await responded : null;
		await Promise.all(pending);
		return response;
	}

	return { self, caches, fetch, lifecycle, request };
}

describe('service worker', () => {
	it('stores only the offline page on install and takes over without a prompt', async () => {
		const worker = loadWorker(async () => new Response('page'));
		await worker.lifecycle('install');
		await worker.lifecycle('activate');

		expect([...worker.caches.stores.keys()]).toEqual(['bubble-offline-test', 'bubble-shell-v1']);
		expect([...worker.caches.stores.get('bubble-offline-test')!.keys()]).toEqual([
			`${origin}/offline/`,
		]);
		expect([...worker.caches.stores.get('bubble-shell-v1')!.keys()]).toEqual([
			`${origin}/?source=pwa`,
		]);
		expect(worker.self.skipWaiting).toHaveBeenCalled();
		expect(worker.self.clients.claim).toHaveBeenCalled();
	});

	it('drops caches from older versions on activate', async () => {
		const worker = loadWorker(async () => new Response('page'));
		await worker.caches.open('bubble-offline-old');
		await worker.caches.open('bubble-astro-assets-v1');
		await worker.caches.open('bubble-shell-v0');
		await worker.caches.open('someone-elses-cache');
		await worker.lifecycle('install');
		await worker.lifecycle('activate');

		expect([...worker.caches.stores.keys()].sort()).toEqual([
			'bubble-astro-assets-v1',
			'bubble-offline-test',
			'bubble-shell-v1',
			'someone-elses-cache',
		]);
	});

	it('serves pages from the network and never stores them', async () => {
		const worker = loadWorker(async () => new Response('fresh page'));
		await worker.lifecycle('install');

		const response = await worker.request('/podcasts/', { mode: 'navigate' });

		expect(await response!.text()).toBe('fresh page');
		expect(
			[...worker.caches.stores.values()].some((store) => store.has(`${origin}/podcasts/`)),
		).toBe(false);
	});

	it('shows the offline page only when the network is gone', async () => {
		const worker = loadWorker(async () => new Response('not found', { status: 404 }));
		await worker.lifecycle('install');
		expect((await worker.request('/missing/', { mode: 'navigate' }))!.status).toBe(404);

		worker.fetch.mockImplementation(async () => {
			throw new TypeError('Failed to fetch');
		});
		const offline = await worker.request('/highlights/', { mode: 'navigate' });
		expect(await offline!.text()).toBe(`stored ${origin}/offline/`);
	});

	it('serves hashed /_astro/ files from the cache once fetched', async () => {
		const worker = loadWorker(async () => basic('asset'));
		const first = await worker.request('/_astro/BaseLayout.CKaGaVZZ.js');
		const second = await worker.request('/_astro/BaseLayout.CKaGaVZZ.js');

		expect(await first!.text()).toBe('asset');
		expect(await second!.text()).toBe('asset');
		expect(worker.fetch).toHaveBeenCalledTimes(1);
	});

	it('leaves router fetches, data, audio, other origins and non-GET requests alone', async () => {
		const worker = loadWorker(async () => new Response('network'));
		for (const [url, init] of [
			['/podcasts/', {}],
			['/search/index.json', {}],
			['/media/showcase/demo.mp4', { headers: { range: 'bytes=0-' } }],
			['/_astro/font.woff2', { headers: { range: 'bytes=0-' } }],
			['https://pscrb.fm/rss/p/episode.mp3', { mode: 'navigate' }],
			['https://news-api.bubblenews.today/ai-news', {}],
			['/api/login', { method: 'POST', body: 'x' }],
		] as const) {
			expect(await worker.request(url, init), url).toBeNull();
		}
		expect(worker.fetch).not.toHaveBeenCalled();
	});

	describe('home-screen launch', () => {
		const home = (version: string) =>
			`<link rel="stylesheet" href="/_astro/home.${version}.css"><script type="module" src="/_astro/app.${version}.js"></script><p>home ${version}</p>`;

		/** Answers the home page and its files as the given build would. */
		function site(version: { current: string }) {
			return async (request: Request) => {
				const { pathname } = new URL(request.url);
				if (pathname === '/') return basic(home(version.current));
				if (pathname.startsWith('/_astro/')) return basic(`file ${pathname}`);
				return basic('page');
			};
		}

		it('opens on the stored home page at once and stores a fresh copy for next time', async () => {
			const version = { current: 'a' };
			const worker = loadWorker(site(version));
			await worker.lifecycle('install');

			version.current = 'b';
			const launch = await worker.request('/?source=pwa', { mode: 'navigate' });
			expect(await launch!.text()).toContain('home a');

			const next = await worker.request('/?source=pwa', { mode: 'navigate' });
			expect(await next!.text()).toContain('home b');
		});

		it('keeps the files the stored page links to, and only those', async () => {
			const version = { current: 'a' };
			const worker = loadWorker(site(version));
			await worker.lifecycle('install');
			version.current = 'b';
			await worker.request('/?source=pwa', { mode: 'navigate' });

			expect([...worker.caches.stores.get('bubble-shell-v1')!.keys()].sort()).toEqual([
				`${origin}/?source=pwa`,
				`${origin}/_astro/app.b.js`,
				`${origin}/_astro/home.b.css`,
			]);
			worker.fetch.mockClear();
			const css = await worker.request('/_astro/home.b.css');
			expect(await css!.text()).toBe('file /_astro/home.b.css');
			expect(worker.fetch).not.toHaveBeenCalled();
		});

		it('waits for the network when the stored copy is more than a week old', async () => {
			const version = { current: 'a' };
			const worker = loadWorker(site(version));
			await worker.lifecycle('install');
			const now = Date.now();
			vi.spyOn(Date, 'now').mockReturnValue(now + 8 * 24 * 60 * 60 * 1000);
			version.current = 'b';

			const launch = await worker.request('/?source=pwa', { mode: 'navigate' });
			expect(await launch!.text()).toContain('home b');
			vi.restoreAllMocks();
		});

		it('falls back to the stored copy, then the offline page, without a network', async () => {
			const worker = loadWorker(site({ current: 'a' }));
			await worker.lifecycle('install');
			worker.fetch.mockImplementation(async () => {
				throw new TypeError('Failed to fetch');
			});
			expect(await (await worker.request('/?source=pwa', { mode: 'navigate' }))!.text()).toContain(
				'home a',
			);

			worker.caches.stores.delete('bubble-shell-v1');
			expect(await (await worker.request('/?source=pwa', { mode: 'navigate' }))!.text()).toBe(
				`stored ${origin}/offline/`,
			);
		});

		it('never stores an error page, and serves the plain home page from the network', async () => {
			const worker = loadWorker(async () => basic('down', { status: 500 }));
			await worker.lifecycle('install');
			expect(worker.caches.stores.get('bubble-shell-v1')?.size ?? 0).toBe(0);

			worker.fetch.mockImplementation(async () => basic(home('c')));
			const plain = await worker.request('/', { mode: 'navigate' });
			expect(await plain!.text()).toContain('home c');
			expect(worker.caches.stores.get('bubble-shell-v1')?.size ?? 0).toBe(0);
		});
	});
});
