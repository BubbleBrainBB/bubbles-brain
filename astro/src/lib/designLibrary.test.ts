import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { designBrands } from '../data/designBrands';
import { vibeCodingTermCategories } from '../data/vibeCodingTerms';
import {
	designArticleCover,
	designArticles,
	designIcon,
	designKitGroups,
	designReadingParts,
	designTabs,
	designWorkImage,
	designWorks,
	designWorkThumb,
} from './designLibrary';

const staticRoot = resolve(import.meta.dirname, '../../../static');
const termIds = new Set(
	vibeCodingTermCategories.flatMap((category) => category.terms.map((t) => t.id)),
);

describe('Design library', () => {
	it('keeps the tab pages clear of brand pages under the same path', () => {
		const tabSlugs = designTabs.map((tab) => tab.href.split('/').filter(Boolean).at(2));
		for (const brand of designBrands) expect(tabSlugs).not.toContain(brand.id);
	});

	it('gives every work a unique id, both screenshots and real cross-links', () => {
		const ids = designWorks.map((work) => work.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const work of designWorks) {
			expect(existsSync(resolve(staticRoot, `.${designWorkImage(work)}`)), work.id).toBe(true);
			expect(existsSync(resolve(staticRoot, `.${designWorkThumb(work)}`)), work.id).toBe(true);
			expect(work.takeaways.length, work.id).toBeGreaterThan(0);
			expect(work.shotAt).toMatch(/^\d{4}-\d{2}$/);
			for (const term of work.terms) expect(termIds.has(term), `${work.id} → ${term}`).toBe(true);
			if (work.brandId) expect(designBrands.some((brand) => brand.id === work.brandId)).toBe(true);
		}
	});

	it('links kit notes to real terms', () => {
		for (const kit of designKitGroups.flatMap((group) => group.kits)) {
			if (kit.term) {
				expect(termIds.has(kit.term.id), kit.name).toBe(true);
				expect(kit.note, kit.name).toContain(kit.term.label);
			}
		}
	});

	it('has a saved favicon for every brand, kit and article author', () => {
		const icons = [
			...designBrands.map((brand) => ({ name: brand.name, icon: brand.id })),
			...designKitGroups.flatMap((group) => group.kits),
			...designArticles.map((article) => ({ name: article.title, icon: article.icon })),
		];
		for (const { name, icon } of icons) {
			expect(existsSync(resolve(staticRoot, `.${designIcon(icon)}`)), name).toBe(true);
		}
	});

	it('files every article in exactly one part of the contents', () => {
		const filed = designReadingParts.flatMap((part) => part.articles);
		expect([...filed].sort()).toEqual(designArticles.map((article) => article.id).sort());
	});

	it('has a saved cover for every article', () => {
		for (const article of designArticles) {
			expect(existsSync(resolve(staticRoot, `.${designArticleCover(article)}`)), article.id).toBe(
				true,
			);
		}
	});
});
