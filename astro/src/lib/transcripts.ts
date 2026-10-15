/** 播客文字稿: a turn per span of speech, timed to the show's own audio so the
 *  player can follow along. Transcripts are optional: an episode has one when
 *  `transcriptFor` finds it, and the episode page then links to it. */
import alphafold from '../data/transcripts/latent-space-alphafold.json';
import metaMuse from '../data/transcripts/how-i-ai-meta-muse.json';
import type { PodcastEpisode } from '../data/podcasts';

export type TranscriptKind = 'turn' | 'ad' | 'clip';

export interface TranscriptSpeaker {
	id: string;
	name: string;
	/** Shown after the name: 主持, or what the guest does. */
	role: string;
}

export interface TranscriptTurn {
	/** Seconds from the start of the episode's audio. */
	at: number;
	/** When the next speaker (or the ad, or a clip) takes over. */
	end: number;
	speaker: string;
	kind: TranscriptKind;
	/** What was said, in the show's own language. */
	text: string;
	/** 中文译文. The page reads Chinese first when every turn has one. */
	zh?: string;
}

export interface Transcript {
	episodeId: string;
	language: string;
	source: {
		/** asr-diarization: we transcribed the audio ourselves. show-transcript: the show
		 *  published its own transcript, and we only timed it to the audio. */
		type: 'asr-diarization' | 'show-transcript';
		/** The video the transcription was checked against, when there is one. */
		video?: string;
		note: string;
	};
	speakers: TranscriptSpeaker[];
	turns: TranscriptTurn[];
}

/** Every transcript the site has, keyed by the episode it belongs to. */
const transcripts: Record<string, Transcript> = {
	'how-i-ai-meta-muse': metaMuse as Transcript,
	'latent-space-alphafold': alphafold as Transcript,
};

export function transcriptFor(episode: Pick<PodcastEpisode, 'id'>): Transcript | null {
	return transcripts[episode.id] ?? null;
}

export function transcriptHref(episode: Pick<PodcastEpisode, 'id'>): string {
	return `/podcasts/${episode.id}/transcript/`;
}

/** Whether the transcript carries a Chinese translation for every turn. */
export function hasChinese(transcript: Transcript): boolean {
	return transcript.turns.every((turn) => Boolean(turn.zh?.trim()));
}

/** 6,800 词, for the page's meta line. */
export function wordCount(transcript: Transcript): number {
	return transcript.turns
		.filter((turn) => turn.kind === 'turn')
		.reduce((total, turn) => total + turn.text.split(/\s+/).length, 0);
}

/** Problems a transcript can have, so a bad file fails the tests rather than the page. */
export function transcriptProblems(transcript: Transcript, episode: PodcastEpisode): string[] {
	const problems: string[] = [];
	if (transcript.episodeId !== episode.id)
		problems.push(`transcript is for ${transcript.episodeId}, not ${episode.id}`);
	if (transcript.turns.length === 0) problems.push('no turns');
	const speakers = new Set(transcript.speakers.map((speaker) => speaker.id));
	let previous = -1;
	for (const turn of transcript.turns) {
		if (!speakers.has(turn.speaker))
			problems.push(`${turn.at}s names unknown speaker ${turn.speaker}`);
		if (!['turn', 'ad', 'clip'].includes(turn.kind))
			problems.push(`${turn.at}s has kind ${turn.kind}`);
		if (turn.at < previous) problems.push(`${turn.at}s is out of order`);
		if (turn.end <= turn.at) problems.push(`${turn.at}s does not run`);
		if (turn.end > episode.duration + 1)
			problems.push(`${turn.end}s is past the ${episode.duration}s episode`);
		if (!turn.text.trim() || /\s{2,}/.test(turn.text)) problems.push(`${turn.at}s has ragged text`);
		if (turn.zh !== undefined && (!turn.zh.trim() || /\s{2,}/.test(turn.zh)))
			problems.push(`${turn.at}s has a ragged translation`);
		previous = turn.at;
	}
	const spoken = transcript.turns.filter((turn) => turn.kind === 'turn');
	if (!spoken.length) problems.push('nothing is spoken');
	return problems;
}
