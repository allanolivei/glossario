import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.GITHUB_PAGES === 'true' ? '/glossario' : '/',
  integrations: [react(), sitemap()],
  vite: {
    server: {
      watch: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
        interval: 1000,
      },
    },
    plugins: [tailwindcss()],
  },
});
