import { describe, expect, it } from 'vitest';
import { sourceFromUrl, sourceMark } from './sourceVendor';

describe('sourceFromUrl', () => {
	it('names X posts by their author and everything else by host', () => {
		expect(sourceFromUrl('https://x.com/AndrewYNg/status/1')).toBe('@AndrewYNg');
		expect(sourceFromUrl('https://twitter.com/karpathy/status/1')).toBe('@karpathy');
		expect(sourceFromUrl('https://www.vercel.com/blog/x')).toBe('vercel.com');
		expect(sourceFromUrl(undefined)).toBe('');
		expect(sourceFromUrl('nope')).toBe('');
	});
});

describe('sourceMark', () => {
	it('finds the company from the host that published the piece', () => {
		expect(sourceMark('claude.dev · Lance Martin', 'https://claude.dev/blog/x/').vendor).toBe(
			'anthropic',
		);
		expect(sourceMark('', 'https://www.anthropic.com/institute/x').vendor).toBe('anthropic');
		expect(sourceMark('', 'https://platform.claude.com/docs/x').vendor).toBe('anthropic');
		expect(sourceMark('OpenAI Developers', 'https://developers.openai.com/blog/x').vendor).toBe(
			'openai',
		);
	});

	it('knows the personal accounts that speak for a company', () => {
		expect(sourceMark('@trq212', 'https://x.com/trq212/status/1').vendor).toBe('anthropic');
	});

	it('uses an X portrait for a person, and keeps company logos for organizations', () => {
		expect(sourceMark('@trq212', 'https://x.com/trq212/status/1').image).toBe(
			'/images/sources/trq212.jpg',
		);
		expect(sourceMark('', 'https://x.com/dexhorthy/status/1').image).toBe(
			'/images/sources/dexhorthy.jpg',
		);
		expect(sourceMark('', 'https://x.com/AndrewYNg/status/1').image).toBe(
			'/images/sources/andrew-ng.jpg',
		);
		expect(sourceMark('claude.dev · Lance Martin', 'https://claude.dev/blog/x').image).toBe(
			'/images/sources/lance-martin.jpg',
		);
		expect(sourceMark('', 'https://www.philschmid.de/building-agents').image).toBe(
			'/images/sources/philipp-schmid.jpg',
		);
		expect(sourceMark('', 'https://www.seangoedecke.com/how-to-keep-thinking/').image).toBe(
			'/images/sources/sean-goedecke.jpg',
		);
		expect(sourceMark('', 'https://sankalp.bearblog.dev/my-experience').image).toBe(
			'/images/sources/sankalp.jpg',
		);
		expect(sourceMark('', 'https://x.com/HyperFrames_/status/1').image).toBe(
			'/images/sources/hyperframes.jpg',
		);
		expect(sourceMark('@droid_35719', 'https://x.com/droid_35719/status/1').image).toBe(
			'/images/sources/theo.jpg',
		);
		expect(sourceMark('Awaiting Input', 'https://awaitinginput.substack.com/p/x').image).toBe(
			'/images/sources/brandon-sovran.jpg',
		);
		expect(sourceMark('', 'https://www.soundformovement.com/chatgpt-pro').image).toBe(
			'/images/sources/michael-wall.jpg',
		);
		expect(
			sourceMark('Anthropic Institute', 'https://www.anthropic.com/institute/x').image,
		).toBeNull();
	});

	it('uses a saved favicon for hosts that are not in the LobeHub set', () => {
		expect(sourceMark('github.com', 'https://github.com/org/repo')).toMatchObject({
			vendor: 'github',
			image: null,
		});
		expect(sourceMark('', 'https://www.youtube.com/watch?v=1').vendor).toBe('youtube');
		expect(sourceMark('', 'https://youtu.be/abc').vendor).toBe('youtube');
		expect(sourceMark('', 'https://huggingface.co/blog/x').vendor).toBe('huggingface');
		expect(sourceMark('vercel.com', 'https://vercel.com/blog/x').vendor).toBe('vercel');
		expect(sourceMark('', 'https://ngrok.com/blog/x').vendor).toBe('ngrok');
		expect(sourceMark('', 'https://www.designprompts.dev/prompt').vendor).toBe('designprompts');
		expect(sourceMark('', 'https://skillsmp.com/skills').vendor).toBe('skillsmp');
		expect(sourceMark('', 'https://mp.weixin.qq.com/s/abc').vendor).toBe('wechat');
		expect(sourceMark('', 'https://anthropic.skilljar.com/claude-code-in-action').vendor).toBe(
			'anthropic',
		);
		expect(sourceMark('', 'https://yongzx.github.io/notes').vendor).toBeNull();
	});

	it('uses Earendil’s saved favicon for earendil.com', () => {
		expect(sourceMark('earendil.com', 'https://earendil.com/posts/session-portability/')).toEqual({
			vendor: 'earendil',
			initial: 'E',
			image: null,
		});
		expect(sourceMark('', 'https://www.earendil.com/posts/prompt-caching/').vendor).toBe(
			'earendil',
		);
	});

	it('falls back to a letter when there is no logo', () => {
		expect(sourceMark('Example', 'https://example.com/post')).toEqual({
			vendor: null,
			initial: 'E',
			image: null,
		});
		expect(sourceMark('', 'not a url')).toEqual({ vendor: null, initial: '·', image: null });
	});

	it('uses Felix Rieseberg’s X portrait when his site favicon is not a mark', () => {
		const image = '/images/sources/felix-rieseberg.jpg';
		expect(
			sourceMark(
				'Felix Rieseberg',
				'https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/',
			).image,
		).toBe(image);
		expect(sourceMark('felixrieseberg.com', 'https://www.felixrieseberg.com/').image).toBe(image);
		expect(sourceMark('@felixrieseberg', 'https://x.com/felixrieseberg').image).toBe(image);
	});

	it('uses Addy Osmani’s portrait on the highlights source and on his X post', () => {
		const image = '/images/sources/addy-osmani.jpg';
		expect(
			sourceMark('Addy Osmani', 'https://x.com/addyosmani/status/2115688494865465370').image,
		).toBe(image);
		expect(sourceMark('@addyosmani', 'https://x.com/addyosmani').image).toBe(image);
	});

	it('uses Dan Shipper’s portrait on the Every byline and on his X post', () => {
		const image = '/images/sources/dan-shipper.jpg';
		expect(sourceMark('Dan Shipper', 'https://every.to/p/how-codex-happened').image).toBe(image);
		expect(sourceMark('@danshipper', 'https://x.com/danshipper/status/1').image).toBe(image);
		expect(sourceMark('every.to', 'https://every.to/p/how-codex-happened').image).toBeNull();
	});

	it('uses Lauren Tan’s portrait on the highlights source and on her X post', () => {
		const image = '/images/sources/lauren-tan.png';
		expect(
			sourceMark('Lauren Tan（poteto）', 'https://x.com/poteto/status/2102050467505430555'),
		).toMatchObject({
			vendor: null,
			image,
		});
		expect(sourceMark('Lauren Tan (poteto)', 'https://x.com/poteto/status/1').image).toBe(image);
		expect(sourceMark('@poteto', 'https://x.com/poteto/status/1').image).toBe(image);
	});
});
