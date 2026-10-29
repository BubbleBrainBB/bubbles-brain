import { describe, expect, it } from 'vitest';

import { readingMinutes } from './readingTime';

describe('readingMinutes', () => {
	it('reads about 400 Chinese characters a minute', () => {
		expect(readingMinutes('字'.repeat(2000))).toBe(5);
	});

	it('reads about 220 English words a minute', () => {
		expect(readingMinutes('word '.repeat(660))).toBe(3);
	});

	it('leaves images, URLs and tags out of the count', () => {
		const noise =
			'![一张很长很长的图片说明](https://example.com/a.png) <img src="x"> https://example.com/b';
		expect(readingMinutes(`${noise.repeat(200)}${'字'.repeat(400)}`)).toBe(1);
	});

	it('never says less than a minute', () => {
		expect(readingMinutes('')).toBe(1);
	});
});
