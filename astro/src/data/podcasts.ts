/**
 * 播客: AI podcast episodes picked by hand. Each has a Chinese headline, a two-sentence lede, one
 * line quoted from the episode, and an outline: the show's own chapters with our takeaways under
 * the chapters they come from, each at the minute it is said.
 * The audio is the show's own file from its public RSS feed, played as podcast apps play it: never
 * copied here. Only free, public episodes; the text is our own summary, never the transcript, and
 * a quote is one short line.
 * An episode can also have a brief, 一图读懂: the question it answers and the few places that answer
 * turns on, then 听完你能回答: a few questions it answers beyond the brief.
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
	/** What that page has, when it has no transcript; 原文与文字稿 otherwise. */
	sourceLabel?: string;
	/** Two sentences: what the episode finds, and who is talking. */
	lede: string;
	/** One short line from the episode, with our translation. */
	quote?: { text: string; translation: string; by: string; at: Timestamp };
	/** One sentence each, at the minute it is said. */
	points: { at: Timestamp; text: string }[];
	/** The show's chapters, translated. */
	chapters: { at: Timestamp; title: string }[];
	/** 一图读懂: the question the episode answers, its answer, and two to four reasons. */
	brief?: {
		question: string;
		answer: string;
		reasons: { at: Timestamp; head: string; text: string }[];
	};
	/** 时间花在哪: the show's chapters merged into a few topics, each from its first chapter. */
	topics?: { at: Timestamp; title: string }[];
	/** Where the guests disagree: one question, each side's short answer, and what they share. */
	stances?: {
		question: string;
		sides: { name: string; org: string; verdict: string; view: string; at: Timestamp }[];
		agree: string;
	};
	/** 听完你能回答: up to three questions the brief leaves open, each answered in a sentence or two. */
	questions?: { question: string; answer: string; at: Timestamp }[];
	/** Words in the outline a reader may not know, explained where they first appear. */
	glossary?: { term: string; meaning: string }[];
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
	{
		id: 'how-i-ai',
		name: 'How I AI',
		description: 'Claire Vo 请一线的人现场演示：他们在工作里具体怎么用 AI，一步一步做给你看。',
		language: '英文',
		cover:
			'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/df/77/34/df7734e0-d212-274e-e216-b051c675b2de/mza_8403544740418978020.jpg/600x600bb.jpg',
		feed: 'https://anchor.fm/s/1035b1568/podcast/rss',
		site: 'https://www.chatprd.ai/how-i-ai',
		links: [
			{
				label: 'Apple Podcasts',
				url: 'https://podcasts.apple.com/us/podcast/how-i-ai/id1809663079',
			},
			{ label: 'YouTube', url: 'https://www.youtube.com/@howiaipodcast' },
		],
	},
];

export const podcastEpisodes: PodcastEpisode[] = [
	{
		id: 'how-i-ai-grok-bot-designers',
		show: 'how-i-ai',
		title: '两位 Grok Bot 设计师，怎么用自己的产品干活',
		originalTitle:
			'How Grok Bot designers use AI agents to build personal sites and product prototypes | John Bai & Peng Zheng',
		date: '2026-09-14',
		people: [
			{ name: 'John Bai', org: 'SpaceXAI' },
			{ name: 'Peng Zheng', org: 'SpaceXAI' },
			{ name: 'Claire Vo', role: '主持' },
		],
		duration: 2494,
		language: '英文',
		audio:
			'https://anchor.fm/s/1035b1568/podcast/play/125493254/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-8-11%2F431716781-44100-2-7d5b279b21bb7.mp3',
		source: 'https://www.chatprd.ai/how-i-ai/grokbot-design-workflows-john-bai-peng-zheng',
		sourceLabel: '节目笔记',
		lede: 'Peng 的个人网站会自己更新：发一张照片或一个地名，机器人就画好插画、发布上去。John 在健身房录一段语音就改完了 Figma，洗澡时的点子回来就成了能点的原型。',
		quote: {
			text: 'I use AI to get me off my computer, not on my computer.',
			translation: '我用 AI，是为了让自己离开电脑，而不是更离不开电脑。',
			by: 'John Bai',
			at: '20:13',
		},
		points: [
			{
				at: '04:35',
				text: 'Peng 没写需求，也不要 CMS：发一张照片、截图或地名，机器人查到地点，画出白天和夜里两版 3D 小插画，直接发布到网站。',
			},
			{
				at: '19:35',
				text: '节目里现场试了一次：几分钟后，网站就多了一张 Bernal Heights 山顶秋千的插画。',
			},
			{
				at: '20:13',
				text: 'John 在健身房接到需求，用手机截两张图、录一段语音，Figma Bro 就通过 MCP 在 Figma 里把图标排好了。',
			},
			{
				at: '23:35',
				text: '先做好一张模板，再让机器人把同样的样式套到机器人市场的整套宣传图上，录节目时它就在后台做完了。',
			},
			{
				at: '26:00',
				text: '交互点子不用先说服产品经理和工程师：截图加一段语音发给 DevBot，回来就有两个能点的原型。',
			},
			{
				at: '28:48',
				text: '「垃圾桶开发法」：做东西时就假设扔掉它几乎不花钱。那个动画原型最后没上线，但试一次几乎不费人力。',
			},
			{
				at: '31:19',
				text: '日历、邮件、学日语、核对保险报销：两人把很多日常杂事也交给了各自的机器人。',
			},
		],
		chapters: [
			{ at: '00:00', title: '介绍 John 和 Peng' },
			{ at: '02:53', title: 'Grok Bot 的热潮' },
			{ at: '04:35', title: 'Peng 用 Grok Bot 做的会自己更新的个人网站' },
			{ at: '15:12', title: 'AI 怎样让设计更容易上手' },
			{ at: '19:35', title: '网站更新的结果' },
			{ at: '20:13', title: 'John 的 Figma Bro 机器人' },
			{ at: '23:35', title: '给机器人市场做宣传素材' },
			{ at: '26:00', title: 'DevBot：从洗澡时的点子到能用的原型' },
			{ at: '28:48', title: '垃圾桶开发法' },
			{ at: '31:19', title: 'John 和 Peng 还在用的其他机器人' },
			{ at: '39:05', title: '机器人不照做时的实用办法' },
		],
		brief: {
			question: 'AI 能替设计师做什么？',
			answer: '不只是出图，而是把整段杂活交出去。三种做法：',
			reasons: [
				{
					at: '04:35',
					head: '网站自己更新',
					text: '发照片或地名，机器人画好插画再发布，不用后台。',
				},
				{
					at: '20:13',
					head: '语音改 Figma',
					text: '在健身房录一段语音，重复的排版就交给机器人做完。',
				},
				{
					at: '26:00',
					head: '点子直接变原型',
					text: '截图加语音发给机器人，回来就有能点的原型。',
				},
			],
		},
		questions: [
			{
				question: 'Peng 的网站后台是什么？',
				answer:
					'没有后台，也没有 CMS 和设计稿：一个打卡机器人就是整条流程，查地点、生成插画、整理朋友和地点信息、发布都是它做。',
				at: '04:35',
			},
			{
				question: '什么是「垃圾桶开发法」？',
				answer:
					'主持人 Claire 的说法：做东西时就假设扔掉它几乎不花钱。所以点子可以先做出来看，不合适就扔，不用先开会、占工程师的时间。',
				at: '28:48',
			},
			{
				question: '除了设计，他们还让机器人做什么？',
				answer:
					'Peng 的「幕僚长」机器人帮他买 3D 打印耗材、更新 Notion 里的库存；John 的机器人陪他学日语，还帮他核对保险报销。',
				at: '31:19',
			},
		],
		topics: [
			{ at: '00:00', title: '开场' },
			{ at: '04:35', title: '会自己更新的网站' },
			{ at: '20:13', title: '语音改 Figma' },
			{ at: '26:00', title: '点子变原型' },
			{ at: '31:19', title: '更多机器人' },
		],
		glossary: [
			{ term: 'CMS', meaning: '内容管理系统：网站的后台，用来发文章、改页面。' },
			{
				term: 'MCP',
				meaning: '让 AI 连接外部工具的通用接口。连上 Figma 之后，AI 就能直接在设计稿里动手改。',
			},
			{ term: 'Figma', meaning: '最常用的界面设计工具，设计师在里面画设计稿、做原型。' },
		],
	},
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
		brief: {
			question: 'AI 已经把生物学的问题解决了吗？',
			answer: '没有，还差得远。卡在三处：',
			reasons: [
				{
					at: '01:00',
					head: '数据不够',
					text: '扩展定律要靠「找」，生物学还没有又多又对的数据。',
				},
				{
					at: '15:28',
					head: '结构 ≠ 动态',
					text: 'AlphaFold 复现的是数据库里那一个结构，蛋白质怎么动还没搞懂。',
				},
				{
					at: '19:09',
					head: '辐条 ≠ 整辆车',
					text: '模型只到单个蛋白质，还没走到整个细胞、整个生物系统。',
				},
			],
		},
		questions: [
			{
				question: '生物学也有「苦涩的教训」吗？',
				answer:
					'有，但前提是先找到能扩展的设定和对的数据。DeepMind 的做法是问题先行：缺数据就造数据，缺模型就做模型。',
				at: '04:54',
			},
			{
				question: 'AlphaFold 能被看懂吗？',
				answer:
					'要看谁来看。对人脑来说，它看不懂；但 Pushmeet 猜，以后更大的模型也许能读懂它内部是怎么工作的。' +
					'对用户来说，更要紧的是摸清它能做什么、不能做什么。',
				at: '25:56',
			},
			{
				question: 'AI 什么时候真正改变药物研发？',
				answer:
					'其实已经用在各个环节了。要的是十倍级的加速，而不是 10% 的改进，这得先解决生物学本身的硬问题。',
				at: '29:47',
			},
		],
		topics: [
			{ at: '00:00', title: '数据与扩展定律' },
			{ at: '09:52', title: '模型怎么设计' },
			{ at: '14:38', title: 'AlphaFold 的局限' },
			{ at: '20:43', title: '理解与可信' },
			{ at: '27:43', title: '药物研发与未来' },
		],
		stances: {
			question: '要不要看懂模型内部？',
			sides: [
				{
					name: 'Sal Candido',
					org: 'Biohub',
					verdict: '要。',
					view: '蛋白质语言模型里藏着人还没读出来的知识，看懂它本身就是收获。',
					at: '22:18',
				},
				{
					name: 'Pushmeet Kohli',
					org: 'Google DeepMind',
					verdict: '不一定。',
					view: '更要紧的是可信：置信分校准好，人才敢拿结果去做实验。',
					at: '23:53',
				},
			],
			agree: '结构预测远没做完，蛋白质动力学还要继续投入。',
		},
		glossary: [
			{
				term: '苦涩的教训',
				meaning:
					'The Bitter Lesson。Rich Sutton 的观点：长远看，能随算力一起扩展的通用方法，总会胜过人手设计的巧思。',
			},
			{
				term: '扩展定律',
				meaning: 'Scaling law。投入的算力、数据、参数越多，模型效果按可预测的规律变好。',
			},
			{
				term: '归纳偏置',
				meaning: 'Inductive bias。设计模型时预先放进去的假设，让它少学一些、更省数据。',
			},
			{
				term: '冷冻电镜',
				meaning: 'Cryo-EM。把蛋白质冻住再用电子显微镜拍照，能看到它的多种形态。',
			},
			{
				term: '蛋白质语言模型',
				meaning: '把氨基酸序列当成「文字」来训练的模型，像大语言模型读文本一样读蛋白质。',
			},
			{
				term: '置信分',
				meaning:
					'AlphaFold 给每个预测打的把握程度（pLDDT）。分数要和真实准确率对得上，才叫校准好。',
			},
		],
	},
];
