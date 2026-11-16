// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  // Public URL used for canonical, Open Graph and sitemap. Change it in src/config/site.ts.
  site: site.url,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
