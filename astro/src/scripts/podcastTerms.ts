/**
 * Glossary words in an episode's outline (components/PodcastTerms.astro). CSS shows the note on
 * hover and focus; this keeps it inside the screen and lets Escape put it away.
 */
function place(term: HTMLElement) {
	const note = term.querySelector<HTMLElement>('.podcast-term__note');
	// The outline clips sideways, so the note must sit inside it.
	const area = term.closest('.podcast-outline')?.getBoundingClientRect();
	if (!note || !area) return;
	note.style.removeProperty('--shift');
	const box = note.getBoundingClientRect();
	const over = box.right - area.right;
	const under = area.left - box.left;
	const shift = over > 0 ? -over : under > 0 ? under : 0;
	if (shift) note.style.setProperty('--shift', `${Math.round(shift)}px`);
}

// The module runs once; the listeners sit on the document, so they outlive page swaps.
function setup() {
	for (const type of ['pointerover', 'focusin'] as const)
		document.addEventListener(type, (event) => {
			const term = (event.target as Element).closest?.<HTMLElement>('[data-podcast-term]');
			if (term) place(term);
		});
	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		const focused = document.activeElement;
		if (focused instanceof HTMLElement && focused.closest('[data-podcast-term]')) focused.blur();
	});
}

if (typeof document !== 'undefined') setup();
