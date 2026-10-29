/**
 * Design work pages: the copy button beside the prompt. Without JS the button stays hidden and
 * the prompt can still be selected and copied by hand.
 */
function setupDesignPrompt(root: HTMLElement) {
	if (root.dataset.ready) return;
	root.dataset.ready = 'true';
	const text = root.querySelector<HTMLElement>('[data-design-prompt-text]');
	const copy = root.querySelector<HTMLButtonElement>('[data-design-prompt-copy]');
	if (!text || !copy || !navigator.clipboard) return;
	copy.hidden = false;
	copy.addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(text.textContent?.trim() ?? '');
			copy.textContent = '已复制';
		} catch {
			copy.textContent = '复制失败';
		}
		setTimeout(() => (copy.textContent = '复制'), 1600);
	});
}

function initDesignPrompts() {
	document.querySelectorAll<HTMLElement>('[data-design-prompt]').forEach(setupDesignPrompt);
}

document.addEventListener('astro:page-load', initDesignPrompts);
