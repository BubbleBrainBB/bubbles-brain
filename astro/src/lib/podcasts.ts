/** 播客: how episodes are dated, timed, grouped and handed to the player. */
import {
	podcastEpisodes,
	podcastShows,
	type PodcastEpisode,
	type PodcastShow,
	type Timestamp,
} from '../data/podcasts';
import { getVibeCodingConcepts } from '../data/vibeCodingTerms';

export const PODCASTS_HREF = '/podcasts/';

export function episodeHref(episode: Pick<PodcastEpisode, 'id'>): string {
	return `${PODCASTS_HREF}${episode.id}/`;
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

/** The episode's site terms as links; an id the site does not have fails the build. */
export function termLinks(episode: PodcastEpisode): { label: string; href: string }[] {
	const concepts = getVibeCodingConcepts();
	return episode.terms.map((id) => {
		const concept = concepts.find((entry) => entry.id === id);
		if (!concept) throw new Error(`Podcast episode ${episode.id} links an unknown term: ${id}`);
		return { label: concept.chineseName, href: `/vibe-coding/terms/${id}/` };
	});
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
	const stamps = [...episode.points, ...episode.chapters].map((entry) => entry.at);
	for (const stamp of stamps) {
		const at = seconds(stamp);
		if (Number.isNaN(at)) problems.push(`bad timestamp ${stamp}`);
		else if (at > episode.duration) problems.push(`${stamp} is past the end`);
	}
	const chapterTimes = episode.chapters.map((chapter) => seconds(chapter.at));
	if (chapterTimes.some((at, index) => index > 0 && at <= chapterTimes[index - 1]))
		problems.push('chapters out of order');
	if (!/^\d{4}-\d{2}-\d{2}$/.test(episode.date)) problems.push(`bad date ${episode.date}`);
	if (!/^https:\/\//.test(episode.audio)) problems.push('audio is not https');
	return problems;
}
