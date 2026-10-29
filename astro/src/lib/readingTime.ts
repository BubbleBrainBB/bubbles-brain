/**
 * Minutes to read a Markdown body: about 400 Chinese characters or 220 English words a minute.
 * Image links, URLs, HTML tags and shortcodes are dropped first so they don't count as words.
 */
export function readingMinutes(markdown: string): number {
	const text = markdown
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\]\([^)]*\)/g, ']')
		.replace(/https?:\/\/\S+/g, ' ')
		.replace(/\{\{[<%][\s\S]*?[%>]\}\}/g, ' ')
		.replace(/<[^>]+>/g, ' ');
	const chinese = text.match(/[㐀-鿿]/g)?.length ?? 0;
	const words = text.match(/[A-Za-z][A-Za-z'’-]*/g)?.length ?? 0;
	return Math.max(1, Math.round(chinese / 400 + words / 220));
}
