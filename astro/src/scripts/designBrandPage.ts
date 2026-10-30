/**
 * A brand's page: click a hex to copy it, copy the whole DESIGN.md, or open it in place.
 */
async function copyBrandText(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

function flashLabel(button: HTMLButtonElement, label: string, ms: number) {
	const original = button.textContent ?? '';
	button.textContent = label;
	setTimeout(() => {
		button.textContent = original;
	}, ms);
}

function setupDesignBrandPage(root: HTMLElement) {
	if (root.dataset.ready) return;
	root.dataset.ready = 'true';

	root.querySelectorAll<HTMLButtonElement>('[data-copy-hex]').forEach((button) => {
		button.addEventListener('click', async () => {
			if (await copyBrandText(button.dataset.copyHex ?? '')) flashLabel(button, '已复制', 1200);
		});
	});

	const raw = root.querySelector<HTMLElement>('[data-raw-content]');
	root
		.querySelector<HTMLButtonElement>('[data-copy-raw]')
		?.addEventListener('click', async (event) => {
			const button = event.currentTarget as HTMLButtonElement;
			if (raw && (await copyBrandText(raw.textContent ?? ''))) flashLabel(button, '已复制', 1500);
		});

	const toggle = root.querySelector<HTMLButtonElement>('[data-raw-toggle]');
	toggle?.addEventListener('click', () => {
		if (!raw) return;
		raw.hidden = !raw.hidden;
		toggle.setAttribute('aria-expanded', String(!raw.hidden));
		toggle.textContent = raw.hidden ? '展开原文' : '收起原文';
	});
}

function initDesignBrandPage() {
	document.querySelectorAll<HTMLElement>('[data-design-brand]').forEach(setupDesignBrandPage);
}

document.addEventListener('astro:page-load', initDesignBrandPage);
