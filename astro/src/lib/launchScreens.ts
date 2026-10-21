/** iOS launch screens: what a home-screen launch shows while the first page loads. iOS ignores
 *  the manifest's background colour and icon here and draws plain white unless it finds an
 *  apple-touch-startup-image whose media query matches the phone exactly. */
import data from './launchScreens.json';

export interface LaunchScreen {
	href: string;
	media: string;
}

export function launchScreenFile(screen: { width: number; height: number; ratio: number }) {
	return `launch-${screen.width * screen.ratio}x${screen.height * screen.ratio}.png`;
}

export const launchScreens: LaunchScreen[] = data.screens.map((screen) => ({
	href: `/icons/launch/${launchScreenFile(screen)}`,
	media: `(device-width: ${screen.width}px) and (device-height: ${screen.height}px) and (-webkit-device-pixel-ratio: ${screen.ratio}) and (orientation: portrait)`,
}));
