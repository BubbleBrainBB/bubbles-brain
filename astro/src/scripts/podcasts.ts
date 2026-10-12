/** 播客 list: the show buttons narrow the list to one show; 全部 brings everything back. */
function setup() {
	const root = document.querySelector<HTMLElement>('[data-podcasts]');
	if (!root || root.dataset.ready) return;
	root.dataset.ready = 'true';
	const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-podcast-filter]')];
	for (const button of buttons) {
		button.addEventListener('click', () => {
			const show = button.dataset.podcastFilter ?? '';
			for (const other of buttons) other.setAttribute('aria-pressed', String(other === button));
			for (const row of root.querySelectorAll<HTMLElement>('[data-podcast-show]')) {
				row.hidden = Boolean(show) && row.dataset.podcastShow !== show;
			}
			for (const month of root.querySelectorAll<HTMLElement>('.podcast-month')) {
				month.hidden = !month.querySelector('[data-podcast-show]:not([hidden])');
			}
		});
	}
}

document.addEventListener('astro:page-load', setup);
