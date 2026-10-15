import { describe, expect, it } from 'vitest';
import { podcastEpisodes } from '../data/podcasts';
import { transcriptFor, transcriptHref, transcriptProblems, wordCount } from './transcripts';

const metaMuse = podcastEpisodes.find((episode) => episode.id === 'how-i-ai-meta-muse')!;
const alphafold = podcastEpisodes.find((episode) => episode.id === 'latent-space-alphafold')!;
const withTranscripts = new Set([metaMuse.id, alphafold.id]);

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

describe('the AlphaFold transcript', () => {
	it('is well formed against its episode', () => {
		const transcript = transcriptFor(alphafold);
		expect(transcript).not.toBeNull();
		expect(transcriptProblems(transcript!, alphafold)).toEqual([]);
	});

	it("is the show's own transcript, timed to the audio and translated throughout", () => {
		const transcript = transcriptFor(alphafold)!;
		expect(transcript.source.type).toBe('show-transcript');
		expect(transcript.turns.every((turn) => turn.zh)).toBe(true);
		expect(transcript.turns.at(-1)!.end).toBeGreaterThan(alphafold.duration - 15);
	});

	it('names the host and both guests', () => {
		const transcript = transcriptFor(alphafold)!;
		expect(new Set(transcript.turns.map((turn) => turn.speaker))).toEqual(
			new Set(['host', 'pushmeet', 'sal']),
		);
	});

	it('puts the quoted line where the episode page says it is', () => {
		// 15:28 on the episode page: "Proteins aren't blocks, and they don't act as blocks."
		const turn = transcriptFor(alphafold)!.turns.find((candidate) =>
			candidate.text.includes("Proteins aren't blocks"),
		)!;
		expect(turn.speaker).toBe('pushmeet');
		expect(turn.at).toBeGreaterThanOrEqual(925);
		expect(turn.at).toBeLessThanOrEqual(935);
	});
});

describe('every other episode', () => {
	it.each(
		podcastEpisodes
			.filter((episode) => !withTranscripts.has(episode.id))
			.map((episode) => [episode.id, episode] as const),
	)('%s has no transcript yet', (_, episode) => {
		expect(transcriptFor(episode)).toBeNull();
	});
});
