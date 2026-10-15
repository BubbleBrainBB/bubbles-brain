import { describe, expect, it } from 'vitest';
import { podcastEpisodes } from '../data/podcasts';
import { seconds } from './podcasts';
import { transcriptFor, transcriptHref, transcriptProblems, wordCount } from './transcripts';

const metaMuse = podcastEpisodes.find((episode) => episode.id === 'how-i-ai-meta-muse')!;
const alphafold = podcastEpisodes.find((episode) => episode.id === 'latent-space-alphafold')!;
const tibo = podcastEpisodes.find((episode) => episode.id === 'lennys-podcast-tibo-sottiaux')!;
const jev = podcastEpisodes.find((episode) => episode.id === 'latent-space-jev')!;
const grokBot = podcastEpisodes.find((episode) => episode.id === 'how-i-ai-grok-bot-designers')!;
const withTranscripts = new Set([metaMuse.id, alphafold.id, tibo.id, jev.id, grokBot.id]);

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

describe('the Tibo Sottiaux transcript', () => {
	it('is well formed against its episode', () => {
		const transcript = transcriptFor(tibo);
		expect(transcript).not.toBeNull();
		expect(transcriptProblems(transcript!, tibo)).toEqual([]);
	});

	it('covers the whole episode, translated throughout', () => {
		const transcript = transcriptFor(tibo)!;
		expect(transcript.source.type).toBe('show-transcript');
		expect(transcript.turns[0].at).toBe(0);
		expect(transcript.turns.at(-1)!.end).toBeGreaterThan(tibo.duration - 5);
		expect(transcript.turns.every((turn) => turn.zh)).toBe(true);
	});

	it('marks both sponsor reads', () => {
		const turns = transcriptFor(tibo)!.turns;
		const ads = turns.filter((turn) => turn.kind === 'ad');
		expect(ads.map((turn) => turn.text.slice(0, 20))).toEqual([
			'This episode is brou',
			'Literally every star',
			"This season's suppor",
			'You can also use it ',
		]);
		expect(ads.every((turn) => turn.speaker === 'host')).toBe(true);
	});

	it('puts the quoted line where the episode page says it is', () => {
		// 30:58 on the episode page: "The majority of actions on the internet will be taken by agents."
		const turn = transcriptFor(tibo)!.turns.find(
			(candidate) =>
				candidate.kind === 'turn' &&
				candidate.text.includes('the majority of actions on the internet'),
		)!;
		expect(turn.speaker).toBe('guest');
		expect(Math.abs(turn.at - (30 * 60 + 58))).toBeLessThanOrEqual(3);
	});
});

describe('the Jev transcript', () => {
	it('is well formed against its episode', () => {
		const transcript = transcriptFor(jev);
		expect(transcript).not.toBeNull();
		expect(transcriptProblems(transcript!, jev)).toEqual([]);
	});

	it('covers the whole episode, translated throughout', () => {
		const transcript = transcriptFor(jev)!;
		expect(transcript.source.type).toBe('show-transcript');
		expect(transcript.turns[0].at).toBe(0);
		expect(transcript.turns.at(-1)!.end).toBeGreaterThan(jev.duration - 5);
		expect(transcript.turns.every((turn) => turn.zh)).toBe(true);
	});

	it('puts the quoted line where the episode page says it is', () => {
		// 15:54 on the episode page: "I think intelligence will be more like a database than a coworker."
		const turn = transcriptFor(jev)!.turns.find((candidate) =>
			candidate.text.includes('intelligence will be more like a database'),
		)!;
		expect(turn.speaker).toBe('guest');
		expect(Math.abs(turn.at - (15 * 60 + 54))).toBeLessThanOrEqual(3);
	});
});

describe('the Grok Bot transcript', () => {
	it('is well formed against its episode', () => {
		const transcript = transcriptFor(grokBot);
		expect(transcript).not.toBeNull();
		expect(transcriptProblems(transcript!, grokBot)).toEqual([]);
	});

	it('is our own transcription, covering the episode and translated throughout', () => {
		const transcript = transcriptFor(grokBot)!;
		expect(transcript.source.type).toBe('asr-diarization');
		expect(transcript.source.video).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
		expect(transcript.turns[0].at).toBe(0);
		expect(transcript.turns.at(-1)!.end).toBeGreaterThan(grokBot.duration - 10);
		expect(transcript.turns.every((turn) => turn.zh)).toBe(true);
	});

	it('names the host, both guests and the sponsor read', () => {
		const turns = transcriptFor(grokBot)!.turns;
		expect(new Set(turns.map((turn) => turn.speaker))).toEqual(new Set(['host', 'john', 'peng']));
		const ad = turns.find((turn) => turn.kind === 'ad')!;
		expect(ad.speaker).toBe('host');
		expect(ad.text).toContain('WorkOS');
	});

	it("gives the episode page's quote to the host who says it", () => {
		// "I use AI to get me off my computer, not on my computer." is Claire summing up John's
		// workflow at 25:33, not John; the cold open plays the same line.
		const turns = transcriptFor(grokBot)!.turns.filter((turn) =>
			turn.text.includes('off my computer'),
		);
		expect(turns.map((turn) => turn.speaker)).toEqual(['host', 'host']);
		expect(turns[1].at).toBeLessThanOrEqual(25 * 60 + 33);
		expect(turns[1].end).toBeGreaterThan(25 * 60 + 33);
		// The page plays it from the turn that says it, under the name of the one who says it.
		const transcript = transcriptFor(grokBot)!;
		const at = seconds(grokBot.quote!.at);
		const said = transcript.turns.find((turn) => turn.at <= at && at < turn.end)!;
		expect(said.text).toContain(grokBot.quote!.text);
		expect(transcript.speakers.find((speaker) => speaker.id === said.speaker)!.name).toBe(
			grokBot.quote!.by,
		);
	});
});

describe('every episode', () => {
	it.each(podcastEpisodes.map((episode) => [episode.id, episode] as const))(
		'%s has its transcript only if it is one of the transcribed episodes',
		(_, episode) => {
			expect(transcriptFor(episode) !== null).toBe(withTranscripts.has(episode.id));
		},
	);
});
