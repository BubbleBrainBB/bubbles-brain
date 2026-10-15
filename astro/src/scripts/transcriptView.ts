/**
 * The transcript page (/podcasts/[episode]/transcript/). podcastPlayer.ts already
 * marks the turn being spoken with aria-current — the same data-podcast-from/to
 * spans the 听什么 outline uses — so this script only adds what the page needs on
 * top: keeping the spoken turn in view while 跟随播放 is on, a 回到当前 button when
 * the reader has scrolled away, and search within the transcript (⌘F, with the
 * hit count and jumps between hits).
 */
const RECENTER_BAND = 0.35;
const LANG_KEY = 'transcript:lang';

function initTranscript() {
	const stream = document.querySelector<HTMLElement>('[data-transcript-stream]');
	if (!stream || stream.dataset.ready) return;
	stream.dataset.ready = 'true';
	const turns = Array.from(stream.querySelectorAll<HTMLElement>('.tr-turn'));
	// A turn may carry the original and a 中文 translation; search reads the one on show.
	const slots = turns.map((turn) =>
		Array.from(turn.querySelectorAll<HTMLElement>('.tr-turn__text')),
	);
	const originals = new Map(slots.flat().map((slot) => [slot, slot.textContent ?? '']));
	const langButtons = Array.from(
		document.querySelectorAll<HTMLButtonElement>('[data-transcript-lang]'),
	);
	const slotFor = (index: number) =>
		slots[index].find((slot) => slot.lang === stream.dataset.lang) ?? slots[index][0];
	const follow = document.querySelector<HTMLButtonElement>('[data-transcript-follow]');
	const search = document.querySelector<HTMLInputElement>('[data-transcript-search]');
	const hits = document.querySelector<HTMLElement>('[data-transcript-hits]');
	const hitsCount = document.querySelector<HTMLElement>('[data-transcript-hits-count]');
	const hitPrev = document.querySelector<HTMLButtonElement>('[data-transcript-hit-prev]');
	const hitNext = document.querySelector<HTMLButtonElement>('[data-transcript-hit-next]');
	const recenter = document.querySelector<HTMLButtonElement>('[data-transcript-recenter]');

	// The button floats over the player, so it belongs directly under <body>:
	// inside the article, any transformed ancestor (a preview shell, a zoom
	// wrapper) would become its containing block and drag it off the player.
	// The router's next swap drops it with the rest of the page; coming back
	// moves it again.
	if (recenter && recenter.parentElement !== document.body) document.body.appendChild(recenter);

	let following = true;
	let current: HTMLElement | null = null;
	/** While our own smooth scroll runs, a wheel or scroll event is not the reader's. */
	let scrolling = 0;
	let query = '';
	let hitTurns: HTMLElement[] = [];
	let hitAt = -1;

	/* ---------------------------------------------------------------- follow */

	const inBand = (element: HTMLElement) => {
		const box = element.getBoundingClientRect();
		// Following scrolls the turn to the middle, so a short turn sits below a
		// single line at 35%; count it in view while it overlaps the middle band.
		const top = window.innerHeight * RECENTER_BAND;
		const bottom = window.innerHeight * (1 - RECENTER_BAND);
		return box.top < bottom && box.bottom > top;
	};

	/**
	 * Keep the button just above the player bar. The bar's height differs per
	 * breakpoint (and the player may be closed), so a fixed pixel offset in CSS
	 * drifts; measure the bar and sit the button a breath over its top edge.
	 * CSS keeps a sane fallback offset for when this never runs.
	 */
	const placeRecenter = () => {
		if (!recenter) return;
		const bar = document.querySelector<HTMLElement>(
			'.podcast-player:not([hidden]) .podcast-player__bar',
		);
		if (!bar) {
			recenter.style.removeProperty('bottom');
			return;
		}
		const gap = 8;
		recenter.style.bottom = `${Math.round(window.innerHeight - bar.getBoundingClientRect().top + gap)}px`;
	};

	const showRecenter = () => {
		if (!recenter) return;
		const show = current !== null && !(following && inBand(current));
		recenter.hidden = !show;
		if (show) placeRecenter();
	};

	const scrollTo = (element: HTMLElement) => {
		scrolling = Date.now() + 700;
		element.scrollIntoView({ block: 'center', behavior: 'smooth' });
	};

	const setCurrent = (turn: HTMLElement | null) => {
		current = turn;
		// Searching pins the view to the hits, not to the audio.
		if (turn && following && !query) scrollTo(turn);
		showRecenter();
	};

	const setFollowing = (on: boolean) => {
		following = on;
		follow?.setAttribute('aria-pressed', String(on));
		stream.classList.toggle('tr-stream--following', on);
		if (on && current) scrollTo(current);
		showRecenter();
	};

	// The player sets aria-current on the turn being spoken; watch for the change.
	new MutationObserver((records) => {
		for (const record of records) {
			const turn = record.target as HTMLElement;
			if (!turn.classList?.contains('tr-turn')) continue;
			if (turn.hasAttribute('aria-current')) setCurrent(turn);
			else if (current === turn) setCurrent(null);
		}
	}).observe(stream, { attributes: true, attributeFilter: ['aria-current'], subtree: true });

	// The page may load mid-episode, with the player already marking a turn.
	setCurrent(stream.querySelector<HTMLElement>('.tr-turn[aria-current]'));

	// A scroll of the reader's own takes the page off follow.
	const readerScrolled = () => Date.now() > scrolling;
	window.addEventListener(
		'wheel',
		() => {
			if (following && readerScrolled()) setFollowing(false);
		},
		{ passive: true },
	);
	window.addEventListener(
		'scroll',
		() => {
			if (!readerScrolled()) return;
			showRecenter();
		},
		{ passive: true },
	);
	// A shorter viewport moves the player's top edge; re-measure while showing.
	window.addEventListener('resize', () => {
		if (recenter && !recenter.hidden) placeRecenter();
	});

	follow?.addEventListener('click', () => setFollowing(!following));
	recenter?.addEventListener('click', () => setFollowing(true));

	/* ---------------------------------------------------------------- search */

	const highlight = (text: string, needle: string) => {
		const fragment = document.createDocumentFragment();
		const lower = text.toLowerCase();
		let from = 0;
		for (;;) {
			const at = lower.indexOf(needle, from);
			if (at < 0) break;
			if (at > from) fragment.append(text.slice(from, at));
			const mark = document.createElement('mark');
			mark.textContent = text.slice(at, at + needle.length);
			fragment.append(mark);
			from = at + needle.length;
		}
		fragment.append(text.slice(from));
		return fragment;
	};

	const showHits = () => {
		if (!hits) return;
		hits.hidden = !query;
		if (hitsCount) hitsCount.textContent = String(hitTurns.length);
		if (hitPrev) hitPrev.disabled = hitAt <= 0;
		if (hitNext) hitNext.disabled = hitAt < 0 || hitAt >= hitTurns.length - 1;
	};

	const jumpToHit = (index: number) => {
		if (!hitTurns.length) return;
		hitAt = (index + hitTurns.length) % hitTurns.length;
		scrolling = Date.now() + 700;
		hitTurns[hitAt].scrollIntoView({ block: 'center', behavior: 'smooth' });
		showHits();
	};

	const applySearch = () => {
		query = (search?.value ?? '').trim();
		for (const [slot, text] of originals) slot.textContent = text;
		turns.forEach((turn) => turn.classList.remove('is-hit'));
		if (!query) {
			stream.classList.remove('tr-stream--search');
			hitTurns = [];
			hitAt = -1;
			showHits();
			return;
		}
		const needle = query.toLowerCase();
		hitTurns = [];
		turns.forEach((turn, index) => {
			const slot = slotFor(index);
			const text = slot ? (originals.get(slot) ?? '') : '';
			if (!slot || !text.toLowerCase().includes(needle)) return;
			turn.classList.add('is-hit');
			hitTurns.push(turn);
			slot.replaceChildren(highlight(text, needle));
		});
		stream.classList.add('tr-stream--search');
		hitAt = hitTurns.length ? 0 : -1;
		showHits();
		if (hitTurns.length) jumpToHit(0);
	};

	search?.addEventListener('input', applySearch);
	search?.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			search.value = '';
			applySearch();
			search.blur();
		} else if (event.key === 'Enter') {
			event.preventDefault();
			jumpToHit(hitAt + (event.shiftKey ? -1 : 1));
		}
	});
	hitPrev?.addEventListener('click', () => jumpToHit(hitAt - 1));
	hitNext?.addEventListener('click', () => jumpToHit(hitAt + 1));

	/* ------------------------------------------------------------- language */

	const setLang = (lang: string) => {
		if (!langButtons.some((button) => button.dataset.transcriptLang === lang)) return;
		stream.dataset.lang = lang;
		for (const button of langButtons)
			button.setAttribute('aria-pressed', String(button.dataset.transcriptLang === lang));
		try {
			localStorage.setItem(LANG_KEY, lang);
		} catch {
			// Private windows may refuse storage; the choice just won't be remembered.
		}
		// Hits are counted in the language on show.
		if (query) applySearch();
		else if (following && current) scrollTo(current);
	};
	for (const button of langButtons)
		button.addEventListener('click', () => setLang(button.dataset.transcriptLang ?? ''));
	try {
		const saved = localStorage.getItem(LANG_KEY);
		if (saved && saved !== stream.dataset.lang) setLang(saved);
	} catch {
		// No storage: stay on the default, 中文.
	}

	// ⌘F searches the transcript, not the browser's find bar.
	document.addEventListener('keydown', (event) => {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'f') {
			event.preventDefault();
			search?.focus();
			search?.select();
		}
	});
}

if (typeof document !== 'undefined') {
	document.addEventListener('astro:page-load', initTranscript);
	initTranscript();
}
