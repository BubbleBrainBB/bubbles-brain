/**
 * 播客: AI podcast episodes picked by hand, each with a Chinese headline, a reason to listen, the
 * takeaways at the minute they are said, the show's own chapters, and links into the site's terms.
 * The audio is the show's own file from its public RSS feed, played as podcast apps play it: never
 * copied here. Only free, public episodes; text is our own summary, never the transcript.
 */

export interface PodcastShow {
	id: string;
	name: string;
	/** Square artwork from the show's feed. */
	cover: string;
	/** The show's podcast RSS: where episode facts and audio come from. */
	feed: string;
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
	/** Our Chinese headline; the show's own title follows it. */
	title: string;
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
	/** One line for the list: who talks about what. */
	pitch: string;
	/** Why it is worth the time, and for whom. */
	why: string;
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
		cover: 'https://substackcdn.com/feed/podcast/1084089/ca7468da5614a246d2906ee8926f6de7.jpg',
		feed: 'https://api.substack.com/feed/podcast/1084089.rss',
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
		pitch:
			'DeepMind 的 Pushmeet Kohli 和 Biohub 的 Sal Candido 聊：AlphaFold 之后，AI 做生物学真正卡在哪里。',
		why: 'AlphaFold 拿了诺奖，新闻里常说蛋白质结构预测已经被解决。这期是 Biohub 一场活动上的圆桌，Google DeepMind 负责科学研究的 Pushmeet Kohli 自己出来降温：AlphaFold 做到的，是复现别人测出来、存进蛋白质数据库的那一个结构，蛋白质真实怎么动还远没搞懂。另一位嘉宾 Sal Candido 补上做模型的人的视角：扩展定律要靠找，数据要选对。半小时出头，没有生物背景也能听懂，适合想知道 AI 在科学里真实进展、而不只是看标题的人。',
		points: [
			{
				at: '01:00',
				text: '扩展定律不是哪里都有，大部分功夫花在「找到」它：找到一个多投算力、多喂数据就稳定变好的设定，之后才变成可以一直往里加资源的工程问题。',
			},
			{
				at: '04:54',
				text: 'Pushmeet 对「苦涩的教训」的理解：别抱着「我是做模型的」或「我是造数据的」的身份做事，问题先行。AlphaFold 只能用现成的数据，所以押在建模上；做细胞基因组时发现，数据还撑不起「虚拟细胞」。',
			},
			{
				at: '10:48',
				text: 'AlphaFold 2 的手工设计不是偶然：把生物物理里的直觉（氨基酸残基会互相影响）预先写进模型，它就不用从头学，更省数据。而且关键是好数据，不是更多的数据。',
			},
			{
				at: '15:28',
				text: '「蛋白质是生命的积木」这句话，Pushmeet 说他自己都不信。蛋白质会无序，形状随环境变化；AlphaFold 做的只是复现数据库里那一个已知结构，恰好很有用。',
			},
			{
				at: '19:09',
				text: 'Sal 的比喻：现在的模型像是想弄懂自行车，却在给一根辐条建模。下一步要从辐条走到轮子、再到整辆车，也就是从单个蛋白质走到整个生物系统。',
			},
			{
				at: '22:18',
				text: '蛋白质语言模型里装的东西比我们知道的多：除了结构，还能从里面挖出功能和运动方面的信息。',
			},
			{
				at: '23:53',
				text: '比起完全的可解释性，更要紧的是可信：AlphaFold 给出的置信分必须校准，否则信心满满地给错答案，科学家可能白干一年。至于「解释给谁听」，将来也许是更大的模型来解释 AlphaFold。',
			},
			{
				at: '28:08',
				text: '「AI 什么时候进临床」问错了：AI 已经用在药物研发的每个环节。真正十倍、百倍的加速，要先解决生物学本身的硬问题。',
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
