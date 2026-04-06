import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: '', // TODO: Set your production URL here (e.g. 'https://example.com')
  integrations: [react(), sitemap()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
