import { removeItem, setQuantity, type CartItem } from '../../stores/cart';
import { site, formatPrice } from '../../config/site';

const MAX = site.commerce.maxQuantityPerItem;

/** Renders cart lines by cloning a server-rendered <template>. */
export function renderLines(list: HTMLElement, template: HTMLTemplateElement, items: readonly CartItem[]) {
  const nodes = items.map((item) => {
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const li = fragment.firstElementChild as HTMLElement;
    li.dataset.key = item.key;
    const thumb = li.querySelector('[data-line-thumb]');
    if (thumb) {
      const img = new Image(80, 100);
      img.src = item.image.src;
      img.alt = item.image.alt;
      img.decoding = 'async';
      thumb.replaceWith(img);
    }
    li.querySelectorAll<HTMLAnchorElement>('[data-line-link]').forEach((a) => {
      a.href = `/productos/${item.slug}`;
    });
    const set = (selector: string, text: string) => {
      const el = li.querySelector(selector);
      if (el) el.textContent = text;
    };
    set('[data-line-name]', item.name);
    set('[data-line-variant]', `${item.color.name} · Talle ${item.size}`);
    set('[data-line-price]', formatPrice(item.price * item.quantity));
    set('[data-line-qty]', String(item.quantity));
    const dec = li.querySelector<HTMLButtonElement>('[data-line-dec]');
    const inc = li.querySelector<HTMLButtonElement>('[data-line-inc]');
    const label = `${item.name}, ${item.color.name}, talle ${item.size}`;
    if (dec) dec.setAttribute('aria-label', `Restar una unidad de ${label}`);
    if (inc) {
      inc.setAttribute('aria-label', `Sumar una unidad de ${label}`);
      inc.disabled = item.quantity >= MAX;
    }
    li.querySelector('[data-line-remove]')?.setAttribute('aria-label', `Quitar ${label} del carrito`);
    return li;
  });
  list.replaceChildren(...nodes);
}

/** Delegated quantity/remove controls. Returns an unbind function. */
export function bindLineControls(list: HTMLElement, items: () => readonly CartItem[]) {
  const onClick = (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    const li = button?.closest<HTMLElement>('[data-key]');
    if (!button || !li?.dataset.key) return;
    const key = li.dataset.key;
    const item = items().find((i) => i.key === key);
    if (!item) return;
    const refocus = (selector: string) =>
      requestAnimationFrame(() => {
        const next = list.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"] ${selector}`);
        (next && !(next as HTMLButtonElement).disabled ? next : list.closest('[data-cart-root]')?.querySelector<HTMLElement>('[data-cart-focus]'))?.focus();
      });
    if (button.matches('[data-line-inc]')) {
      setQuantity(key, item.quantity + 1);
      refocus('[data-line-inc]');
    } else if (button.matches('[data-line-dec]')) {
      setQuantity(key, item.quantity - 1);
      refocus('[data-line-dec]');
    } else if (button.matches('[data-line-remove]')) {
      removeItem(key);
      refocus('[data-line-remove]');
    }
  };
  list.addEventListener('click', onClick);
  return () => list.removeEventListener('click', onClick);
}
