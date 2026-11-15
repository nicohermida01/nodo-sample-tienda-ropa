# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Shoppers (simulated):** visitors to a fictional clothing brand's online store, mostly on mobile. Their job: feel the brand's identity within seconds, browse the catalog, pick color and size with confidence, and add items to the cart. The demo must behave as if these shoppers were real.
- **Template buyers (the real audience):** independent Argentine clothing brands that today sell through Instagram/WhatsApp and want their own store with identity. Estudio Nodo shows them this demo; it must convince them it is their next store — a finished product, ready to load their catalog.

## Product Purpose

A static demo store and resellable template for "TRAMA Estudio", a **fictional** independent clothing brand from Córdoba, Argentina. Success: a visitor falls for the brand, explores the catalog and adds products to the cart; a prospective client perceives a finished, trustworthy product they could rebrand with their own data.

## Positioning

A store with the criteria of an independent fashion brand, not a generic catalog: the product and its photography lead and the interface steps aside, while buying feels easy and trustworthy (clear price, clear sizes, shipping and returns always in view). Unlike a hosted-platform theme, every brand fact, copy line and product lives in centralized, typed data, so a new client is a data swap, not a rebuild.

## Operating Context

- Shopping happens mostly on mobile; desktop matters for the sales demo.
- The brand's real-world touchpoints are Instagram, WhatsApp and a showroom by appointment.
- Commerce norms are Argentine: prices in ARS with VAT included, interest-free installments, bank-transfer discount, free shipping above a threshold, returns within 30 days.
- Payment is out of scope for the demo; a real client would connect a gateway later (e.g. Mercado Pago Checkout Pro) or route orders through WhatsApp.

## Capabilities and Constraints

- Static site (Astro, `output: "static"`); client-side cart with localStorage persistence; client-side filters with no reloads.
- Rebrandability is a hard requirement: brand data, global copy and commercial rules live in `src/config/site.ts`; products and collections live only in the content collections (`src/content/`), validated at build time.
- Planned surfaces: home, catalog/collection, product page, cart drawer, demo cart/checkout, and informational pages (size guide, shipping, returns, FAQ, contact/showroom, terms, privacy, withdrawal button).
- The checkout never requests card or real payment data; it states on screen that it is a demo.
- Argentine consumer law: final price with VAT and the price without national taxes on the product page (Ley 27.743), a visible "Botón de arrepentimiento", and links to Defensa del Consumidor and the terms.
- Minimal JavaScript: islands only where needed (cart, filters, gallery, selectors). Lighthouse ≥ 95 in all four categories.

## Brand Commitments

- Name: **TRAMA Estudio**. Tagline: "Prendas para durar, diseñadas en Córdoba."
- Voice: warm, confident and unexaggerated, in Rioplatense Spanish (voseo).
- Categories: remeras, camisas, pantalones, buzos y abrigos, vestidos, accesorios. Collections: "Otoño Sierra" (current) and "Básicos" (permanent).
- Commercial terms (configurable): free shipping from $150.000, 3 interest-free installments, 10% off by bank transfer, returns within 30 days.
- Contact (sample): hola@trama-ejemplo.com, WhatsApp +54 9 351 000-0000, Instagram @trama.ejemplo; showroom at Bv. San Juan 1234, Córdoba, by appointment.
- A visible footer notice — "Tienda de demostración: la marca, los productos y los precios son ficticios." — toggled by `site.demoNotice.enabled`, removable for a real client.
- `referencias/` holds visual references whose feel and style must be matched without copying their content, logos, photos, products or brands (visual direction is recorded in `CLAUDE.md`).

## Evidence on Hand

- Sample catalog: 12 fictional products and 2 collections in `src/content/`, with marked placeholder photos in `src/assets/products/` and `src/assets/campaign/`. No real product photography exists yet.
- No real customers, reviews, press, sales figures or testimonials exist. Any sample review must be explicitly marked as a placeholder; never present invented social proof as real.
- No logo asset exists; the brand is a wordmark for now.

## Product Principles

1. The product and its photo always lead; the interface steps aside.
2. Buying must feel easy and trustworthy: price, sizes, shipping and returns are always clear and in view.
3. Honest commerce: no fake urgency, no invented reviews, no misleading discounts, no real payment capture in the demo.
4. Rebrand by data, not by code: nothing brand-specific is hardcoded in components.
5. It has to read as a finished product to a prospective client, not as a mockup.

## Accessibility & Inclusion

WCAG 2.x AA: contrast, visible focus, descriptive alt text on every photo, size/color selectors as accessible radio groups, drawers and modals with focus trap and Esc to close, touch targets ≥ 44px, and full `prefers-reduced-motion` support.
