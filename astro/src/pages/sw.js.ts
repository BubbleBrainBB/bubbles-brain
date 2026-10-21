import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

import worker from '../scripts/serviceWorker.js?raw';
import offlinePage from './offline/index.astro?raw';

export const prerender = true;

/**
 * The worker's version is a hash of its own source and of the offline page it stores, so a
 * change to either ships a new worker (and a fresh offline copy), and an unchanged build keeps
 * the same bytes and does not make every reader reinstall.
 */
const serviceWorkerVersion = createHash('sha256')
	.update(worker)
	.update('\0')
	.update(offlinePage)
	.digest('hex')
	.slice(0, 12);

export const GET: APIRoute = () =>
	new Response(worker.replace('__SW_VERSION__', serviceWorkerVersion), {
		headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
	});
