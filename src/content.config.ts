import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = [
  'remeras',
  'camisas',
  'pantalones',
  'buzos-y-abrigos',
  'vestidos',
  'accesorios',
] as const;

/** Clothing sizes plus "U" (talle único) for accessories. */
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'U'] as const;

export const IMAGE_VIEWS = ['frente', 'espalda', 'detalle', 'look'] as const;

/**
 * Entry ids come from the file name. Astro's default glob id would prefer a
 * `slug` field, which lets two files with the same slug silently overwrite
 * each other; src/lib/products.ts fails the build when slug and file differ.
 */
const fileId = ({ entry }: { entry: string }) => entry.replace(/\.json$/, '');

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use kebab-case');
const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Use a 6-digit hex color');
const ars = z.number().int().positive();

const products = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/products',
    generateId: fileId,
  }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().min(1),
        slug,
        /** Final price in ARS, VAT included. */
        price: ars,
        /** Previous price, only when the product is genuinely on sale. */
        compareAtPrice: ars.optional(),
        category: z.enum(CATEGORIES),
        collection: reference('collections'),
        colors: z.array(z.object({ name: z.string().min(1), hex })).min(1),
        sizes: z
          .array(z.object({ label: z.enum(SIZES), inStock: z.boolean() }))
          .min(1),
        composition: z
          .array(
            z.object({
              material: z.string().min(1),
              percent: z.number().positive().max(100),
            }),
          )
          .min(1),
        care: z.array(z.string().min(1)).min(1),
        description: z.string().min(1),
        images: z
          .array(
            z.object({
              src: image(),
              alt: z.string().min(10),
              view: z.enum(IMAGE_VIEWS),
            }),
          )
          .min(2)
          .max(4),
        isNew: z.boolean().default(false),
        featured: z.boolean().default(false),
        publishedAt: z.coerce.date(),
      })
      .refine((p) => p.compareAtPrice === undefined || p.compareAtPrice > p.price, {
        message: 'compareAtPrice must be greater than price',
        path: ['compareAtPrice'],
      })
      .refine(
        (p) => Math.abs(p.composition.reduce((sum, c) => sum + c.percent, 0) - 100) < 0.01,
        { message: 'composition percentages must add up to 100', path: ['composition'] },
      )
      .refine((p) => new Set(p.sizes.map((s) => s.label)).size === p.sizes.length, {
        message: 'sizes must be unique',
        path: ['sizes'],
      }),
});

const productCollections = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/collections',
    generateId: fileId,
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      slug,
      /** "current" = active season, "permanent" = always available. */
      status: z.enum(['current', 'permanent', 'archived']),
      order: z.number().int(),
      tagline: z.string().min(1),
      description: z.string().min(1),
      cover: z.object({ src: image(), alt: z.string().min(10) }),
      hero: z.object({ src: image(), alt: z.string().min(10) }).optional(),
      /** 4:5 art-directed crop of the hero for narrow screens. */
      heroMobile: z.object({ src: image(), alt: z.string().min(10) }).optional(),
      /** Short line for the collection cover tile; distinct from the hero tagline. */
      coverLine: z.string().min(1).optional(),
    }),
});

export const collections = { products, collections: productCollections };
