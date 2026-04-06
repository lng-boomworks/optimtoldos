import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const faqCategory = z.object({
  category: z.string(),
  items: z.array(faqItem),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    hero_heading: z.string().optional(),
    hero_subheading: z.string().optional(),
    hero_label: z.string().optional(),
    hero_image: z.string().optional(),
    hero_button_text: z.string().optional(),
    hero_button_url: z.string().optional(),
    hero_cta_text: z.string().optional(),
    hero_cta_url: z.string().optional(),
    hero_stat_1_number: z.string().optional(),
    hero_stat_1_label: z.string().optional(),
    hero_stat_2_number: z.string().optional(),
    hero_stat_2_label: z.string().optional(),
    hero_quote: z.string().optional(),
    hero_quote_author: z.string().optional(),
    hero_quote_role: z.string().optional(),
    kate_heading: z.string().optional(),
    kate_bio: z.string().optional(),
    kate_quote: z.string().optional(),
    cta_heading: z.string().optional(),
    cta_text: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    calendly_url: z.string().optional(),
    faq_categories: z.array(faqCategory).optional(),
  }),
});

export const collections = { pages };
