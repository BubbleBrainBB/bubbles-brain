export interface DesignBrandColor {
	name: string;
	hex: string;
	role: string;
}

export interface DesignBrandTypeRow {
	sample: string;
	spec: string;
	style: string;
}

export interface DesignBrandPlate {
	bg: string;
	strip?: string;
	headline: string;
	headlineStyle: string;
}

export interface DesignBrand {
	id: string;
	name: string;
	category: string;
	tagline: string;
	lede: string;
	philosophy: string[];
	colors: DesignBrandColor[];
	typePanelStyle?: string;
	typeScale: DesignBrandTypeRow[];
	dos: string[];
	donts: string[];
	plate: DesignBrandPlate;
	sourceFile: string;
}

export const designBrands: DesignBrand[] = [
	{
		id: 'stripe',
		name: 'Stripe',
		category: '金融',
		tagline: '渐变薄雾 + 300 细体标题的金融精密感',
		lede: '营销页顶部铺一条横向渐变，大标题用 300 的细字重，金额数字全部等宽对齐。',
		philosophy: [
			'营销页首屏顶部铺一条横向渐变，从奶油、橙、淡紫过渡到靛蓝和宝石红，大约占页面上部三分之一。',
			'实心按钮只用靛蓝 #533afd 一种颜色，一屏通常只出现一个。',
			'正文不用纯黑，用深海军蓝 #0d253d。',
			'金额和日期都用等宽数字，上下行的数字能对齐。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#533afd',
				role: '主按钮，一屏一个',
			},
			{
				name: 'primary-deep',
				hex: '#4434d4',
				role: '渐变中段，比主色深一档',
			},
			{
				name: 'primary-press',
				hex: '#2e2b8c',
				role: '按钮按下',
			},
			{
				name: 'brand-dark-900',
				hex: '#1c1e54',
				role: '定价卡和仪表盘的深色底',
			},
			{
				name: 'ink',
				hex: '#0d253d',
				role: '正文',
			},
			{
				name: 'ink-secondary',
				hex: '#273951',
				role: '次要文字',
			},
			{
				name: 'ink-mute',
				hex: '#64748d',
				role: '辅助说明和表格标签',
			},
			{
				name: 'ruby',
				hex: '#ea2261',
				role: '渐变和图表点缀，不做按钮',
			},
			{
				name: 'magenta',
				hex: '#f96bee',
				role: '渐变里的亮粉',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
			{
				name: 'canvas-soft',
				hex: '#f6f9fc',
				role: '功能区的浅色底',
			},
			{
				name: 'canvas-cream',
				hex: '#f5e9d4',
				role: '暖色的过渡区',
			},
			{
				name: 'hairline',
				hex: '#e3e8ee',
				role: '卡片和表格的细线',
			},
		],
		typeScale: [
			{
				sample: 'Payments at scale',
				spec: '大标题，56px，300 字重，字距 -1.4px',
				style:
					'font-weight:300;font-size:clamp(30px,4.5vw,46px);letter-spacing:-0.032em;color:#0d253d;line-height:1.05',
			},
			{
				sample: 'Built for developers',
				spec: '中标题，32px，300 字重，字距 -0.64px',
				style: 'font-weight:300;font-size:26px;letter-spacing:-0.02em;color:#0d253d',
			},
			{
				sample: 'Body text stays quiet and legible on white canvas.',
				spec: '正文，16px，400 字重',
				style: 'font-size:15px;color:#273951',
			},
			{
				sample: '$1,284,502.00 · 2026-08-26',
				spec: '说明文字，13px，等宽数字',
				style:
					'font-size:13px;color:#64748d;font-variant-numeric:tabular-nums;letter-spacing:-0.02em',
			},
		],
		dos: [
			'营销页首屏都铺渐变',
			'大标题用 300 字重，字距收紧',
			'金额一律用等宽数字',
			'功能说明配真实的产品截图',
		],
		donts: [
			'标题字重加到 400 以上',
			'用靛蓝做正文颜色',
			'在渐变之外再加新的强调色',
			'把药丸形按钮改成圆角矩形',
		],
		plate: {
			bg: '#ffffff',
			strip:
				'linear-gradient(100deg, #f5e9d4, #ffb199 22%, #cabffd 47%, #533afd 72%, #ea2261 100%)',
			headline: 'Financial infrastructure to grow your revenue',
			headlineStyle:
				'font-weight:300;font-size:clamp(26px,3.6vw,40px);letter-spacing:-0.04em;color:#0d253d;line-height:1.12',
		},
		sourceFile: 'stripe',
	},
	{
		id: 'linear',
		name: 'Linear',
		category: '开发工具',
		tagline: '近乎纯黑的画布上，只留一点薰衣草蓝',
		lede: '底色是带一点蓝的近黑 #010102，层次靠四级灰阶和细线来分，唯一的彩色是薰衣草蓝 #5e6ad2。',
		philosophy: [
			'页面底色用 #010102，比纯黑多一点蓝。',
			'卡片和面板分四级灰阶，从 surface-1 到 surface-4，再用细线分隔，不用阴影。',
			'只有一种彩色：薰衣草蓝 #5e6ad2，只用在 logo、焦点框和主按钮上。',
			'每一节都以产品截图为主，页面上的其他装饰尽量少。',
		],
		colors: [
			{
				name: 'canvas',
				hex: '#010102',
				role: '页面底色',
			},
			{
				name: 'surface-1',
				hex: '#0f1011',
				role: '卡片底，第一级',
			},
			{
				name: 'surface-2',
				hex: '#141516',
				role: '第二级',
			},
			{
				name: 'surface-3',
				hex: '#18191a',
				role: '第三级',
			},
			{
				name: 'surface-4',
				hex: '#191a1b',
				role: '第四级',
			},
			{
				name: 'hairline',
				hex: '#23252a',
				role: '细线边框',
			},
			{
				name: 'hairline-strong',
				hex: '#34343a',
				role: '更明显的分隔线',
			},
			{
				name: 'primary',
				hex: '#5e6ad2',
				role: 'logo、焦点框和主按钮',
			},
			{
				name: 'primary-hover',
				hex: '#828fff',
				role: '主按钮悬停',
			},
			{
				name: 'ink',
				hex: '#f7f8f8',
				role: '正文和标题',
			},
			{
				name: 'ink-muted',
				hex: '#d0d6e0',
				role: '次要文字',
			},
			{
				name: 'ink-subtle',
				hex: '#8a8f98',
				role: '弱化的文字',
			},
			{
				name: 'semantic-success',
				hex: '#27a644',
				role: '状态标签里的绿色，很少用',
			},
		],
		typePanelStyle: 'background:#010102;border-color:#23252a',
		typeScale: [
			{
				sample: 'Plan and build products',
				spec: '大标题，600 字重，80px 时字距 -3px',
				style:
					'font-weight:600;font-size:clamp(28px,4vw,42px);letter-spacing:-0.035em;color:#f7f8f8;line-height:1.05',
			},
			{
				sample: 'Purpose-built for modern product development.',
				spec: '正文，400 字重，字距 -0.05px',
				style: 'font-size:15px;color:#8a8f98',
			},
			{
				sample: 'LIN-204 · Fix drag latency on board view',
				spec: '等宽字体，用在截图里的代码和工单编号',
				style: "font-family:ui-monospace,'SF Mono',monospace;font-size:13px;color:#d0d6e0",
			},
		],
		dos: [
			'用四级灰阶区分层次，不要跳级',
			'薰衣草蓝只给 logo、焦点框和主按钮',
			'大标题用 600 字重，字距收紧',
			'每一节都放产品截图',
		],
		donts: [
			'做浅色的营销页',
			'用薰衣草蓝铺背景或填充卡片',
			'加第二种强调色',
			'把按钮做成药丸形，Linear 用 8px 圆角',
		],
		plate: {
			bg: '#010102',
			headline: 'Plan and build products',
			headlineStyle:
				'color:#f7f8f8;font-size:clamp(24px,3.4vw,38px);font-weight:600;letter-spacing:-0.035em;line-height:1.05',
		},
		sourceFile: 'linear',
	},
	{
		id: 'notion',
		name: 'Notion',
		category: 'SaaS',
		tagline: '海军蓝画布上的紫色按钮与便利贴粉彩',
		lede: '首屏是深海军蓝色带配彩色圆点装饰，主按钮用紫色 #5645d4，下方功能卡用桃、玫瑰、薄荷等浅色底。',
		philosophy: [
			'全站主按钮都用紫色 #5645d4，按下时变成 #4534b3。',
			'按钮是 8px 圆角的矩形，卡片用 12px 圆角，不做药丸形。',
			'功能卡底色用桃、玫瑰、薄荷、薰衣草、天空、黄，和产品里数据库标签的颜色一致。',
			'首屏标题居中，下面放一张真实的工作区截图，带较深的投影。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#5645d4',
				role: '主按钮，全站统一',
			},
			{
				name: 'primary-pressed',
				hex: '#4534b3',
				role: '主按钮按下',
			},
			{
				name: 'brand-navy',
				hex: '#0a1530',
				role: '首屏深色色带',
			},
			{
				name: 'brand-navy-mid',
				hex: '#1a2a52',
				role: '色带的中间层',
			},
			{
				name: 'link-blue',
				hex: '#0075de',
				role: '文字链接，和紫色分开用',
			},
			{
				name: 'brand-orange',
				hex: '#dd5b00',
				role: '圆点装饰，橙',
			},
			{
				name: 'brand-pink',
				hex: '#ff64c8',
				role: '圆点装饰，粉',
			},
			{
				name: 'brand-purple',
				hex: '#7b3ff2',
				role: '圆点装饰，紫',
			},
			{
				name: 'brand-teal',
				hex: '#2a9d99',
				role: '圆点装饰，青',
			},
			{
				name: 'brand-yellow',
				hex: '#f5d75e',
				role: '高亮',
			},
			{
				name: 'card-tint-peach',
				hex: '#ffe8d4',
				role: '功能卡底色，桃',
			},
			{
				name: 'card-tint-rose',
				hex: '#fde0ec',
				role: '功能卡底色，玫瑰',
			},
			{
				name: 'card-tint-mint',
				hex: '#d9f3e1',
				role: '功能卡底色，薄荷',
			},
		],
		typeScale: [
			{
				sample: 'Meet the night shift.',
				spec: '首屏大标题，Notion-Sans（基于 Inter），80px，600 字重，字距 -2px，居中',
				style:
					'font-weight:700;font-size:clamp(26px,4vw,40px);letter-spacing:-0.02em;color:#1a1a1a',
			},
			{
				sample: 'One workspace, every team.',
				spec: '副标题，18px，400 字重',
				style: 'font-size:16px;color:#787671',
			},
			{
				sample: 'Get Notion free',
				spec: '按钮文字，14px，500 字重，按钮 8px 圆角',
				style:
					'display:inline-block;background:#5645d4;color:#fff;border-radius:8px;padding:8px 16px;font-size:13.5px;font-weight:600',
			},
		],
		dos: [
			'主按钮统一用紫色 #5645d4',
			'首屏用海军蓝底加彩色圆点',
			'功能卡用粉彩底色区分',
			'按钮统一 8px 圆角',
		],
		donts: [
			'用紫色写正文或铺大面积背景',
			'把按钮做成药丸形',
			'混用链接蓝和品牌紫',
			'给纯文档卡片加重投影',
		],
		plate: {
			bg: '#0a1530',
			headline: 'Meet the night shift.',
			headlineStyle:
				'color:#ffffff;font-size:clamp(24px,3.4vw,38px);font-weight:700;letter-spacing:-0.02em;line-height:1.1',
		},
		sourceFile: 'notion',
	},
	{
		id: 'vercel',
		name: 'Vercel',
		category: '基础设施',
		tagline: '黑白灰的极简，加一道只在高处出现的彩虹',
		lede: '近白底配近黑文字，唯一的彩色是只在首屏出现的多色网格渐变，标题用 600 字重和大负字距。',
		philosophy: [
			'主按钮直接用黑色 #171717，转化按钮不用彩色。',
			'青、蓝、品红、琥珀的网格渐变只在首屏大面积用，不缩成小图标。',
			'卡片阴影由两层很淡的小偏移阴影加内描边叠成，不用一层重投影。',
			'技术类小标签用 Geist Mono 等宽字体，正文从不用等宽。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#171717',
				role: '主按钮',
			},
			{
				name: 'on-primary',
				hex: '#ffffff',
				role: '黑底上的文字',
			},
			{
				name: 'ink',
				hex: '#171717',
				role: '标题',
			},
			{
				name: 'body',
				hex: '#4d4d4d',
				role: '正文段落',
			},
			{
				name: 'mute',
				hex: '#888888',
				role: '次要文字',
			},
			{
				name: 'hairline',
				hex: '#ebebeb',
				role: '分隔细线',
			},
			{
				name: 'hairline-strong',
				hex: '#a1a1a1',
				role: '较重的细线，禁用态',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '卡片底色',
			},
			{
				name: 'canvas-soft',
				hex: '#fafafa',
				role: '页面底色',
			},
			{
				name: 'canvas-soft-2',
				hex: '#f5f5f5',
				role: '内嵌区块底色',
			},
			{
				name: 'link',
				hex: '#0070f3',
				role: '文字链接',
			},
			{
				name: 'error',
				hex: '#ee0000',
				role: '错误提示',
			},
			{
				name: 'warning',
				hex: '#f5a623',
				role: '警告提示',
			},
		],
		typeScale: [
			{
				sample: 'Develop. Preview. Ship.',
				spec: '大标题，Geist，48px，600 字重，字距 -2.4px，句首大写',
				style:
					'font-weight:600;font-size:clamp(28px,4vw,42px);letter-spacing:-0.045em;color:#171717;line-height:1.05',
			},
			{
				sample: 'The platform for frontend developers.',
				spec: '正文，Geist，400 字重',
				style: 'font-size:15px;color:#4d4d4d',
			},
			{
				sample: 'DEPLOYS — vercel.json',
				spec: '技术标签，Geist Mono',
				style:
					"font-family:ui-monospace,'SF Mono',monospace;font-size:12px;color:#888;letter-spacing:0.04em",
			},
		],
		dos: [
			'营销按钮做黑色药丸形，应用内用 6px 圆角',
			'标题用 600 字重，句首大写，负字距',
			'渐变只放在首屏做大面积背景',
			'卡片用多层浅阴影叠加',
		],
		donts: [
			'在黑灰和渐变四色之外加强调色',
			'标题用全大写',
			'给卡片加一层重投影',
			'大标题字重用到 700',
		],
		plate: {
			bg: '#171717',
			strip: 'linear-gradient(90deg, #00dfd8, #007cf0 35%, #ff0080 70%, #f9cb28 100%)',
			headline: '▲ Develop. Preview. Ship.',
			headlineStyle:
				'color:#ffffff;font-size:clamp(24px,3.4vw,38px);font-weight:600;letter-spacing:-0.045em;line-height:1.05',
		},
		sourceFile: 'vercel',
	},
	{
		id: 'nike',
		name: 'Nike',
		category: '消费品牌',
		tagline: '摄影说话，界面闭嘴',
		lede: '首屏是满幅摄影配 96px 全大写 Futura 标题，界面只用黑白灰和药丸形按钮，红色只留给促销价。',
		philosophy: [
			'颜色和情绪都交给摄影，导航、筛选、按钮和卡片只用黑白灰。',
			'按钮、搜索框、筛选标签都是药丸形，商品卡没有圆角也没有阴影。',
			'黑白灰约占界面 95%，促销红 #d30005 只出现在价格行。',
			'间距按 8px 网格，章节之间隔 48px，排得像印刷商品目录。',
		],
		colors: [
			{
				name: 'ink',
				hex: '#111111',
				role: '主按钮和主文字',
			},
			{
				name: 'charcoal',
				hex: '#39393b',
				role: '正文',
			},
			{
				name: 'ash',
				hex: '#4b4b4d',
				role: '次要文字',
			},
			{
				name: 'mute',
				hex: '#707072',
				role: '弱化文字',
			},
			{
				name: 'stone',
				hex: '#9e9ea0',
				role: '占位和失效状态',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
			{
				name: 'soft-cloud',
				hex: '#f5f5f5',
				role: '商品照片的底色',
			},
			{
				name: 'hairline',
				hex: '#cacacb',
				role: '分隔细线',
			},
			{
				name: 'hairline-soft',
				hex: '#e5e5e5',
				role: '较浅的分隔线',
			},
			{
				name: 'sale',
				hex: '#d30005',
				role: '只用于促销价',
			},
			{
				name: 'success',
				hex: '#007d48',
				role: '有货和成功提示',
			},
			{
				name: 'info',
				hex: '#1151ff',
				role: '信息提示',
			},
			{
				name: 'accent-pink',
				hex: '#ed1aa0',
				role: '品类点缀，不进主界面',
			},
		],
		typeScale: [
			{
				sample: 'JUST DO IT.',
				spec: '活动大标题，Nike Futura ND，96px，行高 0.9，全大写',
				style:
					'font-weight:900;font-size:clamp(30px,5vw,48px);text-transform:uppercase;letter-spacing:-0.02em;line-height:0.95;color:#111',
			},
			{
				sample: 'Trail Running Collection',
				spec: '栏目标题，Helvetica Now，32px，500 字重',
				style: 'font-weight:500;font-size:22px;color:#111',
			},
			{
				sample: '¥1,299 ¥899',
				spec: '价格，促销价用红色 #d30005',
				style: 'font-size:14px;color:#d30005;font-weight:600',
			},
		],
		dos: [
			'96px Futura 只用于活动主视觉',
			'每屏只放一个黑色主按钮',
			'商品照片统一放在 #f5f5f5 底上',
			'按钮一律做药丸形',
		],
		donts: [
			'给商品卡加阴影或圆角',
			'用促销红做背景或徽章',
			'用第三种按钮形状',
			'同一排放两个同级活动标题',
		],
		plate: {
			bg: '#f5f5f5',
			headline: 'Just do it.',
			headlineStyle:
				'font-weight:900;font-size:clamp(26px,3.8vw,42px);text-transform:uppercase;letter-spacing:-0.02em;line-height:0.95;color:#111111',
		},
		sourceFile: 'nike',
	},
	{
		id: 'claude',
		name: 'Claude',
		category: 'AI',
		tagline: '奶油纸底 + 赤陶珊瑚的书房气质',
		lede: '底色是暖奶油色 #faf9f5，大标题用 400 字重的 Copernicus 衬线体，珊瑚色 #cc785c 只给主按钮和整张提示卡。',
		philosophy: [
			'页面底色用奶油色 #faf9f5，不用纯白或冷灰。',
			'衬线大标题一律 400 字重，带负字距，不加粗。',
			'珊瑚色在按钮上只用一处，用在提示卡时整张卡铺满。',
			'奶油色区块和深色产品截图区块交替排，同一种不连排两段。',
		],
		colors: [
			{
				name: 'canvas',
				hex: '#faf9f5',
				role: '页面底色',
			},
			{
				name: 'surface-soft',
				hex: '#f5f0e8',
				role: '浅奶油区块',
			},
			{
				name: 'surface-card',
				hex: '#efe9de',
				role: '功能卡片底色',
			},
			{
				name: 'surface-dark',
				hex: '#181715',
				role: '深色产品区块',
			},
			{
				name: 'surface-dark-elevated',
				hex: '#252320',
				role: '深色区块上的浮层',
			},
			{
				name: 'primary',
				hex: '#cc785c',
				role: '主按钮和整张提示卡',
			},
			{
				name: 'primary-active',
				hex: '#a9583e',
				role: '主按钮按下',
			},
			{
				name: 'ink',
				hex: '#141413',
				role: '标题',
			},
			{
				name: 'body',
				hex: '#3d3d3a',
				role: '正文',
			},
			{
				name: 'body-strong',
				hex: '#252523',
				role: '加重的正文',
			},
			{
				name: 'muted',
				hex: '#6c6a64',
				role: '次要文字',
			},
			{
				name: 'hairline',
				hex: '#e6dfd8',
				role: '分隔细线',
			},
			{
				name: 'on-dark',
				hex: '#faf9f5',
				role: '深色区块上的文字',
			},
		],
		typeScale: [
			{
				sample: 'Helpful, honest, harmless',
				spec: '大标题，Copernicus 衬线，64px，400 字重，字距 -1.5px',
				style:
					"font-family:Georgia,'Songti SC',serif;font-weight:400;font-size:clamp(26px,4vw,38px);letter-spacing:-0.02em;color:#141413",
			},
			{
				sample: 'Warm paper, serif voice, one terracotta accent.',
				spec: '正文，StyreneB 或 Inter，16px，400 字重',
				style: 'font-size:15px;color:#3d3d3a',
			},
			{
				sample: 'claude -p "explain this codebase"',
				spec: '代码，JetBrains Mono，14px，放在深色区块上',
				style:
					"font-family:ui-monospace,'SF Mono',monospace;font-size:13px;color:#faf9f5;background:#181715;padding:8px 12px;border-radius:8px;display:inline-block",
			},
		],
		dos: [
			'每页都用奶油色做底',
			'大标题用 Copernicus 400 字重',
			'珊瑚色只给主按钮和整张提示卡',
			'奶油区块和深色区块交替排',
		],
		donts: ['用纯白或冷灰做底色', '衬线标题加粗到 700', '用冷蓝或青色做强调色', '到处点缀珊瑚色'],
		plate: {
			bg: '#faf9f5',
			headline: 'Helpful, honest, harmless',
			headlineStyle:
				"font-family:Georgia,'Songti SC',serif;font-size:clamp(24px,3.4vw,38px);color:#141413;font-weight:400;letter-spacing:-0.02em;line-height:1.15",
		},
		sourceFile: 'claude',
	},
	{
		id: 'apple',
		name: 'Apple',
		category: '消费科技',
		tagline: '产品摄影前，界面近乎隐形',
		lede: '每屏是一块满幅产品区块，白和近黑交替排列，唯一的强调色是交互蓝 #0066cc，正文用 17px。',
		philosophy: [
			'浅色区块和近黑区块满幅交替，换色处就是分隔，不另加线。',
			'所有可点击元素都用蓝色 #0066cc，系统里没有第二个品牌色。',
			'只有放在台面上的产品图带投影，卡片、按钮和文字都不加。',
			'标题用负字距排紧，正文 17px，字重只用 300、400、600、700。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#0066cc',
				role: '链接和按钮，唯一交互色',
			},
			{
				name: 'primary-on-dark',
				hex: '#2997ff',
				role: '深色区块上的链接',
			},
			{
				name: 'ink',
				hex: '#1d1d1f',
				role: '正文，不用纯黑',
			},
			{
				name: 'ink-muted-48',
				hex: '#7a7a7a',
				role: '次要文字和脚注',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
			{
				name: 'canvas-parchment',
				hex: '#f5f5f7',
				role: '浅色产品区块',
			},
			{
				name: 'surface-pearl',
				hex: '#fafafc',
				role: '浅色表面',
			},
			{
				name: 'surface-tile-1',
				hex: '#272729',
				role: '深色产品区块',
			},
			{
				name: 'surface-black',
				hex: '#000000',
				role: '顶部导航，唯一的纯黑',
			},
			{
				name: 'divider-soft',
				hex: '#f0f0f0',
				role: '浅分隔线',
			},
			{
				name: 'hairline',
				hex: '#e0e0e0',
				role: '分隔细线',
			},
			{
				name: 'surface-chip-translucent',
				hex: '#d2d2d7',
				role: '半透明配置选项',
			},
			{
				name: 'on-dark',
				hex: '#ffffff',
				role: '深色区块上的文字',
			},
		],
		typeScale: [
			{
				sample: 'Titanium. So strong. So light. So Pro.',
				spec: '首屏大标题，SF Pro Display，56px，600 字重，字距 -0.28px',
				style:
					'font-weight:600;font-size:clamp(26px,3.6vw,40px);letter-spacing:-0.015em;color:#1d1d1f;line-height:1.08',
			},
			{
				sample: 'Body copy reads at seventeen pixels, not sixteen.',
				spec: '正文，17px，400 字重，行高 1.47',
				style: 'font-size:17px;color:#1d1d1f;line-height:1.47',
			},
			{
				sample: 'Available starting 9.19',
				spec: '脚注，12px，灰色',
				style: 'font-size:12px;color:#7a7a7a',
			},
		],
		dos: ['交互蓝只给可点击元素', '标题用负字距排紧', '正文用 17px', '亮暗区块交替，换色即分隔'],
		donts: ['加第二个强调色', '给卡片、按钮或文字加投影', '用渐变做装饰背景', '正文用 500 字重'],
		plate: {
			bg: '#000000',
			headline: 'Titanium. So strong. So light. So Pro.',
			headlineStyle:
				'color:#ffffff;font-weight:600;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.015em;line-height:1.1',
		},
		sourceFile: 'apple',
	},
	{
		id: 'figma',
		name: 'Figma',
		category: '设计工具',
		tagline: '黑白骨架之间，一整屏一整屏的粉彩色块',
		lede: '按钮、正文和页脚只用黑白，整屏铺青柠、薰衣草、奶油、薄荷等粉彩色块，按钮全是药丸形。',
		philosophy: [
			'主按钮是黑色 #000000，正文、导航和页脚也只用黑白。',
			'粉彩色块每次占满一整屏，两个色块之间隔一段白底。',
			'同一个可变字体用 320、330、340、480、540 等细分字重区分层次。',
			'figmaMono 只用于小标题和分类标签，全大写，字距为正。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#000000',
				role: '主按钮',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色，隔开色块',
			},
			{
				name: 'block-lime',
				hex: '#dceeb1',
				role: '色块，青柠',
			},
			{
				name: 'block-lilac',
				hex: '#c5b0f4',
				role: '色块，薰衣草',
			},
			{
				name: 'block-cream',
				hex: '#f4ecd6',
				role: '色块，奶油',
			},
			{
				name: 'block-mint',
				hex: '#c8e6cd',
				role: '色块，薄荷',
			},
			{
				name: 'block-pink',
				hex: '#efd4d4',
				role: '色块，粉',
			},
			{
				name: 'block-coral',
				hex: '#f3c9b6',
				role: '色块，珊瑚',
			},
			{
				name: 'block-navy',
				hex: '#1f1d3d',
				role: '色块，深海军蓝',
			},
			{
				name: 'accent-magenta',
				hex: '#ff3d8b',
				role: '洋红点缀',
			},
			{
				name: 'surface-soft',
				hex: '#f7f7f5',
				role: '浅灰底',
			},
			{
				name: 'hairline',
				hex: '#e6e6e6',
				role: '分隔细线',
			},
			{
				name: 'semantic-success',
				hex: '#1ea64a',
				role: '成功提示',
			},
		],
		typeScale: [
			{
				sample: 'Think bigger. Build faster.',
				spec: '大标题，figmaSans，86px，340 字重，字距 -1.72px',
				style:
					'font-weight:700;font-size:clamp(26px,3.6vw,40px);letter-spacing:-0.04em;color:#000000;line-height:1.05',
			},
			{
				sample: 'Body hovers at weight 320–340 of the same variable family.',
				spec: '正文，figmaSans，330 字重，层次靠字重区分',
				style: 'font-size:15px;color:#000000',
			},
			{
				sample: 'DESIGN SYSTEMS',
				spec: '栏目小标题，figmaMono，18px，全大写，字距 0.54px',
				style:
					"font-family:ui-monospace,'SF Mono',monospace;font-size:12px;letter-spacing:0.14em;color:#000000",
			},
		],
		dos: [
			'一段内容只用一个色块，铺满内容宽度',
			'两个色块之间回到白底',
			'按钮做药丸形，图标按钮做正圆',
			'等宽字只用于小标题，全大写',
		],
		donts: ['用色块系列以外的颜色', '给色块加投影', '用中灰色写正文', '把按钮做成方角'],
		plate: {
			bg: '#dceeb1',
			headline: 'Think bigger. Build faster.',
			headlineStyle:
				'color:#000000;font-weight:700;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.04em;line-height:1.05',
		},
		sourceFile: 'figma',
	},
	{
		id: 'spotify',
		name: 'Spotify',
		category: '娱乐',
		tagline: '近黑的剧场里，只有一点绿是功能',
		lede: '整个界面是 #121212 到 #1f1f1f 的深灰黑，色彩来自专辑封面，品牌绿 #1ed760 只用在播放键和主按钮。',
		philosophy: [
			'界面本身只用深灰黑和白，颜色主要来自专辑封面。',
			'品牌绿只用于播放键、激活状态和主按钮，不做背景或装饰。',
			'按钮圆角 500px 做成药丸形，播放键用 50% 圆角做正圆。',
			'深色底上的阴影透明度用 0.3 到 0.5，太淡会看不见。',
		],
		colors: [
			{
				name: 'brand-green',
				hex: '#1ed760',
				role: '播放键，激活态，主按钮',
			},
			{
				name: 'green-border',
				hex: '#1db954',
				role: '绿色描边',
			},
			{
				name: 'near-black',
				hex: '#121212',
				role: '最深的底色',
			},
			{
				name: 'dark-surface',
				hex: '#181818',
				role: '卡片和容器',
			},
			{
				name: 'mid-dark',
				hex: '#1f1f1f',
				role: '按钮底色',
			},
			{
				name: 'dark-card',
				hex: '#252525',
				role: '抬高一层的卡片',
			},
			{
				name: 'text-base',
				hex: '#ffffff',
				role: '主文字',
			},
			{
				name: 'silver',
				hex: '#b3b3b3',
				role: '次要文字和分隔线',
			},
			{
				name: 'border-gray',
				hex: '#4d4d4d',
				role: '深色底上的按钮边框',
			},
			{
				name: 'light-border',
				hex: '#7c7c7c',
				role: '描边按钮和弱链接',
			},
			{
				name: 'negative',
				hex: '#f3727f',
				role: '错误提示',
			},
			{
				name: 'warning',
				hex: '#ffa42b',
				role: '警告提示',
			},
			{
				name: 'announcement',
				hex: '#539df5',
				role: '通知',
			},
		],
		typePanelStyle: 'background:#121212;border-color:#4d4d4d',
		typeScale: [
			{
				sample: 'Music for everyone.',
				spec: '标题，SpotifyMixUI（CircularSp 系），700 字重，行距紧',
				style:
					'font-weight:700;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.02em;color:#ffffff;line-height:1.1',
			},
			{
				sample: 'Compact and functional — the whole system lives in 10–24px.',
				spec: '正文，400 字重，全系统字号在 10px 到 24px 之间',
				style: 'font-size:14px;color:#b3b3b3',
			},
			{
				sample: 'GET SPOTIFY FREE',
				spec: '按钮文字，全大写，字距 1.4px 到 2px',
				style: 'font-size:13px;font-weight:700;letter-spacing:0.14em;color:#ffffff',
			},
		],
		dos: [
			'用深浅不同的近黑区分层次',
			'绿色只给播放键、激活态和主按钮',
			'按钮做药丸形，播放键做正圆',
			'按钮文字全大写，加宽字距',
		],
		donts: ['用绿色做装饰或背景', '主界面用浅色底', '在深色底上用很淡的阴影', '加第二个品牌色'],
		plate: {
			bg: '#121212',
			headline: 'Music for everyone.',
			headlineStyle:
				'color:#ffffff;font-weight:700;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.02em;line-height:1.1',
		},
		sourceFile: 'spotify',
	},
	{
		id: 'airbnb',
		name: 'Airbnb',
		category: '旅行',
		tagline: '九成白与墨，一两个 Rausch 珊瑚时刻',
		lede: '页面主要是白底和墨色文字，画面靠房源照片撑起，品牌色 #ff385c 只用于主按钮、搜索按钮和收藏心。',
		philosophy: [
			'品牌色 Rausch #ff385c 只给主按钮、搜索按钮、收藏心和 logo，其余是白和墨色。',
			'标题字重 500 到 700，正文 400，画面靠照片撑起。',
			'房源照片直接当卡片用，圆角裁切加轮播，不加边框。',
			'全站只有一档阴影，只用在浮起的卡片和下拉菜单上。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#ff385c',
				role: '主按钮，搜索按钮，收藏心',
			},
			{
				name: 'primary-active',
				hex: '#e00b41',
				role: '主按钮按下',
			},
			{
				name: 'luxe',
				hex: '#460479',
				role: 'Luxe 高端产品线',
			},
			{
				name: 'plus',
				hex: '#92174d',
				role: 'Plus 产品线',
			},
			{
				name: 'ink',
				hex: '#222222',
				role: '标题',
			},
			{
				name: 'body',
				hex: '#3f3f3f',
				role: '正文',
			},
			{
				name: 'muted',
				hex: '#6a6a6a',
				role: '次要文字',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
			{
				name: 'surface-soft',
				hex: '#f7f7f7',
				role: '浅灰底',
			},
			{
				name: 'hairline',
				hex: '#dddddd',
				role: '分隔细线',
			},
			{
				name: 'hairline-soft',
				hex: '#ebebeb',
				role: '较浅的分隔线',
			},
			{
				name: 'legal-link',
				hex: '#428bff',
				role: '法务链接',
			},
			{
				name: 'star-rating',
				hex: '#222222',
				role: '星级评分，用墨色',
			},
		],
		typeScale: [
			{
				sample: 'Belong anywhere.',
				spec: '标题，Airbnb Cereal VF，500 到 700 字重',
				style:
					'font-weight:600;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.02em;color:#222222;line-height:1.1',
			},
			{
				sample: 'Photography carries the weight; type stays modest.',
				spec: '正文，Cereal，400 字重',
				style: 'font-size:15px;color:#3f3f3f',
			},
			{
				sample: 'Guest favorite · ★ 4.98',
				spec: '评分信息，星级用墨色 #222222',
				style: 'font-size:13px;color:#222222;font-weight:600',
			},
		],
		dos: [
			'Rausch 只给主按钮、搜索按钮和收藏心',
			'照片撑画面，标题字重保持适中',
			'搜索栏用分段白药丸配圆形红按钮',
			'阴影只用一档，给浮起的卡片和下拉',
		],
		donts: ['用 Rausch 铺背景', '给照片卡加装饰边框', '加第二档阴影', '星级评分用金色'],
		plate: {
			bg: '#ffffff',
			headline: 'Belong anywhere.',
			headlineStyle:
				'color:#ff385c;font-weight:700;font-size:clamp(24px,3.4vw,38px);letter-spacing:-0.02em;line-height:1.1',
		},
		sourceFile: 'airbnb',
	},
	{
		id: 'ibm',
		name: 'IBM',
		category: '企业科技',
		tagline: '方角、细体 Plex、一种蓝——Carbon 本身',
		lede: '按钮和容器全是 0px 方角，大标题用 300 细体 IBM Plex Sans，唯一的彩色是 IBM 蓝 #0f62fe。',
		philosophy: [
			'营销页直接用 Carbon 组件，按钮方角，输入框只有下边线。',
			'42px 到 76px 的大标题用 Plex Sans 300 细体，不加粗。',
			'链接和主按钮只用 IBM 蓝，绿、黄、红只做状态提示。',
			'层次靠 1px 细线和灰底区分，不用投影，只有页脚是炭黑底。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#0f62fe',
				role: '链接和主按钮，唯一彩色',
			},
			{
				name: 'blue-hover',
				hex: '#0050e6',
				role: '悬停',
			},
			{
				name: 'blue-60',
				hex: '#0043ce',
				role: '深一档的蓝',
			},
			{
				name: 'blue-80',
				hex: '#002d9c',
				role: '最深的蓝',
			},
			{
				name: 'ink',
				hex: '#161616',
				role: '正文和标题',
			},
			{
				name: 'ink-muted',
				hex: '#525252',
				role: '次要文字',
			},
			{
				name: 'ink-subtle',
				hex: '#8c8c8c',
				role: '弱化文字',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
			{
				name: 'surface-1',
				hex: '#f4f4f4',
				role: '浅灰区块',
			},
			{
				name: 'surface-2',
				hex: '#e0e0e0',
				role: '二级底色和分隔线',
			},
			{
				name: 'inverse-canvas',
				hex: '#161616',
				role: '页脚，唯一的深色区',
			},
			{
				name: 'semantic-success',
				hex: '#24a148',
				role: '成功提示',
			},
			{
				name: 'semantic-error',
				hex: '#da1e28',
				role: '错误提示',
			},
		],
		typeScale: [
			{
				sample: "Let's create something that changes everything",
				spec: '大标题，IBM Plex Sans，42px 到 76px，300 字重',
				style:
					'font-weight:300;font-size:clamp(26px,3.6vw,40px);letter-spacing:-0.01em;color:#161616;line-height:1.15',
			},
			{
				sample: 'Body copy carries 0.16px letter-spacing — a Carbon precision detail.',
				spec: '正文，Plex Sans，400 字重，字距 0.16px',
				style: 'font-size:15px;color:#525252;letter-spacing:0.16px',
			},
			{
				sample: 'Start building →',
				spec: '按钮，0px 方角，蓝底白字',
				style:
					'display:inline-block;background:#0f62fe;color:#ffffff;padding:10px 18px;font-size:13.5px',
			},
		],
		dos: [
			'所有容器用 0px 方角',
			'大标题用 Plex 300 细体',
			'IBM 蓝只给按钮、链接和焦点下划线',
			'小标题句首大写，不用全大写',
		],
		donts: ['给按钮、卡片或输入框加圆角', '大标题加粗到 700', '加第二个品牌色', '用药丸形按钮'],
		plate: {
			bg: '#f4f4f4',
			headline: "Let's create",
			headlineStyle:
				'color:#161616;font-weight:300;font-size:clamp(26px,3.8vw,42px);letter-spacing:-0.01em;line-height:1.1',
		},
		sourceFile: 'ibm',
	},
	{
		id: 'theverge',
		name: 'The Verge',
		category: '媒体',
		tagline: '深夜画布上的荧光薄荷与紫外线',
		lede: '底色固定为近黑 #131313，Manuka 大标题最大 107px，强调色只有荧光薄荷 #3cffd0 和紫 #5200ff。',
		philosophy: [
			'首页只有深色版，底色 #131313，没有浅色模式。',
			'荧光薄荷和紫只用在最重要的元素上，不做大面积背景。',
			'Manuka 只用于 60px 以上的标题，更小的字号不用它。',
			'层次靠 1px 描边和饱和色块卡片，全站没有投影和渐变。',
		],
		colors: [
			{
				name: 'jelly-mint',
				hex: '#3cffd0',
				role: '最重要元素的强调色',
			},
			{
				name: 'ultraviolet',
				hex: '#5200ff',
				role: '第二强调色',
			},
			{
				name: 'console-mint',
				hex: '#309875',
				role: '卡片描边',
			},
			{
				name: 'purple-rule',
				hex: '#3d00bf',
				role: '时间线的竖线',
			},
			{
				name: 'link-hover',
				hex: '#3860be',
				role: '链接悬停，全站唯一的蓝',
			},
			{
				name: 'focus-cyan',
				hex: '#1eaedb',
				role: '焦点环',
			},
			{
				name: 'canvas-black',
				hex: '#131313',
				role: '页面底色',
			},
			{
				name: 'surface-slate',
				hex: '#2d2d2d',
				role: '次级卡片底色',
			},
			{
				name: 'image-frame',
				hex: '#313131',
				role: '图片描边',
			},
			{
				name: 'hazard-white',
				hex: '#ffffff',
				role: '白色重点卡片',
			},
			{
				name: 'text-secondary',
				hex: '#949494',
				role: '时间戳和署名',
			},
			{
				name: 'text-muted',
				hex: '#e9e9e9',
				role: '深色按钮上的文字',
			},
			{
				name: 'inverted-text',
				hex: '#131313',
				role: '浅色卡片上的文字',
			},
		],
		typePanelStyle: 'background:#131313;border-color:#313131',
		typeScale: [
			{
				sample: 'Tech, science, art.',
				spec: '大标题，Manuka，60px 到 107px，900 字重',
				style:
					'font-weight:800;font-size:clamp(26px,3.8vw,42px);text-transform:uppercase;letter-spacing:-0.01em;color:#ffffff;line-height:0.95',
			},
			{
				sample: 'PolySans carries the body on the dark canvas.',
				spec: '正文，PolySans',
				style: 'font-size:14px;color:#e9e9e9',
			},
			{
				sample: 'FEB 26 · 14:02 EST',
				spec: '时间戳，PolySans Mono，全大写，字距 1.5px 到 1.9px',
				style:
					"font-family:ui-monospace,'SF Mono',monospace;font-size:12px;letter-spacing:0.16em;color:#3cffd0",
			},
		],
		dos: [
			'底色始终用 #131313',
			'薄荷和紫只给最重要的元素',
			'卡片圆角 20px，按钮 30px 到 40px',
			'等宽标签全大写，加宽字距',
		],
		donts: ['用浅色背景', '用投影做层次', '做方角容器', '用渐变'],
		plate: {
			bg: '#131313',
			headline: 'Tech, science, art.',
			headlineStyle:
				'color:#ffffff;font-weight:800;font-size:clamp(26px,3.8vw,42px);text-transform:uppercase;letter-spacing:-0.01em;line-height:0.95',
		},
		sourceFile: 'theverge',
	},
	{
		id: 'cursor',
		name: 'Cursor',
		category: '开发工具',
		tagline: '奶油画布上的一滴橙：AI 编辑器的杂志感',
		lede: '底色是暖奶油 #f7f7f4，文字用暖黑 #26251e，标题一律 400 字重，橙色 #f54e00 只给主按钮。',
		philosophy: [
			'页面底色用暖奶油 #f7f7f4，文字用暖黑 #26251e，都不用纯白和纯黑。',
			'橙色 #f54e00 只用在主按钮和字标上，用量很少。',
			'标题全部 400 字重，从不加粗，层级靠字号和负字距拉开。',
			'卡片不加投影，只用 1px 细线分隔，按钮圆角 8px。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#f54e00',
				role: '主按钮和字标',
			},
			{
				name: 'primary-active',
				hex: '#d04200',
				role: '主按钮按下',
			},
			{
				name: 'canvas',
				hex: '#f7f7f4',
				role: '页面底色',
			},
			{
				name: 'ink',
				hex: '#26251e',
				role: '标题和强调文字',
			},
			{
				name: 'body',
				hex: '#5a5852',
				role: '正文',
			},
			{
				name: 'muted',
				hex: '#807d72',
				role: '小标题和辅助说明',
			},
			{
				name: 'muted-soft',
				hex: '#a09c92',
				role: '不可用状态的文字',
			},
			{
				name: 'hairline',
				hex: '#e6e5e0',
				role: '1px 分隔线和卡片边',
			},
			{
				name: 'hairline-soft',
				hex: '#efeee8',
				role: '更浅的分隔线',
			},
		],
		typeScale: [
			{
				sample: 'The AI Code Editor',
				spec: '大标题，36px，400 字重，字距 -0.72px，CursorGothic',
				style:
					'font-weight:400;font-size:clamp(26px,3.6vw,34px);letter-spacing:-0.02em;color:#26251e;line-height:1.2',
			},
			{
				sample: 'Body text sits warm on cream, never cold.',
				spec: '正文，16px，400 字重，颜色 #5a5852',
				style: 'font-size:15px;color:#5a5852',
			},
			{
				sample: 'agent · editing · reviewing · done',
				spec: 'AI 时间线状态标签，桃、薄荷、蓝、淡紫、金五色',
				style: 'font-size:12px;color:#807d72;letter-spacing:0.04em',
			},
		],
		dos: [
			'底色保持暖奶油，文字用暖黑',
			'标题固定 400 字重',
			'橙色只给主按钮，少量使用',
			'分隔只用 1px 细线',
		],
		donts: [
			'把底色换成纯白',
			'标题加粗到 600 以上',
			'把按钮做成药丸形，Cursor 用 8px 圆角',
			'给卡片加投影',
		],
		plate: {
			bg: '#f7f7f4',
			headline: 'The AI Code Editor',
			headlineStyle:
				'color:#26251e;font-weight:400;font-size:clamp(28px,4vw,44px);letter-spacing:-0.025em;line-height:1.15',
		},
		sourceFile: 'cursor',
	},
	{
		id: 'raycast',
		name: 'Raycast',
		category: 'SaaS',
		tagline: '近黑阶梯上的白色药丸：键盘党的效率剧场',
		lede: '整站是近黑 #07080a 的深色模式，层次靠几级暗灰底色区分，主按钮只有白色药丸一种。',
		philosophy: [
			'全站只有深色模式，底色从 #07080a 到 #0d0d0d 再到 #101111 逐级变浅来分层。',
			'主按钮只用白色 #ffffff 实心药丸，其余界面都是黑灰单色。',
			'全站 Inter 都开启 ss03 替代字形，关掉就成了普通 Inter。',
			'卡片边用 1px #242728 细线，不加投影，黄红绿蓝只用在扩展的品类插图上。',
		],
		typePanelStyle: 'background:#0d0d0d;border-color:#242728',
		colors: [
			{
				name: 'primary',
				hex: '#ffffff',
				role: '主按钮，白色药丸',
			},
			{
				name: 'on-primary',
				hex: '#000000',
				role: '白色按钮上的文字',
			},
			{
				name: 'canvas',
				hex: '#07080a',
				role: '页面底色',
			},
			{
				name: 'surface',
				hex: '#0d0d0d',
				role: '第一级抬高的面',
			},
			{
				name: 'ink',
				hex: '#f4f4f6',
				role: '标题和主文字',
			},
			{
				name: 'body',
				hex: '#cdcdcd',
				role: '正文',
			},
			{
				name: 'mute',
				hex: '#9c9c9d',
				role: '辅助说明',
			},
			{
				name: 'stone',
				hex: '#434345',
				role: '弱化文字和图标',
			},
			{
				name: 'hairline',
				hex: '#242728',
				role: '所有卡片的描边',
			},
			{
				name: 'accent-yellow',
				hex: '#ffc533',
				role: '品类插图黄，如 Hacker News',
			},
			{
				name: 'accent-red',
				hex: '#ff6161',
				role: '品类插图红，如 Slack',
			},
			{
				name: 'accent-green',
				hex: '#59d499',
				role: '品类插图绿',
			},
			{
				name: 'accent-blue',
				hex: '#57c1ff',
				role: '品类插图蓝',
			},
		],
		typeScale: [
			{
				sample: 'A shortcut to everything',
				spec: '大标题，64px，600 字重，字距 0，Inter 开 ss03',
				style:
					'font-weight:600;font-size:clamp(30px,4.6vw,48px);letter-spacing:-0.01em;color:#f4f4f6;line-height:1.08',
			},
			{
				sample: 'Extensions put your tools one keystroke away.',
				spec: '正文，16px，400 字重，颜色 #cdcdcd',
				style: 'font-size:15px;color:#cdcdcd',
			},
			{
				sample: '⌘ ⇧ P  ·  one keystroke',
				spec: '快捷键标注，用 stone #434345 弱化',
				style: 'font-size:13px;color:#6a6b6c;letter-spacing:0.03em',
			},
		],
		dos: [
			'主按钮只用白色药丸',
			'用暗色底的明暗分层级',
			'卡片边一律 1px #242728 细线',
			'全站开启 Inter 的 ss03',
		],
		donts: ['加浅色模式', '在白色药丸之外再加实心按钮色', '给卡片加投影', '把品类色用在界面装饰上'],
		plate: {
			bg: '#07080a',
			headline: 'Your shortcut to everything',
			headlineStyle:
				'color:#f4f4f6;font-weight:600;font-size:clamp(28px,3.9vw,44px);letter-spacing:-0.015em;line-height:1.1',
		},
		sourceFile: 'raycast',
	},
	{
		id: 'supabase',
		name: 'Supabase',
		category: '基础设施',
		tagline: '一片翡翠绿点亮单色世界：开源后端的工程师美学',
		lede: '白底灰阶页面里只有翡翠绿 #3ecf8e 一种彩色，配图全用真实产品截图，按钮是 6px 或 8px 的方角。',
		philosophy: [
			'彩色只有翡翠绿 #3ecf8e，用在主按钮、字标点缀和状态圆点，其余全是灰阶。',
			'配图全用产品界面截图，如仪表盘、SQL 编辑器、日志流，不用照片和插画。',
			'标题用 Circular 500 字重，字距从 64px 的 -1.92px 到 28px 的 -0.42px。',
			'代码片段放在 #1c1c1c 深色底的代码块里，用等宽字体。',
		],
		colors: [
			{
				name: 'brand',
				hex: '#3ecf8e',
				role: '主按钮，唯一的彩色',
			},
			{
				name: 'brand-dark',
				hex: '#24b47e',
				role: '主按钮按下',
			},
			{
				name: 'brand-light',
				hex: '#4ade80',
				role: '图表和产品界面的浅绿',
			},
			{
				name: 'ink',
				hex: '#171717',
				role: '主文字，绿底上的字',
			},
			{
				name: 'ink-mute',
				hex: '#707070',
				role: '辅助说明',
			},
			{
				name: 'ink-faint',
				hex: '#b2b2b2',
				role: '弱化标注',
			},
			{
				name: 'night',
				hex: '#1c1c1c',
				role: '代码块和产品截图的深底',
			},
			{
				name: 'on-dark',
				hex: '#ffffff',
				role: '深色底上的文字',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
		],
		typeScale: [
			{
				sample: 'Build in a weekend',
				spec: '大标题，48px，500 字重，字距 -1.44px，Circular',
				style:
					'font-weight:500;font-size:clamp(28px,4vw,40px);letter-spacing:-0.03em;color:#171717;line-height:1.1',
			},
			{
				sample: 'Scale to millions of users.',
				spec: '正文，16px，400 字重',
				style: 'font-size:15px;color:#212121',
			},
			{
				sample: 'const { data } = await supabase.from(...)',
				spec: '代码，14px，等宽字体，放在深色底上',
				style:
					'font-family:ui-monospace,monospace;font-size:13px;color:#3ecf8e;background:#1c1c1c;padding:2px 6px;border-radius:4px',
			},
		],
		dos: [
			'绿色只用于主按钮和激活态',
			'每段功能介绍配一张产品截图',
			'标题保持 500 字重和负字距',
			'代码示例放进深色代码块',
		],
		donts: [
			'把按钮做成药丸形，Supabase 用 6px 或 8px 圆角',
			'加第二个品牌色',
			'用照片或插画做装饰',
			'用绿色大面积铺背景',
		],
		plate: {
			bg: '#ffffff',
			headline: 'Build in a weekend, scale to millions',
			headlineStyle:
				'color:#171717;font-weight:500;font-size:clamp(26px,3.7vw,42px);letter-spacing:-0.03em;line-height:1.1',
		},
		sourceFile: 'supabase',
	},
	{
		id: 'framer',
		name: 'Framer',
		category: '设计工具',
		tagline: '黑幕上的海报标题：85px 与 -4.25px 的动效宣言',
		lede: '整站都是纯黑 #090909 底，大标题 GT Walsheim 85px 配 -4.25px 字距，主按钮是白色药丸。',
		philosophy: [
			'首屏、定价、FAQ 和页脚都用 #090909 黑底，中间不插浅色区块。',
			'标题字号越大字距越紧，62px 用 -3.1px，110px 用 -5.5px。',
			'主按钮只有白色药丸一种，次要按钮用炭黑药丸。',
			'每隔几屏放一组紫、洋红、橙、珊瑚渐变的大卡片，作为作品展示卡。',
		],
		typePanelStyle: 'background:#121212;border-color:#262626',
		colors: [
			{
				name: 'canvas',
				hex: '#090909',
				role: '页面底色',
			},
			{
				name: 'primary',
				hex: '#ffffff',
				role: '主按钮，白色药丸',
			},
			{
				name: 'on-primary',
				hex: '#000000',
				role: '白色按钮上的文字',
			},
			{
				name: 'ink',
				hex: '#ffffff',
				role: '标题和正文',
			},
			{
				name: 'ink-muted',
				hex: '#999999',
				role: '次要文字和表格标签',
			},
			{
				name: 'hairline',
				hex: '#262626',
				role: '输入框组和表格分隔线',
			},
			{
				name: 'accent-blue',
				hex: '#0099ff',
				role: '链接和输入框焦点',
			},
			{
				name: 'gradient-violet',
				hex: '#6a4cf5',
				role: '渐变卡的紫色',
			},
			{
				name: 'gradient-magenta',
				hex: '#d44df0',
				role: '渐变卡的洋红',
			},
			{
				name: 'gradient-orange',
				hex: '#ff7a3d',
				role: '渐变卡的橙色',
			},
			{
				name: 'gradient-coral',
				hex: '#ff5577',
				role: '渐变卡的珊瑚色',
			},
		],
		typeScale: [
			{
				sample: 'Start designing for free',
				spec: '大标题，85px，500 字重，字距 -4.25px，GT Walsheim',
				style:
					'font-weight:500;font-size:clamp(32px,5.6vw,58px);letter-spacing:-0.05em;color:#ffffff;line-height:0.98',
			},
			{
				sample: 'Ship sites that move like motion.',
				spec: '正文，15px，Inter Variable，开 cv01、ss03 等特性',
				style: 'font-size:15px;color:#999999',
			},
			{
				sample: 'Free → Mini → Basic',
				spec: '次要按钮，炭黑药丸',
				style:
					'font-size:13px;color:#ffffff;background:#1a1a1a;border:1px solid #262626;padding:4px 12px;border-radius:999px;display:inline-block',
			},
		],
		dos: [
			'标题用很紧的负字距，字越大越紧',
			'渐变卡单独做展示卡用',
			'主按钮统一白色药丸',
			'正文开 Inter 的 cv、ss 特性',
		],
		donts: [
			'在黑底页面中插入浅色区块',
			'放松标题的负字距',
			'用渐变铺整个区块背景',
			'把主按钮改成别的形状',
		],
		plate: {
			bg: '#090909',
			headline: 'Ship sites that move',
			headlineStyle:
				'color:#ffffff;font-weight:500;font-size:clamp(30px,4.4vw,50px);letter-spacing:-0.045em;line-height:1.0',
		},
		sourceFile: 'framer',
	},
	{
		id: 'nvidia',
		name: 'NVIDIA',
		category: 'AI',
		tagline: '一角荧光绿的绝对秩序：2px 圆角的工业硬朗',
		lede: '唯一的彩色是荧光绿 #76b900，页面黑底章节和白底章节交替，所有元素圆角都是 2px。',
		philosophy: [
			'绿色 #76b900 用在主按钮、激活标签、深色底上的链接和卡角方块，没有第二种强调色。',
			'首屏和页脚用黑底，中间正文区用白底，两种交替出现。',
			'按钮、卡片、图片的圆角都是 2px，没有药丸形按钮。',
			'资源卡一角放一个约 12px 的绿色方块，这是唯一的装饰。',
		],
		colors: [
			{
				name: 'brand-green',
				hex: '#76b900',
				role: '主按钮、激活态和卡角方块',
			},
			{
				name: 'green-dark',
				hex: '#5a8d00',
				role: '主按钮按下',
			},
			{
				name: 'ink',
				hex: '#000000',
				role: '正文文字，深色章节底',
			},
			{
				name: 'surface-soft',
				hex: '#f7f7f7',
				role: '面包屑和对比面板底',
			},
			{
				name: 'surface-elevated',
				hex: '#1a1a1a',
				role: '页脚里的深色嵌套面板',
			},
			{
				name: 'hairline',
				hex: '#cccccc',
				role: '卡片边和表格线',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '正文区底色',
			},
		],
		typeScale: [
			{
				sample: 'Accelerated Computing',
				spec: '大标题，48px，700 字重，字距 0，NVIDIA-EMEA',
				style:
					'font-weight:700;font-size:clamp(28px,4vw,40px);letter-spacing:-0.01em;color:#000000;line-height:1.15',
			},
			{
				sample: 'Powering AI factories worldwide.',
				spec: '正文，16px，400 字重',
				style: 'font-size:16px;color:#1a1a1a',
			},
			{
				sample: '■  Developer Resources',
				spec: '卡角方块，约 12px，绿色',
				style: 'font-size:13px;color:#000000',
			},
		],
		dos: [
			'绿色只给主按钮、激活态和卡角方块',
			'黑底章节和白底章节交替',
			'交互元素圆角固定 2px',
			'用细线和浅灰底分层，不用投影',
		],
		donts: ['把按钮做成药丸形', '再加一种相近的绿色', '去掉资源卡角上的绿色方块', '加插画装饰'],
		plate: {
			bg: '#ffffff',
			headline: 'The engine of AI',
			headlineStyle:
				'color:#000000;font-weight:700;font-size:clamp(26px,3.6vw,42px);letter-spacing:-0.01em;line-height:1.15',
		},
		sourceFile: 'nvidia',
	},
	{
		id: 'mistral',
		name: 'Mistral',
		category: 'AI',
		tagline: '山顶日落：橙色欧洲灵魂与奶油纸张',
		lede: '首屏是落日山景照片，每页底部有一条日落渐变横条，卡片用奶油黄底，主按钮用橙色 #fa520f。',
		philosophy: [
			'首屏用山峦落日照片，每页底部都有一条红、橙、黄到奶油的渐变横条。',
			'表单和功能卡用三档奶油黄底：#fffaeb、#fff8e0、#fff0c2。',
			'首屏大字用 PP Editorial Old 衬线体，其余文字都用 Inter。',
			'按钮圆角 8px，卡片圆角 12px。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#fa520f',
				role: '所有主按钮',
			},
			{
				name: 'primary-deep',
				hex: '#cc3a05',
				role: '主按钮按下',
			},
			{
				name: 'sunshine',
				hex: '#ffd900',
				role: '日落横条里的亮黄',
			},
			{
				name: 'cream',
				hex: '#fff8e0',
				role: '奶油面板底色',
			},
			{
				name: 'cream-light',
				hex: '#fffaeb',
				role: '最浅的奶油底',
			},
			{
				name: 'cream-deep',
				hex: '#fff0c2',
				role: '深一档的奶油底',
			},
			{
				name: 'beige-deep',
				hex: '#e6d5a8',
				role: '奶油按钮的描边',
			},
			{
				name: 'ink',
				hex: '#1f1f1f',
				role: '主文字',
			},
		],
		typeScale: [
			{
				sample: 'Open, portable, customizable',
				spec: '大标题，64px，400 字重，字距 -1px，PP Editorial Old',
				style:
					"font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(30px,4.4vw,46px);letter-spacing:-0.015em;color:#1f1f1f;line-height:1.1",
			},
			{
				sample: 'Frontier AI in your hands.',
				spec: '正文，16px，400 字重，Inter',
				style: 'font-size:15px;color:#1f1f1f',
			},
		],
		dos: [
			'首屏用落日山景照片',
			'每页底部放日落渐变横条',
			'表单和功能卡用奶油黄底',
			'主按钮统一用橙色 #fa520f',
		],
		donts: ['把按钮和卡片圆角做大', '用 Inter 排首屏大字', '用亮黄单独做按钮'],
		plate: {
			bg: '#fff8e0',
			strip: 'linear-gradient(90deg,#fa520f,#ffd900 55%,#fff8e0 100%)',
			headline: 'Frontier AI, European made',
			headlineStyle:
				"font-family:Georgia,'Times New Roman',serif;color:#1f1f1f;font-weight:400;font-size:clamp(27px,3.8vw,43px);letter-spacing:-0.015em;line-height:1.1",
		},
		sourceFile: 'mistral',
	},
	{
		id: 'minimax',
		name: 'MiniMax',
		category: 'AI',
		tagline: '黑白底座上一条产品线一种荧光色',
		lede: '页面以黑白为主，每条模型线有自己的专属色，按钮和标签都是药丸形，首屏标题 80px。',
		philosophy: [
			'每条模型线固定一种颜色：M2.7 珊瑚红，Music 洋红，海螺视频蓝，Speech 橙紫。',
			'主按钮用近黑 #0a0a0a 药丸，彩色只出现在模型产品卡上。',
			'按钮和 tab 都是全圆角药丸，只有数据表格和文档区用矩形。',
			'首屏标题用 DM Sans，80px，600 字重，字距 -2px，行高 1.10。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#0a0a0a',
				role: '主按钮和标题的近黑',
			},
			{
				name: 'on-primary',
				hex: '#ffffff',
				role: '黑底上的白字',
			},
			{
				name: 'coral',
				hex: '#ff5530',
				role: 'M2.7 模型线',
			},
			{
				name: 'magenta',
				hex: '#ea5ec1',
				role: 'Music 模型线',
			},
			{
				name: 'blue',
				hex: '#1456f0',
				role: '海螺视频模型线',
			},
			{
				name: 'cyan',
				hex: '#3daeff',
				role: '辅助亮蓝',
			},
			{
				name: 'primary-soft',
				hex: '#181e25',
				role: '深色面',
			},
		],
		typeScale: [
			{
				sample: 'Intelligence, minimized',
				spec: '首屏标题，80px，600 字重，字距 -2px，行高 1.10，DM Sans',
				style:
					'font-weight:700;font-size:clamp(32px,5vw,52px);letter-spacing:-0.03em;color:#0a0a0a;line-height:1.06',
			},
			{
				sample: 'One color per product line.',
				spec: '正文，16px，400 字重，DM Sans，Inter 作后备',
				style: 'font-size:15px;color:#222222',
			},
		],
		dos: ['每条产品线只用自己的颜色', '彩色放在产品渐变卡上', '按钮和标签用药丸形'],
		donts: ['跨产品线混用颜色', '用荧光色做正文', '把数据表格做成药丸形'],
		plate: {
			bg: '#0a0a0a',
			headline: 'Models for everyone',
			headlineStyle:
				'color:#ffffff;font-weight:700;font-size:clamp(30px,4.3vw,48px);letter-spacing:-0.03em;line-height:1.08',
		},
		sourceFile: 'minimax',
	},
	{
		id: 'coinbase',
		name: 'Coinbase',
		category: '金融',
		tagline: '蓝色托管的世界：涨跌二色永不换岗',
		lede: '蓝色 #0052ff 只给主按钮、字标和链接，标题字重不超过 400，按钮是 100px 圆角的药丸。',
		philosophy: [
			'蓝色 #0052ff 只用在主按钮、字标和品牌链接上，用量很少。',
			'Coinbase Display 标题最高 400 字重，不用 700。',
			'按钮用 100px 圆角药丸，资产图标是正圆，卡片圆角 24px。',
			'涨用绿 #05b169，跌用红 #cf202f，只做文字色，不做底色。',
		],
		colors: [
			{
				name: 'brand-blue',
				hex: '#0052ff',
				role: '主按钮、字标和链接',
			},
			{
				name: 'blue-active',
				hex: '#003ecc',
				role: '主按钮按下',
			},
			{
				name: 'blue-disabled',
				hex: '#a8b8cc',
				role: '按钮不可用',
			},
			{
				name: 'semantic-up',
				hex: '#05b169',
				role: '上涨，只做文字色',
			},
			{
				name: 'semantic-down',
				hex: '#cf202f',
				role: '下跌，只做文字色',
			},
			{
				name: 'ink',
				hex: '#0a0b0d',
				role: '标题和主文字',
			},
			{
				name: 'body',
				hex: '#5b616e',
				role: '正文',
			},
			{
				name: 'muted',
				hex: '#7c828a',
				role: '辅助说明',
			},
			{
				name: 'hairline',
				hex: '#dee1e6',
				role: '白底上的分隔线',
			},
		],
		typeScale: [
			{
				sample: 'Jump start your crypto portfolio',
				spec: '大标题，64px，400 字重，字距 -1.6px，Coinbase Display',
				style:
					'font-weight:400;font-size:clamp(28px,4.2vw,44px);letter-spacing:-0.025em;color:#0a0b0d;line-height:1.05',
			},
			{
				sample: 'Buy, sell, and store cryptocurrency.',
				spec: '正文，16px，400 字重',
				style: 'font-size:16px;color:#5b616e',
			},
			{
				sample: '+2.41% BTC   -1.08% ETH',
				spec: '涨跌数字，绿涨红跌，只做文字色',
				style: 'font-variant-numeric:tabular-nums;font-size:14px',
			},
		],
		dos: [
			'蓝色只给主按钮和字标，少用',
			'主按钮保持 100px 圆角药丸',
			'卡片圆角保持 24px',
			'涨跌只用文字颜色表示',
		],
		donts: ['标题字重超过 400', '用涨跌色做背景填充', '把蓝色用在装饰和大面积区域'],
		plate: {
			bg: '#ffffff',
			headline: 'Update your portfolio',
			headlineStyle:
				'color:#0a0b0d;font-weight:400;font-size:clamp(28px,4vw,44px);letter-spacing:-0.025em;line-height:1.05',
		},
		sourceFile: 'coinbase',
	},
	{
		id: 'wired',
		name: 'WIRED',
		category: '媒体',
		tagline: '黑白双人的排印实验场：衬线上位，方角到底',
		lede: '页面只用黑白，唯一的彩色是链接蓝 #057dbc，按钮全是直角，顶部报头是一条黑带。',
		philosophy: [
			'页面只用黑白两色，彩色只有正文链接的蓝 #057dbc。',
			'标题用 WiredDisplay 衬线，正文用 BreveText 衬线，元数据和按钮用 Apercu 无衬线。',
			'按钮等可点击元素都是直角，圆角为 0。',
			'报头是一条细黑带，字标居中，此外页面没有装饰。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#000000',
				role: '标题文字和报头黑带',
			},
			{
				name: 'on-primary',
				hex: '#ffffff',
				role: '黑底上的白字',
			},
			{
				name: 'link',
				hex: '#057dbc',
				role: '正文里的链接',
			},
			{
				name: 'ink-soft',
				hex: '#1a1a1a',
				role: '页脚链接和强调说明',
			},
			{
				name: 'body',
				hex: '#757575',
				role: '署名和时间等元数据',
			},
			{
				name: 'hairline',
				hex: '#e0e0e0',
				role: '文章列表的分隔线',
			},
			{
				name: 'canvas-soft',
				hex: '#f5f5f5',
				role: '评论区和悬停行底色',
			},
		],
		typeScale: [
			{
				sample: 'The wired world',
				spec: '封面大标题，64px，400 字重，字距 -0.5px，WiredDisplay',
				style:
					"font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(30px,4.4vw,46px);letter-spacing:-0.01em;color:#000000;line-height:1.0",
			},
			{
				sample: 'Longform reporting on technology and culture.',
				spec: '正文，19px，400 字重，BreveText 衬线',
				style: "font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#000000",
			},
		],
		dos: ['文章列表按头条、两栏、单列排', '署名行之间用细线分隔', '报头黑带里字标居中'],
		donts: ['给按钮加圆角', '加入链接蓝以外的彩色', '用无衬线体排标题'],
		plate: {
			bg: '#ffffff',
			headline: 'Reporting on what comes next',
			headlineStyle:
				"font-family:Georgia,'Times New Roman',serif;color:#000000;font-weight:400;font-size:clamp(27px,3.9vw,44px);letter-spacing:-0.01em;line-height:1.05",
		},
		sourceFile: 'wired',
	},
	{
		id: 'xai',
		name: 'xAI',
		category: 'AI 模型',
		tagline: '近黑桌面上的一排白色空心药丸',
		lede: '近黑 #0a0a0a 底上，按钮几乎都是白色描边的空心药丸，标题 96px 只用 400 字重。',
		philosophy: [
			'按钮都是半透明白描边的空心药丸，只有注册按钮用白色实心。',
			'标题用 Universal Sans 400 字重，标签用 Geist Mono 全大写加宽字距。',
			'卡片底色 #191919，比页面底亮一点，加细线描边，不用投影。',
			'橙、紫、淡紫、浅蓝四种强调色只在产品插图和图标里少量出现。',
		],
		typePanelStyle: 'background:#191919;border-color:#2e2e2e',
		colors: [
			{
				name: 'primary',
				hex: '#ffffff',
				role: '按钮描边、实心按钮和文字',
			},
			{
				name: 'canvas',
				hex: '#0a0a0a',
				role: '页面底色',
			},
			{
				name: 'canvas-card',
				hex: '#191919',
				role: '卡片底色',
			},
			{
				name: 'accent-sunset',
				hex: '#ff7a17',
				role: '产品插图里的橙色',
			},
			{
				name: 'accent-dusk',
				hex: '#7c3aed',
				role: '产品插图里的紫色',
			},
			{
				name: 'accent-twilight',
				hex: '#c4b5fd',
				role: '产品插图里的淡紫',
			},
			{
				name: 'accent-breeze',
				hex: '#a0c3ec',
				role: '产品插图里的浅蓝',
			},
		],
		typeScale: [
			{
				sample: 'Understand the universe',
				spec: '大标题，96px，400 字重，字距 -2.4px，Universal Sans',
				style:
					'font-weight:400;font-size:clamp(32px,5vw,52px);letter-spacing:-0.025em;color:#ffffff;line-height:1.05',
			},
			{
				sample: 'GROK 4 · NOW AVAILABLE',
				spec: '标签，14px，Geist Mono 全大写，字距 1.4px',
				style:
					'font-family:ui-monospace,monospace;font-size:12px;color:#a0a0a0;letter-spacing:0.14em;text-transform:uppercase',
			},
		],
		dos: ['按钮用白描边空心药丸', '标题用 400 字重和负字距', '标签用等宽全大写字体'],
		donts: ['给主按钮填充彩色', '频繁使用橙紫强调色', '用投影表现层次'],
		plate: {
			bg: '#0a0a0a',
			headline: 'Understand the universe',
			headlineStyle:
				'color:#ffffff;font-weight:400;font-size:clamp(30px,4.3vw,48px);letter-spacing:-0.025em;line-height:1.05',
		},
		sourceFile: 'xai',
	},
	{
		id: 'cohere',
		name: 'Cohere',
		category: 'AI 模型',
		tagline: '96px 纪念碑式标题下的企业编辑部气质',
		lede: '白底上用 CohereText 写 96px 大标题，行高 1.0，章节之间穿插深绿和深藏青的通栏色带。',
		philosophy: [
			'首页大标题用 CohereText，96px，行高 1.0，字距 -1.92px。',
			'白底页面中间穿插深绿 #003c33 和深藏青 #071829 的通栏色带。',
			'主按钮是近黑或白色的胶囊形，次要操作用带下划线的文字链接。',
			'合作方 logo 统一做成单色，上下留出很大的空白。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#17171c',
				role: '胶囊主按钮',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
		],
		typeScale: [
			{
				sample: 'Enterprise AI that works',
				spec: '首页大标题，96px，400 字重，字距 -1.92px，行高 1.0，CohereText',
				style:
					'font-weight:400;font-size:clamp(32px,5vw,54px);letter-spacing:-0.03em;color:#17171c;line-height:1.02',
			},
			{
				sample: 'Read the documentation →',
				spec: '次要操作，带下划线的文字链接',
				style: 'font-size:15px;color:#17171c;text-decoration:underline;text-underline-offset:3px',
			},
		],
		dos: ['大标题保持 96px，行高 1.0', '用深绿色带分隔白底章节', '次要操作用下划线文字链接'],
		donts: ['把大标题缩小或放松行高', '引入多种鲜艳颜色', '合作方 logo 保留彩色'],
		plate: {
			bg: '#ffffff',
			headline: 'AI built for enterprise',
			headlineStyle:
				'color:#17171c;font-weight:500;font-size:clamp(30px,4.4vw,48px);letter-spacing:-0.03em;line-height:1.02',
		},
		sourceFile: 'cohere',
	},
	{
		id: 'together',
		name: 'Together AI',
		category: 'AI 模型',
		tagline: '一颗黑色按钮与三色渐变的推理云',
		lede: '所有转化按钮都是同一种 4px 圆角黑色按钮，唯一的装饰是橙、洋红到长春花蓝的渐变。',
		philosophy: [
			'定价、注册、页脚的转化按钮都用黑色 #000000，圆角 4px。',
			'唯一的装饰是三色渐变，从 #fc4c02 经 #ef2cc1 到 #bdbbff。',
			'每个区块开头放一行等宽全大写的小标题。',
			'卡片圆角 4px，深色区块和白色区块交替出现。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#000000',
				role: '转化按钮，全站唯一',
			},
			{
				name: 'accent-orange',
				hex: '#fc4c02',
				role: '渐变起点',
			},
			{
				name: 'accent-magenta',
				hex: '#ef2cc1',
				role: '渐变中段',
			},
			{
				name: 'accent-periwinkle',
				hex: '#bdbbff',
				role: '渐变终点',
			},
			{
				name: 'accent-mint',
				hex: '#c8f6f9',
				role: '浅薄荷色底面',
			},
		],
		typeScale: [
			{
				sample: 'The fastest inference cloud',
				spec: '首页大标题，64px，500 字重，字距 -1.92px，The Future',
				style:
					'font-weight:500;font-size:clamp(28px,4.2vw,46px);letter-spacing:-0.03em;color:#000000;line-height:1.08',
			},
			{
				sample: 'OPEN SOURCE MODELS',
				spec: '区块小标题，11px，500 字重，等宽全大写',
				style:
					'font-family:ui-monospace,monospace;font-size:12px;color:#6b6b6b;letter-spacing:0.12em;text-transform:uppercase',
			},
		],
		dos: [
			'转化按钮只用 4px 圆角黑色按钮',
			'装饰只用这一条三色渐变',
			'每个区块开头放等宽大写小标题',
		],
		donts: ['加第二种彩色主按钮', '卡片圆角加到 4px 以上', '用渐变铺满整块背景'],
		plate: {
			bg: '#ffffff',
			strip: 'linear-gradient(90deg,#fc4c02,#ef2cc1 55%,#bdbbff 100%)',
			headline: 'Inference for open models',
			headlineStyle:
				'color:#000000;font-weight:500;font-size:clamp(28px,4vw,44px);letter-spacing:-0.03em;line-height:1.08',
		},
		sourceFile: 'together',
	},
	{
		id: 'ollama',
		name: 'Ollama',
		category: 'AI 模型',
		tagline: '一张连续白纸上的圆润力量：curl 安装条即门面',
		lede: '整页一张白底不分段，居中的 SF Pro Rounded 标题只有 36px，最显眼的是 curl 安装命令。',
		philosophy: [
			'整页白底 #ffffff 不分段，没有渐变和大图。',
			'标题用 SF Pro Rounded，居中，最大只到 36px。',
			'按钮全部是黑色胶囊形，没有第二种按钮颜色。',
			'标题正下方是一行可复制的 curl 安装命令，放在浅灰胶囊框里。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#000000',
				role: '胶囊按钮，唯一按钮色',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '整页底色',
			},
		],
		typeScale: [
			{
				sample: 'Get up and running with large language models',
				spec: '首页标题，36px，500 字重，字距 0，SF Pro Rounded',
				style: 'font-weight:500;font-size:clamp(24px,3.4vw,34px);color:#000000;line-height:1.12',
			},
			{
				sample: 'curl -fsSL https://ollama.com/install.sh | sh',
				spec: '安装命令，16px，400 字重，等宽字体，浅灰胶囊框',
				style:
					'font-family:ui-monospace,monospace;font-size:14px;color:#000000;background:#f5f5f4;border:1px solid #e7e5e4;padding:6px 16px;border-radius:999px;display:inline-block',
			},
		],
		dos: ['整页保持同一块白底', '标题用 SF Pro Rounded，不超过 36px', '安装命令放在标题正下方'],
		donts: ['把页面切成多个色块分段', '标题放大到 36px 以上', '给按钮加第二种颜色'],
		plate: {
			bg: '#ffffff',
			headline: 'Run models locally',
			headlineStyle:
				'color:#000000;font-weight:500;font-size:clamp(26px,3.7vw,40px);line-height:1.1',
		},
		sourceFile: 'ollama',
	},
	{
		id: 'warp',
		name: 'Warp',
		category: '开发工具',
		tagline: '暖棕黑夜里的终端复兴：3px 直角键盘味',
		lede: '底色是暖棕黑 #2b2622，文字和按钮共用米白 #f7f5f0，按钮圆角只有 3px 到 4px。',
		philosophy: [
			'页面底色用暖棕黑 #2b2622，不用冷调的纯黑。',
			'米白 #f7f5f0 既是正文颜色，也是实心按钮的底色。',
			'按钮和卡片圆角 3px 到 4px，不做胶囊形按钮。',
			'字体用 Inter 和 DM Mono，配图只用终端窗口截图。',
		],
		typePanelStyle: 'background:#221d1a;border-color:#453d36',
		colors: [
			{
				name: 'primary',
				hex: '#f7f5f0',
				role: '文字和实心按钮',
			},
			{
				name: 'canvas',
				hex: '#2b2622',
				role: '页面底色',
			},
		],
		typeScale: [
			{
				sample: 'The intelligent terminal',
				spec: '首页大标题，64px，400 字重，字距 -1.6px，Inter',
				style:
					'font-weight:400;font-size:clamp(28px,4.2vw,46px);letter-spacing:-0.025em;color:#f7f5f0;line-height:1.1',
			},
			{
				sample: '$ warp --agent run',
				spec: '终端代码，DM Mono',
				style:
					'font-family:ui-monospace,monospace;font-size:14px;color:#f7f5f0;background:#221d1a;padding:4px 12px;border-radius:4px;display:inline-block',
			},
		],
		dos: [
			'底色只用暖棕黑 #2b2622',
			'文字和按钮都用米白',
			'按钮圆角保持 3px 到 4px',
			'配图只用终端窗口截图',
		],
		donts: ['把按钮做成胶囊形', '加彩色渐变背景', '用插画做装饰'],
		plate: {
			bg: '#2b2622',
			headline: 'Agentic development, implemented',
			headlineStyle:
				'color:#f7f5f0;font-weight:500;font-size:clamp(28px,4vw,44px);letter-spacing:-0.025em;line-height:1.1',
		},
		sourceFile: 'warp',
	},
	{
		id: 'resend',
		name: 'Resend',
		category: '基础设施',
		tagline: '纯黑夜空上的五彩辉光：衬线压阵的开发者品牌',
		lede: '纯黑底上用 Domaine Display 衬线写 76 到 96px 大标题，彩色只做低透明度光晕，没有投影。',
		philosophy: [
			'大标题用 Domaine Display 衬线，正文用 ABC Favorit，界面用 Inter。',
			'五种强调色只做低透明度的背景光晕，不做实色块。',
			'区块边界用 1px 半透明白色细线，全站没有投影。',
			'产品配图都围绕收件箱和邮件界面。',
		],
		typePanelStyle: 'background:#0d0d0d;border-color:#242424',
		colors: [
			{
				name: 'ink',
				hex: '#fcfdff',
				role: '主文字和实心按钮',
			},
			{
				name: 'canvas',
				hex: '#000000',
				role: '页面底色',
			},
			{
				name: 'accent-orange',
				hex: '#ff801f',
				role: '橙色光晕，只用低透明度',
			},
			{
				name: 'accent-yellow',
				hex: '#ffc53d',
				role: '黄色光晕，只用低透明度',
			},
			{
				name: 'accent-blue',
				hex: '#3b9eff',
				role: '蓝色光晕，只用低透明度',
			},
			{
				name: 'accent-green',
				hex: '#11ff99',
				role: '绿色光晕，只用低透明度',
			},
			{
				name: 'accent-red',
				hex: '#ff2047',
				role: '红色光晕，只用低透明度',
			},
		],
		typeScale: [
			{
				sample: 'Email for developers',
				spec: '首页大标题，76px 到 96px，400 字重，字距 -0.96px，Domaine Display',
				style:
					"font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:clamp(30px,4.5vw,50px);letter-spacing:-0.02em;color:#fcfdff;line-height:1.0",
			},
			{
				sample: 'Delivered in 1872ms',
				spec: '数据指标，等宽字体',
				style: 'font-family:ui-monospace,monospace;font-size:13px;color:#11ff99',
			},
		],
		dos: ['首屏标题用 Domaine Display 衬线', '强调色只做低透明度光晕', '用半透明白色细线代替阴影'],
		donts: ['用光晕色做实心按钮', '给卡片加投影', '正文用衬线字体'],
		plate: {
			bg: '#000000',
			headline: 'The best API to reach humans',
			headlineStyle:
				"font-family:Georgia,'Times New Roman',serif;color:#fcfdff;font-weight:400;font-size:clamp(29px,4.2vw,47px);letter-spacing:-0.02em;line-height:1.02",
		},
		sourceFile: 'resend',
	},
	{
		id: 'mintlify',
		name: 'Mintlify',
		category: '开发工具',
		tagline: '天空蓝渐变落到一片薄荷绿：文档基建的影院感',
		lede: '首屏是天蓝过渡到奶油色的渐变横幅，薄荷绿 #00d4a4 只用于激活和确认状态，文档页分三栏。',
		philosophy: [
			'首页首屏用天蓝 #87a8c8 到奶油 #f5e9d8 的渐变背景。',
			'薄荷绿 #00d4a4 只用在激活态、确认态和强调按钮上。',
			'营销页主按钮是黑色胶囊形，文档区不加装饰。',
			'文档页分三栏，正文 16px Inter，导航和表格 14px，代码用 Geist Mono。',
		],
		colors: [
			{
				name: 'brand-green',
				hex: '#00d4a4',
				role: '激活、确认和强调按钮',
			},
			{
				name: 'primary',
				hex: '#0a0a0a',
				role: '营销页胶囊主按钮',
			},
			{
				name: 'canvas',
				hex: '#ffffff',
				role: '页面底色',
			},
		],
		typeScale: [
			{
				sample: 'Beautiful documentation that converts',
				spec: '首页大标题，56px，600 字重，字距 -1.5px，Inter',
				style:
					'font-weight:600;font-size:clamp(27px,3.9vw,42px);letter-spacing:-0.027em;color:#0a0a0a;line-height:1.1',
			},
			{
				sample: 'import { Docs } from mintlify',
				spec: '行内代码，Geist Mono，浅灰底',
				style:
					'font-family:ui-monospace,monospace;font-size:13px;color:#0a0a0a;background:#f4f4f5;padding:3px 8px;border-radius:6px',
			},
		],
		dos: ['首屏用渐变背景横幅', '薄荷绿只给激活和确认状态', '营销页主按钮用黑色胶囊形'],
		donts: ['把薄荷绿当普通装饰色用', '正文用等宽字体', '渐变背景压得文字看不清'],
		plate: {
			bg: '#ffffff',
			headline: 'Documentation your users will love',
			headlineStyle:
				'color:#0a0a0a;font-weight:600;font-size:clamp(27px,3.9vw,43px);letter-spacing:-0.027em;line-height:1.1',
		},
		sourceFile: 'mintlify',
	},
	{
		id: 'posthog',
		name: 'PostHog',
		category: '数据分析',
		tagline: '奶油纸上的一粒芥末黄与手绘刺猬军团',
		lede: '整页铺暖奶油色 #eeefe9，唯一的亮色是芥末黄 #f7a501 按钮，各处点缀手绘刺猬插画。',
		philosophy: [
			'整页底色都是 #eeefe9，区块之间不换底色。',
			'芥末黄 #f7a501 只用在主按钮上，按钮文字用深橄榄黑 #23251d。',
			'全站只用 IBM Plex Sans，靠 400 到 800 的字重区分层级。',
			'页面各处放手绘刺猬插画，作为主要装饰。',
		],
		colors: [
			{
				name: 'primary',
				hex: '#f7a501',
				role: '主按钮，全站唯一亮色',
			},
			{
				name: 'on-primary',
				hex: '#23251d',
				role: '标题和按钮文字',
			},
			{
				name: 'canvas',
				hex: '#eeefe9',
				role: '页面底色',
			},
			{
				name: 'accent-blue',
				hex: '#2c84e0',
				role: '图表',
			},
			{
				name: 'accent-red',
				hex: '#cd4239',
				role: '警示提示',
			},
			{
				name: 'accent-green',
				hex: '#2c8c66',
				role: '表示增长',
			},
			{
				name: 'accent-purple',
				hex: '#7c44a6',
				role: '辅助点缀',
			},
		],
		typeScale: [
			{
				sample: 'Seriously useful. Not boring.',
				spec: '首页大标题，800 字重，IBM Plex Sans',
				style:
					'font-weight:800;font-size:clamp(28px,4vw,44px);letter-spacing:-0.025em;color:#23251d;line-height:1.15',
			},
			{
				sample: 'Analytics you might actually enjoy.',
				spec: '正文，同一字族，用字重区分层级',
				style: 'font-size:15px;color:#4d4f46',
			},
		],
		dos: [
			'整页保持同一种奶油底色',
			'主按钮用芥末黄配深橄榄字',
			'用字重区分层级，不换字体',
			'合适的位置放一只刺猬插画',
		],
		donts: ['用芥末黄大面积铺底', '加第二种品牌字体', '去掉手绘插画风格'],
		plate: {
			bg: '#eeefe9',
			headline: 'The only product toolkit you need',
			headlineStyle:
				'color:#23251d;font-weight:800;font-size:clamp(27px,3.9vw,43px);letter-spacing:-0.025em;line-height:1.15',
		},
		sourceFile: 'posthog',
	},
	{
		id: 'shopify',
		name: 'Shopify',
		category: '电商',
		tagline: '双画布切换：330 细体的商业叙事',
		lede: '营销页用黑底，定价和注册页用白底或奶油底，按钮一律胶囊形，大标题用 330 的细字重。',
		philosophy: [
			'营销和产品介绍页用黑底 #000000，配全屏商家照片。',
			'首页大标题 96px，330 细字重，字距 +2.4px。',
			'黑底和白底页面的按钮都是胶囊形，形状不变。',
			'芦荟绿和开心果绿只出现在白底的定价和注册页。',
		],
		colors: [
			{
				name: 'canvas-night',
				hex: '#000000',
				role: '营销页底色',
			},
			{
				name: 'canvas-light',
				hex: '#ffffff',
				role: '定价和注册页底色',
			},
			{
				name: 'canvas-cream',
				hex: '#fbfbf5',
				role: '浅色页的柔和底色',
			},
			{
				name: 'aloe',
				hex: '#c1fbd4',
				role: '推荐套餐按钮和标签',
			},
			{
				name: 'pistachio',
				hex: '#d4f9e0',
				role: '浅色页的色带卡片',
			},
			{
				name: 'primary',
				hex: '#000000',
				role: '白底页实心按钮',
			},
		],
		typeScale: [
			{
				sample: 'Making commerce better for everyone',
				spec: '首页大标题，96px，330 字重，字距 +2.4px，Neue Haas Grotesk',
				style:
					'font-weight:330;font-size:clamp(30px,4.6vw,50px);letter-spacing:0.015em;color:#000000;line-height:1.04',
			},
			{
				sample: 'Start selling today',
				spec: '按钮，黑底白底都用胶囊形',
				style:
					'font-size:14px;color:#000000;background:#c1fbd4;padding:8px 20px;border-radius:999px;display:inline-block',
			},
		],
		dos: ['营销内容放在黑底页面', '大标题保持 330 字重和正字距', '白底交易页用芦荟绿和开心果绿'],
		donts: ['把大标题加粗', '在黑底页面用芦荟绿或开心果绿', '把按钮做成非胶囊形状'],
		plate: {
			bg: '#000000',
			headline: 'Making commerce better',
			headlineStyle:
				'color:#ffffff;font-weight:330;font-size:clamp(30px,4.4vw,48px);letter-spacing:0.015em;line-height:1.06',
		},
		sourceFile: 'shopify',
	},
	{
		id: 'mastercard',
		name: 'Mastercard',
		category: '金融',
		tagline: '石色纸面上的轨道游戏：一切都很 stadium',
		lede: '底色是暖奶油 #F3F0EE，重要元素都用 40px 大圆角、胶囊形或正圆，圆形图片之间用细橙线相连。',
		philosophy: [
			'页面底色用暖奶油 #F3F0EE，不用纯白。',
			'首屏大图用 40px 圆角，卡片做成胶囊形，图片裁成正圆。',
			'圆形图片之间用约 1px 的橙色 #F37338 弧线横跨屏幕相连。',
			'红 #EB001B 和黄 #F79E1B 只出现在 logo 上，不用于界面。',
		],
		colors: [
			{
				name: 'signal-orange',
				hex: '#cf4500',
				role: '同意按钮和小标题圆点',
			},
			{
				name: 'peach',
				hex: '#f37338',
				role: '弧线和轮播指示',
			},
			{
				name: 'heritage-red',
				hex: '#eb001b',
				role: '只用于 logo',
			},
			{
				name: 'heritage-yellow',
				hex: '#f79e1b',
				role: '只用于 logo',
			},
			{
				name: 'ink-black',
				hex: '#141413',
				role: '标题、正文和主按钮',
			},
			{
				name: 'paper',
				hex: '#f3f0ee',
				role: '页面底色',
			},
		],
		typeScale: [
			{
				sample: 'Priceless beginnings',
				spec: '首页大标题，64px，500 字重，字距 -1.28px，MarkForMC',
				style:
					'font-weight:700;font-size:clamp(27px,3.9vw,43px);letter-spacing:-0.015em;color:#141413;line-height:1.12',
			},
			{
				sample: 'Explore journeys →',
				spec: '文字链接，Link Blue #3860BE',
				style: 'font-size:15px;color:#3860BE',
			},
		],
		dos: ['底色保持低饱和的暖奶油', '重要元素用大圆角或正圆', '用橙色弧线串联圆形图片'],
		donts: ['用直角容器', '用 logo 的红黄给界面上色', '把弧线画得太粗'],
		plate: {
			bg: '#f3f0ee',
			headline: 'Connections that matter',
			headlineStyle:
				'color:#141413;font-weight:700;font-size:clamp(27px,3.9vw,43px);letter-spacing:-0.015em;line-height:1.12',
		},
		sourceFile: 'mastercard',
	},
];

export const designBrandById = new Map(designBrands.map((brand) => [brand.id, brand]));

export interface DesignBrandGroup {
	id: string;
	label: string;
	note: string;
	brandIds: string[];
}

export const designBrandGroups: DesignBrandGroup[] = [
	{
		id: 'ai-models',
		label: 'AI 与模型',
		note: '把智能本身当产品的公司：有的极简到只剩描边，有的热闹得像调色盘。',
		brandIds: ['xai', 'cohere', 'together', 'ollama'],
	},
	{
		id: 'tools',
		label: '工具与 SaaS',
		note: '效率工具和开发平台的界面语言：克制、系统化、让产品截图自己说话。',
		brandIds: [
			'notion',
			'linear',
			'vercel',
			'figma',
			'ibm',
			'cursor',
			'raycast',
			'supabase',
			'framer',
			'warp',
			'mintlify',
			'posthog',
			'resend',
		],
	},
	{
		id: 'tech',
		label: '科技产品',
		note: '面向亿级用户的消费科技：摄影、氛围，和一个不容妥协的强调色。',
		brandIds: ['apple', 'spotify', 'claude', 'nvidia', 'mistral', 'minimax'],
	},
	{
		id: 'commerce',
		label: '商业与消费',
		note: '钱与生活方式的生意：信任感、精密感，和摄影的张力。',
		brandIds: ['stripe', 'nike', 'airbnb', 'coinbase', 'shopify', 'mastercard'],
	},
	{
		id: 'media',
		label: '媒体',
		note: '内容为王的编辑视觉：最大胆的排印实验发生在这里。',
		brandIds: ['theverge', 'wired'],
	},
];
