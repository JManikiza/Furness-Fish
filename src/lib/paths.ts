/**
 * Prefix a root-absolute path with the deployment base path.
 *
 * GitHub Pages project sites are served from a subfolder
 * (jmanikiza.github.io/Furness-Fish/), so a bare href="/visit/" would point at
 * the wrong place and 404. Astro exposes the configured base as
 * import.meta.env.BASE_URL, and this wraps it up so every internal link,
 * asset and video path goes through one place.
 *
 * On a custom domain the base is '/' and this is a no-op, so moving
 * furnessfishmarkets.com over later means changing `base` in astro.config.mjs
 * and nothing else.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
