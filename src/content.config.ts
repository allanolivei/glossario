import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const terms = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/terms' }),
  schema: z.object({
    title: z.string().min(1),
    definition: z.string().min(1),
    aliases: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
  }),
});

export const collections = { terms };
