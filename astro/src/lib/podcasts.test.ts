import { describe, expect, it } from 'vitest';
import { podcastEpisodes, podcastShows } from '../data/podcasts';
import {
	clock,
	dateLabel,
	durationLabel,
	episodeHref,
	episodeProblems,
	episodesByMonth,
	guestNames,
	peopleLine,
	playerEpisode,
	seconds,
	termLinks,
} from './podcasts';

const alphafold = podcastEpisodes.find((episode) => episode.id === 'latent-space-alphafold')!;

describe('every episode', () => {
	it.each(podcastEpisodes.map((episode) => [episode.id, episode] as const))(
		'%s is well formed, with a known show and real site terms',
		(_, episode) => {
			expect(episodeProblems(episode)).toEqual([]);
			expect(podcastShows.some((show) => show.id === episode.show)).toBe(true);
			expect(() => termLinks(episode)).not.toThrow();
			expect(episode.points.length).toBeGreaterThan(0);
		},
	);

	it('has a unique id', () => {
		const ids = podcastEpisodes.map((episode) => episode.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
});

describe('times', () => {
	it('reads the show notes’ timestamps', () => {
		expect(seconds('14:38')).toBe(878);
		expect(seconds('1:02:03')).toBe(3723);
		expect(seconds('14')).toBeNaN();
	});

	it('writes the player clock and the length', () => {
		expect(clock(878)).toBe('14:38');
		expect(clock(3723)).toBe('1:02:03');
		expect(durationLabel(1916)).toBe('32 分钟');
		expect(durationLabel(5040)).toBe('1 小时 24 分钟');
		expect(durationLabel(3600)).toBe('1 小时');
	});

	it('flags timestamps past the end and chapters out of order', () => {
		const broken = {
			...alphafold,
			points: [{ at: '40:00', text: 'x' }],
			chapters: [
				{ at: '05:00', title: 'b' },
				{ at: '01:00', title: 'a' },
			],
		};
		expect(episodeProblems(broken)).toEqual(['40:00 is past the end', 'chapters out of order']);
	});
});

describe('the AlphaFold episode', () => {
	it('names its guests and host', () => {
		expect(peopleLine(alphafold)).toBe(
			'Pushmeet Kohli（Google DeepMind）、Sal Candido（Biohub） · 主持 Brandon Anderson',
		);
		expect(guestNames(alphafold)).toBe('Pushmeet Kohli、Sal Candido');
		expect(dateLabel(alphafold.date)).toBe('2026年10月10日');
	});

	it('hands the player its audio and chapters in seconds', () => {
		const player = playerEpisode(alphafold);
		expect(player).toMatchObject({
			show: 'Latent Space',
			href: episodeHref(alphafold),
			duration: 1916,
		});
		expect(player.chapters[7]).toEqual({ at: 878, title: '为什么 AlphaFold 还没解决蛋白质折叠' });
	});

	it('links terms the site has', () => {
		expect(termLinks(alphafold).map((link) => link.href)).toContain('/vibe-coding/terms/llm/');
	});
});

describe('the list', () => {
	it('groups by month, newest first', () => {
		const months = episodesByMonth([
			{ ...alphafold, id: 'a', date: '2026-09-30' },
			{ ...alphafold, id: 'b', date: '2026-10-10' },
			{ ...alphafold, id: 'c', date: '2026-10-02' },
		]);
		expect(
			months.map((month) => [month.label, month.episodes.map((episode) => episode.id)]),
		).toEqual([
			['2026年10月', ['b', 'c']],
			['2026年9月', ['a']],
		]);
	});
});
