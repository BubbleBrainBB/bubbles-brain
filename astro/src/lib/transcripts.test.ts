import { describe, expect, it } from 'vitest';
import { podcastEpisodes } from '../data/podcasts';
import { transcriptFor, transcriptHref, transcriptProblems, wordCount } from './transcripts';

const metaMuse = podcastEpisodes.find((episode) => episode.id === 'how-i-ai-meta-muse')!;

describe('the Meta Muse transcript', () => {
	it('is well formed against its episode', () => {
		const transcript = transcriptFor(metaMuse);
		expect(transcript).not.toBeNull();
		expect(transcriptProblems(transcript!, metaMuse)).toEqual([]);
	});

	it('covers the whole episode', () => {
		const transcript = transcriptFor(metaMuse)!;
		expect(transcript.turns[0].at).toBeLessThan(1);
		expect(transcript.turns.at(-1)!.end).toBeGreaterThan(metaMuse.duration - 10);
	});

	it('names both speakers, the sponsor read and the clips played in the episode', () => {
		const transcript = transcriptFor(metaMuse)!;
		expect(new Set(transcript.turns.map((turn) => turn.speaker))).toEqual(
			new Set(['host', 'guest']),
		);
		expect(transcript.turns.filter((turn) => turn.kind === 'ad')).toHaveLength(1);
		expect(transcript.turns.filter((turn) => turn.kind === 'clip').length).toBeGreaterThan(0);
	});

	it('is reachable from the episode page', () => {
		expect(transcriptHref(metaMuse)).toBe('/podcasts/how-i-ai-meta-muse/transcript/');
	});

	it('counts the spoken words for the meta line', () => {
		expect(wordCount(transcriptFor(metaMuse)!)).toBeGreaterThan(5000);
	});
});

describe('every other episode', () => {
	it.each(
		podcastEpisodes
			.filter((episode) => episode.id !== 'how-i-ai-meta-muse')
			.map((episode) => [episode.id, episode] as const),
	)('%s has no transcript yet', (_, episode) => {
		expect(transcriptFor(episode)).toBeNull();
	});
});
