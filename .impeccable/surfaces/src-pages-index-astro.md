---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/tienda.astro","src/pages/productos/[slug].astro","src/pages/carrito.astro"]
---

# Surface: TRAMA Estudio storefront (all routes)

Scope: home, catalog/collection, product page, cart drawer, demo cart/checkout, informational pages.
Visitor mode: Persuade (home, catalog, product, cart); Read (informational pages).
Audience/job: mobile-first shoppers deciding and adding to cart; prospective template buyers (indie Argentine brands) judging finish.
Action: add to cart, in working form, reachable from the first viewport.
Proof/content: only the sample catalog in `src/content` and `site.ts`; placeholders stay marked; no invented reviews, urgency or claims.
Constraints: CLAUDE.md (rules, tokens, behavior) and PRODUCT.md govern.
Memorable moment: the campaign photograph is shoppable, and a card photo morphs into the product page's main photo.
Unresolved: real photography, logo, payment gateway.

## Direction contract

THESIS: A store with a fashion label's editorial rhythm: full-bleed campaign blocks alternate with rows of product, so brand and catalog are one scroll. It refuses the category default of a carousel hero over a uniform badge-heavy card grid.

OWN-WORLD: White ground, studio-gray `#F3F3F1` photo fields, ink `#111111` for every interactive and active state, terracota `#9C4B2F` only for sale. Inter Tight carries all UI and small uppercase tracked section titles; Instrument Serif italic appears only in white over campaign photography. Photos radius 0, unboxed cards, 1px hairlines, rectangular ink buttons, white pill only over campaign.

STORY: Within one viewport the visitor sees the season as a photograph and a name, reads shipping and installments in the bar, and can add the featured piece to the cart. Then they browse rows, open a product, choose color and size with confidence, and check out a clearly labeled demo.

FIRST VIEWPORT: Ink announcement marquee (~36px) on top. Transparent header over a full-bleed campaign photo filling the remaining viewport: wordmark left, nav centered, search and cart (count) right, all white. Centered: "Otoño Sierra" in Instrument Serif italic at clamp(4rem, 13vw, 11rem), one-line tagline, white pill "Ver la colección". Bottom-left: a compact white "shop the look" panel for the featured product (name, price, size radios, "Agregar al carrito") — the primary action in working form.

FORM: seed: none (pinned) — "Moda editorial / minimalismo de autor: fotográfico, sobrio, táctil, con aire, seguro de sí mismo, contemporáneo y con un detalle inesperado" and "hero de campaña a pantalla completa (imagen o video corto)". Signature interaction: card photo → product main photo via Astro view transitions; motion grammar: reveal (fade + 20px, staggered) on cubic-bezier(0.22, 1, 0.36, 1), cart drawer slide, counter bounce.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
