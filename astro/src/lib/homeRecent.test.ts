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

	it('lets no section take more than its share', () => {
		const showcase = ['1', '2', '3', '4', '5'].map((n) =>
			item('vibe-coding-showcase', n, `2026-10-2${n}`),
		);
		const recent = homeRecent([...showcase, item('highlights', 'old', '2026-09-01')], [], 8, 3);
		expect(recent.filter((row) => row.label === 'Showcase')).toHaveLength(3);
		expect(recent.at(-1)?.title).toBe('old');
	});

	it('leaves out undated pieces and quiet sections like terms', () => {
		const recent = homeRecent(
			[item('highlights', 'undated', null), item('vibe-coding-terms', 'term', '2026-10-30')],
			[],
		);
		expect(recent).toEqual([]);
	});
});
