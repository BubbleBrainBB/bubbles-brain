/**
 * The 播客 player (components/PodcastPlayer.astro). Any element with `data-podcast-play` plays or
 * pauses the episode described by the nearest `data-podcast-episode` (a PlayerEpisode as JSON);
 * `data-podcast-at="878"` jumps there and plays; a `data-podcast-progress` line on the episode's page
 * shows how far in it is and seeks. The bar persists across in-site navigation, so
 * listening carries on page to page; each episode resumes where the reader left it.
 * The audio is the show's own file, streamed from the show's host: nothing loads until play.
 */
import { clock, type PlayerEpisode } from '../lib/podcasts';

const RATES = [1, 1.25, 1.5, 2];
const BACK = 15;
const FORWARD = 30;
/** Within this of the end an episode counts as finished and starts over next time. */
const FINISHED_WITHIN = 20;
const positionKey = (id: string) => `podcast:position:${id}`;

function readPosition(id: string): number {
	try {
		return Number(localStorage.getItem(positionKey(id))) || 0;
	} catch {
		return 0;
	}
}

function writePosition(id: string, at: number) {
	try {
		localStorage.setItem(positionKey(id), String(Math.floor(at)));
	} catch {
		// Private windows may refuse storage; the episode then simply starts from the top.
	}
}

function parseEpisode(value: string | undefined): PlayerEpisode | null {
	if (!value) return null;
	try {
		const episode = JSON.parse(value) as PlayerEpisode;
		return typeof episode.id === 'string' && typeof episode.audio === 'string' ? episode : null;
	} catch {
		return null;
	}
}

function setup() {
	const root = document.querySelector<HTMLElement>('[data-podcast-player]');
	if (!root || root.dataset.ready) return;
	root.dataset.ready = 'true';
	const audio = root.querySelector<HTMLAudioElement>('[data-podcast-audio]')!;
	const cover = root.querySelector<HTMLImageElement>('[data-podcast-cover]')!;
	const title = root.querySelector<HTMLAnchorElement>('[data-podcast-title]')!;
	const chapter = root.querySelector<HTMLElement>('[data-podcast-chapter]')!;
	const elapsed = root.querySelector<HTMLElement>('[data-podcast-elapsed]')!;
	const total = root.querySelector<HTMLElement>('[data-podcast-total]')!;
	const seek = root.querySelector<HTMLInputElement>('[data-podcast-seek]')!;
	const ticks = root.querySelector<HTMLElement>('[data-podcast-ticks]')!;
	const toggle = root.querySelector<HTMLButtonElement>('[data-podcast-toggle]')!;
	const rate = root.querySelector<HTMLButtonElement>('[data-podcast-rate]')!;
	const error = root.querySelector<HTMLElement>('[data-podcast-error]')!;
	const errorLink = root.querySelector<HTMLAnchorElement>('[data-podcast-error-link]')!;
	let current: PlayerEpisode | null = null;
	let seeking = false;
	let lastSaved = 0;

	const length = () =>
		Number.isFinite(audio.duration) && audio.duration > 0
			? audio.duration
			: (current?.duration ?? 0);
	const chapterAt = (at: number) =>
		current?.chapters.reduce<PlayerEpisode['chapters'][number] | null>(
			(found, entry) => (entry.at <= at ? entry : found),
			null,
		) ?? null;

	/** Buttons and chapters on the page show what is playing. */
	const reflect = () => {
		const playing = Boolean(current) && !audio.paused;
		root.classList.toggle('is-playing', playing);
		toggle.setAttribute('aria-label', playing ? '暂停' : '播放');
		for (const button of document.querySelectorAll<HTMLElement>('[data-podcast-play]')) {
			const episode = parseEpisode(
				button.closest<HTMLElement>('[data-podcast-episode]')?.dataset.podcastEpisode,
			);
			const mine = Boolean(current && episode?.id === current.id);
			button.classList.toggle('is-playing', mine && playing);
			button.setAttribute('aria-pressed', String(mine && playing));
			const label = button.querySelector<HTMLElement>('[data-podcast-play-label]');
			if (label) label.textContent = mine && playing ? '暂停' : mine ? '继续播放' : '播放';
		}
		// 时间花在哪: the topic the show's audio is in now.
		for (const item of document.querySelectorAll<HTMLElement>('[data-podcast-topic-from]')) {
			const episode = item.closest<HTMLElement>('[data-podcast-episode]');
			const mine = current && parseEpisode(episode?.dataset.podcastEpisode)?.id === current.id;
			const at = audio.currentTime;
			const inside =
				at >= Number(item.dataset.podcastTopicFrom) && at < Number(item.dataset.podcastTopicTo);
			if (mine && inside) item.setAttribute('aria-current', 'true');
			else item.removeAttribute('aria-current');
		}
		const now = chapterAt(audio.currentTime);
		for (const item of document.querySelectorAll<HTMLElement>('[data-podcast-chapter-at]')) {
			const episode = item.closest<HTMLElement>('[data-podcast-episode]');
			const mine = current && parseEpisode(episode?.dataset.podcastEpisode)?.id === current.id;
			const active = Boolean(mine && now && Number(item.dataset.podcastChapterAt) === now.at);
			if (active) item.setAttribute('aria-current', 'true');
			else item.removeAttribute('aria-current');
		}
	};

	const showTime = () => {
		const at = audio.currentTime;
		elapsed.textContent = clock(at);
		if (!seeking) seek.value = String(Math.floor(at));
		seek.style.setProperty('--played', `${length() ? (at / length()) * 100 : 0}%`);
		seek.setAttribute('aria-valuetext', `${clock(at)} / ${clock(length())}`);
		chapter.textContent = chapterAt(at)?.title ? `· ${chapterAt(at)!.title}` : '';
		showPageProgress();
	};

	/** The progress line on an episode's page: live while it plays, else where the reader left it. */
	const showPageProgress = () => {
		for (const line of document.querySelectorAll<HTMLElement>('[data-podcast-progress]')) {
			const episode = parseEpisode(
				line.closest<HTMLElement>('[data-podcast-episode]')?.dataset.podcastEpisode,
			);
			const input = line.querySelector<HTMLInputElement>('[data-podcast-progress-seek]');
			const shown = line.querySelector<HTMLElement>('[data-podcast-progress-elapsed]');
			if (!episode || !input || !shown || input.dataset.dragging) continue;
			const mine = current?.id === episode.id;
			const end = mine ? length() : episode.duration;
			const at = Math.min(mine ? audio.currentTime : readPosition(episode.id), end);
			shown.textContent = clock(at);
			input.max = String(Math.floor(end));
			input.value = String(Math.floor(at));
			input.style.setProperty('--played', `${end ? (at / end) * 100 : 0}%`);
			input.setAttribute('aria-valuetext', `${clock(at)} / ${clock(end)}`);
		}
	};

	const drawTicks = () => {
		const end = length();
		ticks.replaceChildren(
			...(current?.chapters ?? [])
				.filter((entry) => entry.at > 0 && end && entry.at < end)
				.map((entry) => {
					const tick = document.createElement('span');
					tick.style.left = `${(entry.at / end) * 100}%`;
					return tick;
				}),
		);
		total.textContent = clock(end);
		seek.max = String(Math.floor(end));
	};

	const mediaSession = () => {
		if (!current || !('mediaSession' in navigator)) return;
		navigator.mediaSession.metadata = new MediaMetadata({
			title: current.title,
			artist: current.show,
			artwork: [{ src: current.cover, sizes: '512x512' }],
		});
	};

	const load = (episode: PlayerEpisode) => {
		if (current) writePosition(current.id, audio.currentTime);
		current = episode;
		audio.src = episode.audio;
		const saved = readPosition(episode.id);
		audio.currentTime = saved && saved < episode.duration - FINISHED_WITHIN ? saved : 0;
		cover.src = episode.cover;
		title.textContent = episode.title;
		title.href = episode.href;
		errorLink.href = episode.href;
		error.hidden = true;
		root.hidden = false;
		document.documentElement.classList.add('has-podcast-player');
		drawTicks();
		showTime();
		mediaSession();
	};

	const play = (episode: PlayerEpisode, at?: number) => {
		if (current?.id !== episode.id) load(episode);
		if (at !== undefined) audio.currentTime = at;
		void audio.play().catch(() => {
			// A refused autoplay or a bad file: the error handler or the paused state says so.
		});
	};

	document.addEventListener('click', (event) => {
		const target = event.target as Element;
		const trigger = target.closest<HTMLElement>('[data-podcast-play], [data-podcast-at]');
		if (!trigger) return;
		const episode = parseEpisode(
			trigger.closest<HTMLElement>('[data-podcast-episode]')?.dataset.podcastEpisode,
		);
		if (!episode) return;
		event.preventDefault();
		if (trigger.dataset.podcastAt !== undefined)
			return play(episode, Number(trigger.dataset.podcastAt));
		if (current?.id === episode.id && !audio.paused) audio.pause();
		else play(episode);
	});

	toggle.addEventListener('click', () => {
		if (!current) return;
		if (audio.paused) void audio.play().catch(() => undefined);
		else audio.pause();
	});
	root.querySelector('[data-podcast-back]')!.addEventListener('click', () => {
		audio.currentTime = Math.max(0, audio.currentTime - BACK);
	});
	root.querySelector('[data-podcast-forward]')!.addEventListener('click', () => {
		audio.currentTime = Math.min(length(), audio.currentTime + FORWARD);
	});
	rate.addEventListener('click', () => {
		const next = RATES[(RATES.indexOf(audio.playbackRate) + 1) % RATES.length] ?? 1;
		audio.playbackRate = next;
		rate.textContent = `${next}×`;
		rate.setAttribute('aria-label', `播放速度：${next} 倍`);
	});
	root.querySelector('[data-podcast-close]')!.addEventListener('click', () => {
		if (current) writePosition(current.id, audio.currentTime);
		audio.pause();
		root.hidden = true;
		document.documentElement.classList.remove('has-podcast-player');
		reflect();
		showPageProgress();
	});

	seek.addEventListener('input', () => {
		seeking = true;
		elapsed.textContent = clock(Number(seek.value));
		seek.style.setProperty('--played', `${length() ? (Number(seek.value) / length()) * 100 : 0}%`);
	});
	seek.addEventListener('change', () => {
		seeking = false;
		audio.currentTime = Number(seek.value);
	});

	// Dragging the page's line shows the time under the thumb; letting go plays from there.
	document.addEventListener('input', (event) => {
		const input = event.target as HTMLInputElement;
		if (!input.matches?.('[data-podcast-progress-seek]')) return;
		input.dataset.dragging = 'true';
		const shown = input
			.closest('[data-podcast-progress]')
			?.querySelector<HTMLElement>('[data-podcast-progress-elapsed]');
		if (shown) shown.textContent = clock(Number(input.value));
		const end = Number(input.max);
		input.style.setProperty('--played', `${end ? (Number(input.value) / end) * 100 : 0}%`);
	});
	document.addEventListener('change', (event) => {
		const input = event.target as HTMLInputElement;
		if (!input.matches?.('[data-podcast-progress-seek]')) return;
		delete input.dataset.dragging;
		const episode = parseEpisode(
			input.closest<HTMLElement>('[data-podcast-episode]')?.dataset.podcastEpisode,
		);
		if (!episode) return;
		if (current?.id === episode.id && audio.paused) audio.currentTime = Number(input.value);
		else play(episode, Number(input.value));
		showPageProgress();
	});

	audio.addEventListener('timeupdate', () => {
		showTime();
		reflect();
		if (current && Math.abs(audio.currentTime - lastSaved) >= 5) {
			lastSaved = audio.currentTime;
			writePosition(current.id, audio.currentTime);
		}
	});
	audio.addEventListener('loadedmetadata', drawTicks);
	audio.addEventListener('play', reflect);
	audio.addEventListener('pause', () => {
		if (current) writePosition(current.id, audio.currentTime);
		reflect();
	});
	audio.addEventListener('ended', () => {
		if (current) writePosition(current.id, 0);
		reflect();
	});
	audio.addEventListener('error', () => {
		if (!current) return;
		error.hidden = false;
		reflect();
	});
	window.addEventListener('pagehide', () => {
		if (current) writePosition(current.id, audio.currentTime);
	});

	if ('mediaSession' in navigator) {
		navigator.mediaSession.setActionHandler('play', () => void audio.play().catch(() => undefined));
		navigator.mediaSession.setActionHandler('pause', () => audio.pause());
		navigator.mediaSession.setActionHandler('seekbackward', () => {
			audio.currentTime = Math.max(0, audio.currentTime - BACK);
		});
		navigator.mediaSession.setActionHandler('seekforward', () => {
			audio.currentTime = Math.min(length(), audio.currentTime + FORWARD);
		});
	}

	// Moving the persisted player into the new page pauses the audio: pick up where it was.
	let wasPlaying = false;
	document.addEventListener('astro:before-swap', () => {
		wasPlaying = Boolean(current) && !audio.paused;
	});
	document.addEventListener('astro:after-swap', () => {
		if (wasPlaying && audio.paused) void audio.play().catch(() => undefined);
	});
	// A new page brings new buttons; show them the state of what is playing.
	document.addEventListener('astro:page-load', () => {
		reflect();
		showPageProgress();
	});
	reflect();
	showPageProgress();
}

if (typeof document !== 'undefined') {
	document.addEventListener('astro:page-load', setup);
	setup();
}
