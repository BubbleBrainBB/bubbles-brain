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

	it('falls back to a letter when there is no logo', () => {
		expect(sourceMark('Awaiting Input', 'https://awaitinginput.substack.com/p/x')).toEqual({
			vendor: null,
			initial: 'A',
			image: null,
		});
		expect(sourceMark('vercel.com', 'https://vercel.com/blog/x')).toEqual({
			vendor: null,
			initial: 'V',
			image: null,
		});
		expect(sourceMark('', 'not a url')).toEqual({ vendor: null, initial: '·', image: null });
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
