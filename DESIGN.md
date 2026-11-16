---
name: TRAMA
description: Editorial storefront for independent Córdoba apparel; photography leads, ink carries every action.
colors:
  ground-white: "#ffffff"
  studio-gray: "#f3f3f1"
  ink: "#111111"
  ink-muted: "#6b6b6b"
  hairline: "#e6e6e3"
  sierra-terracota: "#9c4b2f"
  on-ink: "#ffffff"
typography:
  display:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(4rem, 13vw, 11rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  section-title:
    fontFamily: "Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  body:
    fontFamily: "Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"ss01\", \"cv11\""
  label:
    fontFamily: "Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  sm: "2px"
  full: "999px"
spacing:
  grid-gap: "8px"
  gutter: "16px"
  gutter-lg: "32px"
  header: "64px"
  announcement: "36px"
  section: "64px"
  section-lg: "96px"
  editorial: "80px"
  editorial-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  button-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.ink-muted}"
  button-pill:
    backgroundColor: "{colors.on-ink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    height: "48px"
  chip:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "8px 18px"
    height: "44px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  size-option:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    width: "48px"
    height: "44px"
  size-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  size-option-soldout:
    backgroundColor: "{colors.studio-gray}"
    textColor: "{colors.ink-muted}"
  field:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: "48px"
  badge:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  badge-sale:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.sierra-terracota}"
  announcement-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    height: "36px"
---

# Design System: TRAMA

## Overview

**Creative North Star: "The Lookbook That Sells"**

A fashion label's lookbook and its shop are one scroll. Full-bleed campaign photography alternates with quiet rows of product on a white ground; the interface steps back so the clothes carry the color. Everything interactive is ink: buttons, active chips, selected sizes, the announcement bar, the cart count. The only warm note is a Sierra terracota reserved for price reductions.

The UI voice is one firm grotesque (Inter Tight) at small sizes with generous air around it: small uppercase tracked section titles, hairline dividers, unboxed product cards that are just a photo and two lines of text. The single unexpected detail is an Instrument Serif italic display, large and white, that appears only on campaign photography. Depth is almost absent: photos sit flat at radius 0, and only drawers and modals lift off the page.

Motion is calm and expensive-feeling: one easing curve (expo-out) for every transition, staggered reveal-on-scroll, a light CSS parallax on the hero, a sliding cart drawer, a bump on the cart count, and card photo to product photo continuity via view transitions.

**Key Characteristics:**
- White ground, studio-gray photo fields, ink for every action and active state.
- Photography first: 4:5 product and cover frames, full-bleed campaign hero.
- Serif italic display only in white over campaign photography.
- Radius 0 for photos and cards, 2px for controls, full pill for chips, swatches and the on-photo button.
- 1px hairlines instead of boxes; no shadows outside overlays.

## Colors

A cold-neutral monochrome so the photographs set the palette, with a single earthy accent held back for sale.

### Primary
- **Ink** (#111111): every interactive and active state. Primary button fill, active chip and selected size fill, announcement bar, cart count, focus ring, text selection, body text. Also the scrim base (55% mix) over campaign photos and the 40% dialog backdrop.

### Secondary
- **Sierra Terracota** (#9c4b2f, about 6:1 on white): sale price, discount badge text. Exposed as `--color-sale`, which aliases the accent. The shipped build also uses it for inline form errors (checkout and withdrawal forms: error text and invalid-field border); that is its only other use.

### Neutral
- **Ground White** (#ffffff): page background, cards, dialogs, header once solid, badge fill, the "shop the look" panel over the hero.
- **Studio Gray** (#f3f3f1): photo fields behind product imagery, benefits band, editorial block, filter sidebar, sold-out size fill.
- **Ink Muted** (#6b6b6b, about 5.3:1 on white): secondary text, struck-through former price, sold-out sizes, helper hints, placeholder text.
- **Hairline** (#e6e6e3): 1px dividers and control borders at rest; disabled button fill.
- **On Ink** (#ffffff): text and icons on ink and on campaign photography.

### Named Rules
**The Ink Is Action Rule.** Active, selected and primary always mean a filled ink surface. No accent color marks state.

**The Terracota Is Price Rule.** Terracota marks a reduced price or discount (and, in the shipped build, an inline form error). It never decorates.

**The Token-Only Rule.** Components read colors from tokens (`bg-ink`, `var(--color-*)`); no raw color values in component code. Product swatch hex values from the catalog data are the only exception.

## Typography

**Display Font:** Instrument Serif, italic 400 (with Times New Roman, serif)
**Body Font:** Inter Tight Variable (with Inter Tight, ui-sans-serif, system-ui)

**Character:** A neutral, firm grotesque does all the work at small sizes; a tall editorial serif italic interrupts it only where the campaign speaks.

### Hierarchy
- **Display** (Instrument Serif italic 400, clamp(4rem, 13vw, 11rem), 0.92): the campaign name on the home hero. Collection covers step down to clamp(3rem, 7vw, 5.5rem) and the collection page hero to clamp(3.5rem, 10vw, 8rem), both line-height 0.95. Always white over a scrimmed photo.
- **Headline** (600, 2.75rem desktop / 2rem mobile, 1.1, -0.02em): editorial block and newsletter headings. Page intros use 2.5rem / 1.75rem and the product title 2rem / 1.625rem, same weight and tracking, sentence case.
- **Title** (600, 1.125rem, -0.01em): long-form h2 inside informational pages, dialog titles at 1.25rem.
- **Section Title** (600, 0.875rem, 0.08em, uppercase, centered): the heading of each storefront section ("NOVEDADES", "COLECCIONES", "COMPRÁ POR CATEGORÍA"). It is the section heading itself, not a line above another heading.
- **Body** (400, 0.9375rem, 1.55, ss01 + cv11): UI and running text. Informational pages read at 1rem / 1.7 within 65ch. Product name and price in cards: 0.875rem regular, price tabular, former price struck in ink-muted.
- **Label** (600, 0.6875rem, 0.1em, uppercase): form labels, filter group legends, "Color", "Talle", drawer and dialog headings, footer column heads. Badges use the same treatment at 0.625rem. Buttons use 0.8125rem, 600, 0.08em, uppercase.

### Named Rules
**The Serif On Photo Rule.** Instrument Serif appears only in white over campaign photography (home hero, collection covers, collection page hero). Never on white ground, never for product or section names.

**The One Sans Rule.** Every other word on the site is Inter Tight; weight, size and case make the hierarchy, not a second family.

## Layout

A centered shell (max 90rem) with a 16px gutter on mobile and 32px from 1024px up. Campaign blocks break out of the shell to full bleed; product rows and the category grid sit in a near-bleed band (8px side padding, 12px from 1024px) so photos run almost edge to edge.

The home page alternates: ink announcement marquee (36px) over a sticky header (64px) that sits transparent and white over the hero, turning solid white with a hairline once scrolled. Hero fills the remaining viewport (min 40rem on desktop) with the campaign name centered and a compact "shop the look" panel anchored bottom-left (22rem from 640px). Then collection covers in a 2-up grid, a horizontally scrolling product row, a 50/50 editorial split on studio gray, a 6-up category grid (2-up / 3-up below), a 3-column benefits band, the newsletter and the footer.

Rhythm: product grids gap 8px (12px for covers and categories); storefront sections pad 64px vertically (96px desktop); editorial and newsletter blocks pad 80px (128px desktop). Spacing follows a 4/8px scale. Long-form pages read at 42rem / 65ch.

Responsive: below 1024px the nav collapses into a menu dialog, the hero panel stacks under the title full width, and the editorial split stacks image over text.

## Elevation & Depth

Flat by default. Photos, cards, bands and buttons have no shadow; depth comes from photography, the studio-gray tonal field, and 1px hairlines. The one lifted layer is the native dialog family (cart drawer, mobile menu, search, size guide), which casts a single soft overlay shadow over a 40% ink backdrop. Color swatches carry an inset 1px ring (18-22% ink) so pale colors hold their edge on white; that is a border, not elevation.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 24px 64px -16px color-mix(in srgb, #111111 28%, transparent)`): dialogs used as drawers, sheets and modals only.

### Named Rules
**The Only Overlays Lift Rule.** If it is not a dialog, it has no shadow.

## Shapes

Three corners and nothing else: 0 for photography, cards, badges, bands and the hero panel; 2px for rectangular controls (buttons, size boxes, fields); fully round for chips, color swatches, the cart count and the white button that sits on campaign photography. Borders are always 1px: hairline at rest, ink on hover or focus. Product and cover frames are 4:5; the home hero is full bleed.

## Components

### Buttons
Rectangular, uppercase, decisive; hover swaps fill and text rather than shading.
- **Shape:** near-square corners (2px), 1px ink border, min height 48px.
- **Primary:** ink fill, white text, 12px 24px padding, 0.8125rem / 600 / 0.08em uppercase.
- **Hover / Focus:** primary inverts to white with ink text; secondary inverts to ink. 250ms expo-out on background, color and border. Focus is a 2px ink outline offset 3px (white over photography).
- **Secondary:** white fill, ink text and border. Used for editorial CTAs and the footer withdrawal button.
- **Disabled:** hairline fill and border, ink-muted text, not-allowed cursor.
- **Campaign Pill:** white fill, ink text, fully round, 12px 28px. Only over campaign photography; hover turns transparent with white text.

### Chips
- **Style:** fully round, 1px hairline border, white fill, 0.8125rem, min height 44px.
- **State:** active (`aria-pressed` / `aria-current`) fills ink with white text; hover darkens the border to ink.

### Cards / Containers
- **Product Card:** unboxed. A 4:5 photo on studio gray at radius 0, then name (0.875rem regular), price (tabular), size list with sold-out sizes struck in ink-muted, and 10px color dots. The whole photo and name is one link target.
- **Hover:** the alternate photo crossfades in (500ms) and a white quick-add panel rises 8px from the bottom of the photo with size buttons (also on focus-within). Touch devices get neither.
- **Badges:** small white rectangles top-left on the photo, label type at 0.625rem; discount text in terracota.
- **Shadow Strategy:** none (see Elevation & Depth).

### Inputs / Fields
- **Style:** 1px hairline border, 2px corners, white fill, 1rem text, min height 48px, ink-muted placeholder.
- **Focus:** border darkens to ink on hover and focus, plus the global 2px ink outline (offset 1px).
- **Error:** border and inline message in terracota (checkout, withdrawal form).

### Selectors
- **Size boxes:** native radios hidden behind a 48x44 box with 1px hairline border and 2px corners; selected fills ink; sold out is struck, ink-muted on studio gray and disabled.
- **Color swatches:** 30px circles inside a 44px target with an inset ring; selected shows a 1px ink ring offset 3px.

### Navigation
- **Header:** wordmark left (700, 1.125rem, wide tracking), nav centered (0.8125rem / 500 / 0.04em), search and cart icon buttons right (44px targets). White over the hero, ink on solid white once scrolled. The current page carries a permanent 1px underline.
- **Links:** text links draw a 1px underline that retracts on hover (350ms); quiet links draw it in on hover and focus.
- **Announcement bar:** ink band, white 0.6875rem / 500 uppercase marquee (48s loop), paused on hover and focus, static under reduced motion.
- **Mobile:** a menu dialog with large links and a muted "Ayuda" label group.
- **Icons:** one inline Lucide set, stroke 1.5, 20-22px.

### Cart Drawer
A right-side dialog, min(26rem, 100%) wide, white with the overlay shadow, sliding in from the right on expo-out. Line items stagger in 12px; the header count bumps (scale 1.35, 450ms) on add.

### Campaign Block
Full-bleed photo under a 55% ink scrim, white serif italic name, one-line tagline and the white pill. On the home hero, a white "shop the look" panel offers the featured product with size boxes and a full-width primary button.

## Do's and Don'ts

### Do:
- **Do** use ink (#111111) fill for every primary, active and selected state.
- **Do** keep product and cover photography at 4:5 on studio gray (#f3f3f1), radius 0, unboxed.
- **Do** head storefront sections with the centered uppercase section title (0.875rem, 600, 0.08em).
- **Do** run every transition on cubic-bezier(0.22, 1, 0.36, 1) and respect reduced motion.
- **Do** replace the labeled placeholder rasters with real photography at the same sizes: products and covers 1200x1500 (4:5), home hero 2400x1350 desktop and 1200x1500 mobile.
- **Do** keep touch targets at 44px or more.

### Don't:
- **Don't** use Instrument Serif anywhere except white over campaign photography.
- **Don't** use terracota (#9c4b2f) as decoration, for links or for active states.
- **Don't** box product cards or add shadows to photos, cards or buttons; only dialogs lift.
- **Don't** use the white pill button on white ground; it belongs on photography.
- **Don't** hardcode colors in components; read tokens.
- **Don't** use stock photography or real brands' imagery.
