import type { PodcastEpisode } from '../data/podcasts';
import { episodeHref } from './podcasts';
import type { KnowledgeSearchItem } from './searchIndex';

/** One line of 最近更新 on the home page. */
export interface HomeRecentItem {
	href: string;
	title: string;
	/** The section, in the words the site's nav uses. */
	label: string;
	/** MM.DD */
	date: string;
	external: boolean;
}

// Only what is written on a date and read as a piece: terms, brands and skills change too
// quietly to count as news, and AI 动态 joins in the browser (scripts/homeNews.ts).
const SECTION_LABELS: Partial<Record<KnowledgeSearchItem['section'], string>> = {
	highlights: '精选阅读',
	'newbie-tutorials': '教程',
	'codex-tutorials': '教程',
	'pi-agent-tutorials': '教程',
	'workbuddy-tutorials': '教程',
	'vibe-coding-showcase': 'Showcase',
};

const monthDay = (date: string) => date.slice(5, 10).replace('-', '.');

/** The newest pieces across sections, newest first, with no section taking more than `perLabel`. */
export function homeRecent(
	items: readonly KnowledgeSearchItem[],
	episodes: readonly PodcastEpisode[],
	limit = 8,
	perLabel = 2,
): HomeRecentItem[] {
	const pieces = [
		...items.flatMap((item) => {
			const label = SECTION_LABELS[item.section];
			return label && item.date ? [{ ...item, label, date: item.date }] : [];
		}),
		...episodes.map((episode) => ({
			href: episodeHref(episode),
			title: episode.title,
			label: '播客',
			date: episode.date,
			external: false,
		})),
	].sort((a, b) => b.date.localeCompare(a.date));

	const taken = new Map<string, number>();
	const recent: HomeRecentItem[] = [];
	for (const piece of pieces) {
		const count = taken.get(piece.label) ?? 0;
		if (count >= perLabel) continue;
		taken.set(piece.label, count + 1);
		recent.push({
			href: piece.href,
			title: piece.title,
			label: piece.label,
			date: monthDay(piece.date),
			external: piece.external,
		});
		if (recent.length === limit) break;
	}
	return recent;
}
