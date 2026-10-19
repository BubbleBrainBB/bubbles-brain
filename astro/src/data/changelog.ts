export type ChangelogCategory = 'feature' | 'content' | 'polish';

export interface ChangelogItem {
	date: string;
	title: string;
	tag: string;
	type: ChangelogCategory;
	summary: string;
	highlights?: string[];
	/** Explicit content changes in a mixed feature/polish entry. */
	readingUpdates?: string[];
	links?: Array<{
		label: string;
		href: string;
	}>;
}

export const changelog: ChangelogItem[] = [
	{
		date: '2026-10-19',
		tag: '播客',
		type: 'content',
		title: '新增播客：Anthropic 的产品团队，怎么做到比谁都快',
		summary:
			"Lenny's Podcast 采访 Claude Code 和 Cowork 的产品负责人 Cat Wu：Anthropic 怎么把功能上线周期从半年压到一周甚至一天，AI 公司的产品经理要哪些新技能，以及 Claude Code、桌面版和 Cowork 各该什么时候用。附一图读懂、时间花在哪、中文要点和带中文翻译的完整文字稿，站内直接收听。",
		links: [
			{ label: '收听这一期', href: '/podcasts/lennys-podcast-cat-wu/' },
			{ label: '看文字稿', href: '/podcasts/lennys-podcast-cat-wu/transcript/' },
		],
	},
	{
		date: '2026-10-16',
		tag: '精选阅读',
		type: 'content',
		title: '新增精选阅读：Codex 是怎么做成的',
		summary:
			'收录 Dan Shipper 在 Every 的长报道。按 10 月 15 日原文逐段译成中文并润色：云端 Codex 没找到市场，团队转回开发者自己的电脑，再做成没有代码编辑器的桌面应用，最后成为 ChatGPT 桌面版的底座。文末有一小段新手解读。',
		links: [{ label: '阅读', href: '/highlights/2026-10-15-how-codex-happened/' }],
	},
	{
		date: '2026-10-15',
		tag: '精选阅读',
		type: 'polish',
		title: '三篇精选阅读改成贴近原文的译文',
		summary:
			'《给 Claude Opus 5.5 写提示词》按官方文档逐段译过，示例提示词整段译成中文，不再只说大意。《Claude Motion 上手指南》按帮助中心原文核对过。Lauren Tan 那场演讲没有公开文字稿，中文仍按她讲的顺序，这次只润色了读法。',
		links: [
			{ label: '写提示词', href: '/highlights/2026-10-13-prompting-claude-opus-5-5/' },
			{ label: 'Claude Motion', href: '/highlights/2026-10-12-get-started-with-claude-motion/' },
			{ label: '2,500 个 PR', href: '/highlights/2026-10-13-how-i-shipped-2500-prs-last-month/' },
		],
	},
	{
		date: '2026-10-15',
		tag: 'Skills',
		type: 'content',
		title: 'Skills 新增 pstack',
		summary:
			'收录 Lauren Tan（poteto）的 pstack。作者让人真正调用的是两条：先配置每个角色用的模型，再用 poteto-mode 按严谨剧本干活。插件里其余技能由这个模式按需调用。',
		links: [
			{ label: '看 poteto-mode', href: '/vibe-coding/skills/poteto-mode/' },
			{ label: '看配置', href: '/vibe-coding/skills/setup-pstack/' },
		],
	},
	{
		date: '2026-10-15',
		tag: '精选阅读',
		type: 'polish',
		title: '《怎么更有野心》改成贴近原文的译文',
		summary:
			'这篇中文不再是缩写导读。按 Felix Rieseberg 的原文逐段译过并润色，人称、例子和那段提示词都留着，读起来按中文来。文末仍有一小段新手解读。',
		links: [{ label: '阅读', href: '/highlights/2026-10-15-how-to-be-more-ambitious/' }],
	},
	{
		date: '2026-10-15',
		tag: '精选阅读',
		type: 'content',
		title: '新增精选阅读：怎么更有野心',
		summary:
			'整理 Felix Rieseberg 的教程：用模型更有野心，不是把眼前的活做快，而是问更高一层的结果、按这个领域最好的人那样做，再从别的领域借方法。文末附新手解读。',
		links: [{ label: '阅读', href: '/highlights/2026-10-15-how-to-be-more-ambitious/' }],
	},
	{
		date: '2026-10-15',
		tag: '播客',
		type: 'polish',
		title: 'Grok Bot 设计师这一期：金句署名和时间都对上了',
		summary:
			'对照新做的文字稿，这一期页面上的金句改回主持人 Claire Vo 所说（25:33），之前误标成了 John。要点、一图读懂、听完你能回答里的时间也改到真正说到那件事的地方，点时间就从那句话听起；章节时间对齐到每段开头。',
		links: [{ label: '去听这一期', href: '/podcasts/how-i-ai-grok-bot-designers/' }],
	},
	{
		date: '2026-10-15',
		tag: '播客',
		type: 'content',
		title: 'Grok Bot 设计师这一期也有文字稿了',
		summary:
			'How I AI 两位 Grok Bot 设计师的这一期补上了完整文字稿：由节目音频自动转写并分出 Claire、John、Peng 三位说话人，配中文翻译。至此五期播客都有文字稿了，打开跟随播放，正在说的那段会高亮。',
		links: [{ label: '看文字稿', href: '/podcasts/how-i-ai-grok-bot-designers/transcript/' }],
	},
	{
		date: '2026-10-15',
		tag: '播客',
		type: 'content',
		title: 'Jev 这一期也有文字稿了',
		summary:
			'Latent Space 两个多小时的 Jev 一期补上了完整文字稿：英文取自节目官方发布的文字稿，配中文翻译。打开跟随播放，正在说的那段会高亮，点时间戳就从那里听，也可以在文字稿里搜索。',
		links: [{ label: '看文字稿', href: '/podcasts/latent-space-jev/transcript/' }],
	},
	{
		date: '2026-10-15',
		tag: '播客',
		type: 'content',
		title: 'Tibo Sottiaux 这一期也有文字稿了',
		summary:
			"Lenny's Podcast 采访 OpenAI ChatGPT 负责人 Tibo Sottiaux 的这一期补上了完整文字稿：英文取自节目公开的文字稿，配中文翻译，两段赞助口播单独标了出来。打开跟随播放，正在说的那段会高亮，点时间戳就从那里听。",
		links: [{ label: '看文字稿', href: '/podcasts/lennys-podcast-tibo-sottiaux/transcript/' }],
	},
	{
		date: '2026-10-15',
		tag: '播客',
		type: 'content',
		title: 'AlphaFold 这一期也有文字稿了',
		summary:
			'Latent Space 的 AlphaFold 一期补上了完整文字稿：英文取自节目官方发布的文字稿，按音频逐段对齐时间，并配了中文翻译。打开跟随播放，正在说的那段会高亮，点时间戳就从那里听。',
		links: [{ label: '看文字稿', href: '/podcasts/latent-space-alphafold/transcript/' }],
	},
	{
		date: '2026-10-14',
		tag: '播客',
		type: 'feature',
		title: '播客单集可以看完整文字稿',
		summary:
			'Meta Muse 这一期加了完整文字稿：按说话人分段，中文和英文原文可以切换；打开跟随播放，正在说的那段会高亮并自动滚到眼前，点时间戳就从那里听，还能在文字稿里搜索。单集页播放键旁边的「文字稿」进入。',
		links: [{ label: '看文字稿', href: '/podcasts/how-i-ai-meta-muse/transcript/' }],
	},
	{
		date: '2026-10-13',
		tag: '播客',
		type: 'content',
		title: '新增播客：Meta Muse：大家真心喜欢的 AI 智能体',
		summary:
			'How I AI 第二期：Meta 的设计总监 Alex Cornell 讲 Muse 怎么设计得像在跟一个人发消息，以及他自己怎么用它把 Instagram 收藏变成购物目录、追踪高尔夫成绩、把 20 年前的博客变成每天的播客。附一图读懂、时间花在哪和中文要点，站内直接收听。',
		links: [{ label: '收听这一期', href: '/podcasts/how-i-ai-meta-muse/' }],
	},
	{
		date: '2026-10-13',
		tag: '播客',
		type: 'polish',
		title: '播客单集页的「听什么」改成只列要点',
		summary:
			'「听什么」不再把章节和要点混在一起排：现在只列要点，每条一个时间按钮加一句话，下面小字写它在哪一章，点时间就从那里听，正在播的那条时间会变黑。',
		links: [{ label: '看一期', href: '/podcasts/lennys-podcast-tibo-sottiaux/' }],
	},
	{
		date: '2026-10-13',
		tag: '播客',
		type: 'content',
		title: '新增播客：OpenAI 的 ChatGPT 负责人：我们（又一次）进入了 AI 的新时代',
		summary:
			"收录第三档节目 Lenny's Podcast。负责 ChatGPT 和 Codex 的 Tibo Sottiaux 讲 OpenAI 新发布的个人智能体 Dots、为什么以后网上的多数操作会由智能体完成，以及 AI 时代哪些技能在升值。附一图读懂、时间花在哪和 24 章中文要点，站内直接收听。",
		links: [
			{ label: '收听这一期', href: '/podcasts/lennys-podcast-tibo-sottiaux/' },
			{ label: "Lenny's Podcast", href: '/podcasts/shows/lennys-podcast/' },
		],
	},
	{
		date: '2026-10-13',
		tag: '精选阅读',
		type: 'content',
		title: '新增精选阅读：我上个月是怎么把 2,500 个 PR 发上生产环境的',
		summary:
			'整理 Lauren Tan（poteto）的演讲：让智能体一个月交 2,000 多个 PR，靠的是先建立信任，包括会自己验证的技能、对智能体友好的代码库，以及从代码结构、lint 到规则和技能的一层层约束。文末附新手解读。',
		links: [{ label: '阅读', href: '/highlights/2026-10-13-how-i-shipped-2500-prs-last-month/' }],
	},
	{
		date: '2026-10-12',
		tag: '播客',
		type: 'content',
		title: '新增播客：我为什么没能在 OpenAI 做出 Jev',
		summary:
			'Latent Space 第二期：TypeSafe 的 Diogo Almeida 讲他为什么觉得大模型被练成了讨好人的聊天机器人，所以聪明却不可靠，以及他的新模型 Jev 怎样只给程序回答。附一图读懂、时间花在哪、主持人和嘉宾的分歧，和 20 章的中文要点。',
		links: [{ label: '收听这一期', href: '/podcasts/latent-space-jev/' }],
	},
	{
		date: '2026-10-12',
		tag: '播客',
		type: 'content',
		title: '新增播客：两位 Grok Bot 设计师，怎么用自己的产品干活',
		summary:
			'收录第二档节目 How I AI。这期两位 Grok Bot 设计师现场演示：发一张照片，个人网站就自己更新；在健身房录一段语音，就改完了 Figma；洗澡时的点子，回来就成了能点的原型。附一图读懂、时间花在哪和中文要点，站内直接收听。',
		links: [
			{ label: '收听这一期', href: '/podcasts/how-i-ai-grok-bot-designers/' },
			{ label: 'How I AI', href: '/podcasts/shows/how-i-ai/' },
		],
	},
	{
		date: '2026-10-12',
		tag: '播客',
		type: 'polish',
		title: '播客单集页加上「时间花在哪」和两位嘉宾的分歧',
		summary:
			'一图读懂下面多了一条时间条：这期 32 分钟分成五个话题，每段有多长一眼就能看到，点一段就从那里听，正在听的那段会变黑。再往下是两位嘉宾在哪里不一样：要不要看懂模型内部，各自的回答和原声时间点，以及两人都同意的地方。',
		links: [{ label: '看第一期', href: '/podcasts/latent-space-alphafold/' }],
	},
	{
		date: '2026-10-12',
		tag: '播客',
		type: 'polish',
		title: '播客单集页能看到进度，生词有解释',
		summary:
			'单集页的播放按钮旁边多了一条进度条，听到哪里一眼就能看到，拖动就从那里播；没在播时，它停在你上次听到的地方。「听什么」里的专业词加了虚线，鼠标移上去或点一下，就能看到它的意思，每个词只在第一次出现时标出来。',
		links: [{ label: '看第一期', href: '/podcasts/latent-space-alphafold/' }],
	},
	{
		date: '2026-10-12',
		tag: '播客',
		type: 'polish',
		title: '播客单集页加上「一图读懂」和「听完你能回答」',
		summary:
			'单集页开头多了一张卡：这期在回答什么问题、答案卡在哪几处，每处都能点了从那里听；下面是听完能回答的几个问题，先想想再点开看答案。单集页也更简单了，去掉了其他收听方式和相关知识。',
		links: [{ label: '看第一期', href: '/podcasts/latent-space-alphafold/' }],
	},
	{
		date: '2026-10-12',
		tag: '播客',
		type: 'feature',
		title: '新增播客：挑过的 AI 播客单集，附中文要点',
		summary:
			'新开播客栏目。每期有中文标题、两句导语、一句原话，以及章节和要点合成的一份大纲，点时间点就从那里开始播；站内直接收听，换页面也不中断。每档节目有自己的页面。第一期是 Latent Space 的《AlphaFold 为什么没有真正解决蛋白质折叠》。',
		links: [
			{ label: '播客', href: '/podcasts/' },
			{ label: '第一期', href: '/podcasts/latent-space-alphafold/' },
		],
	},
	{
		date: '2026-10-10',
		tag: 'WorkBuddy 教程',
		type: 'content',
		title: '新增 WorkBuddy 小程序实战',
		summary:
			'用 WorkBuddy 的小程序模式做一个语音输入、AI 自动分类的口喷记事本，从开发、预览、查看数据库到发布体验版或试用版，保留全部原图和成品演示视频。',
		links: [
			{
				label: '阅读 WorkBuddy 小程序实战',
				href: '/workbuddy-tutorials/workbuddy-miniprogram-guide/',
			},
		],
	},
	{
		date: '2026-10-10',
		tag: 'AI 动态',
		type: 'feature',
		title: '热门有了自己的入口，报道的媒体用图标展示',
		summary:
			'AI 动态左边多了「热门」，点进去能看到过去 48 小时全部热门，按时间排列；每条下面是报道它的媒体图标（X 上的账号显示头像），点哪个图标就读哪家的报道。',
		links: [{ label: '热门', href: '/ai-news/#hot' }],
	},
	{
		date: '2026-10-10',
		tag: 'AI 动态',
		type: 'feature',
		title: 'AI 动态加上热门',
		summary: '热门 bot 标出被多家媒体同时报道的新闻；首页搜索框的下拉里先列两条报道最多的热门。',
		links: [{ label: 'AI 动态', href: '/ai-news/' }],
	},
	{
		date: '2026-10-10',
		tag: 'AI 动态',
		type: 'feature',
		title: 'AI 动态有更新时会提醒你',
		summary:
			'上次看过之后有新的 AI 动态，导航里「AI 动态」旁边会显示新增条数，标签页标题前也会带上数字；刚打开网站时右下角提醒一次。开着 AI 动态页时来了新内容，顶部会出现「有 N 条新动态」，点一下放到最上面。',
		links: [{ label: 'AI 动态', href: '/ai-news/' }],
	},
	{
		date: '2026-10-09',
		tag: 'AI 动态',
		type: 'feature',
		title: '首页搜索框里看最新 AI 动态',
		summary:
			'点进首页搜索框、还没打字时，下面列出最新 5 条 AI 动态（手机上 3 条），点一条直接读原文；开始打字就收起，照常搜索。',
		links: [{ label: 'AI 动态', href: '/ai-news/' }],
	},
	{
		date: '2026-10-08',
		tag: 'AI 动态',
		type: 'feature',
		title: '新增 AI 动态：每小时更新的 AI 新闻',
		summary:
			'新开 AI 动态栏目。每条新闻一句话讲清发生了什么，配原文封面，点开直接读原文；左边按天切换，也能搜索最近 30 天。',
		links: [{ label: 'AI 动态', href: '/ai-news/' }],
	},
	{
		date: '2026-09-29',
		tag: 'Vibe Coding',
		type: 'feature',
		title: '新增 Showcase：收集别人用 AI 做出的酷炫作品',
		summary:
			'Vibe Coding 下新开 Showcase 子栏目，按作品类型分类展示，首个分类是 Code to Video。首件作品是 Claude Opus 5.5 复刻自己的发布视频。',
		links: [
			{ label: '浏览 Showcase', href: '/vibe-coding/showcase/' },
			{
				label: '观看 Claude Opus 5.5 发布视频',
				href: '/vibe-coding/showcase/claude-opus-5.5-intro/',
			},
		],
	},
	{
		date: '2026-09-28',
		tag: '精选阅读',
		type: 'content',
		title: '收录 Claude 自动评测设计与爬坡优化指南',
		summary:
			'新增中英文详细精读，保留全部 9 张原图与关键实验数据，解读评测设计、爬坡流程及过拟合防范。',
		links: [
			{
				label: '阅读评测与爬坡优化指南',
				href: '/highlights/2026-09-28-automating-eval-design-and-hillclimbing/',
			},
		],
	},
	{
		date: '2026-09-27',
		tag: '精选阅读',
		type: 'content',
		title: '收录 Claude Code effort 使用指南',
		summary:
			'新增《使用 Claude Code：如何分配 effort，让算力用在关键处》中英文全文，保留原图与测试数据，并附术语和实践解读。',
		links: [
			{
				label: '阅读 effort 使用指南',
				href: '/highlights/2026-09-27-using-claude-code-spending-your-effort/',
			},
		],
	},
	{
		date: '2026-09-16',
		tag: '模型评测与 AI 术语',
		type: 'content',
		title: '新增 DeepSWE 评测与置信区间图解',
		summary:
			'Benchmarks 收录 DeepSWE v1.1 软件工程评测；AI 术语新增 Confidence Interval，用抽糖果的例子解释分数背后的不确定性。',
		highlights: [
			'DeepSWE 页面介绍任务、评测方式与阅读要点，整理官方快照中的 21 个模型成绩、推理设置和置信区间',
			'各评测表格增加模型品牌图标，缩小字体并调整行距，让模型与分数更容易对照',
			'置信区间配有样本量切换实验，演示抽样数量如何影响区间宽度，并解释 95% 置信水平的含义',
		],
		links: [
			{ label: '查看 DeepSWE', href: '/benchmarks/deepswe/' },
			{ label: '理解置信区间', href: '/vibe-coding/terms/confidence-interval/' },
		],
	},
	{
		date: '2026-09-15',
		tag: '精选阅读与筛选体验',
		type: 'content',
		title: '收录 OpenAI Astra Skills 与提示词指南',
		summary:
			'新增 OpenAI 官方博文《重新审视 GPT-6 Astra 的 Skills 与提示词》中英双语全文，讨论模型升级后如何调整 Skill 描述、上下文与任务完成标准。',
		highlights: [
			'中文版本保留技术细节、示例与原文出处，方便对照阅读',
			'栏目年份筛选改为与网站风格一致的下拉菜单，调整选中态，并支持键盘操作',
		],
		links: [
			{
				label: '阅读 Astra Skills 与提示词指南',
				href: '/highlights/2026-09-14-rethinking-skills-and-prompts-for-gpt-6-astra/',
			},
		],
	},
	{
		date: '2026-09-11',
		tag: '教程与栏目导航',
		type: 'feature',
		readingUpdates: ['/workbuddy-tutorials/workbuddy-feishu-workflow-guide/'],
		title: '新增 WorkBuddy 飞书实战，统一栏目目录入口',
		summary:
			'WorkBuddy 教程新增飞书工作流实战；各栏目的目录统一到首页对应分区，减少内容重复、入口混淆的问题。',
		highlights: [
			'通过群消息总结与 Skills 收藏、截图记账与数据看板、项目周报三个案例，介绍 WorkBuddy 与飞书的配合方式',
			'统一教程、精选阅读、Benchmarks 和 Vibe Coding 等栏目的目录入口，保留文章详情页地址',
			'移除旧栏目目录和旧年份归档页，修复旧目录缓存仍显示重复内容的问题',
		],
		links: [
			{
				label: '阅读 WorkBuddy 飞书实战',
				href: '/workbuddy-tutorials/workbuddy-feishu-workflow-guide/',
			},
			{ label: '浏览教程目录', href: '/tutorials/' },
		],
	},
	{
		date: '2026-09-10',
		tag: '界面术语与视觉优化',
		type: 'polish',
		readingUpdates: ['/vibe-coding/terms/date-picker/'],
		title: '新增日期选择器图鉴，统一 Benchmarks 3D 封面',
		summary:
			'界面图鉴新增 Date Picker，介绍日期选择器的用途与常见形态；Benchmarks 换上与其他栏目一致的 3D 封面。',
		highlights: [
			'通过结构图、变体与辨认练习，说明日期选择器在界面中的用法',
			'统一评测栏目封面的建模风格，修复从详情页返回时光影发生跳变的问题',
		],
		links: [
			{ label: '了解 Date Picker', href: '/vibe-coding/terms/date-picker/' },
			{ label: '浏览 Benchmarks', href: '/benchmarks/' },
		],
	},
	{
		date: '2026-09-09',
		tag: '模型评测与界面术语',
		type: 'feature',
		readingUpdates: ['/vibe-coding/terms/divider/'],
		title: 'Benchmarks 栏目上线，新增分割线图鉴',
		summary:
			'新增模型评测栏目，把榜单成绩与评测解释放在一起，帮助读者理解每项测试在测什么、分数应该怎么看。',
		highlights: [
			'评测详情提供中英双语说明、模型成绩、数据来源与阅读提示，支持表格排序',
			'接入首页栏目导航与知识搜索，阅读详情后可以返回对应栏目',
			'界面图鉴新增 Divider，解释分割线如何组织内容层次，以及不同形式的使用场景',
		],
		links: [
			{ label: '探索 Benchmarks', href: '/benchmarks/' },
			{ label: '了解 Divider', href: '/vibe-coding/terms/divider/' },
		],
	},
	{
		date: '2026-09-07',
		tag: '首页与阅读体验',
		type: 'feature',
		title: 'BrainPod 首页上线，新增逐篇未读提示',
		summary:
			'首页改为可交互的 3D iPod 知识入口，配合栏目模型封面、滚动展开和屏幕内阅读，让浏览知识库多一种方式。',
		highlights: [
			'支持通过 iPod 菜单浏览栏目，滚动进入完整页面，并提供猫咪锁屏与本地时钟',
			'栏目列表和 iPod 菜单增加逐篇未读圆点，打开文章后更新已读状态；首次访问显示近三天的内容更新',
			'统一导航、正文排版与页脚，完善响应式图片，适配不同屏幕下的阅读',
		],
		links: [{ label: '体验 BrainPod 首页', href: '/' }],
	},
	{
		date: '2026-09-06',
		tag: '精选阅读',
		type: 'content',
		title: '新增 OpenAI 研究加速与 Slop-Creep 精选阅读',
		summary:
			'收录 OpenAI 关于 AI 研究加速的一手观察，以及 Brandon Sovran 对构建成本下降与思考的讨论；提供中文译文和原文出处。',
		links: [
			{
				label: '低质系统的蔓延：当构建比思考更便宜',
				href: '/highlights/2026-09-06-slop-creep-when-building-gets-cheaper/',
			},
			{
				label: '研究加速：从 OpenAI 内部看 AI 研究的变化',
				href: '/highlights/2026-09-06-research-acceleration-view-inside-openai/',
			},
		],
	},
	{
		date: '2026-09-04',
		readingUpdates: ['/highlights/2026-08-31-how-our-agents-build-on-brand-pages-with-design-md/'],
		tag: '搜索与阅读体验',
		type: 'feature',
		title: '全站知识搜索与文章阅读体验升级',
		summary:
			'知识搜索现已覆盖教程、精选阅读、术语、Skills、Design 与关于页；文章页同步升级图片呈现、阅读尺度和内容统计，并收录 Vercel 的 design.md 设计评测实践。',
		highlights: [
			'知识搜索扩展至 213 条全站内容，保留更新日志在索引之外',
			'文章正文采用更舒适的阅读宽度，图片与正文对齐并支持响应式加载和大图查看',
			'首页内容数字改为根据实际可阅读页面实时统计',
			'精选阅读新增 Vercel《Agent 如何用 design.md 构建符合品牌的页面》中英双语全文',
		],
		links: [
			{ label: '体验知识搜索', href: '/search/' },
			{
				label: '阅读 Vercel design.md 实践',
				href: '/highlights/2026-08-31-how-our-agents-build-on-brand-pages-with-design-md/',
			},
		],
	},
	{
		date: '2026-09-02',
		tag: '精选阅读',
		type: 'content',
		title: '收录 Anthropic 官方指南《为 Claude Fable 5.1 编写提示》',
		summary:
			'Anthropic 针对 Claude Fable 5.1 的官方实战提示指南：详解 Effort 参数调优、长任务持续汇报机制，以及工具批量调用、对话历史与视觉任务处理。',
		highlights: [
			'系统梳理 Fable 5.1 模型特性与思考预算（Thinking Effort）配置方法',
			'解析 Agent 长任务中避免过早退出的提示词约束模式',
			'收录完整中英双语对照版本与实战代码样例',
		],
		links: [
			{
				label: '阅读实战指南',
				href: '/highlights/2026-09-02-prompting-claude-fable-5-1/',
			},
		],
	},
	{
		date: '2026-08-31',
		readingUpdates: ['/newbie-tutorials/why-ai-forgets/'],
		tag: '交互与教程',
		type: 'polish',
		title: '侧边栏手风琴导航升级 & 新手村《AI 为什么会遗忘》',
		summary:
			'左侧主导航新增手风琴互斥折叠效果，大幅优化移动端浏览体验；新手村上线图解新篇《AI 为什么会遗忘》。',
		highlights: [
			'侧边栏多级菜单支持原生互斥展开，精简页面滚动距离',
			'新手村新增《AI 为什么会遗忘》，图解上下文窗口、注意力机制与 KV Cache 限制',
			'配套上线直觉互动实验，直观体验上下文截断的影响',
		],
		links: [
			{
				label: '阅读《AI 为什么会遗忘》',
				href: '/newbie-tutorials/why-ai-forgets/',
			},
		],
	},
	{
		date: '2026-08-30',
		tag: '新栏目上线',
		type: 'content',
		title: '「新手村」栏目正式上线',
		summary: '专为零技术背景读者打造，用直觉比喻、动图与交互小实验讲透大模型的核心工作原理。',
		highlights: [
			'首发上线《AI 为什么会胡说八道》《什么是知识库》等核心图解教程',
			'内置动态交互小实验，直观体验大模型概率采样与幻觉成因',
			'主站导航与知识库首页正式接入「新手村」独立专区',
		],
		links: [
			{
				label: '前往「新手村」体验',
				href: '/tutorials/#newbie-tutorials',
			},
		],
	},
	{
		date: '2026-08-29',
		tag: '关于页与术语',
		type: 'polish',
		title: '关于页上线微信交流渠道 & Token 术语图解完善',
		summary:
			'关于页正式上线微信「BubbleBrain小助手」二维码与读者交流渠道；Vibe Coding 术语专区完善 Token 换算与交互实验。',
		highlights: [
			'关于页（中/英）新增微信小助手二维码与交流渠道',
			'修正 Token 术语的中英字符换算逻辑并补齐定制动态图解',
		],
		links: [
			{ label: '查看关于页', href: '/about/' },
			{ label: '查看 Token 术语', href: '/vibe-coding/terms/token/' },
		],
	},
	{
		date: '2026-08-28',
		tag: '系统升级',
		type: 'polish',
		title: '接入 Umami 隐私友好访问统计',
		summary:
			'全站接入轻量、合规且不追踪个人隐私的 Umami 访问统计系统，完成 Cloudflare Pages 严格的 CSP 安全放行。',
		highlights: [
			'替代繁重且国内访问受限的传统分析工具，脚本体积仅 2KB 且无 Cookie',
			'严格配置 Content-Security-Policy，确保生产环境静态交付安全',
		],
	},
	{
		date: '2026-08-27',
		tag: '重大更新',
		type: 'feature',
		title: 'Vibe Coding「Design 专区」与「Skills 技能库」双上线',
		summary:
			'重磅推出 Vibe Coding 旗下两大专区：23+ 家知名科技品牌 DESIGN.md 规范库与 20+ 个生产级 Agent Skills 库。',
		highlights: [
			'上线 Design 专区：系统拆解 Stripe、Vercel、Apple、Linear 等知名品牌的视觉规范与设计哲学',
			'上线 Skills 专区：收录 agent-browser 等 20 个开箱即用的 AI Agent 技能',
			'提供一键复制的 Prompt 指令，帮助 AI 编码工具输出顶级工程代码',
		],
		links: [
			{ label: '浏览 Design 专区', href: '/vibe-coding/design/' },
			{ label: '探索 Skills 技能库', href: '/vibe-coding/skills/' },
		],
	},
	{
		date: '2026-08-24',
		tag: '视觉改版',
		type: 'feature',
		title: '知识库首页全新改版 V2',
		summary:
			'首页采用全新的动效视觉与 RicoUI 设计系统，上线知识库全局分类、术语交互式 Demo 与互动猫咪视线追踪。',
		highlights: [
			'引入动效 Editorial 风格排版，更加清爽聚焦',
			'集成 Canvas 视线追踪交互与文章数据统计看板',
			'上线全局知识分类索引与精选内容智能排序',
		],
		links: [{ label: '回到首页体验', href: '/' }],
	},
];
