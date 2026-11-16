type Cleanup = () => void;

const cleanups: Cleanup[] = [];
let swapListenerBound = false;

/**
 * Runs `init` on every page load (first load and each view-transition
 * navigation). Whatever it returns runs before the next page swaps in, so
 * listeners bound to page elements never pile up.
 */
export function onPage(init: () => Cleanup | void): void {
  document.addEventListener('astro:page-load', () => {
    const cleanup = init();
    if (cleanup) cleanups.push(cleanup);
  });
  if (!swapListenerBound) {
    swapListenerBound = true;
    document.addEventListener('astro:before-swap', () => {
      while (cleanups.length) cleanups.pop()?.();
    });
  }
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
