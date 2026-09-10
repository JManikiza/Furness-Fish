// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Published to a GitHub Pages *project* site, which lives in a subfolder.
  // To move to furnessfishmarkets.com later: set site to the domain, change
  // base to '/', and add a CNAME file to public/. Nothing else needs touching,
  // because every internal path goes through withBase() in src/lib/paths.ts.
  site: 'https://jmanikiza.github.io',
  base: '/Furness-Fish/',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
