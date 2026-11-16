/**
 * Document-level behavior shared by every page. Imported once from the base
 * layout; listeners are delegated on `document`, so they survive view
 * transitions without being bound twice.
 */
import { addItem, openCart, closeCart } from '../../stores/cart';
import { onPage, prefersReducedMotion } from './lifecycle';

interface ProductPayload {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: { src: string; alt: string };
  colors: { name: string; hex: string }[];
}

function readPayload(el: HTMLElement | null): ProductPayload | null {
  const raw = el?.dataset.product;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProductPayload;
  } catch {
    return null;
  }
}

function add(payload: ProductPayload, colorName: string | undefined, size: string) {
  const color = payload.colors.find((c) => c.name === colorName) ?? payload.colors[0];
  addItem({
    productId: payload.productId,
    slug: payload.slug,
    name: payload.name,
    price: payload.price,
    image: payload.image,
    color,
    size,
  });
}

/** Elements tied to a form: its descendants plus outside controls using form="id". */
function linked(form: HTMLFormElement, selector: string): HTMLElement[] {
  const inside = [...form.querySelectorAll<HTMLElement>(selector)];
  const outside = form.id
    ? [...document.querySelectorAll<HTMLElement>(`${selector}[data-for="${form.id}"], ${selector}[form="${form.id}"]`)]
    : [];
  return [...new Set([...inside, ...outside])];
}

function syncAddForm(form: HTMLFormElement) {
  const size = form.querySelector<HTMLInputElement>('input[name="size"]:checked');
  const color = form.querySelector<HTMLInputElement>('input[name="color"]:checked');
  for (const button of linked(form, '[data-submit]')) {
    (button as HTMLButtonElement).disabled = !size;
  }
  for (const hint of linked(form, '[data-size-hint]')) hint.hidden = Boolean(size);
  for (const out of linked(form, '[data-selected-color]')) {
    if (color) out.textContent = color.value;
  }
}

document.addEventListener('change', (event) => {
  const form = (event.target as HTMLElement).closest<HTMLFormElement>('form[data-add-to-cart]');
  if (form) syncAddForm(form);
});

document.addEventListener('submit', (event) => {
  const form = event.target as HTMLFormElement;
  if (!form.matches('form[data-add-to-cart]')) return;
  event.preventDefault();
  const payload = readPayload(form);
  const data = new FormData(form);
  const size = data.get('size');
  if (!payload || typeof size !== 'string') {
    form.querySelector<HTMLInputElement>('input[name="size"]:not(:disabled)')?.focus();
    return;
  }
  const color = data.get('color');
  add(payload, typeof color === 'string' ? color : undefined, size);
  // Capture phase: runs before the ClientRouter's own submit handler, which skips prevented events.
}, true);

let dialogOpener: HTMLElement | null = null;

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  const quick = target.closest<HTMLButtonElement>('[data-quick-add]');
  if (quick) {
    const payload = readPayload(quick.closest<HTMLElement>('[data-product]'));
    const size = quick.dataset.size;
    if (payload && size) add(payload, undefined, size);
    return;
  }

  if (target.closest('[data-open-cart]')) {
    event.preventDefault();
    openCart();
    return;
  }

  const opener = target.closest<HTMLElement>('[data-open-dialog]');
  if (opener) {
    const dialog = document.getElementById(opener.dataset.openDialog ?? '');
    if (dialog instanceof HTMLDialogElement && !dialog.open) {
      dialogOpener = opener;
      dialog.showModal();
    }
    return;
  }

  if (target.closest('[data-close-dialog]')) {
    target.closest('dialog')?.close();
    return;
  }

  // Click on the backdrop of a page dialog closes it.
  if (target instanceof HTMLDialogElement && target.matches('dialog[data-light-dismiss]')) {
    target.close();
  }
});

// Return focus to whatever opened a page dialog.
document.addEventListener(
  'close',
  (event) => {
    const dialog = event.target;
    if (dialog instanceof HTMLDialogElement && dialog.matches('[data-page-dialog]')) {
      dialogOpener?.focus();
      dialogOpener = null;
    }
  },
  true,
);

document.addEventListener('astro:before-preparation', () => {
  closeCart();
});

onPage(() => {
  document
    .querySelectorAll<HTMLFormElement>('form[data-add-to-cart]')
    .forEach((form) => syncAddForm(form));

  // Reveal fallback when CSS scroll-driven animations are unavailable.
  if (prefersReducedMotion() || CSS.supports('animation-timeline: view()')) return;
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('io-reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
});
