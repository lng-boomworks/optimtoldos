import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lng-boomworks.github.io',
  base: '/optimtoldos',
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.endsWith('/about/') &&
        !page.endsWith('/services/') &&
        !page.endsWith('/contact/'),
    }),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
