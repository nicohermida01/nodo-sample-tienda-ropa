import { atom, computed } from 'nanostores';
import { persistentAtom, setPersistentEngine, windowPersistentEvents } from '@nanostores/persistent';
import type { PersistentStore } from '@nanostores/persistent';
import { site } from '../config/site';

/**
 * Client-side cart. Islands import these stores and actions; no UI lives here.
 * Prices are snapshotted when the item is added (static site, no backend).
 */

export interface CartItem {
  /** `${productId}:${colorName}:${size}` — one line per variant. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  /** Unit price in ARS, VAT included. */
  price: number;
  color: { name: string; hex: string };
  size: string;
  quantity: number;
  /** Optimized thumbnail URL resolved at build time. */
  image: { src: string; alt: string };
}

export type NewCartItem = Omit<CartItem, 'key' | 'quantity'>;

const STORAGE_KEY = 'trama:cart:v1';
const MAX_QTY = site.commerce.maxQuantityPerItem;

/**
 * localStorage can throw (private mode, blocked site data, quota exceeded).
 * This engine wraps every access in try/catch and falls back to memory, so
 * the cart keeps working for the current page even when storage fails.
 */
function createSafeStorage(): PersistentStore {
  const memory: PersistentStore = {};
  /** Keys whose last write to localStorage failed: memory holds the newer value. */
  const unsynced = new Set<string>();
  const storage = (): Storage | undefined => {
    try {
      return typeof localStorage === 'undefined' ? undefined : localStorage;
    } catch {
      return undefined;
    }
  };
  return new Proxy(memory, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      const s = storage();
      if (!s || unsynced.has(prop)) return target[prop];
      try {
        // null means "not stored": report undefined so the store uses its initial value.
        return s.getItem(prop) ?? undefined;
      } catch {
        return target[prop];
      }
    },
    set(target, prop, value: string) {
      if (typeof prop !== 'string') return false;
      target[prop] = value;
      try {
        const s = storage();
        if (!s) throw new Error('storage unavailable');
        s.setItem(prop, value);
        unsynced.delete(prop);
      } catch {
        unsynced.add(prop);
      }
      return true;
    },
    has(target, prop) {
      if (typeof prop !== 'string') return false;
      const s = storage();
      if (!s || unsynced.has(prop)) return prop in target;
      try {
        return s.getItem(prop) !== null;
      } catch {
        return prop in target;
      }
    },
    deleteProperty(target, prop) {
      if (typeof prop !== 'string') return false;
      delete target[prop];
      unsynced.delete(prop);
      try {
        storage()?.removeItem(prop);
      } catch {
        /* ignore */
      }
      return true;
    },
  });
}

if (typeof window !== 'undefined') {
  setPersistentEngine(createSafeStorage(), windowPersistentEvents);
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isCartItem = (value: unknown): value is CartItem => {
  if (!isRecord(value)) return false;
  const v = value;
  return (
    typeof v.key === 'string' &&
    typeof v.productId === 'string' &&
    typeof v.slug === 'string' &&
    typeof v.name === 'string' &&
    typeof v.price === 'number' &&
    Number.isFinite(v.price) &&
    v.price > 0 &&
    typeof v.size === 'string' &&
    Number.isInteger(v.quantity) &&
    (v.quantity as number) >= 1 &&
    (v.quantity as number) <= MAX_QTY &&
    isRecord(v.color) &&
    typeof v.color.name === 'string' &&
    typeof v.color.hex === 'string' &&
    isRecord(v.image) &&
    typeof v.image.src === 'string' &&
    typeof v.image.alt === 'string'
  );
};

function decode(raw: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export const $cartItems = persistentAtom<CartItem[]>(STORAGE_KEY, [], {
  encode: JSON.stringify,
  decode,
});

/** Drawer visibility (not persisted). */
export const $isCartOpen = atom(false);

/** Last added line, for the "added to cart" confirmation feedback. */
export const $lastAdded = atom<CartItem | null>(null);

export const $cartCount = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const $cartSubtotal = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

/** Amount left to reach free shipping (0 when already reached). */
export const $freeShippingRemaining = computed($cartSubtotal, (subtotal) =>
  Math.max(0, site.commerce.freeShippingThreshold - subtotal),
);

/** Callers must pass a finite number; non-finite input falls back to 1. */
const clamp = (qty: number) =>
  Number.isFinite(qty) ? Math.min(MAX_QTY, Math.max(1, Math.floor(qty))) : 1;

export const cartKey = (productId: string, colorName: string, size: string) =>
  `${productId}:${colorName}:${size}`;

export function addItem(item: NewCartItem, quantity = 1): void {
  if (!Number.isFinite(quantity) || quantity <= 0) return;
  const key = cartKey(item.productId, item.color.name, item.size);
  const items = $cartItems.get();
  const existing = items.find((i) => i.key === key);
  const next: CartItem = existing
    ? { ...existing, quantity: clamp(existing.quantity + quantity) }
    : { ...item, key, quantity: clamp(quantity) };
  $cartItems.set(existing ? items.map((i) => (i.key === key ? next : i)) : [...items, next]);
  $lastAdded.set(next);
}

export function removeItem(key: string): void {
  $cartItems.set($cartItems.get().filter((i) => i.key !== key));
}

/** Sets an exact quantity; 0 or less removes the line, non-finite input is ignored. */
export function setQuantity(key: string, quantity: number): void {
  if (!Number.isFinite(quantity)) return;
  if (quantity <= 0) return removeItem(key);
  $cartItems.set(
    $cartItems.get().map((i) => (i.key === key ? { ...i, quantity: clamp(quantity) } : i)),
  );
}

export function clearCart(): void {
  $cartItems.set([]);
}

export const openCart = () => $isCartOpen.set(true);
export const closeCart = () => $isCartOpen.set(false);
