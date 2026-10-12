/**
 * Our Chinese explainer video on an episode's page. The chapter bars under it fill as it plays and
 * mark the chapter on screen; `data-podcast-video-at="55"` anywhere on the page jumps the video
 * there and plays. Only one thing plays at a time: starting the video pauses the show's audio in
 * the player, and starting the audio pauses the video.
 */

export {};

const pageVideo = () => document.querySelector<HTMLVideoElement>('[data-podcast-video-player]');

function showChapters(video: HTMLVideoElement) {
	const at = video.currentTime;
	for (const chapter of document.querySelectorAll<HTMLElement>('[data-podcast-video-end]')) {
		const start = Number(chapter.dataset.podcastVideoAt);
		const end = Number(chapter.dataset.podcastVideoEnd);
		const share = end > start ? Math.min(1, Math.max(0, (at - start) / (end - start))) : 0;
		chapter.style.setProperty('--played', `${share * 100}%`);
		if (at >= start && at < end && (at > 0 || !video.paused))
			chapter.setAttribute('aria-current', 'true');
		else chapter.removeAttribute('aria-current');
	}
}

function watch() {
	const video = pageVideo();
	if (!video || video.dataset.watched) return;
	video.dataset.watched = 'true';
	for (const type of ['timeupdate', 'seeked', 'play', 'pause'])
		video.addEventListener(type, () => showChapters(video));
	video.addEventListener('play', () => {
		document.querySelector<HTMLAudioElement>('[data-podcast-audio]')?.pause();
	});
	showChapters(video);
}

// The listeners sit on the document, so they outlive page swaps; the video is looked up each time.
function setup() {
	document.addEventListener('click', (event) => {
		const trigger = (event.target as Element).closest?.<HTMLElement>('[data-podcast-video-at]');
		const video = pageVideo();
		if (!trigger || !video) return;
		event.preventDefault();
		video.currentTime = Number(trigger.dataset.podcastVideoAt);
		void video.play().catch(() => undefined);
		const box = video.getBoundingClientRect();
		if (box.bottom < 0 || box.top > window.innerHeight * 0.6)
			video.scrollIntoView({ behavior: 'smooth', block: 'center' });
	});
	// The show's audio starting anywhere (play button, a timestamp, the player bar) pauses the video.
	document.addEventListener(
		'play',
		(event) => {
			if ((event.target as Element).matches?.('[data-podcast-audio]')) pageVideo()?.pause();
		},
		true,
	);
	document.addEventListener('astro:page-load', watch);
	watch();
}

if (typeof document !== 'undefined') setup();
