// Draws the iOS launch screens listed in src/lib/launchScreens.json: the app icon with rounded
// corners and the site's name, centred on the manifest's white background.
// Run from astro/: node scripts/generate-launch-screens.mjs
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../../', import.meta.url);
const { screens } = JSON.parse(
	await readFile(new URL('astro/src/lib/launchScreens.json', root), 'utf8'),
);
const icon = fileURLToPath(new URL('static/icons/icon-512.png', root));
const outDir = new URL('static/icons/launch/', root);
await mkdir(outDir, { recursive: true });

for (const screen of screens) {
	const width = screen.width * screen.ratio;
	const height = screen.height * screen.ratio;
	const size = Math.round(screen.width * 0.3) * screen.ratio;
	const radius = Math.round(size * 0.225);
	const ring = Math.max(1, Math.round(screen.ratio * 0.5));
	const rounded = await sharp(icon)
		.resize(size, size)
		.composite([
			{
				input: Buffer.from(
					`<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
				),
				blend: 'dest-in',
			},
			{
				input: Buffer.from(
					`<svg width="${size}" height="${size}"><rect x="${ring / 2}" y="${ring / 2}" width="${size - ring}" height="${size - ring}" rx="${radius}" ry="${radius}" fill="none" stroke="#e5e5e5" stroke-width="${ring}"/></svg>`,
				),
			},
		])
		.png()
		.toBuffer();
	const fontSize = 20 * screen.ratio;
	const gap = 22 * screen.ratio;
	const top = Math.round(height * 0.44 - (size + gap + fontSize) / 2);
	const name = Buffer.from(
		`<svg width="${width}" height="${fontSize * 2}"><text x="50%" y="${fontSize * 1.2}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="600" fill="#111111">Bubble’s Brain</text></svg>`,
	);
	const file = new URL(`launch-${width}x${height}.png`, outDir);
	await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
		.composite([
			{ input: rounded, left: Math.round((width - size) / 2), top },
			{ input: name, left: 0, top: top + size + gap },
		])
		.png({ palette: true, quality: 90, effort: 10 })
		.toFile(fileURLToPath(file));
	console.log(fileURLToPath(file));
}
