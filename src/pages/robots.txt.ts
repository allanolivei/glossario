import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const basePath = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const sitemap = new URL(`${basePath}sitemap-index.xml`, site ?? 'http://localhost:4321');
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
