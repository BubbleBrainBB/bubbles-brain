/**
 * Design's reading list (the contents page). Hovering a title floats up the article's cover with
 * its original title (pointer devices only), and titles you've opened get a tick, kept in this
 * browser. Without JS the rows work as plain links and the original title shows as a tooltip.
 */
const READ_KEY = 'design-reading-read';

function loadReadIds(): Set<string> {
	try {
		const saved: unknown = JSON.parse(localStorage.getItem(READ_KEY) ?? '[]');
		return new Set(Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []);
	} catch {
		return new Set();
	}
}

function saveReadIds(ids: Set<string>) {
	try {
		localStorage.setItem(READ_KEY, JSON.stringify([...ids]));
	} catch {
		// Private windows can refuse storage; the ticks then last only for this visit.
	}
}

function setupDesignReadingList(root: HTMLElement) {
	if (root.dataset.ready) return;
	root.dataset.ready = 'true';
	const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-design-article]'));
	const progress = document.querySelector<HTMLElement>('[data-design-progress]');
	const count = progress?.querySelector<HTMLElement>('[data-design-read-count]');
	const reset = progress?.querySelector<HTMLButtonElement>('[data-design-reset]');
	const float = document.querySelector<HTMLElement>('[data-design-float]');
	const cover = float?.querySelector('img');
	const caption = float?.querySelector('figcaption');
	const read = loadReadIds();

	function showRead() {
		let total = 0;
		for (const link of links) {
			const isRead = read.has(link.dataset.designArticle ?? '');
			link.toggleAttribute('data-read', isRead);
			if (isRead) total += 1;
		}
		if (count) count.textContent = String(total);
		if (progress) progress.hidden = total === 0;
	}

	for (const link of links) {
		link.addEventListener('click', () => {
			read.add(link.dataset.designArticle ?? '');
			saveReadIds(read);
			showRead();
		});
	}
	reset?.addEventListener('click', () => {
		read.clear();
		saveReadIds(read);
		showRead();
	});
	showRead();

	// Covers only where there is a pointer to hover with; on touch a tap just opens the article.
	if (!float || !cover || !caption || !window.matchMedia('(hover: hover)').matches) return;

	let current: HTMLAnchorElement | null = null;
	function place(link: HTMLAnchorElement, pointerY?: number) {
		// Anchor to the title rather than the whole row, which runs out to the author.
		const anchor = link.querySelector<HTMLElement>('[data-design-title]') ?? link;
		const rects = Array.from(anchor.getClientRects());
		// A title that wraps has one box per line; use the line under the pointer.
		const rect =
			rects.find(
				(box) => pointerY !== undefined && pointerY >= box.top && pointerY <= box.bottom,
			) ?? rects[0];
		if (!rect || !float) return;
		const width = float.offsetWidth || 240;
		const left = Math.min(Math.max(rect.left, 16), window.innerWidth - width - 16);
		const above = rect.top > 220;
		float.style.left = `${left}px`;
		float.style.top = `${above ? rect.top - 12 : rect.bottom + 12}px`;
		float.dataset.side = above ? 'above' : 'below';
	}
	function show(link: HTMLAnchorElement, pointerY?: number) {
		if (!float || !cover || !caption) return;
		current = link;
		cover.src = link.dataset.designCover ?? '';
		caption.textContent = link.dataset.designOriginal ?? '';
		float.hidden = false;
		place(link, pointerY);
		requestAnimationFrame(() => float.setAttribute('data-open', ''));
	}
	function hide() {
		current = null;
		float?.removeAttribute('data-open');
		if (float) float.hidden = true;
	}

	for (const link of links) {
		// The float shows the original title, so the browser's own tooltip would only repeat it.
		link.dataset.designOriginal = link.title;
		link.removeAttribute('title');
		link.addEventListener('pointerenter', (event) => show(link, event.clientY));
		link.addEventListener('pointerleave', hide);
		link.addEventListener('focus', () => show(link));
		link.addEventListener('blur', hide);
	}
	window.addEventListener('scroll', () => current && hide(), { passive: true });
}

function initDesignReadingList() {
	document.querySelectorAll<HTMLElement>('[data-design-reading]').forEach(setupDesignReadingList);
}

document.addEventListener('astro:page-load', initDesignReadingList);
