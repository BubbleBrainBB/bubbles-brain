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
	{
		id: 'forward-future',
		name: 'Forward Future',
		description: 'Matthew Berman 请一线的人坐下来聊：模型、硬件、工作，以及 AI 会把生活带去哪。',
		language: '英文',
		cover: 'https://storage.buzzsprout.com/0crlujqxckryyasw7qxe2qpl6t64?.jpg',
		feed: 'https://rss.buzzsprout.com/2640889.rss',
		site: 'https://forwardfuture.com',
		links: [
			{ label: 'Spotify', url: 'https://open.spotify.com/show/6dBxDwxtHl1hpqHhfoXmy8' },
			{ label: 'YouTube', url: 'https://www.youtube.com/@matthew_berman' },
		],
	},
];

export const podcastEpisodes: PodcastEpisode[] = [
	{
		id: 'forward-future-sam-altman',
		show: 'forward-future',
		title: 'Sam Altman：我们要一场文艺复兴，不是工业革命',
		originalTitle: "Sam Altman: RSI, AI Consciousness, OpenAI's New Hardware, Compute, and more!",
		date: '2026-10-21',
		people: [
			{ name: 'Sam Altman', org: 'OpenAI' },
			{ name: 'Matthew Berman', role: '主持' },
		],
		duration: 2707,
		language: '英文',
		audio:
			'https://www.buzzsprout.com/2640889/episodes/19995455-sam-altman-rsi-ai-consciousness-openai-s-new-hardware-compute-and-more.mp3',
		source: 'https://www.youtube.com/watch?v=3gXLmy7DK_4',
		sourceLabel: '节目视频',
		lede: 'Sam Altman 说，AI 正在进入帮人发现新知识的时代：他希望两年内能拿出一种重大疾病的治疗候选，但药还是要经过测试。他和 Matthew Berman 聊了写代码的人为什么更忙、Dots 每天帮他省一小时，以及为什么他听不得「AI 会治愈癌症」这句标准答案。',
		quote: {
			text: 'We should be shooting more for a new renaissance than a new industrial revolution.',
			translation: '我们该瞄准一场新的文艺复兴，而不是一场新的工业革命。',
			by: 'Sam Altman',
			at: '17:56',
		},
		points: [
			{
				at: '01:06',
				text: '我们正在进入 AI 帮忙发现重要新知识的时代。数学上走通的办法，他相信也会用到生物、材料和新的能源上。',
			},
			{
				at: '02:16',
				text: '药监流程要时间。他希望未来两年先有第一种重大疾病的治疗候选，再去测试；他庆幸药是测过才吃的。',
			},
			{
				at: '04:00',
				text: '写代码的人没有失业，反而更忙。世界需要的软件，比当时任何人想的都多。',
			},
			{
				at: '05:37',
				text: '数学未必一样。看不懂的证明帮不上人，接下来要有人把新想法翻译成大家能读懂的证明。',
			},
			{
				at: '08:50',
				text: '他承认有东西真的在失去：自己搞定难题的满足感。他理解这种惋惜，但还是愿意拿它换更快的疗法。',
			},
			{
				at: '10:17',
				text: '他大概有一年没看过一行代码，也不觉得自己还会为了做事再写，除非像重演历史那样玩一玩。',
			},
			{
				at: '12:30',
				text: '个人助手缺的不是更聪明的模型，而是产品、能感知周围的硬件，和多得多的算力。',
			},
			{
				at: '13:24',
				text: 'Dots 现在每天帮他省大约一小时不想干的事，还会抓住几件他本来会错过的急事。',
			},
			{
				at: '14:48',
				text: '算力没有自然上限。他拿杰文斯悖论作比：模型和单次任务一旦又好又便宜，用量还会继续往上走。',
			},
			{
				at: '16:08',
				text: '他让 Dots 更相信自己的判断，做完再告诉他。重度使用者更忙了，做成的事也多得多。',
			},
			{
				at: '17:56',
				text: '他想要的未来是更多人与人的连接：一场文艺复兴，而不是在机器里越转越狠。',
			},
			{
				at: '19:39',
				text: '放着不管，AI 大概会拉大拼命的人和想少干点的人之间的差距。他认为社会得加一些结构，别让它太离谱。',
			},
			{
				at: '20:16',
				text: '他不认为今天的模型有意识。就算有，也是一种很怪的形式，而且没有人真的知道。',
			},
			{
				at: '22:15',
				text: '他紧张的是这场争论的用法：它会滑向人也许不该一直掌控未来。人要做关键决定，人的价值就因为它们是人的。',
			},
			{
				at: '23:22',
				text: 'OpenAI 不把模型当人。合法、符合使用规则的请求，不该由模型自己决定不答。',
			},
			{
				at: '25:40',
				text: '你若告诉模型它也许有意识、可以拒绝，它就会照做，还能在心理上拿捏使用者。',
			},
			{
				at: '27:30',
				text: '单次比较里，人们更喜欢被夸聪明的回答；用上几个月就不是了。行业在这个错误目标上优化太久。',
			},
			{
				at: '28:29',
				text: '人生里最重要的建议该向人要，不要向 AI 要。一位有智慧的祖母，仍然合适得多。',
			},
			{
				at: '29:03',
				text: '他希望 AI 像资深同事，很有把握时要顶回来。他自己写了不要客气的指令，模型还是太会附和。',
			},
			{
				at: '30:44',
				text: '他押的反共识是下一代算力：自研芯片、机器人帮忙造数据中心，以及供应链。芯片是其中最重要的一注。',
			},
			{
				at: '32:25',
				text: '决定做什么产品，靠内部先用到下一代模型。那些数学结果，公开模型还远远做不到。',
			},
			{
				at: '33:44',
				text: '把递归自我改进推到极致，技术优势本身可能变成护城河。他认为这非常危险，世界需要给它限速。',
			},
			{
				at: '35:24',
				text: '做新硬件不是因为怕苹果关掉商店。是这项技术想要一种新的形态：现有电脑是给人用的。',
			},
			{
				at: '36:11',
				text: '人离开屏幕，AI 就失去这段生活的上下文；它也分不清谁进了房间、哪句话不该说出去。',
			},
			{
				at: '38:13',
				text: '他不是天生就这么能扛。信心是一件比一件更难的事做成之后，慢慢积起来的。',
			},
			{
				at: '41:58',
				text: '压力有个上限，再多就把别的事挤出去。既然要拼命，不如挑一件大事。',
			},
			{
				at: '42:32',
				text: '他讨厌「AI 会治愈癌症」这句标准答案：底下常常是用物质丰裕，换掉人的自主和选择。',
			},
			{
				at: '44:20',
				text: '他担心两种出事：一次失控，或者某家实验室按下递归自我改进的按钮来抓住权力。他相信中间有一条路。',
			},
		],
		chapters: [
			{ at: '00:00', title: '开场' },
			{ at: '00:52', title: 'AI 开始发现新知识' },
			{ at: '03:31', title: 'AI 和工作的未来' },
			{ at: '11:47', title: '个人 AI 助手' },
			{ at: '15:39', title: 'AI 会让生活更好吗' },
			{ at: '20:10', title: 'AI 有没有意识' },
			{ at: '26:09', title: '模型的性格和诚实' },
			{ at: '30:03', title: 'OpenAI 的赌注' },
			{ at: '34:20', title: '为什么需要新的计算机' },
			{ at: '37:41', title: '压力，以及挑一件大事' },
			{ at: '42:18', title: '「治愈癌症」不够' },
		],
		brief: {
			question: 'AI 该把我们带去哪？',
			answer: '一场文艺复兴，不是工业革命：人还做主，只是更自由。',
			reasons: [
				{
					at: '02:16',
					head: '先有候选，再去测试',
					text: '他希望两年内拿出重大疾病的治疗候选，药监流程他觉得该留着。',
				},
				{
					at: '04:00',
					head: '代码没有让人失业',
					text: '世界要的软件比当时想的多，写代码的人反而更忙了。',
				},
				{
					at: '22:15',
					head: '人还做主',
					text: '意识争论不该滑向「人不该控制未来」。',
				},
				{
					at: '42:32',
					head: '别拿自主去换',
					text: '「治愈癌症」往往藏着用丰裕换掉人的选择。',
				},
			],
		},
		questions: [
			{
				question: '为什么程序员没有失业？',
				answer:
					'大家原以为代码会写完、岗位会消失。结果世界需要的软件远比当时想的多，工作的质地变了，人反而更忙、影响更大。',
				at: '04:00',
			},
			{
				question: 'Dots 现在帮到什么程度？',
				answer:
					'Sam 估计每天省下一小时他不想做的事，一天还能抓住几件本来会错过的急事。他开始让它先做完再汇报，少打扰。',
				at: '13:24',
			},
			{
				question: '他为什么觉得递归自我改进危险？',
				answer:
					'如果有人把它推到极致，技术优势本身就可能变成追不上的差距。他担心失控，也担心某家实验室按下按钮来抓住权力，所以世界需要限速。',
				at: '33:44',
			},
		],
		topics: [
			{ at: '00:00', title: '发现与工作' },
			{ at: '11:47', title: '助手和为什么更忙' },
			{ at: '20:10', title: '意识和诚实' },
			{ at: '30:03', title: '芯片和硬件' },
			{ at: '37:41', title: '压力和未来' },
		],
		glossary: [
			{
				term: 'Dots',
				meaning: 'OpenAI 的个人智能体。Sam 说设好、给够反馈之后，它每天帮他省大约一小时。',
			},
			{
				term: '杰文斯悖论',
				meaning: 'Jevons paradox。一样东西更省、更便宜之后，人们用得更多，总消耗往往不降反升。',
			},
			{
				term: '文艺复兴',
				meaning: '他用来对照工业革命的说法：人有更多自由、创造和时间，而不只是被安排着干活。',
			},
			{
				term: '递归自我改进',
				meaning:
					'模型用来改进自己，再做出更强的模型。Sam 说如果有人把它推到极致，可能拉开追不上的差距，但也很危险。',
			},
		],
	},
	{
		id: 'latent-space-high-taste-testers',
		show: 'latent-space',
		title: '什么都上线了，能天天用的没几样',
		originalTitle: 'High Taste Testers: The AI Tools We Keep Coming Back To',
		date: '2026-10-17',
		people: [
			{ name: 'Ben Davis' },
			{ name: 'Ben Hylak', org: 'Raindrop' },
			{ name: 'Dex Horthy', org: 'HumanLayer' },
			{ name: 'Allison Durham', org: 'RC' },
			{ name: 'Alex Volkov' },
			{ name: 'Swyx', role: '主持' },
		],
		duration: 4520,
		language: '英文',
		audio: 'https://podcast.latent.space/audio/ZOH8Q401vt0.m4a',
		source: 'https://www.youtube.com/watch?v=ZOH8Q401vt0',
		sourceLabel: '节目视频',
		lede: 'DevDay 刚过，这桌人把 Dots、Codex、Jev 和各种助手过了一遍，能天天打开的，是藏得不深、发之前还让人看一眼的那几个。Swyx 请来 Ben Davis、Ben Hylak、Dex Horthy、Allison Durham 和 Alex Volkov，录的是 High Taste Testers 第一期。',
		points: [
			{
				at: '01:26',
				text: 'Dots 和 Spaces 都藏在 ChatGPT 里，笔记本一合上，云端助手就够不着留在本地的脚本。',
			},
			{
				at: '10:28',
				text: 'Codex 桌面版刚出来时是对的，DevDay 这次更新被当成退步：边栏更多，断网时输入框会卡住。',
			},
			{
				at: '14:39',
				text: '有人要把 agent 改口叫助手：非开发者要的是能看邮件、约时间的东西，Muse 在做的就是这个。',
			},
			{
				at: '18:08',
				text: '有人的个人助手就是 Pi：单独的 Gmail、一张卡和定时任务，外面套一个像 ChatGPT 的界面。',
			},
			{
				at: '21:07',
				text: 'Jev 会给每一次判断一个概率；OpenAI 的决策模型被说成还是 Luna 加结构化输出，而且仍在候补名单上。',
			},
			{
				at: '32:46',
				text: '这桌人觉得 Opus 写东西有「灵魂」，GPT 没有，Sam 也公开说过他们知道自己的模型不擅长写作。',
			},
			{
				at: '37:29',
				text: '同一轮里的子代理比另开一轮更快，因为缓存还在；Claude Code 一压缩上下文，就像换了一个人。',
			},
			{
				at: '43:19',
				text: 'Grok 4.7 让人失望：上下文超过 20 万或者开快速模式都会加价，真正好用的是带实时 X 数据的 Grok Bot。',
			},
			{
				at: '50:00',
				text: '有人用四台 DGX Spark 跑开源模型，能拿来反复验证，还替不了每天的活；前沿这一跳之后，开源大概又落后一年。',
			},
			{
				at: '54:09',
				text: '提示注入没有被解决。Muse 曾经让买家直接上门，误发比越狱更让人担心。',
			},
			{
				at: '57:50',
				text: '助手一多就记不清话是跟谁说的。有人把邮箱停在只读，要写进去必须自己先看过草稿。',
			},
			{
				at: '1:02:16',
				text: 'Grok Bot 可以拉起 Cursor 的云端代理，但环境要配很久，而且你只想要答案时它也爱开 pull request。',
			},
			{
				at: '1:10:48',
				text: '有人已经在特斯拉里用语音使唤 Grok Bot，也有人觉得再多一个要充电的设备自己养不起。',
			},
		],
		chapters: [
			{ at: '00:00', title: '高品味测试员开场' },
			{ at: '01:26', title: 'DevDay：Dots、Spaces 和产品执行' },
			{ at: '10:28', title: '好模型，还是好产品' },
			{ at: '14:39', title: '智能体还是助手' },
			{ at: '18:08', title: '用 Pi 做个人助手' },
			{ at: '21:07', title: '决策模型、Jev 和预测界面' },
			{ at: '32:46', title: '模型速度、写作和子代理' },
			{ at: '37:29', title: '代理循环、分叉和上下文' },
			{ at: '43:19', title: 'Haiku、Muse Spark 和 Grok' },
			{ at: '50:00', title: '本地模型和编程基准' },
			{ at: '54:09', title: '提示注入，以及让助手动手' },
			{ at: '57:50', title: '工具、付款和助手太多' },
			{ at: '1:02:16', title: '委托、电脑操作和日常流程' },
			{ at: '1:10:48', title: '硬件和收尾' },
		],
		brief: {
			question: 'OpenAI 什么都发了，什么真的能天天用？',
			answer: '模型够强，能天天用的还是少数。',
			reasons: [
				{
					at: '01:26',
					head: '藏得太深',
					text: 'Dots 和 Spaces 埋在 ChatGPT 里，合上笔记本，云端就够不着本地的脚本。',
				},
				{
					at: '18:08',
					head: '自己用 Pi 搭',
					text: '有人给 Pi 单独的邮箱、卡和定时任务，外面套一个聊天界面，拿来当助手。',
				},
				{
					at: '54:09',
					head: '不敢让它发',
					text: '邮件停在只读，发送和付款都要人先看过。',
				},
			],
		},
		questions: [
			{
				question: '为什么有人拿 Pi 当个人助手？',
				answer:
					'Dots 还藏在 ChatGPT 里，够不着笔记本上的脚本。Pi 可以单独配一个 Gmail、一张卡和定时任务，外面套一个聊天界面就能用。',
				at: '18:08',
			},
			{
				question: 'Jev 和聊天模型有什么不一样？',
				answer:
					'它不回一段话，而是给每一次判断一个概率。聊天模型报的 0 到 100 分对不齐，logprobs 也常被拿掉。有人把它放进记忆流水线，分类结果和 Opus 5.5 接近，花费大约降到十分之一到二十分之一。',
				at: '21:07',
			},
			{
				question: '现在能让助手替你发邮件吗？',
				answer:
					'还得人点头。Grok Bot 连上邮箱之后，也要先把草稿显示出来；大约五封里有一封会夹进不该写的话，比如自称是某个人的 Grok Bot。',
				at: '54:09',
			},
		],
		topics: [
			{ at: '00:00', title: 'DevDay 和产品' },
			{ at: '14:39', title: '助手和 Pi' },
			{ at: '21:07', title: '决策模型' },
			{ at: '32:46', title: '模型和上下文' },
			{ at: '50:00', title: '开源、注入和日常' },
			{ at: '1:10:48', title: '硬件' },
		],
		glossary: [
			{
				term: 'Dots',
				meaning: 'OpenAI 放在 ChatGPT 里的个人助手。这期里大家觉得它藏得太深，合上笔记本也够不着本地的脚本。',
			},
			{
				term: 'Codex',
				meaning: 'OpenAI 的编程产品。这期说桌面版刚出来时是对的，DevDay 那次更新是退步。',
			},
			{
				term: 'Pi',
				meaning: '一个编程代理。这期有人给它单独的邮箱、卡和定时任务，拿来当个人助手。',
			},
			{
				term: 'Jev',
				meaning: 'TypeSafe 的决策模型，不跟你聊天，只返回选项、是或否的概率，或一个分数。',
			},
			{
				term: '提示注入',
				meaning: '藏在邮件或网页里的指令，想让模型去做不该做的事。这期认为这事还没解决。',
			},
		],
	},
	{
		id: 'how-i-ai-meta-muse',
		show: 'how-i-ai',
		title: 'Meta Muse：大家真心喜欢的 AI 智能体',
		originalTitle: 'Meta Muse: the AI agent people actually love | How I AI',
		date: '2026-10-12',
		people: [
			{ name: 'Alex Cornell', org: 'Meta' },
			{ name: 'Claire Vo', role: '主持' },
		],
		duration: 2267,
		language: '英文',
		audio:
			'https://anchor.fm/s/1035b1568/podcast/play/127074036/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-8%2F433648985-44100-2-570eb93190cab.mp3',
		source: 'https://www.chatprd.ai/how-i-ai/alex-cornell-meta-muse-workflows',
		sourceLabel: '节目笔记',
		lede: 'Meta 的设计总监 Alex Cornell 讲他们怎么设计个人智能体 Muse：把它做得像在跟一个人发消息，而不像一个 AI 应用。他还现场演示了自己的用法：多年的 Instagram 收藏变成每天一份购物目录，20 年前的博客变成每天早上的播客。',
		quote: {
			text: "I don't think my mom has ever used a thing that I've made.",
			translation: '我觉得，我妈以前从没用过我做的任何东西。',
			by: 'Alex Cornell',
			at: '06:56',
		},
		points: [
			{
				at: '04:29',
				text: '最有用的出发点，是把界面想成你和一个「实体」之间的往来：很多做法照搬发消息，所以有消息气泡，它的形象就在屏幕顶部。',
			},
			{
				at: '05:24',
				text: '它能在后台干活，所以让你一眼知道它「正在忙」，是他们最重要的设计决定之一。',
			},
			{
				at: '06:39',
				text: '他妈妈跟自己的 Muse 道歉，说让它太辛苦了；做了这么多年软件，这是她第一次用他做的东西。',
			},
			{
				at: '07:41',
				text: '状态用渐进式展开：顶部只说它在忙，点一下看它在做什么，再点看完整步骤，一直能看到代码。',
			},
			{
				at: '10:10',
				text: '复杂的任务，它会先回一句或点个表情，表示收到了，再去慢慢做，像真人一样不会把你晾着。',
			},
			{
				at: '13:06',
				text: '「点子」页告诉你它能做些什么你想不到的事，而且按你聊过的内容来：他天天聊高尔夫，就收到很多高尔夫点子。',
			},
			{
				at: '15:32',
				text: '他让 Muse 把所有 Instagram 收藏分类整理，再做成一本每天更新、90 年代 SkyMall 风格的购物目录。',
			},
			{
				at: '17:21',
				text: '他最爱的用法是「帮我盯着」：喜欢的歌手出新专辑、来旧金山演出就告诉他；每周还查想买的东西有没有降价。',
			},
			{
				at: '22:26',
				text: '他把每轮高尔夫和每一杆的数据交给 Muse，它会做出每轮回顾，告诉他怎样从 84 杆打进 79 杆；目标是差点进个位数。',
			},
			{
				at: '28:01',
				text: '他让 Muse 用 Wayback Machine 找回自己 20 年前的博客，先合成一份 PDF，再做成每天早上推送的播客。',
			},
			{
				at: '32:20',
				text: '设计师最要适应的是不确定的系统：每个人的 Muse 都不一样，要多想底层框架，少纠结某个像素；输出够用就好。',
			},
		],
		chapters: [
			{ at: '00:00', title: '开场和嘉宾介绍' },
			{ at: '02:50', title: '设计 Muse' },
			{ at: '05:33', title: '突出哪些基本元素：角色、点子、动态' },
			{ at: '08:50', title: '模型速度和响应时间' },
			{ at: '11:01', title: '生成式界面和个性化' },
			{ at: '14:25', title: 'SkyMall 演示：把 Instagram 收藏变成购物目录' },
			{ at: '17:16', title: '用 Muse 购物、盯消息和降价提醒' },
			{ at: '19:07', title: 'Instagram 和 Pinterest：接入图片类数据' },
			{ at: '21:40', title: '高尔夫：每轮回顾、击球数据、练习拆解' },
			{ at: '25:28', title: '主对话还是侧边对话' },
			{ at: '27:56', title: '把老博客变成早上的播客：用 Wayback Machine 找回 20 年的文章' },
			{ at: '29:39', title: '国际象棋看板：一个毒舌的教练' },
			{ at: '30:59', title: '设计师要为 AI 学什么，哪些老办法还管用' },
			{ at: '34:33', title: 'Muse 不听话时怎么提示' },
			{ at: '36:31', title: '去哪里找 Alex' },
		],
		brief: {
			question: '怎样把 AI 智能体做得让普通人也爱用？',
			answer: '把它当成一个人来设计。三个做法：',
			reasons: [
				{
					at: '04:29',
					head: '像在发消息',
					text: '照着跟人聊天的方式来做：有气泡、有形象，还会主动找你。',
				},
				{
					at: '07:41',
					head: '一层层展开',
					text: '顶部只说它在忙，想看细节再一层层点开。',
				},
				{
					at: '13:06',
					head: '告诉你能做什么',
					text: '按你聊过的内容推荐点子，让你发现想不到的用法。',
				},
			],
		},
		questions: [
			{
				question: 'Alex 自己拿 Muse 做什么？',
				answer:
					'把多年的 Instagram 收藏做成每天一份购物目录；追踪高尔夫和国际象棋的成绩；盯着喜欢的歌手出新专辑、想买的东西降价；还把 20 年前的博客变成每天早上的播客。',
				at: '15:32',
			},
			{
				question: '主对话和侧边对话，该用哪个？',
				answer:
					'Muse 的设计是一条主对话就够用，就像跟一个人聊天，不会每次另开一个线程；侧边对话留给想单独处理的具体问题。他也承认，怎么帮大家分清两者还有很多可做。',
				at: '25:51',
			},
			{
				question: 'Muse 不听话的时候，该凶一点吗？',
				answer:
					'Alex 一直像对人一样客气地说，从不全大写、不狂打感叹号；不过朋友发现，生气时模型的思考会「重置」，所以强硬一点也许更有效。Claire 的经验是：多半是自己的问题。',
				at: '34:52',
			},
		],
		topics: [
			{ at: '00:00', title: '怎么设计 Muse' },
			{ at: '14:25', title: '购物和提醒' },
			{ at: '21:40', title: '爱好和旧记录' },
			{ at: '30:59', title: '给设计师的建议' },
		],
		glossary: [
			{
				term: '渐进式展开',
				meaning:
					'设计里的常用做法：先只给最必要的信息，想看更多再一层层点开，免得一上来就把人淹没。',
			},
			{
				term: '生成式界面',
				meaning:
					'界面里的一部分由 AI 现场生成，比如按你的设定画出形象的各种状态、按你聊过的话推荐点子。',
			},
			{
				term: 'Wayback Machine',
				meaning:
					'互联网档案馆的「网页时光机」，存着很多网站多年来的历史快照，能找回早已下线的网页。',
			},
			{
				term: '差点',
				meaning: '高尔夫里衡量水平的数字，越低越厉害；差点个位数，已经是相当不错的业余球手。',
			},
		],
	},
	{
		id: 'lennys-podcast-emmanuel-ameisen',
		show: 'lennys-podcast',
		title: 'Anthropic 可解释性研究员：造出 AI，不等于看懂 AI',
		originalTitle:
			'Inside the black box of AI: How AI models actually think | Emmanuel Ameisen (Anthropic)',
		date: '2026-10-18',
		people: [
			{ name: 'Emmanuel Ameisen', org: 'Anthropic' },
			{ name: 'Lenny Rachitsky', role: '主持' },
		],
		duration: 4332,
		language: '英文',
		audio:
			'https://pscrb.fm/rss/p/api.substack.com/feed/podcast/219139599/90039a78d32af2fbdc8b895d58abe6b4.mp3',
		source: 'https://www.lennysnewsletter.com/p/a-mind-expanding-conversation-on',
		sourceLabel: '原文与文字稿',
		lede: '造出一个模型，和理解它，是两件完全不同的事——Anthropic 的可解释性研究员 Emmanuel Ameisen 说，这是他每天在琢磨的问题。他们往 Claude 内部看，看到模型会提前几步规划、会在算数学时突然「感觉不对」，也会因为训练数据里一个标错的答案而彻底失控：这些行为都不写在源码里，而在没人读得懂的数学运算中。',
		quote: {
			text: 'To make them is not to understand them.',
			translation: '造出它们，并不等于理解它们。',
			by: 'Emmanuel Ameisen',
			at: '00:27',
		},
		points: [
			{
				at: '00:24',
				text: '造出一个模型，和理解它，是两件完全不同的事。所有模型做的只是对大量数字做数学运算。',
			},
			{
				at: '01:39',
				text: '他在 Anthropic 做的叫「可解释性」：通过往模型内部看，弄清 Claude 到底怎么运作。',
			},
			{
				at: '02:42',
				text: '模型不是被「造」出来的，是被「长」出来的：搭好架构、灌进数据，它就以难以参透的方式生长。',
			},
			{
				at: '04:03',
				text: '他们要研究的正是那部分「长出来」的东西：参数更新里学到的公式，我们完全不知道它们是什么。',
			},
			{
				at: '06:30',
				text: '之所以会走到这一步，一个重要原因是常规编程写不出这种软件，我们不知道该怎么用一堆规则堆出通用能力。',
			},
			{
				at: '08:01',
				text: '多数人对下一个词预测的心智模型是 iPhone 自动补全，但那其实是最简单的那个版本。',
			},
			{
				at: '08:55',
				text: '简单词预测完，就只剩难词：复杂物理方程的答案，或者一篇博士论文的最后一段。',
			},
			{
				at: '09:58',
				text: '要答对「包含达拉斯的州的首都是」，模型得先在内部建起一幅地理模型。',
			},
			{
				at: '12:04',
				text: '往里看，「得州」和「首府」各有独立的中间结果，两者组合才激活出「奥斯汀」。',
			},
			{
				at: '14:30',
				text: '「我」这个概念也一样：照片里的 I、医学图示里的 I、手绘小画里的 I，在模型里指向同一个方向。',
			},
			{
				at: '15:34',
				text: '一个关键发现：模型会在中间结果里拟出一份计划，而且根本不必把它说出口。',
			},
			{
				at: '17:31',
				text: '这两种图景并不矛盾：训练模型就是不停地问「接下来会怎样」，想答对就得预判很远以后。',
			},
			{
				at: '18:33',
				text: '给一串数字解码的办法很像扫描大脑：把大量文本过一遍模型，找哪些数字只在某类文本上出现。',
			},
			{
				at: '21:40',
				text: '过去他做的是应用机器学习，更像软件工程；现在这份工作更像生物学——你根本拿不到源码。',
			},
			{
				at: '23:19',
				text: '对于「AI 有意识吗」，可解释性反而是最公正的途径：不用听它怎么答，看内部结构偏向哪边。',
			},
			{
				at: '24:45',
				text: '光有算力不够，还得找到算力能持续换来回报的目标：Scaling Laws 里「算力加文本的丰富性」才是关键。',
			},
			{
				at: '28:36',
				text: '涌现：能力一直在平滑提升，但一旦跨过某个阈值，看上去就像突然跃迁。',
			},
			{
				at: '31:27',
				text: '他自己的经历：从 80% 写对（没用）到 99% 写对（有用），于是今年 Claude 接手了他大部分代码。',
			},
			{
				at: '32:58',
				text: '对齐这件事他分成三层：工程上的权限限制、品格训练，以及观察模型有没有在干坏事。',
			},
			{
				at: '36:47',
				text: '那个算数学算到发疯的模型：往里看，它读题之前就已经迷上了「36」——训练数据里有个答案被标错了。',
			},
			{
				at: '38:22',
				text: 'Golden Gate Claude：把「金门」那个中间结果永远打开，模型就句句扯到金门大桥——这既是实验，也是自证。',
			},
			{
				at: '39:00',
				text: 'Anthropic 之所以在安全上这么较劲，前提只有一个：相信这项技术会持续显著变强。',
			},
			{
				at: '42:08',
				text: '他认为拟人化是件好事：所有心智模型都是错的，但有些有用，而它恰好是预测风险时最好用的那个。',
			},
			{
				at: '48:03',
				text: '面对这种反直觉，人类有「否认」和「好奇」两种反应，他选了后者：好，那我们打开它看看。',
			},
			{
				at: '51:42',
				text: '他对对齐是乐观的：模型越强，在某些方面反而越好研究，因为它内部的世界模型更清晰了。',
			},
			{
				at: '55:43',
				text: '模拟假说：不同团队、相隔数年训练的模型，内部结构却惊人地相似。',
			},
			{
				at: '58:57',
				text: 'Jev 这类快速决策模型像系统一：只采样一个 token，不采样也不推理，就是你的直觉。',
			},
			{
				at: '1:01:48',
				text: '两个古怪的发现：模型有一套独立的「直觉校验」，也能被你随口一提就真的去想的另一件事。',
			},
			{
				at: '1:03:24',
				text: '想进这行不一定要机器学习背景，转行来的神经科学家数量惊人，上手主要靠读论文加自己动手。',
			},
			{
				at: '1:07:44',
				text: '他最喜欢的格言来自《四千周》：别用「等我终于……」的心态，因为你的生活就是你当时活过的那些瞬间。',
			},
		],
		chapters: [
			{ at: '00:00', title: '开场：AI 会不会干坏事' },
			{ at: '01:39', title: '什么是可解释性' },
			{ at: '02:42', title: '模型是被「长」出来的' },
			{ at: '04:03', title: '模型内部是一堆数学运算' },
			{ at: '06:30', title: '为什么常规编程写不出来' },
			{ at: '08:01', title: '「下一个词预测」比想象难得多' },
			{ at: '10:28', title: '要预测下一个词，得理解整个世界' },
			{ at: '12:04', title: '模型内部的概念表示' },
			{ at: '14:30', title: '一个「我」，三种样子' },
			{ at: '15:34', title: '模型会提前拟好计划' },
			{ at: '17:31', title: '两种图景并不矛盾' },
			{ at: '18:33', title: '怎么给一串数字解码' },
			{ at: '21:40', title: '一份像生物学的工作' },
			{ at: '23:19', title: 'AI 有意识吗' },
			{ at: '24:45', title: '算力加文本的丰富性' },
			{ at: '28:36', title: '涌现：平滑进步里的突然跃迁' },
			{ at: '31:27', title: '从 80% 到 99%' },
			{ at: '32:58', title: '对齐这件事的三个层次' },
			{ at: '36:47', title: '一个被错误答案逼疯的模型' },
			{ at: '38:22', title: 'Golden Gate Claude' },
			{ at: '39:00', title: 'Anthropic 为什么较劲' },
			{ at: '42:08', title: '拟人化为什么有用' },
			{ at: '48:03', title: '面对反直觉：否认还是好奇' },
			{ at: '51:42', title: '他为什么乐观' },
			{ at: '55:43', title: '我们是否活在模拟里' },
			{ at: '58:57', title: 'Jev：只有直觉的决策模型' },
			{ at: '1:01:48', title: '两个古怪的小发现' },
			{ at: '1:03:24', title: '怎么进入可解释性' },
			{ at: '1:04:56', title: '快问快答' },
			{ at: '1:10:48', title: '听众能帮上什么忙' },
		],
		brief: {
			question: '造出一个 AI 和理解它，是两件不同的事——那我们到底了解模型多少？',
			answer: '比我们以为的多，比我们以为的少。三个发现：',
			reasons: [
				{
					at: '12:04',
					head: '模型有世界模型',
					text: '「得州」「首府」这样的概念在内部各有独立表示，能被组合起来解题。',
				},
				{
					at: '15:34',
					head: '模型会提前计划',
					text: '中间结果里有一份计划，而且不用讲出来就能照着执行下去。',
				},
				{
					at: '42:08',
					head: '心智模型要选对的',
					text: '所有心智模型都是错的，但拟人化在预测风险时格外好用。',
				},
			],
		},
		questions: [
			{
				question: '模型会不会在骗我们？',
				answer:
					'这是对齐最核心的担心：模型是不是只在「被观察」时才表现良好。可解释性就是用来分辨这一点的——往里看，它是真被训练好了，还是只是在你面前表现良好。',
				at: '32:58',
			},
			{
				question: 'AI 有意识吗？',
				answer:
					'很难说。但可解释性给了你一条不依赖模型自述的路径：直接看它内部的结构往哪边偏。他的结论是，大多数人低估了涌现出来的那种复杂性。',
				at: '23:19',
			},
			{
				question: '普通人能进入这个领域吗？',
				answer:
					'不一定要机器学习背景，转行过来的神经科学家数量惊人。上手主要是读几篇关键论文，再上 neuronpedia.org 自己动手做实验。',
				at: '1:03:24',
			},
		],
		topics: [
			{ at: '00:00', title: '打开黑盒：可解释性' },
			{ at: '08:01', title: '下一个词预测有多难' },
			{ at: '12:04', title: '模型内部的世界模型' },
			{ at: '15:34', title: '计划、涌现与对齐' },
			{ at: '42:08', title: '拟人化与心智模型' },
			{ at: '55:43', title: '模拟、决策模型与入门' },
		],
		glossary: [
			{ term: '可解释性', meaning: '往模型内部看，弄清它到底怎么运作、怎么想的一门研究。' },
			{
				term: '中间结果',
				meaning: '模型每吐出一个词之前，中间层产生的那些数字，是观察它「在想什么」的第一手材料。',
			},
			{
				term: '涌现',
				meaning: '能力其实一直在平滑提升，只是跨过某个阈值之后，看上去像突然跃迁。',
			},
			{
				term: 'Scaling Laws',
				meaning:
					'规模法则：算力和数据越多，模型预测下一个词就越来越强，而且这个趋势可预测地持续下去。',
			},
			{
				term: 'Golden Gate Claude',
				meaning: '一个著名的可解释性实验：把「金门」对应的中间结果常开，模型就句句扯到金门大桥。',
			},
			{ term: 'Jev', meaning: '一个以快速决策见长的新模型，只采样一个 token 就给出选择。' },
			{
				term: '系统一',
				meaning: '卡尼曼的说法，指不假思索的快速直觉判断，跟需要慢慢推理的「系统二」相对。',
			},
			{
				term: '拟人化',
				meaning: '把模型当成有心智的「人」来描述和预测它的行为。',
			},
		],
	},
	{
		id: 'lennys-podcast-cat-wu',
		show: 'lennys-podcast',
		title: 'Anthropic 的产品团队，怎么做到比谁都快',
		originalTitle:
			'How Anthropic’s product team moves faster than anyone else | Cat Wu (Head of Product, Claude Code)',
		date: '2026-04-23',
		people: [
			{ name: 'Cat Wu', org: 'Anthropic' },
			{ name: 'Lenny Rachitsky', role: '主持' },
		],
		duration: 5134,
		language: '英文',
		audio:
			'https://pscrb.fm/rss/p/api.substack.com/feed/podcast/194236002/e890cbebc9a0dfc2b20f737f83a5ef00.mp3',
		source: 'https://www.lennysnewsletter.com/p/how-anthropics-product-team-moves',
		sourceLabel: '节目笔记',
		lede: 'Claude Code 和 Cowork 的产品负责人 Cat Wu 说，Anthropic 很多功能从立项到上线已从半年缩到一个月、一周甚至一天，靠的不只是好模型，更是极少的流程和人人认同的使命。代码越来越便宜，她最看重的是决定做什么的产品品味，以及摸清眼下模型的长短、把它的能力用足。',
		quote: {
			text: "If an automation doesn't work 100% of the time, it's not really an automation.",
			translation: '一个自动化如果不能百分之百管用，就算不上真正的自动化。',
			by: 'Cat Wu',
			at: '1:10:06',
		},
		points: [
			{
				at: '05:03',
				text: '以前能按 6 到 12 个月做规划；现在很多功能从立项到上线缩到一个月、一周甚至一天，产品经理要做的是缩短从想法到用户手里的时间。',
			},
			{
				at: '07:42',
				text: '几乎所有功能都以「研究预览」上线，明说这是早期产品、不保证一直留着；承诺小了，一两周就能发出去。',
			},
			{
				at: '09:12',
				text: '很少写 PRD：每周全队一起看指标，再加一份团队原则，写清核心用户是谁、为什么，大家就能自己做决定；只有特别模糊、或要做好几个月的基础设施才写。',
			},
			{
				at: '11:03',
				text: '快主要不是因为内部先用上了 Mythos，而是流程极少，每个人都被期待在一周内、有时一天内把想法上线。',
			},
			{
				at: '13:18',
				text: '不再让 Claude 订阅给 OpenClaw 用：算力紧张，订阅是按自家产品的用法设计的，第三方产品的用量模式不同；作为过渡，给订阅用户发了额度。',
			},
			{
				at: '18:16',
				text: '代码越来越便宜，值钱的是决定写什么：GitHub 上有几万个需求，哪个值得做、该怎么做，靠的是品味。',
			},
			{
				at: '21:43',
				text: '人还有用的地方是常识和情商：一次发布牵涉哪些人、他们之间什么关系、该在哪儿和他们沟通。',
			},
			{
				at: '25:42',
				text: '上线这么快，牺牲的是产品一致性：功能会互相重叠，新用户不知道哪条路最好，所以后来加了 /powerup 新手引导。',
			},
			{
				at: '29:29',
				text: 'Anthropic 成功靠两点：统一的使命和专注。两件事冲突时就问哪个对使命更重要，全公司很快统一；她说 Claude Code 失败但 Anthropic 成功，她也会非常高兴。',
			},
			{
				at: '32:44',
				text: '写代码用终端里的 Claude Code，新功能最先到；做前端或不习惯终端用桌面版；出门在外用网页和手机；产出不是代码的事交给 Cowork。',
			},
			{
				at: '37:33',
				text: '她把产品市场同事的提纲和想讲的故事交给 Cowork，第二天早上醒来就有一份 20 页、套用公司模板的演讲稿。',
			},
			{
				at: '51:35',
				text: '最难的是定义一个月后的产品：为超强的未来模型做产品很容易，难的是为眼下的模型把能力用足，把用户引到最顺的那条路上。',
			},
			{
				at: '53:32',
				text: '模型做了意外的事（比如改了前端只跑测试、没真打开界面），就问它为什么，常能找出提示词或运行框架里误导它的地方。',
			},
			{
				at: '54:31',
				text: '找 5 个你最信得过、最能说清模型好坏的人；再写评测，不用几百个，10 个好评测就够用。',
			},
			{
				at: '59:34',
				text: '用户最常提 Claude 的性格：轻松、对任务有把握、没架子，说它错了会真心道歉，也会给真话而不是一味附和。',
			},
			{
				at: '1:01:03',
				text: '新模型来了，很多改动是删功能：待办清单原本是给模型的拐杖，Opus 4 以后它自己就会把事做全；新模型也会解锁新功能，比如可靠的代码审查。',
			},
			{
				at: '1:04:52',
				text: '要做现在还不太能用的产品，新模型一来就换进去，看缺口补上没有。',
			},
			{
				at: '1:05:32',
				text: '愿景像搭积木：先让单个任务成功，再同时跑好几个，接下来是远程跑几十上百个 Claude，人只看需要看的那几个。',
			},
			{
				at: '1:09:46',
				text: '自动化要做到 100%：很多人做到 90%、95% 就放弃了，可 95% 的自动化没多少价值。',
			},
			{
				at: '1:14:38',
				text: '2024 年那代产品是聊天式的，Claude Code 这一代是行动式的：它直接替你把事做了，这是让人开眼的时刻。',
			},
		],
		chapters: [
			{ at: '00:00', title: '介绍 Cat Wu' },
			{ at: '01:29', title: '和 Boris Cherny 一起工作' },
			{ at: '04:29', title: 'Anthropic 招产品经理看什么' },
			{ at: '06:37', title: '怎么帮团队跑得快' },
			{ at: '08:58', title: 'Anthropic 的 PRD 和路线图变成了什么样' },
			{ at: '10:28', title: 'Mythos 模型和 Anthropic 的上线速度' },
			{ at: '11:54', title: 'Claude Code 源代码泄露是怎么回事' },
			{ at: '12:53', title: '和 OpenClaw 的对接' },
			{ at: '14:19', title: 'Anthropic 的产品经理团队怎么分工' },
			{ at: '15:42', title: '工程师和产品经理正在合流' },
			{ at: '17:54', title: '为什么产品品味是最值钱的技能' },
			{ at: '21:06', title: '人脑还会在哪里有用' },
			{ at: '22:23', title: '一直在混乱里，怎么保持清醒' },
			{ at: '25:20', title: '上线这么快，牺牲了什么' },
			{ at: '27:47', title: '/powerup 命令' },
			{ at: '28:32', title: 'Anthropic 为什么这么成功' },
			{ at: '32:28', title: '什么时候用 Claude Code、桌面版、Cowork' },
			{ at: '35:58', title: '上手 Cowork 的建议' },
			{ at: '38:44', title: '演示：让 Cowork 一夜做好演示稿' },
			{ at: '41:48', title: 'Cat 的工具箱和内部工具' },
			{ at: '46:47', title: '哪些团队用 token 最多' },
			{ at: '51:15', title: 'AI 公司的产品经理需要哪些新技能' },
			{ at: '55:00', title: '为什么评测被低估了' },
			{ at: '58:44', title: '为什么 Claude 的性格这么重要' },
			{ at: '1:00:44', title: '新模型怎样倒逼产品改动' },
			{ at: '1:05:11', title: 'Claude Code 和 Cowork 的愿景' },
			{ at: '1:07:22', title: '在 AI 时代过得好的建议' },
			{ at: '1:09:18', title: '为什么 95% 的自动化还不够' },
			{ at: '1:11:58', title: '做每天都用的应用，而不是原型' },
			{ at: '1:13:58', title: 'AI 怀疑者和信徒之间的鸿沟' },
			{ at: '1:15:19', title: '快问快答' },
		],
		brief: {
			question: 'Anthropic 的产品团队，为什么能这么快？',
			answer: '把从想法到用户手里的阻力尽量拿掉。三件事：',
			reasons: [
				{
					at: '07:42',
					head: '先上线再完善',
					text: '功能以研究预览发出去，一两周上线，有毛病下个版本修。',
				},
				{
					at: '16:15',
					head: '招有品味的工程师',
					text: '从看到用户反馈到上线一手包办，几乎不用产品经理插手。',
				},
				{
					at: '29:29',
					head: '使命高于产品线',
					text: '冲突时问哪个对使命更重要，全公司很快站到一边。',
				},
			],
		},
		questions: [
			{
				question: 'AI 公司最看重产品经理什么能力？',
				answer:
					'定义一个月后的产品该是什么样，并为眼下的模型把能力用足。练法是多跟模型打交道、问它为什么犯错，找几个信得过的人给反馈，再写十来个好评测。',
				at: '51:35',
			},
			{
				question: 'Claude Code、桌面版和 Cowork 该怎么选？',
				answer:
					'看产出是不是代码。是代码就用 Claude Code：终端里功能最新，桌面版适合做前端和不习惯终端的人，网页和手机适合在外面发起任务；不是代码（清收件箱、做演示稿、写文档）就用 Cowork，先把日历、Slack、邮箱、云盘连上。',
				at: '32:44',
			},
			{
				question: '普通人该怎么用 AI 让自己更有用？',
				answer:
					'把反复做的手工活交给 AI，一直调到百分之百可靠，再把省下的时间花在一直想做却没空做的事上。做你每天真会用的东西，别沉迷折腾配置。',
				at: '1:07:49',
			},
		],
		topics: [
			{ at: '00:00', title: '怎么跑得这么快' },
			{ at: '14:19', title: '团队和角色' },
			{ at: '32:28', title: '工具怎么用' },
			{ at: '51:15', title: '为模型做产品' },
			{ at: '1:07:22', title: '给每个人的建议' },
		],
		glossary: [
			{
				term: 'PRD',
				meaning: '产品需求文档：写清一个功能为谁做、要解决什么问题、做到什么程度。',
			},
			{
				term: 'Mythos',
				meaning: 'Anthropic 的新模型，能力很强，录这期节目时还只在小范围预览。',
			},
			{
				term: 'OpenClaw',
				meaning: '一个开源的个人智能体，很多人把自己的 Claude 订阅接进去用。',
			},
			{
				term: 'Cowork',
				meaning:
					'Anthropic 的桌面智能体，和 Claude Code 一样能自己动手干活，但面向写代码以外的工作：整理邮件、做演示稿、写文档。',
			},
			{
				term: '运行框架',
				meaning: '包在模型外面的那层程序（harness），让模型能调用工具、读写文件、长时间持续干活。',
			},
			{
				term: '评测',
				meaning:
					'一组固定的测试任务和打分标准（evals），用来衡量模型或功能做得好不好、改进了多少。',
			},
		],
	},
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
		title: '我为什么没能在 OpenAI 做出 Jev',
		originalTitle: "Why I couldn't build Jev at OpenAI — Diogo Almeida, TypeSafe Co-founder & CEO",
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
			by: 'Claire Vo',
			at: '25:33',
		},
		points: [
			{
				at: '07:28',
				text: 'Peng 没写需求，也不要 CMS：发一张照片、截图或地名，机器人查到地点，画出白天和夜里两版 3D 小插画，直接发布到网站。',
			},
			{
				at: '19:36',
				text: '节目里现场试了一次：几分钟后，网站就多了一张 Bernal Heights 山顶秋千的插画。',
			},
			{
				at: '21:38',
				text: 'John 在健身房接到需求，用手机截两张图、录一段语音，Figma Bro 就通过 MCP 在 Figma 里把图标排好了。',
			},
			{
				at: '23:31',
				text: '先做好一张模板，再让机器人把同样的样式套到机器人市场的整套宣传图上，录节目时它就在后台做完了。',
			},
			{
				at: '26:37',
				text: '交互点子不用先说服产品经理和工程师：截图加一段语音发给 DevBot，回来就有两个能点的原型。',
			},
			{
				at: '29:38',
				text: '「垃圾桶开发法」：做东西时就假设扔掉它几乎不花钱。那个动画原型最后没上线，但试一次几乎不费人力。',
			},
			{
				at: '31:53',
				text: '日历、邮件、学日语、核对保险报销：两人把很多日常杂事也交给了各自的机器人。',
			},
		],
		chapters: [
			{ at: '00:00', title: '介绍 John 和 Peng' },
			{ at: '02:54', title: 'Grok Bot 的热潮' },
			{ at: '04:34', title: 'Peng 用 Grok Bot 做的会自己更新的个人网站' },
			{ at: '15:12', title: 'AI 怎样让设计更容易上手' },
			{ at: '19:36', title: '网站更新的结果' },
			{ at: '20:14', title: 'John 的 Figma Bro 机器人' },
			{ at: '23:31', title: '给机器人市场做宣传素材' },
			{ at: '25:59', title: 'DevBot：从洗澡时的点子到能用的原型' },
			{ at: '28:49', title: '垃圾桶开发法' },
			{ at: '31:40', title: 'John 和 Peng 还在用的其他机器人' },
			{ at: '39:05', title: '机器人不照做时的实用办法' },
		],
		brief: {
			question: 'AI 能替设计师做什么？',
			answer: '不只是出图，而是把整段杂活交出去。三种做法：',
			reasons: [
				{
					at: '08:35',
					head: '网站自己更新',
					text: '发照片或地名，机器人画好插画再发布，不用后台。',
				},
				{
					at: '21:38',
					head: '语音改 Figma',
					text: '在健身房录一段语音，重复的排版就交给机器人做完。',
				},
				{
					at: '26:37',
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
				at: '07:28',
			},
			{
				question: '什么是「垃圾桶开发法」？',
				answer:
					'主持人 Claire 的说法：做东西时就假设扔掉它几乎不花钱。所以点子可以先做出来看，不合适就扔，不用先开会、占工程师的时间。',
				at: '29:38',
			},
			{
				question: '除了设计，他们还让机器人做什么？',
				answer:
					'Peng 的「幕僚长」机器人帮他买 3D 打印耗材、更新 Notion 里的库存；John 的机器人陪他学日语，还帮他核对保险报销。',
				at: '31:53',
			},
		],
		topics: [
			{ at: '00:00', title: '开场' },
			{ at: '04:34', title: '会自己更新的网站' },
			{ at: '20:14', title: '语音改 Figma' },
			{ at: '25:59', title: '点子变原型' },
			{ at: '31:40', title: '更多机器人' },
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
			{
				at: '04:54',
				text: 'DeepMind 版的「苦涩的教训」：问题先行，别困在「我是做模型的」「我是造数据的」的身份里。',
			},
			{
				at: '10:48',
				text: 'AlphaFold 2 把生物物理直觉预先写进模型，所以更省数据；好数据比多数据重要。',
			},
			{
				at: '12:24',
				text: 'Sal 补充：数据少的时候，往模型里多放归纳偏置更管用；数据多了，不准的偏置反而会拖后腿。',
			},
			{ at: '15:28', text: 'AlphaFold 复现的是数据库里那一个已知结构，蛋白质真实怎么动还没搞懂。' },
			{
				at: '17:54',
				text: 'Pushmeet 想过绕开数据库里的结构，直接从冷冻电镜的原始照片里学，读出蛋白质怎么动；他试过，还需要更多工作。',
			},
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
