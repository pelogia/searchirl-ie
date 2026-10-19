// Flat build output (astro.config.mjs: build.format = 'file') means every
// page.html is also directly reachable as literal /page.html, duplicating
// the clean URL with no redirect between them. Netlify's _redirects doesn't
// support stripping a ".html" suffix with a wildcard (splat only captures a
// trailing path segment, not a mid-pattern suffix), so this generates one
// explicit rule per actual page found in dist/ and appends it to the
// _redirects file Astro's Netlify adapter already wrote.
import { readdirSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const redirectsPath = path.join(distDir, '_redirects');

const htmlFiles = readdirSync(distDir).filter(
	(f) => f.endsWith('.html') && f !== 'index.html',
);

const lines = htmlFiles.map((f) => {
	const clean = '/' + f.slice(0, -'.html'.length);
	return `/${f}  ${clean}  301!`;
});

appendFileSync(
	redirectsPath,
	'\n# Auto-generated: redirect each page.html to its clean URL\n' + lines.join('\n') + '\n',
);

console.log(`Appended ${lines.length} .html redirect rules to dist/_redirects`);
