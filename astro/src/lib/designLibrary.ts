/**
 * Design 栏目里除品牌规范以外的收藏：组件库、别人做的网页与组件（作品）、文章与博客。
 * 组件库和文章直接链到外站；作品有自己的详情页，截图在 static/media/design/works/。
 *
 * 加一个作品：拍一张 1440×900 的首屏截图存成 `<id>.jpg`，再缩一张 720 宽的 `<id>-thumb.jpg`，
 * 然后在 designWorks 里加一条。terms 填界面图鉴里的术语 id。
 */

export type DesignTab = 'brands' | 'kits' | 'works' | 'reading';

export const designTabs: { id: DesignTab; label: string; href: string }[] = [
	{ id: 'brands', label: '品牌规范', href: '/vibe-coding/design/' },
	{ id: 'kits', label: '组件库', href: '/vibe-coding/design/kits/' },
	{ id: 'works', label: '作品', href: '/vibe-coding/design/works/' },
	{ id: 'reading', label: '文章', href: '/vibe-coding/design/reading/' },
];

// ------------------------------------------------------------------ 组件库

export type DesignKitFramework = 'React' | 'Vue' | '小程序' | 'Solid' | 'Svelte' | 'JS';

export interface DesignKit {
	name: string;
	/** 网站自己的 favicon，存在 static/media/design/icons/<icon>.png（64×64） */
	icon: string;
	url: string;
	/** 名字旁的灰字：域名或作者 */
	by: string;
	frameworks: DesignKitFramework[];
	/** 什么时候选它，一句话 */
	note: string;
	/** 文中提到的界面图鉴术语，渲染成链接 */
	term?: { id: string; label: string };
}

export interface DesignKitGroup {
	id: string;
	label: string;
	kits: DesignKit[];
}

export const designKitGroups: DesignKitGroup[] = [
	{
		id: 'full',
		label: '成套组件库',
		kits: [
			{
				name: 'shadcn/ui',
				icon: 'shadcn',
				url: 'https://ui.shadcn.com',
				by: 'ui.shadcn.com',
				frameworks: ['React'],
				note: '代码直接复制进你的项目，想怎么改都行。AI 写前端时最常拿它打底。',
			},
			{
				name: 'Ant Design',
				icon: 'antd',
				url: 'https://ant.design',
				by: 'ant.design',
				frameworks: ['React'],
				note: '蚂蚁出品，表格、表单、后台布局最全，做中后台先看它。',
			},
			{
				name: 'HeroUI',
				icon: 'heroui',
				url: 'https://www.heroui.com',
				by: 'heroui.com',
				frameworks: ['React'],
				note: '前身是 NextUI，默认样式就很好看，适合不想调样式的人。',
			},
			{
				name: 'Arco Design',
				icon: 'arco',
				url: 'https://arco.design',
				by: 'arco.design',
				frameworks: ['React', 'Vue'],
				note: '字节的企业级组件库，React 和 Vue 两套写法一致。',
			},
			{
				name: 'TDesign',
				icon: 'tdesign',
				url: 'https://tdesign.tencent.com',
				by: 'tdesign.tencent.com',
				frameworks: ['React', 'Vue', '小程序'],
				note: '腾讯出品，网页、手机、小程序用同一套设计。',
			},
			{
				name: 'Element Plus',
				icon: 'element-plus',
				url: 'https://element-plus.org',
				by: 'element-plus.org',
				frameworks: ['Vue'],
				note: 'Vue 3 后台项目里最常见的那一套。',
			},
			{
				name: 'Nuxt UI',
				icon: 'nuxt-ui',
				url: 'https://ui.nuxt.com',
				by: 'ui.nuxt.com',
				frameworks: ['Vue'],
				note: 'Nuxt 官方组件库，基于 Tailwind，写 Vue 时的 shadcn 感觉。',
			},
		],
	},
	{
		id: 'headless',
		label: '不带样式的组件库',
		kits: [
			{
				name: 'Radix Primitives',
				icon: 'radix',
				url: 'https://www.radix-ui.com',
				by: 'radix-ui.com',
				frameworks: ['React'],
				note: 'shadcn/ui 底下那一层。弹窗、下拉、焦点管理都替你处理好。',
			},
			{
				name: 'Base UI',
				icon: 'base-ui',
				url: 'https://base-ui.com',
				by: 'base-ui.com',
				frameworks: ['React'],
				note: 'Radix 和 MUI 的原班人马重新做的一套。',
			},
			{
				name: 'React Aria',
				icon: 'react-aria',
				url: 'https://react-spectrum.adobe.com/react-aria/',
				by: 'Adobe',
				frameworks: ['React'],
				note: '无障碍和多语言做得最细，读屏、键盘、日期格式都考虑到了。',
			},
			{
				name: 'Headless UI',
				icon: 'headless-ui',
				url: 'https://headlessui.com',
				by: 'headlessui.com',
				frameworks: ['React', 'Vue'],
				note: 'Tailwind 团队做的，配 Tailwind 写最顺手。',
			},
			{
				name: 'Ark UI',
				icon: 'ark-ui',
				url: 'https://ark-ui.com',
				by: 'ark-ui.com',
				frameworks: ['React', 'Vue', 'Solid', 'Svelte'],
				note: 'Chakra 团队出品，一套逻辑四种框架都能用。',
			},
		],
	},
	{
		id: 'single',
		label: '单个组件',
		kits: [
			{
				name: 'Sonner',
				icon: 'sonner',
				url: 'https://sonner.emilkowal.ski',
				by: 'Emil Kowalski',
				frameworks: ['React'],
				note: '只做轻提示，几条叠在一起时的层次感是标杆。',
				term: { id: 'toast', label: '轻提示' },
			},
			{
				name: 'Vaul',
				icon: 'vaul',
				url: 'https://vaul.emilkowal.ski',
				by: 'Emil Kowalski',
				frameworks: ['React'],
				note: '只做抽屉，手机上往下一拽就关的手感。',
				term: { id: 'drawer', label: '抽屉' },
			},
			{
				name: 'cmdk',
				icon: 'cmdk',
				url: 'https://github.com/pacocoursey/cmdk',
				by: 'Paco Coursey',
				frameworks: ['React'],
				note: '只做命令面板，Linear、Raycast 那种 ⌘K。',
				term: { id: 'command-palette', label: '命令面板' },
			},
		],
	},
	{
		id: 'icons',
		label: '图标',
		kits: [
			{
				name: 'QingIcon',
				icon: 'qingicon',
				url: 'https://qingicon.com',
				by: 'Asorn',
				frameworks: ['React', 'Vue'],
				note: '3900 多个中性风图标，线条、填充之外还有一套手绘草图风，商用免费。',
			},
		],
	},
	{
		id: 'motion',
		label: '动效',
		kits: [
			{
				name: 'Motion',
				icon: 'motion',
				url: 'https://motion.dev',
				by: 'motion.dev',
				frameworks: ['React', 'Vue', 'JS'],
				note: '前身是 Framer Motion。想让东西动起来，先从它开始。',
			},
			{
				name: 'Magic UI',
				icon: 'magic-ui',
				url: 'https://magicui.design',
				by: 'magicui.design',
				frameworks: ['React'],
				note: '落地页上常见的动效块，能直接和 shadcn/ui 混用。',
			},
		],
	},
];

export const designIcon = (icon: string) => `/media/design/icons/${icon}.png`;

// ------------------------------------------------------------------ 作品

export type DesignWorkKind = '产品官网' | '个人站' | '组件与交互' | '设计系统';

export interface DesignWork {
	id: string;
	name: string;
	url: string;
	/** 详情页标题下的灰字，例如「linear.app」或「Emil Kowalski」 */
	by: string;
	kind: DesignWorkKind;
	/** 列表里截图下面那一句 */
	note: string;
	/** 详情页「值得学的地方」，照着截图写，别写截图里看不到的 */
	takeaways: string[];
	/** 界面图鉴术语 id */
	terms: string[];
	/** 「想让 AI 做出这种感觉」的提示词 */
	prompt: string;
	/** 同一家在品牌规范里的 id */
	brandId?: string;
	/** 截图拍摄时间，YYYY-MM */
	shotAt: string;
}

export const designWorks: DesignWork[] = [
	{
		id: 'linear',
		name: 'Linear',
		url: 'https://linear.app',
		by: 'linear.app',
		kind: '产品官网',
		note: '首屏不画插图，直接放真实产品界面。',
		takeaways: [
			'首屏不画插图，下半屏直接放真实的产品界面：侧边栏、任务详情、右下角的 Agent 对话框都是真的。',
			'近黑底上只有两层字：白色大标题，和缩得很小、很灰的副标题。层级全靠字号和明暗，不靠颜色。',
			'导航全是文字链接，整屏唯一实心的元素是右上角白色的 Sign up 胶囊，所以眼睛只会去那儿。',
		],
		terms: ['navbar', 'hero', 'sidebar', 'badge'],
		prompt:
			'做一个深色的产品首页：背景接近纯黑。首屏左对齐两行白色大标题，下面一行很小的灰色副标题。不要插图，首屏下半部分直接放产品真实界面的截图（左侧边栏、中间详情、右下角一个浮动对话框）。导航栏只用文字链接，右上角放一个白底黑字的小胶囊按钮，全页只有它是实心的。',
		brandId: 'linear',
		shotAt: '2026-10',
	},
	{
		id: 'raycast',
		name: 'Raycast',
		url: 'https://www.raycast.com',
		by: 'raycast.com',
		kind: '产品官网',
		note: '一束红色光影撑起整个首屏，文案只有一句。',
		takeaways: [
			'首屏的主角是一束斜着的红色光影，没有产品截图，也没有插图。',
			'标题只有一句话，白色、居中、两行；下面两行灰色说明，再往下才是按钮。',
			'导航收在顶部一条半透明的圆角长条里，右侧白色的 Download 是唯一实心按钮。',
		],
		terms: ['navbar', 'hero', 'button'],
		prompt:
			'做一个深色产品首页：近黑背景，首屏中间是一大片斜向的红色光影（模糊、发光的条纹）。标题居中、白色、两行，只有一句话；下面两行灰色小字说明，再下面一个浅色小按钮。导航栏是悬浮在顶部的半透明圆角长条，右侧放一个白色的下载按钮。',
		brandId: 'raycast',
		shotAt: '2026-10',
	},
	{
		id: 'rauno',
		name: 'Rauno Freiberg',
		url: 'https://rauno.me',
		by: 'rauno.me',
		kind: '个人站',
		note: '自我介绍就是一张海报：大字压着一个黄色圆。',
		takeaways: [
			'首屏是一张白色海报：一句自我介绍拆成六行大字，单数行顶格、双数行缩进，错落着排。',
			'一个明黄色的大圆压在字后面，是整页唯一的颜色。',
			'顶部一排细竖线当页码，右边露出下一张海报的边，让人知道还能往右翻。',
		],
		terms: ['hero', 'pagination'],
		prompt:
			'做一个个人主页首屏：浅灰背景上放一张白色横版海报。海报里用很大的无衬线黑字写一句自我介绍，拆成五六行，奇数行顶格、偶数行缩进。字后面压一个明黄色的大圆，这是全页唯一的颜色。海报上方一排细竖线当页码指示，右侧露出下一张海报的一条边。',
		shotAt: '2026-10',
	},
	{
		id: 'paco',
		name: 'Paco Coursey',
		url: 'https://paco.me',
		by: 'paco.me',
		kind: '个人站',
		note: '只有文字和下划线，三栏小目录很耐看。',
		takeaways: [
			'整页只有差不多大的正文和带下划线的链接，没有按钮，也没有图片。',
			'作品分成 Building / Projects / Writing 三栏小目录，每条是一个下划线标题加一句说明。',
			'斜体只用在开头一处，用来点出他想说的那件事。',
		],
		terms: ['section'],
		prompt:
			'做一个纯文字的个人主页：白底，一条居中的窄栏，所有文字都是小号无衬线、同一个字号。开头两三句自我介绍，其中一个短语用斜体。下面分三栏小目录（在做的、项目、文章），每条是一个带下划线的标题，下面一句灰色说明。不要按钮、不要图片、不要卡片。',
		shotAt: '2026-10',
	},
	{
		id: 'emil',
		name: 'Emil Kowalski',
		url: 'https://emilkowal.ski',
		by: 'emilkowal.ski',
		kind: '个人站',
		note: '窄栏、小字、大留白，整页只靠排版。',
		takeaways: [
			'一条很窄的正文栏靠左排，右边留出大片空白。',
			'区块标题和正文一样大，只靠字重区分；区块之间隔得很远。',
			'项目列表每条两行：名字，加一句灰色说明。',
		],
		terms: ['section'],
		prompt:
			'做一个极简个人主页：白底，内容是一条约 480px 宽的窄栏，文字很小。顶部两行写名字和职位。下面几个区块（Today、Projects、Writing），区块标题和正文同字号、只加粗，区块之间留很大的空。项目列表每条两行：名字一行，灰色说明一行。',
		shotAt: '2026-10',
	},
	{
		id: 'devouring-details',
		name: 'Devouring Details',
		url: 'https://devouringdetails.com',
		by: 'Rauno Freiberg',
		kind: '组件与交互',
		note: 'Rauno 写的交互细节手册，每个例子都能上手玩。',
		takeaways: [
			'灰底上放一张白纸，读起来像在翻一本书。',
			'左边一列长短不一的细横线就是章节目录，长短表示层级。',
			'唯一的颜色是橙色：左上角一个圆点，右上角一个 Register Now 标签。',
		],
		terms: ['sidebar'],
		prompt:
			'做一个像书页的网页：浅灰背景，中间一张白色的纸，纸上是两栏正文。页面最左边一列细细的横线当目录，横线长短不一表示层级。整页只用一种强调色：橙色，用在左上角一个小圆点和右上角一个小标签上。',
		shotAt: '2026-10',
	},
	{
		id: 'sonner',
		name: 'Sonner',
		url: 'https://sonner.emilkowal.ski',
		by: 'Emil Kowalski',
		kind: '组件与交互',
		note: '点一下按钮，叠起来的轻提示就是说明书。',
		takeaways: [
			'标题背后叠着几层浅色卡片，本身就在演示轻提示是怎么叠起来的。',
			'一黑一白两个按钮并排，黑色那个是主操作：点了就弹出一条轻提示。',
			'安装命令和用法代码紧跟在首屏下面，灰底等宽字，复制就能用。',
		],
		terms: ['toast', 'button'],
		prompt:
			'给一个 React 组件做介绍页：白底，居中一个很大的粗体组件名，下面一句说明。标题背后叠三层浅色圆角卡片，暗示组件效果。下面一黑一白两个按钮并排，黑色按钮点了会真的弹出一条轻提示。再往下是灰底等宽字的安装命令和用法代码块，右上角有复制按钮。',
		shotAt: '2026-10',
	},
	{
		id: 'vaul',
		name: 'Vaul',
		url: 'https://vaul.emilkowal.ski',
		by: 'Emil Kowalski',
		kind: '组件与交互',
		note: '抽屉拖到一半松手时的阻尼和回弹。',
		takeaways: [
			'首页几乎全是留白：一个大标题、一句话、一个 Open Drawer 按钮。',
			'真正的内容在按钮后面：点开才看到抽屉从底部滑上来，可以拖着往下关。',
		],
		terms: ['drawer', 'button'],
		prompt:
			'做一个组件演示页：白底，居中一个大标题和一句说明，下面一个描边按钮「打开抽屉」。点按钮后从屏幕底部滑出一个圆角抽屉，背后的页面微微缩小变暗；抽屉可以用手指往下拖，拖过一半松手就关上，没过一半就弹回去。',
		shotAt: '2026-10',
	},
	{
		id: 'geist',
		name: 'Geist',
		url: 'https://vercel.com/geist/introduction',
		by: 'Vercel',
		kind: '设计系统',
		note: 'Vercel 的设计系统：色阶、字体、组件一页看全。',
		takeaways: [
			'左边是按 Foundations / Brands / Components 分组的长目录，右边用格子把品牌、图标、组件、颜色、字体各放一格预览。',
			'格子之间只用细线分隔，整页几乎只有黑白灰，颜色只出现在色板那一格里。',
			'顶部搜索框带 ⌘K 提示，文档再长也能一下跳到想找的组件。',
		],
		terms: ['sidebar', 'command-palette'],
		prompt:
			'做一个设计系统的文档首页：浅色背景，左侧一列分组目录（基础、品牌、组件），顶部一个带 ⌘K 提示的搜索框。右侧主区先是标题和一句说明，下面用细线分成两列格子，每格是一个预览（logo、图标墙、组件样例、色条、字体），格子下方写名字和一句说明。整体只用黑白灰，颜色只出现在色板格里。',
		brandId: 'vercel',
		shotAt: '2026-10',
	},
];

export const designWorkHref = (work: DesignWork) => `/vibe-coding/design/works/${work.id}/`;
export const designWorkImage = (work: DesignWork) => `/media/design/works/${work.id}.jpg`;
export const designWorkThumb = (work: DesignWork) => `/media/design/works/${work.id}-thumb.jpg`;

// ------------------------------------------------------------------ 文章

/** 页尾那句「常去他们的网站逛逛」里的设计师 */
export const designPeople: { name: string; url: string }[] = [
	{ name: 'Rauno Freiberg', url: 'https://rauno.me' },
	{ name: 'Emil Kowalski', url: 'https://emilkowal.ski' },
	{ name: 'Paco Coursey', url: 'https://paco.me' },
	{ name: 'Josh W. Comeau', url: 'https://www.joshwcomeau.com' },
	{ name: 'Ahmad Shadeed', url: 'https://ishadeed.com' },
];

export interface DesignArticle {
	id: string;
	/** 中文标题，正文里放在书名号中 */
	title: string;
	/** 原题，鼠标停在标题上时显示 */
	original: string;
	url: string;
	/** 作者，或发文的公司 */
	source: string;
	/** 作者网站的 favicon，同组件库 */
	icon: string;
}

export const designArticles: DesignArticle[] = [
	{
		id: 'interaction-design',
		title: '交互设计里看不见的细节',
		original: 'Invisible Details of Interaction Design',
		url: 'https://rauno.me/craft/interaction-design',
		source: 'Rauno Freiberg',
		icon: 'rauno',
	},
	{
		id: 'web-guidelines',
		title: 'Web 界面准则',
		original: 'Web Interface Guidelines',
		url: 'https://vercel.com/design/guidelines',
		source: 'Vercel',
		icon: 'vercel',
	},
	{
		id: 'great-animations',
		title: '好的动画长什么样',
		original: 'Great Animations',
		url: 'https://emilkowal.ski/ui/great-animations',
		source: 'Emil Kowalski',
		icon: 'emil',
	},
	{
		id: 'no-animations',
		title: '你不需要动画',
		original: "You Don't Need Animations",
		url: 'https://emilkowal.ski/ui/you-dont-need-animations',
		source: 'Emil Kowalski',
		icon: 'emil',
	},
	{
		id: 'flexbox',
		title: 'Flexbox 交互指南',
		original: 'An Interactive Guide to Flexbox',
		url: 'https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/',
		source: 'Josh W. Comeau',
		icon: 'josh',
	},
	{
		id: 'grid',
		title: 'CSS Grid 交互指南',
		original: 'An Interactive Guide to CSS Grid',
		url: 'https://www.joshwcomeau.com/css/interactive-guide-to-grid/',
		source: 'Josh W. Comeau',
		icon: 'josh',
	},
	{
		id: 'shadows',
		title: '在 CSS 里画出好看的阴影',
		original: 'Designing Beautiful Shadows in CSS',
		url: 'https://www.joshwcomeau.com/css/designing-shadows/',
		source: 'Josh W. Comeau',
		icon: 'josh',
	},
	{
		id: 'defensive-css',
		title: '防御式 CSS',
		original: 'Defensive CSS',
		url: 'https://defensivecss.dev',
		source: 'Ahmad Shadeed',
		icon: 'ahmad',
	},
	{
		id: 'linear-redesign',
		title: '我们怎样重做 Linear 的界面',
		original: 'How we redesigned the Linear UI',
		url: 'https://linear.app/now/how-we-redesigned-the-linear-ui',
		source: 'Linear',
		icon: 'linear',
	},
	{
		id: 'accessible-colors',
		title: '怎样设计一套无障碍的配色',
		original: 'Designing accessible color systems',
		url: 'https://stripe.com/blog/accessible-color-systems',
		source: 'Stripe',
		icon: 'stripe',
	},
];

/** 文章自己的分享图（480 宽），鼠标停在书名上时浮出来 */
export const designArticleCover = (article: DesignArticle) =>
	`/media/design/reading/${article.id}.jpg`;

/**
 * 文章页排成书的目录：分几部分，每部分几篇，编号按目录顺序从 01 往下数。
 * 每篇文章正好出现在一个部分里（测试会检查）。
 */
export const designReadingParts: { id: string; label: string; articles: string[] }[] = [
	{ id: 'interaction', label: '交互', articles: ['interaction-design', 'web-guidelines'] },
	{ id: 'motion', label: '动画', articles: ['great-animations', 'no-animations'] },
	{
		id: 'layout',
		label: '布局与阴影',
		articles: ['flexbox', 'grid', 'shadows', 'defensive-css'],
	},
	{ id: 'cases', label: '别人怎么做', articles: ['linear-redesign', 'accessible-colors'] },
];
