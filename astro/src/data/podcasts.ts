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
		/** 两位嘉宾在哪里不一样 unless the disagreement is someone else's, say the host's. */
		heading?: string;
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
	{
		id: 'lennys-podcast',
		name: "Lenny's Podcast",
		description:
			'Lenny Rachitsky 采访顶尖的产品人和创业者：怎么做产品、怎么增长、怎么带团队，最近很多期在聊 AI。',
		language: '英文',
		cover:
			'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/c7/80/a3/c780a365-a1ed-527f-365f-1bd3e51ac6d1/mza_5908526734339724450.jpg/600x600bb.jpg',
		feed: 'https://api.substack.com/feed/podcast/10845.rss',
		site: 'https://www.lennysnewsletter.com/podcast',
		links: [
			{ label: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/id1627920305' },
			{ label: 'YouTube', url: 'https://www.youtube.com/@LennysPodcast' },
		],
	},
];

export const podcastEpisodes: PodcastEpisode[] = [
	{
		id: 'lennys-podcast-tibo-sottiaux',
		show: 'lennys-podcast',
		title: 'OpenAI 的 ChatGPT 负责人：我们（又一次）进入了 AI 的新时代',
		originalTitle:
			'OpenAI’s Head of ChatGPT: We’re entering a new era of AI (again) | Tibo Sottiaux',
		date: '2026-10-04',
		people: [
			{ name: 'Tibo Sottiaux', org: 'OpenAI' },
			{ name: 'Lenny Rachitsky', role: '主持' },
		],
		duration: 2243,
		language: '英文',
		audio:
			'https://pscrb.fm/rss/p/api.substack.com/feed/podcast/217274136/13e3f49711c936b294b6ef27d4160818.mp3',
		source: 'https://www.lennysnewsletter.com/p/openais-head-of-chatgpt-were-entering',
		sourceLabel: '节目笔记',
		lede: '负责 ChatGPT 和 Codex 的 Tibo Sottiaux 在 DevDay 当天说，互联网上大多数操作将由智能体完成，手动搭循环、调工作流只是过渡阶段。以后你只需要一个会自己学习、随叫随到的个人智能体，比如 OpenAI 刚发布的 Dots。',
		quote: {
			text: 'The majority of actions on the internet will be taken by agents.',
			translation: '互联网上的大多数操作，将由智能体来完成。',
			by: 'Tibo Sottiaux',
			at: '30:58',
		},
		points: [
			{
				at: '01:57',
				text: '他几乎不再手写代码：分析趋势、理解业务、看上线效果，需要的代码都交给 Codex 来写。',
			},
			{
				at: '02:52',
				text: '他开的智能体会越开越多，等模型有了下一次突破，一个更强的智能体就能全包，团队又缩回去，就这样一胀一缩。',
			},
			{
				at: '03:19',
				text: '手动搭「循环」、调工作流只是一时的热潮；以后要的是一个会从反馈里学习的系统，比如 Dots：全天候工作，懂你的目标和偏好。',
			},
			{
				at: '04:13',
				text: '关键是摆脱设备：一个一直在线的智能，任何屏幕都能叫到它，开会时出现、记笔记，之后在邮件或短信里接着聊。',
			},
			{
				at: '07:39',
				text: 'ChatGPT 里的 Chat 和 Work 会合并，Dots 的能力最终也会放进 ChatGPT；Dots 没有模型选择器，唯一要设置的是用哪些渠道和它说话。',
			},
			{
				at: '11:51',
				text: '他眼里被低估的是开放生态：已有 16 家合作方支持用 ChatGPT 登录，用的人多的插件还能分到收入。',
			},
			{
				at: '15:14',
				text: 'Dots 背后是两年多的研究：长时间持续的任务、保持连贯的记忆，再加上 Codex 的运行框架。',
			},
			{
				at: '20:31',
				text: '他的 Dot 发现 ChatGPT 的生产环境挂了，又知道他五分钟后要在 DevDay 现场演示，就提前提醒了他。',
			},
			{
				at: '21:47',
				text: 'Dots 的运行框架不在你的电脑上：它有自己的机器，还能连上你的笔记本等很多台设备，像章鱼一样一起操控。',
			},
			{
				at: '23:44',
				text: '越来越不重要的技能是打字快；越来越重要的是品味和站在用户角度想问题。OpenAI 里有 120 多位前 YC 创业者。',
			},
			{
				at: '30:58',
				text: '很多人还没算进去的三件事：多数网上操作将由智能体完成，模型会飞快地变便宜、变快，各种模态会无缝融合。',
			},
			{
				at: '34:21',
				text: '他说控制前沿的节奏，就是在安全、对齐和防护上超前投入：越来越多算力用来盯着干活的智能体。',
			},
			{
				at: '36:23',
				text: '他最想去掉的是模型选择器：选模型、选推理强度太复杂，「像要读个博士」。',
			},
		],
		chapters: [
			{ at: '00:00', title: '介绍 Tibo Sottiaux' },
			{ at: '01:12', title: 'Tibo 每天怎么用 AI' },
			{ at: '03:10', title: '一直在线的智能体，愿景是什么' },
			{ at: '06:15', title: 'AI 还会怎样改变工作' },
			{ at: '07:32', title: '把 Codex、ChatGPT 和 Dots 合到一起' },
			{ at: '08:20', title: '背后的科幻灵感' },
			{ at: '09:02', title: '和社区一起做 AI' },
			{ at: '10:13', title: 'Dots 是怎么组织的' },
			{ at: '11:34', title: 'OpenAI 的开放生态，和插件分成' },
			{ at: '13:39', title: '插件怎么被发现和推荐' },
			{ at: '14:39', title: 'Dots 背后的研究' },
			{ at: '16:20', title: '人在哪些地方依然有价值' },
			{ at: '17:25', title: '智能体疲劳、孤独和频繁切换' },
			{ at: '18:55', title: '用 AI 做更多事的压力' },
			{ at: '20:09', title: '一个在现场演示前发现生产事故的智能体' },
			{ at: '21:42', title: '智能体的防护，和连接多台设备' },
			{ at: '23:25', title: 'AI 时代越来越值钱的技能' },
			{ at: '25:56', title: '给职场新人的建议' },
			{ at: '27:18', title: 'OpenAI 内部怎么做产品、怎么上线' },
			{ at: '28:59', title: '自主、信任，和从错误里学习' },
			{ at: '30:45', title: '为智能体主导互联网的未来做准备' },
			{ at: '32:41', title: 'Tibo 改变了哪些看法' },
			{ at: '33:55', title: 'OpenAI 怎么看 AI 安全和对齐' },
			{ at: '36:15', title: '告别模型选择器，让 AI 更简单' },
		],
		brief: {
			question: '智能体会让我们和 AI 打交道的方式变成什么样？',
			answer: '从你去操作软件，变成一个随叫随到的智能体替你干活。三个变化：',
			reasons: [
				{
					at: '03:19',
					head: '不用再搭工作流',
					text: '手动调循环只是过渡，系统会从你的反馈里自己学。',
				},
				{
					at: '04:13',
					head: '不再被设备绑住',
					text: '任何屏幕都能叫到它，开会、邮件、短信里接着聊。',
				},
				{
					at: '30:58',
					head: '智能体成了主要用户',
					text: '网上多数操作会由智能体完成，产品要为它们来做。',
				},
			],
		},
		questions: [
			{
				question: 'Dots 是什么？',
				answer:
					'OpenAI 新推出的个人智能体：全天候工作，懂你的目标和偏好，会从反馈里学习，没有模型选择器。现在每人一个主 Dot，之后能建好几个，各管一摊，比如专门盯 Twitter。',
				at: '10:55',
			},
			{
				question: 'AI 时代，什么技能在升值？',
				answer:
					'打字快不重要了；重要的是品味、站在用户角度、知道「好」是什么样。角色也在变模糊：原来只做设计或只做工程、总觉得哪里不够的人，现在正是发挥的时候。',
				at: '23:44',
			},
			{
				question: 'OpenAI 怎么让智能体更安全？',
				answer:
					'在安全、对齐和防护上超前投入：越来越多算力用来监控干活的智能体，发现风险太高的操作或疑似提示注入就介入；API 上的大部分投入都花在安全上。',
				at: '34:21',
			},
		],
		topics: [
			{ at: '00:00', title: '一直在线的智能体' },
			{ at: '07:32', title: 'Dots 和开放生态' },
			{ at: '16:20', title: '人和智能体' },
			{ at: '23:25', title: '技能和团队' },
			{ at: '30:45', title: '未来与安全' },
		],
		glossary: [
			{ term: 'Codex', meaning: 'OpenAI 的 AI 编程智能体，能自己读代码、写代码、提交改动。' },
			{
				term: '运行框架',
				meaning: '包在模型外面的那层程序（harness），让模型能调用工具、读写文件、长时间持续干活。',
			},
			{ term: 'YC', meaning: 'Y Combinator，硅谷最有名的创业孵化器，很多知名公司都从这里起步。' },
			{
				term: '模型选择器',
				meaning: '用 ChatGPT 时让你自己挑用哪个模型、推理强度开多大的那个菜单。',
			},
		],
	},
	{
		id: 'latent-space-jev',
		show: 'latent-space',
		title: 'InstructGPT 的作者，为什么离开 OpenAI 去做一个给程序用的模型',
		originalTitle:
			'Jev: System One models for Prod, not God — with Diogo Almeida, CEO, TypeSafe AI',
		date: '2026-09-22',
		people: [
			{ name: 'Diogo Almeida', org: 'TypeSafe AI' },
			{ name: 'Swyx', role: '主持' },
		],
		duration: 8453,
		language: '英文',
		audio: 'https://api.substack.com/feed/podcast/216783460/c2acac966e67afb7e71574f68a44a662.mp3',
		source: 'https://www.latent.space/p/jev',
		lede: '合写 InstructGPT 论文的 Diogo Almeida 认为，大模型被训练成了讨好人的聊天机器人，所以聪明却不可靠。他的新模型 Jev 不跟人聊天，只给程序回答：选哪一项、是或否的概率、打几分。',
		quote: {
			text: 'I think intelligence will be more like a database than a coworker.',
			translation: '我觉得，智能会更像一个数据库，而不是一个同事。',
			by: 'Diogo Almeida',
			at: '15:54',
		},
		points: [
			{
				at: '03:52',
				text: 'Jev 是给程序用的模型：不回一段话，而是返回程序能直接用的答案，比如选哪一项、是或否的概率、打几分。',
			},
			{
				at: '07:54',
				text: '为讨好人而训练的聊天模型会丢掉少见的答案、过分自信，给出的概率就不准了，所以不适合拿来做判断。',
			},
			{
				at: '11:41',
				text: '对一个 API 来说，拒绝回答是「类型错误」：程序依赖的模型突然拒答，软件就会莫名其妙地坏掉。',
			},
			{
				at: '20:43',
				text: '比起堆算力，数据和「练什么任务」更重要：选对训练目标，是最难也最关键的事。',
			},
			{ at: '29:40', text: '这期的核心问题：AI 能解数学难题，为什么连最基本的工作都还没自动化？' },
			{
				at: '42:19',
				text: '他要的不是同样的输入给同样的输出，而是相近的输入给相近的输出：稳，比完全确定更重要。',
			},
			{
				at: '1:01:30',
				text: '怎么用 Jev：把一个大问题拆成很多个小问题，每个小判断都能单独检验、单独放心。',
			},
			{
				at: '1:18:51',
				text: '他不认为 AI 会造成大规模失业：AI 会隐进软件后台，订阅软件反而会被加速。',
			},
			{
				at: '1:46:04',
				text: '业界押注的 RLVR，他觉得不是对的方向：作为新的训练目标，他只打 0.2 分，「这还算客气」。',
			},
			{
				at: '1:57:21',
				text: '在 OpenAI 时他想明白了：将来调用 AI 的主要是程序，不是人，可力气都花在了讨好人上。',
			},
			{
				at: '1:59:58',
				text: '他以为一周就能做完，结果一个人在 OpenAI 试了好几年也没成；问了一圈，觉得创业更快，就出来了。',
			},
			{
				at: '2:10:48',
				text: 'KV cache 把编程助手锁在同一个模型里、只能一直往后接，这就是子智能体和上下文压缩难做的原因。',
			},
		],
		chapters: [
			{ at: '00:00', title: 'Jev 发布周，与 AI 带来的经济革命' },
			{ at: '02:50', title: 'Jev 是什么：System One 模型与可编程的 AI' },
			{ at: '05:54', title: 'RLHF、模式坍缩、校准，以及 Yann LeCun' },
			{ at: '10:29', title: '可编程的 AI、拒答与安全对齐' },
			{ at: '17:21', title: 'TypeSafe 为什么不做公开榜单' },
			{ at: '20:43', title: '最苦涩的教训：数据、算力和对的任务' },
			{ at: '24:59', title: 'RLCD 与 RLHF、RLVR' },
			{ at: '28:42', title: 'AI 这么强，为什么还没把经济自动化' },
			{ at: '39:55', title: '可靠、稳健与确定性' },
			{ at: '48:11', title: '模型版本、长期支持、速度和每美元智能' },
			{ at: '54:04', title: 'Jev 的 API 和编程原语' },
			{ at: '58:28', title: '怎么用 Jev 搭东西：结构、拆解和小判断' },
			{ at: '1:18:28', title: '反向的「SaaS 末日」：AI 隐进软件里' },
			{ at: '1:33:21', title: '操作电脑、暗数据和 Jev 的主要用途' },
			{ at: '1:38:48', title: 'Jev 会怎样改变编程助手' },
			{ at: '1:41:00', title: 'AI 安全、前沿节奏与 RLVR 的局限' },
			{ at: '1:48:03', title: '给他 10 亿美元，他也不做预训练' },
			{ at: '1:55:19', title: 'TypeSafe 背后的 OpenAI 往事' },
			{ at: '2:01:41', title: '为什么他觉得多数新实验室都做错了' },
			{ at: '2:08:00', title: '摆脱 KV cache 的编程助手，与多智能体的未来' },
		],
		brief: {
			question: 'AI 这么聪明，为什么还没把日常工作自动化？',
			answer: '因为它被练成了讨好人的聊天机器人。卡在三处：',
			reasons: [
				{
					at: '1:20:21',
					head: '目标选错了',
					text: '一个练「让人满意」，一个练「刷高分」，都不是「让程序可靠地用」。',
				},
				{
					at: '1:57:21',
					head: '调用的是程序',
					text: '将来调用 AI 的大多是代码，力气却都花在了讨好人上。',
				},
				{
					at: '07:54',
					head: '聊天让概率失准',
					text: '过分自信、概率不准，就没法放心拿来做判断。',
				},
			],
		},
		questions: [
			{
				question: 'Jev 返回的是什么？',
				answer:
					'不是一段话，而是三种程序能直接用的答案：选一项（像 switch 语句）、是或否的概率（像 if 语句）、打分（用来排序或设门槛）。',
				at: '54:10',
			},
			{
				question: '他为什么反对公开榜单？',
				answer:
					'公开榜单太容易刷：实验室会专门收集类似的题来练，等于换个方式刷榜。他宁愿先凭感觉信任，再放进自己的流程里实测。',
				at: '19:20',
			},
			{
				question: '他觉得 AI 会抢走工作吗？',
				answer:
					'不会造成大规模失业。2026 年的软件和 2019 年几乎一样，只是旁边多了个聊天框；他认为 AI 会隐进软件后台，让软件变得更好用。',
				at: '1:18:28',
			},
		],
		topics: [
			{ at: '00:00', title: '什么是 Jev' },
			{ at: '28:42', title: '可靠和划算' },
			{ at: '54:04', title: '怎么用 Jev' },
			{ at: '1:18:28', title: 'AI 的去向' },
			{ at: '1:55:19', title: 'OpenAI 往事' },
		],
		stances: {
			heading: '主持人和嘉宾在哪里不一样',
			question: '模型该不该做到同样的输入、同样的输出？',
			sides: [
				{
					name: 'Swyx',
					org: '主持',
					verdict: '迟早得做。',
					view: '开发者想要固定的随机种子、同样的输入给同样的输出，你会被大家逼着提供。',
					at: '45:46',
				},
				{
					name: 'Diogo Almeida',
					org: 'TypeSafe AI',
					verdict: '不该当目标。',
					view: '要的是相近的输入给相近的输出；硬做到完全一样，会换来更差的性价比。',
					at: '41:37',
				},
			],
			agree: '已经上线的模型不能偷偷改动：Swyx 要他公开表态，他当场承诺了。',
		},
		glossary: [
			{
				term: 'System One',
				meaning: '借用心理学的「系统一」：快速、凭直觉的判断；相对的是一步步慢慢推理的「系统二」。',
			},
			{
				term: 'RLHF',
				meaning:
					'基于人类反馈的强化学习：用人的打分来训练模型。ChatGPT 这类聊天模型就是这样练出来的，目标是让人满意。',
			},
			{
				term: '模式坍缩',
				meaning: '模型只会给最常见、最讨喜的回答，少见但可能正确的答案被丢掉了。',
			},
			{ term: '校准', meaning: '模型说有八成把握的事，真的大约八成是对的，就叫校准得好。' },
			{
				term: 'RLVR',
				meaning:
					'用能自动判对错的题目（比如数学题、代码测试）来训练模型推理。Diogo 说它的目标其实是刷分。',
			},
			{ term: 'SaaS', meaning: '按月订阅的在线软件，比如 Notion、Salesforce。' },
			{
				term: 'KV cache',
				meaning:
					'模型读过的上下文会存成缓存，接着往后写就很快；代价是只能用同一个模型、只能一直往后接。',
			},
		],
	},
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
