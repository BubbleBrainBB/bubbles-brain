import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import { benchmarkIcons } from './benchmarkIcons';

import {
	benchmarkLedger,
	benchmarkRoute,
	benchmarkDirectoryRoute,
	benchmarkParagraphs,
	collectNotes,
	formatScore,
	groupedBenchmarks,
	rankedScores,
} from './benchmarks';

describe('benchmark ledger', () => {
	it('preserves FrontierSWE v2 results, resource metrics, and trial-range semantics', () => {
		const rows = rankedScores('frontierswe');
		expect(
			rows.map(({ model, score }) => [
				model.name,
				Number(score.value.toFixed(1)),
				Number(score.average_cost_usd!.toFixed(2)),
			]),
		).toEqual([
			['GPT-6 Astra', 65.5, 1029.65],
			['Claude Opus 5.5', 62.3, 98.87],
			['Claude Sonnet 5.5', 61.9, 110.45],
			['Gemini 4 Carbon', 61.2, 61.93],
			['Claude Fable 5.1', 56.3, 138.55],
			['Gemini 4 Argon', 55.0, 129.36],
			['Claude Opus 5', 52.0, 196.71],
			['Claude Fable 5', 47.0, 301.28],
			['Claude Haiku 5.5', 43.8, 20.55],
			['GPT-5.6 Sol', 32.2, 179.64],
			['GLM-5.3', 30.2, 97.22],
			['Grok 4.7', 29.5, 318.77],
			['Kimi K3', 25.9, 109.71],
			['Muse Spark 1.3', 25.8, 243.34],
			['Grok 4.6', 25.3, 243.43],
			['Gemini 3.7 Flash', 20.3, 34.14],
			['Gemini 3.8 Flash', 19.6, 38.75],
			['GLM-5.3 Flash', 18.1, 11.03],
			['Qwen3.8-Max-0902', 17.8, 51.27],
			['Qwen3.8-Max', 15.8, 55.14],
			['DeepSeek V4 Flash Vision Exp', 14.8, 8.57],
			['Muse Spark 1.2', 12.0, 27.81],
			['Inkling', 4.1, 9.15],
		]);
		for (const { model, score } of rows) {
			expect(benchmarkIcons[model.creator]).toBeTruthy();
			expect(score.agent).toBe('Proximus');
			expect(score.ci).toBeUndefined();
			expect(score.worst_at_5).toBeGreaterThanOrEqual(0);
			expect(score.worst_at_5!).toBeLessThanOrEqual(score.value);
			expect(score.best_at_5!).toBeGreaterThanOrEqual(score.value);
			expect(score.best_at_5!).toBeLessThanOrEqual(100);
			expect(score.average_duration_seconds).toBeGreaterThan(0);
		}
		const benchmark = benchmarkLedger.benchmarks.find(({ id }) => id === 'frontierswe')!;
		expect(benchmark.category).toBe('coding');
		expect(benchmark.url).toBe('https://www.frontierswe.com/');
		expect(benchmark.score_label?.en).toBe('Mean@5');
		expect(benchmark.description.en).toContain('not a 95% confidence interval');
		expect(benchmarkDirectoryRoute(benchmark, 'zh-CN')).toBe('/benchmarks/#coding');
		expect(benchmarkDirectoryRoute(benchmark, 'en')).toBe('/en/benchmarks/#bc-benchmarks-coding');
		const fallback = rows.find(({ model }) => model.name === 'Claude Fable 5.1')!.score;
		expect(fallback.note?.en).toContain('Opus 5');
		expect(fallback.note_url).toBe('https://www.frontierswe.com/blog/v2');
	});

	it('matches the published schema', async () => {
		const schema = JSON.parse(
			await readFile(resolve(process.cwd(), '../schemas/benchmarks.schema.json'), 'utf8'),
		);
		const validate = new Ajv({ allErrors: true, strict: true }).compile(schema);
		expect(validate(benchmarkLedger), JSON.stringify(validate.errors, null, 2)).toBe(true);
		for (const category of [undefined, 'unknown', 'agent']) {
			const invalid = structuredClone(benchmarkLedger);
			Object.assign(invalid.benchmarks[0]!, { category });
			expect(validate(invalid)).toBe(false);
		}
	});

	it('groups every benchmark once by primary domain and omits empty groups', () => {
		const groups = groupedBenchmarks();
		expect(
			groups.map((group) => [group.id, group.benchmarks.map((benchmark) => benchmark.id)]),
		).toEqual([
			['general', ['aa-index', 'gdpval-aa', 'vals-index']],
			['coding', ['tbench-4', 'deepswe', 'programbench', 'frontierswe']],
			['finance', ['finance-agent']],
		]);
		const ids = groups.flatMap((group) => group.benchmarks.map((benchmark) => benchmark.id));
		expect(ids.length).toBe(new Set(ids).size);
		expect(ids.slice().sort()).toEqual(
			benchmarkLedger.benchmarks.map((benchmark) => benchmark.id).sort(),
		);
		expect(groupedBenchmarks([])).toEqual([]);
		expect(
			groupedBenchmarks(
				benchmarkLedger.benchmarks.filter((benchmark) => benchmark.category === 'coding'),
			).map((group) => group.id),
		).toEqual(['coding']);
	});

	it('keeps model and benchmark ids unique and every score attached to a known benchmark', () => {
		const benchmarkIds = benchmarkLedger.benchmarks.map((entry) => entry.id);
		const modelIds = benchmarkLedger.models.map((entry) => entry.id);
		expect(new Set(benchmarkIds).size).toBe(benchmarkIds.length);
		expect(new Set(modelIds).size).toBe(modelIds.length);
		for (const model of benchmarkLedger.models) {
			for (const key of Object.keys(model.scores)) expect(benchmarkIds).toContain(key);
		}
	});

	it('ranks a benchmark highest first, keeps ties in ledger order and drops unscored models', () => {
		const ranked = rankedScores('a', {
			schema_version: 1,
			checked_at: '2026-01-01',
			benchmarks: [
				{
					id: 'a',
					category: 'general',
					name: { zh: 'A', en: 'A' },
					source: 's',
					url: 'https://example.com',
					format: 'integer',
					measures: { zh: 'm', en: 'm' },
					explainer: { zh: 'e', en: 'e' },
					description: { zh: 'd', en: 'd' },
				},
			],
			models: [
				{ id: 'low', name: 'low', creator: 'x', scores: { a: { value: 1 } } },
				{ id: 'tie-first', name: 't1', creator: 'x', scores: { a: { value: 5 } } },
				{ id: 'tie-second', name: 't2', creator: 'x', scores: { a: { value: 5 } } },
				{ id: 'missing', name: 'm', creator: 'x', scores: { b: { value: 9 } } },
			],
		});
		expect(ranked.map(({ model }) => model.id)).toEqual(['tie-first', 'tie-second', 'low']);
	});

	it('builds locale-specific benchmark routes', () => {
		expect(benchmarkRoute('tbench-4', 'zh-CN')).toBe('/benchmarks/tbench-4/');
		expect(benchmarkRoute('tbench-4', 'en')).toBe('/en/benchmarks/tbench-4/');
	});

	it('preserves the full GDPval-AA v2.1 Elo scale, its anchor and explicit evaluation configurations', () => {
		const rows = rankedScores('gdpval-aa');
		expect(rows).toHaveLength(308);
		expect(rows[0]).toMatchObject({
			model: { name: 'Claude Opus 5.5 (Max, Default Fallback)' },
			score: { value: 1866, ci: 26, agent: 'Stirrup' },
		});
		expect(rows.at(-1)).toMatchObject({
			model: { name: 'K2 Horizon 0.9B' },
			score: { value: -402, ci: 20 },
		});
		expect(rows.filter(({ score }) => score.value < 0)).toHaveLength(28);
		const anchors = rows.filter(({ score }) => score.ci === undefined);
		expect(anchors.map(({ model, score }) => [model.name, score.value])).toEqual([
			['DeepSeek V4.1 Flash (Max)', 1600],
		]);
		expect(anchors[0]!.score.note?.en).toContain('anchor');
		for (const { model, score } of rows) {
			expect(score.source_model).toBe(model.name);
			expect(benchmarkIcons[model.creator]).toBeTruthy();
			if (score.ci !== undefined) expect(score.ci).toBeGreaterThan(0);
			expect(formatScore(score, 'integer')).not.toContain('%');
		}
		const benchmark = benchmarkLedger.benchmarks.find((entry) => entry.id === 'gdpval-aa')!;
		expect(benchmark).toMatchObject({
			category: 'general',
			checked_at: '2026-11-01',
			url: 'https://artificialanalysis.ai/evaluations/gdpval-aa',
			format: 'integer',
			score_label: { zh: 'Elo 评分', en: 'Elo rating' },
		});
	});

	it('keeps the Intelligence Index v5.0 snapshot at the 45 cut-off, in official order', () => {
		const rows = rankedScores('aa-index');
		expect(rows).toHaveLength(23);
		expect(rows.slice(0, 4).map(({ model, score }) => [model.name, score.value])).toEqual([
			['Gemini 4 Carbon (high)', 59],
			['Claude Opus 5.5 (max)', 58],
			['Claude Opus 5.5 (xhigh)', 57],
			['GPT-6 Astra (max)', 57],
		]);
		expect(rows.at(-1)).toMatchObject({
			model: { name: 'GPT-6.1 Terra (xhigh)' },
			score: { value: 45 },
		});
		for (const { model, score } of rows) {
			expect(score.value).toBeGreaterThanOrEqual(45);
			expect(benchmarkIcons[model.creator]).toBeTruthy();
		}
		const benchmark = benchmarkLedger.benchmarks.find((entry) => entry.id === 'aa-index')!;
		expect(benchmark.checked_at).toBe('2026-11-01');
		expect(benchmark.name.en).toContain('v5.0');
	});

	it('allows signed integer Elo without allowing negative values on other benchmarks', async () => {
		const schema = JSON.parse(
			await readFile(resolve(process.cwd(), '../schemas/benchmarks.schema.json'), 'utf8'),
		);
		const validate = new Ajv({ allErrors: true, strict: true }).compile(schema);
		const sample = structuredClone(benchmarkLedger);
		sample.models = [{ id: 'sample', name: 'Sample', creator: 'OpenAI', scores: {} }];
		for (const value of [-174, 0, 1764]) {
			sample.models[0]!.scores = { 'gdpval-aa': { value } };
			expect(validate(sample)).toBe(true);
		}
		sample.models[0]!.scores = { 'gdpval-aa': { value: 1.5 } };
		expect(validate(sample)).toBe(false);
		for (const benchmark of benchmarkLedger.benchmarks.filter(({ id }) => id !== 'gdpval-aa')) {
			sample.models[0]!.scores = { [benchmark.id]: { value: -1 } };
			expect(validate(sample)).toBe(false);
		}
	});

	it('keeps the DeepSWE v1.1 snapshot separate from older benchmark checks', () => {
		const benchmark = benchmarkLedger.benchmarks.find((entry) => entry.id === 'deepswe');
		expect(benchmark).toMatchObject({
			checked_at: '2026-11-01',
			url: 'https://deepswe.datacurve.ai/',
			format: 'percent',
		});
		expect(benchmarkLedger.checked_at).toBe('2026-11-01');
		const rows = rankedScores('deepswe');
		const isSelfReported = (score: { note?: { en: string } }) =>
			score.note?.en.startsWith('Self-reported') ?? false;
		const official = rows.filter(({ score }) => !isSelfReported(score));
		expect(official).toHaveLength(21);
		expect(official[0]).toMatchObject({
			model: { id: 'gpt-6-astra-xhigh' },
			score: { value: 74.1, ci: 2.9, agent: 'mini-swe-agent' },
		});
		expect(official.at(-1)).toMatchObject({
			model: { id: 'gemini-3-5-flash-high' },
			score: { value: 36.1 },
		});
		for (const { score } of official) {
			expect(score.agent).toBe('mini-swe-agent');
			expect(score.value).toBeLessThanOrEqual(100);
			expect(score.ci).toBeGreaterThan(0);
		}
		// Vendor numbers the official board has not listed yet carry a footnote and no CI.
		const selfReported = rows.filter(({ score }) => isSelfReported(score));
		expect(selfReported.map(({ model, score }) => [model.id, score.value])).toEqual([
			['claude-opus-5-5-max', 74.2],
		]);
		for (const { score } of selfReported) {
			expect(score.ci).toBeUndefined();
			expect(score.note_url).toContain('anthropic.com');
		}
	});

	it('preserves the complete ProgramBench snapshot and its official tie-breaking order', () => {
		const expected = [
			['claude-opus-5-5-xhigh', 18.5, 70.5, 87.7],
			['claude-fable-5-1-xhigh', 9.0, 55.5, 82.5],
			['muse-wonder-full', 8.5, 60.0, 88.5],
			['muse-wonder-xhigh', 5.5, 50.5, 86.5],
			['gpt-6-astra-max', 5.0, 52.5, 86.9],
			['claude-opus-5-xhigh', 4.5, 37.0, 74.7],
			['muse-spark-1-3-max', 2.5, 25.0, 70.8],
			['muse-spark-1-3-xhigh', 1.0, 16.5, 68.6],
			['gpt-5-6-sol-xhigh', 1.0, 15.5, 69.9],
			['gpt-5-5-xhigh', 0.5, 13.5, 69.5],
			['gpt-5-5-high', 0.5, 5.0, 66.5],
			['gemini-3-6-flash', 0.5, 4.0, 55.7],
			['gpt-5-6-sol', 0.5, 2.5, 57.8],
			['claude-opus-4-8-xhigh', 0.0, 16.5, 70.9],
			['glm-5-2', 0.0, 8.5, 64.6],
			['gemini-3-7-flash', 0.0, 5.5, 61.2],
			['muse-spark-1-2-xhigh', 0.0, 4.5, 57.2],
			['claude-opus-4-7-xhigh', 0.0, 4.5, 55.1],
			['muse-spark-1-1-xhigh', 0.0, 4.0, 47.0],
			['gemini-3-5-flash', 0.0, 3.0, 53.6],
			['claude-opus-4-7', 0.0, 3.0, 50.9],
			['claude-opus-4-6', 0.0, 2.5, 52.1],
			['gpt-5-5', 0.0, 1.5, 56.6],
			['claude-sonnet-4-6', 0.0, 1.0, 47.5],
			['gpt-5-4', 0.0, 0.0, 37.7],
			['gemini-3-1-pro', 0.0, 0.0, 36.4],
			['gemini-3-flash', 0.0, 0.0, 31.8],
			['claude-haiku-4-5', 0.0, 0.0, 30.0],
			['gpt-5-4-mini', 0.0, 0.0, 16.4],
			['gpt-5-mini', 0.0, 0.0, 16.0],
		];
		const rows = rankedScores('programbench', {
			...benchmarkLedger,
			models: [...benchmarkLedger.models].reverse(),
		});
		expect(
			rows.map(({ model, score }) => [
				model.id,
				score.value,
				score.almost_resolved,
				score.average_pass_rate,
			]),
		).toEqual(expected);
		for (const { score } of rows) {
			expect(score.agent).toBe('mini-SWE-agent');
			expect(score.ci).toBeUndefined();
			expect(score.almost_resolved).toBeGreaterThanOrEqual(score.value);
		}
		const benchmark = benchmarkLedger.benchmarks.find((entry) => entry.id === 'programbench')!;
		expect(benchmark).toMatchObject({
			category: 'coding',
			checked_at: '2026-11-01',
			url: 'https://programbench.com/',
		});
		expect(benchmark.description.zh).toContain('9 个');
		expect(benchmark.related_reading?.href.zh).toContain('/highlights/');
	});

	it('preserves Finance Agent v2.1 metrics, model settings and provenance', () => {
		const expected = [
			['claude-opus-5-5-max', 'anthropic/claude-opus-5-5', 67.846, 56.275],
			['gemini-4-argon-high', 'google/gemini-4-argon', 67.658, 58.868],
			['muse-wonder-full-max', 'meta/muse-wonder-full', 67.575, 54.88],
			['claude-sonnet-5-5-max', 'anthropic/claude-sonnet-5-5', 67.275, 54.447],
			['gemini-4-carbon-high', 'google/gemini-4-carbon', 67.162, 55.945],
			['gemini-3-8-flash-high', 'google/gemini-3.8-flash', 65.761, 54.478],
			['muse-wonder-max', 'meta/muse-wonder', 65.545, 53.102],
			['deepseek-v4-1-flash-max-vals-index', 'deepseek/deepseek-v4.1-flash', 65.428, 51.708],
			['claude-haiku-5-5-max-vals-index', 'anthropic/claude-haiku-5-5', 65.373, 51.772],
			['glm-5-3-max', 'zai/glm-5.3', 65.004, 51.924],
			['mimo-v2-6-pro-vals-index', 'xiaomi/mimo-v2.6-pro', 64.259, 50.437],
			['mimo-v2-6-flash-vals-index', 'xiaomi/mimo-v2.6-flash', 63.316, 50.672],
			[
				'deepseek-v4-1-flash-1017-max-vals-index',
				'deepseek/deepseek-v4.1-flash-1017',
				62.933,
				51.345,
			],
			['gpt-6-1-sol-max', 'openai/gpt-6.1-sol', 61.817, 48.195],
			['mistral-large-4-oss-high', 'mistralai/mistral-large-4-oss', 61.723, 49.536],
			['hy4-preview', 'tencent/hy4-preview', 61.623, 49.05],
			['kimi-k3-1-pro', 'kimi/kimi-k3.1-pro', 61.488, 48.395],
			['mistral-large-4-high', 'mistralai/mistral-large-4', 61.383, 47.825],
			['muse-spark-open-xhigh-vals-index', 'meta/muse-spark-open', 60.665, 48.957],
			['glm-5-3-flash-max', 'zai/glm-5.3-flash', 60.587, 47.836],
			['grok-4-7-xhigh-tbench-4', 'grok/grok-4.7', 60.585, 49.242],
			['gpt-6-astra-max', 'openai/gpt-6-astra', 60.428, 47.461],
			['kimi-k3', 'kimi/kimi-k3', 60.013, 47.306],
			['step-5-preview', 'stepfun/step-5-preview', 58.9, 44.665],
			['qwen3-8-max-0902', 'alibaba/qwen3.8-max-internal', 58.829, 49.152],
			['minimax-m3-1-flash-max', 'minimax/MiniMax-M3.1-flash', 58.826, 45.595],
			['deepseek-v4-pro-0813-max', 'deepseek/deepseek-v4-pro-0813', 57.116, 42.117],
			['gpt-6-luna-max-vals-index', 'openai/gpt-6-luna', 56.841, 43.78],
			['gpt-6-1-terra-max', 'openai/gpt-6.1-terra', 55.958, 42.561],
			['mercury-3-high', 'inception/mercury-3', 54.708, 38.518],
			['minimax-m3', 'minimax/MiniMax-M3', 54.338, 42.497],
			['beam-1-0', 'reflection/Beam-1.0', 51.827, 37.875],
			['inkling-0-99', 'thinkingmachines/inkling', 49.873, 36.308],
			['nemotron-3-5-super-vl-high', 'baseten/nemotron-3.5-super-vl-120b-a12b', 47.729, 34.933],
			['inkling-small-0-99', 'thinkingmachines/inkling-small', 44.776, 31.855],
		];
		const rows = rankedScores('finance-agent');
		expect(
			rows.map(({ model, score }) => [model.id, score.source_model, score.value, score.all_pass]),
		).toEqual(expected);
		for (const { score } of rows) {
			expect(score.all_pass).toBeLessThanOrEqual(score.value);
			expect(score.all_pass).toBeGreaterThanOrEqual(0);
			expect(score.value).toBeLessThanOrEqual(100);
			expect(score.ci).toBeUndefined();
			expect(score.almost_resolved).toBeUndefined();
		}
		const benchmark = benchmarkLedger.benchmarks.find((entry) => entry.id === 'finance-agent')!;
		expect(benchmark).toMatchObject({
			category: 'finance',
			checked_at: '2026-11-01',
			url: 'https://www.vals.ai/benchmarks/fabv2-1',
			score_label: { zh: '部分得分', en: 'Partial Credit' },
		});
		expect(benchmark.explainer.zh).toContain('隐藏测试集 449');
		expect(benchmark.description.zh).toContain('标准误');
	});

	it('keeps the complete Vals Index v2.2 snapshot in the general category', () => {
		const expected = [
			['anthropic/claude-sonnet-5-5', 70.854],
			['google/gemini-4-carbon', 70.355],
			['anthropic/claude-opus-5-5', 70.177],
			['google/gemini-4-argon', 69.237],
			['meta/muse-wonder-full', 66.787],
			['openai/gpt-6-astra', 65.023],
			['meta/muse-wonder', 64.877],
			['openai/gpt-6.1-sol', 63.944],
			['kimi/kimi-k3.1-pro', 62.52],
			['deepseek/deepseek-v4.1-flash-1017', 61.257],
			['openai/gpt-6.1-terra', 60.473],
			['zai/glm-5.3', 59.729],
			['alibaba/qwen3.8-max-internal', 59.045],
			['anthropic/claude-haiku-5-5', 58.727],
			['grok/grok-4.7', 58.564],
			['xiaomi/mimo-v2.6-pro', 57.813],
			['mistralai/mistral-large-4-oss', 56.418],
			['google/gemini-3.8-flash', 55.951],
			['xiaomi/mimo-v2.6-flash', 54.826],
			['stepfun/step-5-preview', 54.762],
			['minimax/MiniMax-M3.1-flash', 53.781],
			['tencent/hy4-preview', 53.209],
			['deepseek/deepseek-v4-pro-0813', 52.974],
			['kimi/kimi-k3', 52.955],
			['openai/gpt-6-luna', 52.322],
			['zai/glm-5.3-flash', 50.861],
			['meta/muse-spark-open', 48.567],
			['inception/mercury-3', 43.659],
			['reflection/Beam-1.0', 43.424],
			['baseten/nemotron-3.5-super-vl-120b-a12b', 29.731],
			['thinkingmachines/inkling', 28.961],
			['thinkingmachines/inkling-small', 27.588],
		];
		const rows = rankedScores('vals-index');
		expect(rows.map(({ score }) => [score.source_model, score.value])).toEqual(expected);
		for (const { score } of rows) {
			expect(score.value).toBeLessThanOrEqual(100);
			expect(score.ci).toBeUndefined();
			expect(score.all_pass).toBeUndefined();
			expect(score.almost_resolved).toBeUndefined();
		}
		const benchmark = benchmarkLedger.benchmarks.find((entry) => entry.id === 'vals-index')!;
		expect(benchmark).toMatchObject({
			category: 'general',
			checked_at: '2026-11-01',
			url: 'https://www.vals.ai/benchmarks/vals_index',
			score_label: { zh: '综合指数', en: 'Index' },
		});
		expect(benchmark.related_reading?.href.zh).toBe('/benchmarks/finance-agent/');
	});

	it('returns each detail to its containing category in both locales', async () => {
		for (const benchmark of benchmarkLedger.benchmarks) {
			expect(benchmarkDirectoryRoute(benchmark, 'zh-CN')).toBe(
				`/benchmarks/#${benchmark.category}`,
			);
			expect(benchmarkDirectoryRoute(benchmark, 'en')).toBe(
				`/en/benchmarks/#bc-benchmarks-${benchmark.category}`,
			);
		}
		const component = await readFile(
			new URL('../components/BenchmarkDetail.astro', import.meta.url),
			'utf8',
		);
		expect(component).toContain('href={benchmarkDirectoryRoute(benchmark, locale)}');
	});

	it('breaks explanations into short paragraphs without changing their text', () => {
		for (const benchmark of benchmarkLedger.benchmarks) {
			for (const locale of ['zh-CN', 'en'] as const) {
				const text = benchmark.explainer[locale === 'en' ? 'en' : 'zh'];
				const paragraphs = benchmarkParagraphs(text, locale);
				expect(paragraphs.length).toBeGreaterThan(1);
				expect(paragraphs.join('')).toBe(text);
			}
		}
		expect(benchmarkParagraphs('Version 4.0 works. A second sentence. A third.', 'en')).toEqual([
			'Version 4.0 works. A second sentence. ',
			'A third.',
		]);
		expect(benchmarkParagraphs('', 'zh-CN')).toEqual([]);
	});

	it('formats percent and integer columns', () => {
		expect(formatScore({ value: 57.9 }, 'percent')).toBe('57.9%');
		expect(formatScore({ value: 53 }, 'integer')).toBe('53');
	});

	it('numbers footnotes in table order', () => {
		const notes = collectNotes(rankedScores('tbench-4'));
		expect(notes.map((note) => note.key)).toEqual(['claude-fable-5-1-max', 'claude-fable-5']);
	});
});
