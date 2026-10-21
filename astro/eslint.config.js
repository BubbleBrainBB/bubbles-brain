import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs['flat/recommended'],
	{
		files: ['**/*.astro'],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ['src/scripts/**/*.js'],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ['src/scripts/serviceWorker.js'],
		languageOptions: {
			globals: globals.serviceworker,
		},
	},
	{
		files: ['scripts/**/*.mjs', '*.config.js'],
		languageOptions: {
			globals: globals.node,
		},
	},
];
