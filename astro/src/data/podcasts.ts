/**
 * 播客: AI podcast episodes picked by hand. Each has a Chinese headline, a two-sentence lede, one
 * line quoted from the episode, and an outline: the show's own chapters with our takeaways under
 * the chapters they come from, each at the minute it is said.
 * The audio is the show's own file from its public RSS feed, played as podcast apps play it: never
 * copied here. Only free, public episodes; the text is our own summary, never the transcript, and
 * a quote is one short line.
 */

export interface PodcastShow {
	id: string;
	name: string;
	/** One line on what the show is about. */
	description: string;
	language: '英文' | '中文';
	/** Square artwork from the show's feed. */
	cover: string;
	/** The show's podcast RSS: where episode facts and audio come from. */
	feed: string;
	/** The show's own site, then where to subscribe. */
	site: string;
	links: { label: string; url: string }[];
}

export interface PodcastPerson {
	name: string;
	org?: string;
	/** 主持 for the host; guests have none. */
	role?: string;
}

/** A moment in the episode: mm:ss or h:mm:ss, as the show's own timestamps write it. */
export type Timestamp = string;

export interface PodcastEpisode {
	id: string;
	show: PodcastShow['id'];
	/** Our Chinese headline. */
	title: string;
	/** The show's own title. */
	originalTitle: string;
	/** Publication day in Beijing time (YYYY-MM-DD). */
	date: string;
	people: PodcastPerson[];
	/** Length in whole seconds, from the feed. */
	duration: number;
	language: '英文' | '中文';
	/** The show's own audio file (the feed's enclosure). */
	audio: string;
	/** The episode page on the show's site, with show notes and transcript. */
	source: string;
	/** Two sentences: what the episode finds, and who is talking. */
	lede: string;
	/** One short line from the episode, with our translation. */
	quote?: { text: string; translation: string; by: string; at: Timestamp };
	/** One sentence each, at the minute it is said. */
	points: { at: Timestamp; text: string }[];
	/** The show's chapters, translated. */
	chapters: { at: Timestamp; title: string }[];
	/** Site terms the episode touches (ids under /vibe-coding/terms/). */
	terms: string[];
}

export const podcastShows: PodcastShow[] = [
	{
		id: 'latent-space',
		name: 'Latent Space',
		description: '写给 AI 工程师的播客：顶尖实验室怎么做 agent、模型、基础设施和 AI for Science。',
		language: '英文',
		cover: 'https://substackcdn.com/feed/podcast/1084089/ca7468da5614a246d2906ee8926f6de7.jpg',
		feed: 'https://api.substack.com/feed/podcast/1084089.rss',
		site: 'https://www.latent.space',
		links: [
			{
				label: 'Apple Podcasts',
				url: 'https://podcasts.apple.com/us/podcast/latent-space-the-ai-engineer-podcast/id1674008350',
			},
			{ label: 'Spotify', url: 'https://open.spotify.com/show/2p7zZVwVF6Yk0Zsb4QmT7t' },
			{ label: 'YouTube', url: 'https://www.youtube.com/@LatentSpaceTV' },
		],
	},
];

export const podcastEpisodes: PodcastEpisode[] = [
	{
		id: 'latent-space-alphafold',
		show: 'latent-space',
		title: 'AlphaFold 为什么没有真正解决蛋白质折叠',
		originalTitle: "Why AlphaFold Didn't Solve Protein Folding",
		date: '2026-10-10',
		people: [
			{ name: 'Pushmeet Kohli', org: 'Google DeepMind' },
			{ name: 'Sal Candido', org: 'Biohub' },
			{ name: 'Brandon Anderson', role: '主持' },
		],
		duration: 1916,
		language: '英文',
		audio: 'https://api.substack.com/feed/podcast/219666029/8fefb52482ab31b6be94745a76cff81f.mp3',
		source: 'https://www.latent.space/p/biohub-deepmind',
		lede: 'AlphaFold 做到的，是复现数据库里那一个已知结构；蛋白质怎么动、整个细胞怎么运作，还远没搞懂。DeepMind 和 Biohub 的两位科学家讲清了 AI 做生物学真正卡在哪。',
		quote: {
			text: "Proteins aren't blocks, and they don't act as blocks.",
			translation: '蛋白质不是积木，也不像积木那样运作。',
			by: 'Pushmeet Kohli',
			at: '15:28',
		},
		points: [
			{
				at: '01:00',
				text: '扩展定律要靠「找」：先找到多投算力、多喂数据就稳定变好的设定，之后才是工程问题。',
			},
			{ at: '04:54', text: '问题先行，别困在「我是做模型的」「我是造数据的」的身份里。' },
			{
				at: '10:48',
				text: 'AlphaFold 2 把生物物理直觉预先写进模型，所以更省数据；好数据比多数据重要。',
			},
			{ at: '15:28', text: 'AlphaFold 复现的是数据库里那一个已知结构，蛋白质真实怎么动还没搞懂。' },
			{
				at: '19:09',
				text: '现在的模型像在给自行车的一根辐条建模，下一步是整辆车：整个生物系统。',
			},
			{ at: '22:18', text: '蛋白质语言模型里藏着功能、运动等还没被读出来的信息。' },
			{
				at: '23:53',
				text: '比可解释更要紧的是可信：模型给出的置信分必须校准，否则会让人白干一年。',
			},
			{
				at: '28:08',
				text: 'AI 早已用在药物研发各环节；十倍级的加速，要先解决生物学本身的硬问题。',
			},
		],
		chapters: [
			{ at: '00:00', title: '引子：生物数据也有「苦涩的教训」吗' },
			{ at: '01:00', title: '为生物学找扩展定律和对的数据' },
			{ at: '04:54', title: 'DeepMind 的苦涩教训：解决问题还是扩展模型' },
			{ at: '06:50', title: 'AlphaFold、数据的局限和虚拟细胞' },
			{ at: '09:52', title: '手工设计的架构 vs. 堆算力' },
			{ at: '11:53', title: '好数据、归纳偏置与模型设计' },
			{ at: '13:39', title: 'Transformer 之后的架构' },
			{ at: '14:38', title: '为什么 AlphaFold 还没解决蛋白质折叠' },
			{ at: '17:39', title: '蛋白质动力学、设计与冷冻电镜' },
			{ at: '19:09', title: '从单个蛋白质到整个生物系统' },
			{ at: '20:43', title: '费曼原则：不理解也能创造' },
			{ at: '22:18', title: '蛋白质语言模型里的隐藏知识' },
			{ at: '23:48', title: 'AlphaFold 的可信度与可解释性' },
			{ at: '25:56', title: 'AI 会比人更懂另一个 AI 吗' },
			{ at: '27:43', title: 'AI 什么时候真正改变药物研发' },
			{ at: '29:47', title: '治愈所有疾病需要十倍级的突破' },
		],
		terms: ['llm', 'parameters', 'confidence-interval', 'open-source'],
	},
];
