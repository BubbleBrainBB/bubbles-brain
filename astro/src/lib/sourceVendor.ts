/**
 * Which mark a 精选阅读 source gets beside its name.
 * Companies use the LobeHub logos under static/images/vendors/ (see THIRD_PARTY_NOTICES).
 * Sites without a LobeHub logo use their own favicon, saved in that same directory.
 * People use a saved X profile portrait under static/images/sources/.
 * Anything else gets a lettered circle.
 */

/** Hosts that publish on a company's behalf. */
const HOST_VENDORS: [RegExp, string][] = [
	[
		/(^|\.)(anthropic\.com|claude\.com|claude\.dev|claude\.ai|anthropic\.skilljar\.com)$/,
		'anthropic',
	],
	[/(^|\.)openai\.com$/, 'openai'],
	[/(^|\.)(google|blog\.google|deepmind\.google|deepmind\.com)$/, 'google'],
	[/(^|\.)(meta\.com|ai\.meta\.com)$/, 'meta'],
	[/(^|\.)deepseek\.com$/, 'deepseek'],
	[/(^|\.)(qwen\.ai|qwenlm\.github\.io)$/, 'qwen'],
	[/(^|\.)(moonshot\.ai|moonshot\.cn|kimi\.com)$/, 'moonshot'],
	[/(^|\.)(minimax\.io|minimaxi\.com)$/, 'minimax'],
	[/(^|\.)(z\.ai|zhipuai\.cn)$/, 'zai'],
	[/(^|\.)(xiaomi\.com|mi\.com)$/, 'xiaomi'],
	[/(^|\.)earendil\.com$/, 'earendil'],
	[/(^|\.)github\.com$/, 'github'],
	[/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'],
	[/(^|\.)huggingface\.co$/, 'huggingface'],
	[/(^|\.)vercel\.com$/, 'vercel'],
	[/(^|\.)ngrok\.com$/, 'ngrok'],
	[/(^|\.)designprompts\.dev$/, 'designprompts'],
	[/(^|\.)skillsmp\.com$/, 'skillsmp'],
	[/(^|\.)(weixin\.qq\.com|wx\.qq\.com)$/, 'wechat'],
];

/** Personal accounts whose posts speak for a company (the link alone cannot tell). */
const HANDLE_VENDORS: Record<string, string> = {
	'@trq212': 'anthropic',
};

/** A readable source for an article without a named one: the host, or the author's handle on X. */
export function sourceFromUrl(sourceUrl: unknown): string {
	if (typeof sourceUrl !== 'string') return '';
	try {
		const url = new URL(sourceUrl);
		const host = url.hostname.replace(/^www\./, '');
		const handle = url.pathname.split('/').filter(Boolean)[0];
		if ((host === 'x.com' || host === 'twitter.com') && handle) return `@${handle}`;
		return host;
	} catch {
		return '';
	}
}

/** People, matched by X handle, personal site, or an exact byline. */
const PORTRAITS: { image: string; handle?: string; hosts?: string[]; name?: RegExp }[] = [
	{ handle: 'poteto', name: /^lauren tan\b/i, image: '/images/sources/lauren-tan.png' },
	{ handle: 'trq212', image: '/images/sources/trq212.jpg' },
	{ handle: 'dexhorthy', image: '/images/sources/dexhorthy.jpg' },
	{ handle: 'vercantez', image: '/images/sources/vercantez.jpg' },
	{ handle: 'akshay_pachaar', image: '/images/sources/akshay-pachaar.jpg' },
	{ handle: 'andrewyng', image: '/images/sources/andrew-ng.jpg' },
	{ handle: 'sumanth_077', image: '/images/sources/sumanth.jpg' },
	{
		handle: 'rlancemartin',
		name: /^claude\.dev · lance martin$/i,
		image: '/images/sources/lance-martin.jpg',
	},
	{ hosts: ['philschmid.de'], image: '/images/sources/philipp-schmid.jpg' },
	{ hosts: ['steipete.me'], image: '/images/sources/peter-steinberger.png' },
	{ hosts: ['nicknisi.com'], image: '/images/sources/nick-nisi.jpg' },
	{ hosts: ['yongzx.github.io'], image: '/images/sources/yong-zhengxin.jpg' },
	{ hosts: ['lucumr.pocoo.org'], image: '/images/sources/armin-ronacher.jpg' },
	{ hosts: ['mariozechner.at'], image: '/images/sources/mario-zechner.jpg' },
	{ hosts: ['minoradventures.co'], image: '/images/sources/marek-minor.jpg' },
	{ hosts: ['manthanguptaa.in'], image: '/images/sources/manthan-gupta.jpg' },
	{ hosts: ['seangoedecke.com'], image: '/images/sources/sean-goedecke.jpg' },
	{
		handle: 'felixrieseberg',
		hosts: ['felixrieseberg.com'],
		name: /^felix rieseberg\b/i,
		image: '/images/sources/felix-rieseberg.jpg',
	},
	{
		handle: 'danshipper',
		name: /^dan shipper\b/i,
		image: '/images/sources/dan-shipper.jpg',
	},
	{ hosts: ['sankalp.bearblog.dev'], image: '/images/sources/sankalp.jpg' },
	{ handle: 'droid_35719', image: '/images/sources/theo.jpg' },
	{ handle: 'hyperframes_', image: '/images/sources/hyperframes.jpg' },
	{
		hosts: ['awaitinginput.substack.com'],
		name: /^awaiting input$/i,
		image: '/images/sources/brandon-sovran.jpg',
	},
	{ hosts: ['soundformovement.com'], image: '/images/sources/michael-wall.jpg' },
];

export interface SourceMark {
	/** A vendor slug with a logo under /images/vendors/, or null for a lettered circle. */
	vendor: string | null;
	/** The letter shown when there is no logo. */
	initial: string;
	/** A portrait served from /images/, or null when the mark is a logo or a letter. */
	image: string | null;
}

export function sourceMark(source: string, sourceUrl?: unknown): SourceMark {
	let vendor: string | null = HANDLE_VENDORS[source.trim().toLowerCase()] ?? null;
	if (!vendor && typeof sourceUrl === 'string') {
		try {
			const host = new URL(sourceUrl).hostname.replace(/^www\./, '');
			vendor = HOST_VENDORS.find(([pattern]) => pattern.test(host))?.[1] ?? null;
		} catch {
			vendor = null;
		}
	}
	const initial = (source.replace(/^@/, '').trim()[0] ?? '·').toUpperCase();
	return { vendor, initial, image: sourcePortrait(source, sourceUrl) };
}

function sourceHandle(sourceUrl: unknown): string | null {
	if (typeof sourceUrl !== 'string') return null;
	try {
		const url = new URL(sourceUrl);
		const host = url.hostname.replace(/^www\./, '');
		if (host !== 'x.com' && host !== 'twitter.com') return null;
		const handle = url.pathname.split('/').filter(Boolean)[0];
		return handle ? handle.toLowerCase() : null;
	} catch {
		return null;
	}
}

function sourceHost(sourceUrl: unknown): string | null {
	if (typeof sourceUrl !== 'string') return null;
	try {
		return new URL(sourceUrl).hostname.replace(/^www\./, '');
	} catch {
		return null;
	}
}

function sourcePortrait(source: string, sourceUrl?: unknown): string | null {
	const name = source.trim();
	const handle =
		(name.startsWith('@') ? name.slice(1).toLowerCase() : sourceHandle(sourceUrl)) ?? null;
	const host = sourceHost(sourceUrl);
	return (
		PORTRAITS.find(
			(portrait) =>
				(portrait.handle != null && portrait.handle === handle) ||
				(portrait.name?.test(name) ?? false) ||
				(host != null && portrait.hosts?.includes(host) === true),
		)?.image ?? null
	);
}
