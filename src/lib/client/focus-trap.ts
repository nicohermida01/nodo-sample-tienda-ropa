const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const visible = (el: HTMLElement) => el.offsetParent !== null || el === document.activeElement;

/**
 * Keeps Tab inside `container`, closes on Escape and returns focus to the
 * element that was focused before. Returns a release function.
 */
export function trapFocus(container: HTMLElement, onEscape: () => void): () => void {
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(visible);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', onKeydown);
  const firstItem = container.querySelector<HTMLElement>(FOCUSABLE);
  (firstItem ?? container).focus();

  return () => {
    container.removeEventListener('keydown', onKeydown);
    previous?.focus();
  };
}
