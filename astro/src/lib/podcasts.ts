/** 播客: how episodes are dated, timed, grouped and handed to the player. */
import {
	podcastEpisodes,
	podcastShows,
	type PodcastEpisode,
	type PodcastShow,
	type Timestamp,
} from '../data/podcasts';

export const PODCASTS_HREF = '/podcasts/';

export function episodeHref(episode: Pick<PodcastEpisode, 'id'>): string {
	return `${PODCASTS_HREF}${episode.id}/`;
}

/** Every show, as a wall of covers. */
export const SHOWS_HREF = `${PODCASTS_HREF}shows/`;

export function showHref(show: Pick<PodcastShow, 'id'>): string {
	return `${SHOWS_HREF}${show.id}/`;
}

/** A show's picked episodes, newest first. */
export function showEpisodes(
	show: Pick<PodcastShow, 'id'>,
	episodes: PodcastEpisode[] = podcastEpisodes,
): PodcastEpisode[] {
	return episodes
		.filter((episode) => episode.show === show.id)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Shows by their newest picked episode, newest first; shows with none are left out. */
export function showsByRecent(
	shows: PodcastShow[] = podcastShows,
	episodes: PodcastEpisode[] = podcastEpisodes,
): PodcastShow[] {
	const newest = (show: PodcastShow) => showEpisodes(show, episodes)[0]?.date ?? '';
	return shows.filter((show) => newest(show)).sort((a, b) => (newest(a) < newest(b) ? 1 : -1));
}

export interface OutlineEntry {
	/** Where a click plays from: the first takeaway's minute, else the chapter's start. */
	at: number;
	stamp: Timestamp;
	/** The chapter's own start, in seconds: how the player knows which chapter is playing. */
	start: number;
	chapter: string;
	points: string[];
}

/**
 * 听什么: the show's chapters in order, each takeaway under the chapter it falls in. A chapter
 * with takeaways plays from the first of them; one without is just its start and title.
 */
export function outline(episode: PodcastEpisode): OutlineEntry[] {
	const starts = episode.chapters.map((chapter) => seconds(chapter.at));
	return episode.chapters.map((chapter, index) => {
		const from = starts[index];
		const to = starts[index + 1] ?? Infinity;
		const points = episode.points.filter((point) => {
			const at = seconds(point.at);
			return at >= from && at < to;
		});
		const stamp = points[0]?.at ?? chapter.at;
		return {
			at: seconds(stamp),
			stamp,
			start: from,
			chapter: chapter.title,
			points: points.map((point) => point.text),
		};
	});
}

export interface TopicSpan {
	title: string;
	stamp: Timestamp;
	start: number;
	end: number;
	/** Rounded, at least one. */
	minutes: number;
}

/** 时间花在哪: each topic runs from its start to the next one's, the last to the episode's end. */
export function topicSpans(episode: PodcastEpisode): TopicSpan[] {
	const topics = episode.topics ?? [];
	return topics.map((topic, index) => {
		const start = seconds(topic.at);
		const end = index + 1 < topics.length ? seconds(topics[index + 1].at) : episode.duration;
		return {
			title: topic.title,
			stamp: topic.at,
			start,
			end,
			minutes: Math.max(1, Math.round((end - start) / 60)),
		};
	});
}

/** A run of outline text, or a glossary word in it with what it means. */
export type TextPart = string | { term: string; meaning: string };

/**
 * Splits text at the glossary words it contains, each word only the first time it appears on the
 * page: `seen` carries the words already explained from one call to the next, in reading order.
 */
export function withTerms(
	text: string,
	glossary: PodcastEpisode['glossary'] = [],
	seen: Set<string> = new Set(),
): TextPart[] {
	const parts: TextPart[] = [];
	let rest = text;
	for (;;) {
		const next = glossary
			.filter((entry) => !seen.has(entry.term))
			.map((entry) => ({ entry, index: rest.indexOf(entry.term) }))
			.filter((found) => found.index >= 0)
			.sort((a, b) => a.index - b.index || b.entry.term.length - a.entry.term.length)[0];
		if (!next) break;
		if (next.index > 0) parts.push(rest.slice(0, next.index));
		parts.push({ term: next.entry.term, meaning: next.entry.meaning });
		seen.add(next.entry.term);
		rest = rest.slice(next.index + next.entry.term.length);
	}
	if (rest) parts.push(rest);
	return parts;
}

/** 14:38 or 1:02:03 as seconds; NaN for anything else. */
export function seconds(stamp: Timestamp): number {
	if (!/^\d{1,2}(:\d{2}){1,2}$/.test(stamp)) return Number.NaN;
	return stamp.split(':').reduce((total, part) => total * 60 + Number(part), 0);
}

/** Seconds as the player shows them: 14:38, or 1:02:03 past an hour. */
export function clock(total: number): string {
	const whole = Math.max(0, Math.floor(total));
	const h = Math.floor(whole / 3600);
	const m = Math.floor((whole % 3600) / 60);
	const s = String(whole % 60).padStart(2, '0');
	return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

/** 32 分钟, or 1 小时 24 分钟. */
export function durationLabel(total: number): string {
	const minutes = Math.round(total / 60);
	if (minutes < 60) return `${minutes} 分钟`;
	const rest = minutes % 60;
	return rest ? `${Math.floor(minutes / 60)} 小时 ${rest} 分钟` : `${minutes / 60} 小时`;
}

/** 2026年10月10日 */
export function dateLabel(day: string): string {
	const [year, month, date] = day.split('-').map(Number);
	return `${year}年${month}月${date}日`;
}

/** 10月10日, for the list where the month heading already gives the year. */
export function shortDateLabel(day: string): string {
	const [, month, date] = day.split('-').map(Number);
	return `${month}月${date}日`;
}

/** Guests first, each with where they work; the host last: 主持 Brandon Anderson. */
export function peopleLine(episode: PodcastEpisode): string {
	const guests = episode.people
		.filter((person) => !person.role)
		.map((person) => (person.org ? `${person.name}（${person.org}）` : person.name));
	const hosts = episode.people
		.filter((person) => person.role)
		.map((person) => `${person.role} ${person.name}`);
	return [guests.join('、'), ...hosts].filter(Boolean).join(' · ');
}

/** Guests' names only, for the list. */
export function guestNames(episode: PodcastEpisode): string {
	return episode.people
		.filter((person) => !person.role)
		.map((person) => person.name)
		.join('、');
}

export function showOf(episode: PodcastEpisode, shows: PodcastShow[] = podcastShows): PodcastShow {
	const show = shows.find((entry) => entry.id === episode.show);
	if (!show)
		throw new Error(`Podcast episode ${episode.id} names an unknown show: ${episode.show}`);
	return show;
}

export interface EpisodeMonth {
	key: string;
	label: string;
	episodes: PodcastEpisode[];
}

/** Newest first, a group per month: 2026年10月. */
export function episodesByMonth(episodes: PodcastEpisode[] = podcastEpisodes): EpisodeMonth[] {
	const months: EpisodeMonth[] = [];
	for (const episode of [...episodes].sort((a, b) => (a.date < b.date ? 1 : -1))) {
		const key = episode.date.slice(0, 7);
		const last = months.at(-1);
		if (last?.key === key) last.episodes.push(episode);
		else {
			const [year, month] = key.split('-').map(Number);
			months.push({ key, label: `${year}年${month}月`, episodes: [episode] });
		}
	}
	return months;
}

/** What a play button hands the player: enough to show, play and seek without the episode page. */
export interface PlayerEpisode {
	id: string;
	title: string;
	show: string;
	cover: string;
	audio: string;
	href: string;
	duration: number;
	chapters: { at: number; title: string }[];
}

export function playerEpisode(episode: PodcastEpisode): PlayerEpisode {
	const show = showOf(episode);
	return {
		id: episode.id,
		title: episode.title,
		show: show.name,
		cover: show.cover,
		audio: episode.audio,
		href: episodeHref(episode),
		duration: episode.duration,
		chapters: episode.chapters.map((chapter) => ({
			at: seconds(chapter.at),
			title: chapter.title,
		})),
	};
}

/** Problems a new episode can have, so a typo fails the tests rather than the page. */
export function episodeProblems(episode: PodcastEpisode): string[] {
	const problems: string[] = [];
	const stamps = [
		...episode.points,
		...episode.chapters,
		...(episode.quote ? [episode.quote] : []),
		...(episode.brief?.reasons ?? []),
		...(episode.questions ?? []),
	].map((entry) => entry.at);
	for (const stamp of stamps) {
		const at = seconds(stamp);
		if (Number.isNaN(at)) problems.push(`bad timestamp ${stamp}`);
		else if (at > episode.duration) problems.push(`${stamp} is past the end`);
	}
	const chapterTimes = episode.chapters.map((chapter) => seconds(chapter.at));
	if (chapterTimes.some((at, index) => index > 0 && at <= chapterTimes[index - 1]))
		problems.push('chapters out of order');
	// Every takeaway must sit under a chapter, or the outline would drop it.
	const firstChapter = chapterTimes[0] ?? 0;
	for (const point of episode.points)
		if (seconds(point.at) < firstChapter) problems.push(`${point.at} is before the first chapter`);
	if (episode.quote && episode.quote.text.split(/\s+/).length > 15)
		problems.push('quote is too long');
	// Our video's own times stay inside the video.
	if (episode.video) {
		const videoStamps = [
			...episode.video.chapters.map((chapter) => chapter.at),
			...(episode.brief?.reasons.flatMap((reason) => (reason.videoAt ? [reason.videoAt] : [])) ??
				[]),
		];
		for (const stamp of videoStamps) {
			const at = seconds(stamp);
			if (Number.isNaN(at)) problems.push(`bad video timestamp ${stamp}`);
			else if (at > episode.video.duration) problems.push(`video ${stamp} is past its end`);
		}
	}
	const topicTimes = (episode.topics ?? []).map((topic) => seconds(topic.at));
	if (
		topicTimes.some((at, index) => Number.isNaN(at) || (index > 0 && at <= topicTimes[index - 1]))
	)
		problems.push('topics out of order');
	if (topicTimes.some((at) => at > episode.duration)) problems.push('a topic is past the end');
	for (const side of episode.stances?.sides ?? [])
		if (!(seconds(side.at) <= episode.duration))
			problems.push(`${side.name}'s ${side.at} is past the end`);
	// The brief is one glance: a card per reason, two to four of them; the questions stay a few.
	const reasons = episode.brief?.reasons.length;
	if (reasons !== undefined && (reasons < 2 || reasons > 4)) problems.push(`${reasons} reasons`);
	if ((episode.questions?.length ?? 0) > 3) problems.push('more than three questions');
	// A glossary word nobody reads in the outline is never shown.
	const outlineText = [
		...episode.chapters.map((c) => c.title),
		...episode.points.map((p) => p.text),
	];
	for (const entry of episode.glossary ?? [])
		if (!outlineText.some((text) => text.includes(entry.term)))
			problems.push(`${entry.term} is not in the outline`);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(episode.date)) problems.push(`bad date ${episode.date}`);
	if (!/^https:\/\//.test(episode.audio)) problems.push('audio is not https');
	return problems;
}
