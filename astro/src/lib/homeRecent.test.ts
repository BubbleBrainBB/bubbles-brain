import { describe, expect, it } from 'vitest';

import type { PodcastEpisode } from '../data/podcasts';
import { homeRecent } from './homeRecent';
import type { KnowledgeSearchItem } from './searchIndex';

const item = (section: KnowledgeSearchItem['section'], title: string, date: string | null) =>
	({
		key: title,
		href: `/${title}/`,
		title,
		section,
		date,
		external: false,
	}) as KnowledgeSearchItem;
const episode = (id: string, date: string) => ({ id, title: `播客 ${id}`, date }) as PodcastEpisode;

describe('homeRecent', () => {
	it('mixes sections newest first and names them as the nav does', () => {
		const recent = homeRecent(
			[item('highlights', 'a', '2026-10-15'), item('workbuddy-tutorials', 'b', '2026-10-10')],
			[episode('c', '2026-10-21')],
		);
		expect(recent.map((row) => [row.title, row.label, row.date])).toEqual([
			['播客 c', '播客', '10.21'],
			['a', '精选阅读', '10.15'],
			['b', '教程', '10.10'],
		]);
	});

	it('keeps only the newest piece of each section', () => {
		const recent = homeRecent(
			[
				item('vibe-coding-showcase', 'older showcase', '2026-10-21'),
				item('vibe-coding-showcase', 'newer showcase', '2026-10-25'),
				item('codex-tutorials', 'older tutorial', '2026-10-10'),
				item('newbie-tutorials', 'newer tutorial', '2026-10-12'),
			],
			[episode('older', '2026-10-21'), episode('newer', '2026-10-28')],
		);
		expect(recent.map((row) => row.title)).toEqual([
			'播客 newer',
			'newer showcase',
			'newer tutorial',
		]);
	});

	it('leaves out undated pieces and quiet sections like terms', () => {
		const recent = homeRecent(
			[item('highlights', 'undated', null), item('vibe-coding-terms', 'term', '2026-10-30')],
			[],
		);
		expect(recent).toEqual([]);
	});
});
