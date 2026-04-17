import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    author: z.string().default('Optim Toldos'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['guias', 'consejos', 'tendencias', 'normativa', 'casos-de-exito',
                       'guides', 'tips', 'trends', 'regulations', 'case-studies']),
    locale: z.enum(['es', 'en']).default('es'),
    translationOf: z.string().optional(),
  }),
});

export const collections = { pages, blog };
