import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { CATEGORIES } from '../content.config';
import { site } from '../config/site';

export type Product = CollectionEntry<'products'>;
export type ProductCollection = CollectionEntry<'collections'>;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  remeras: 'Remeras',
  camisas: 'Camisas',
  pantalones: 'Pantalones',
  'buzos-y-abrigos': 'Buzos y abrigos',
  vestidos: 'Vestidos',
  accesorios: 'Accesorios',
};

export const SORT_OPTIONS = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'nuevos', label: 'Más nuevos' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]['value'];

/**
 * Entry ids come from file names. A product whose `slug` differs from its
 * file name would generate a route nobody links to, so fail the build instead.
 */
function assertSlugMatchesId(entries: { id: string; data: { slug: string } }[], kind: string) {
  for (const entry of entries) {
    if (entry.id !== entry.data.slug) {
      throw new Error(
        `[${kind}] "${entry.id}.json" declares slug "${entry.data.slug}". Rename the file or fix the slug so they match.`,
      );
    }
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await getCollection('products');
  assertSlugMatchesId(products, 'products');
  return sortProducts(products, 'destacados');
}

export async function getProductCollections(): Promise<ProductCollection[]> {
  const entries = await getCollection('collections', (c) => c.data.status !== 'archived');
  assertSlugMatchesId(entries, 'collections');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export function sortProducts(products: Product[], key: SortKey): Product[] {
  const list = [...products];
  const newest = (a: Product, b: Product) =>
    b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  switch (key) {
    case 'precio-asc':
      return list.sort((a, b) => a.data.price - b.data.price);
    case 'precio-desc':
      return list.sort((a, b) => b.data.price - a.data.price);
    case 'nuevos':
      return list.sort(newest);
    default:
      return list.sort(
        (a, b) => Number(b.data.featured) - Number(a.data.featured) || newest(a, b),
      );
  }
}

/** Whole-number discount, only when the product is genuinely on sale. */
export function discountPercent(product: Product): number | null {
  const { price, compareAtPrice } = product.data;
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round((1 - price / compareAtPrice) * 100);
}

/** Price without national taxes (Ley 27.743). */
export const netPrice = (price: number) => Math.round(price / (1 + site.commerce.vatRate));

export const installmentPrice = (price: number) =>
  Math.round(price / site.commerce.installments.count);

export const transferPrice = (price: number) =>
  Math.round(price * (1 - site.commerce.transferDiscount));

export const isInStock = (product: Product) => product.data.sizes.some((s) => s.inStock);

export const installmentsLabel = (price: number) => {
  const { count, interestFree } = site.commerce.installments;
  return `${count} cuotas${interestFree ? ' sin interés' : ''} de ${formatArs(installmentPrice(price))}`;
};

const formatArs = (amount: number) =>
  new Intl.NumberFormat(site.locale, {
    style: 'currency',
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);

/** Data a client island needs to add this product to the cart. */
export interface CartPayload {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: { src: string; alt: string };
  colors: { name: string; hex: string }[];
}

export async function thumbnail(product: Product, width = 160) {
  const first = product.data.images[0];
  const img = await getImage({ src: first.src, width, format: 'webp' });
  return { src: img.src, alt: first.alt };
}

export async function toCartPayload(product: Product): Promise<CartPayload> {
  return {
    productId: product.id,
    slug: product.data.slug,
    name: product.data.name,
    price: product.data.price,
    image: await thumbnail(product),
    colors: product.data.colors,
  };
}

/** Unique view-transition name shared by a card photo and the product main photo. */
export const photoTransitionName = (product: Product) => `photo-${product.id}`;

export const productHref = (product: Product) => `/productos/${product.data.slug}`;
