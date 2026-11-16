# TRAMA Estudio — tienda online de demostración

Tienda estática de una marca de ropa **ficticia** ("TRAMA Estudio", Córdoba, Argentina), usada
como sitio de demostración y como template para vender a clientes. Objetivo: que quien entra se
enamore de la marca, explore el catálogo y agregue productos al carrito. Tiene que ser fácil de
rebrandear: marca, copy y productos están centralizados.

## Stack

- **Astro 7** (`output: "static"`), TypeScript strict (`astro/tsconfigs/strict`). Node 24
  (`engines.node: "24.x"`, fijado para que Vercel no use otro major).
- Deploy en **Vercel** (https://nodo-sample-tienda-ropa.vercel.app), sin `vercel.json`.
- **Tailwind CSS v4** vía `@tailwindcss/vite`; tokens en el bloque `@theme` de `src/styles/global.css`.
- **@astrojs/sitemap**; `site` sale de `site.url` en `src/config/site.ts`.
- **Content Collections** con loader `glob` + esquemas **Zod 4** (`import { z } from 'astro/zod'`).
- **nanostores** + **@nanostores/persistent** para el carrito (islands).
- **@astrojs/check** para tipos.
- Las APIs de Astro 7 pueden diferir de la doc de v5/v6: ante la duda, verificá contra
  `node_modules/astro` o https://docs.astro.build antes de escribir código.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Dev server (si el 4321 está ocupado usa el siguiente puerto libre). Para agentes: `npx astro dev --background`, `npx astro dev stop`, `npx astro dev logs`. |
| `npm run build` | Build estático a `dist/`. **Valida las collections**: un producto inválido rompe el build. |
| `npm run preview` | Sirve `dist/` localmente. |
| `npm run check` | `astro check` (tipos de `.astro` y `.ts`). |

## Dónde viven los datos

- `src/config/site.ts`: marca, copy global (anuncios, newsletter, CTAs), navegación, datos
  comerciales (`commerce`: umbral de envío gratis, cuotas, descuento por transferencia, ventana de
  cambios, IVA, cantidad máxima), contacto, redes, showroom, links legales y aviso de demo
  (`demoNotice.enabled` lo saca para un cliente real). Los textos de anuncios se **derivan** de
  `commerce`; nunca repitas montos a mano. `formatPrice()` formatea ARS (`es-AR`).
- `src/content.config.ts`: esquemas de `products` y `collections` (+ `CATEGORIES`, `SIZES`, `IMAGE_VIEWS`).
- `src/content/products/*.json`: un archivo por producto; el `id` de la entrada es el nombre del
  archivo y tiene que coincidir con `slug` (`src/lib/products.ts` rompe el build si no).
  Reglas que valida el esquema: `compareAtPrice > price`, composición que suma 100, talles únicos,
  2-4 imágenes con `alt`, colección existente (`reference('collections')`).
- `src/content/collections/*.json`: colecciones (`status`: `current` | `permanent` | `archived`).
- `src/assets/products/<slug>/<vista>.jpg`: fotos de producto 1200×1500 (4:5). Hoy conviven fotos
  generadas con IA y placeholders marcados. `src/assets/campaign/`: portadas 4:5, hero 16:9 y hero
  mobile 4:5 (`heroMobile` en la colección). Para reemplazar fotos, pisá el archivo o cambiá la
  ruta en el JSON. Cada raster lleva su origen embebido (`impeccable embed-prompt`).
- `DESIGN.md` + `.impeccable/design.json`: sistema visual tal como quedó construido. `PRODUCT.md`:
  contexto de producto. `.impeccable/surfaces/`: contrato de dirección de la tienda.
- `src/stores/cart.ts`: `$cartItems` (persistido en `localStorage` bajo `trama:cart:v1`, con motor
  seguro que cae a memoria si el storage falla), `$cartCount`, `$cartSubtotal`,
  `$freeShippingRemaining`, `$isCartOpen`, `$lastAdded`, y las acciones `addItem`, `removeItem`,
  `setQuantity`, `clearCart`, `openCart`, `closeCart`. Una línea por variante (producto + color + talle).
- Precio sin impuestos nacionales (Ley 27.743): `price / (1 + site.commerce.vatRate)`.

Estructura: `src/components/{sections,product,cart,ui}`, `src/layouts`, `src/pages`,
`src/assets/{products,campaign,icons}`, `public/`. `referencias/` tiene las imágenes de referencia
visual: **no se mueve, renombra ni borra**, y no se importa desde el código.

---

## ESTÉTICA

Moda editorial / minimalismo de autor: fotográfico, sobrio, táctil, con aire, seguro de sí mismo,
contemporáneo y con un detalle inesperado.

Según `referencias/`, la voz dominante es la de un **e-commerce de moda contemporáneo y limpio**:
fondo blanco, fotos de estudio sobre gris muy claro, tipografía **sans grotesca** firme (no serif),
casi negro como único "color" de interfaz y cero ornamento. El carácter editorial no viene de la
tipografía de lujo sino del **ritmo**: campañas a pantalla completa que alternan con filas de
producto (bloque de foto grande → fila de 4 productos → bloque de foto grande). El detalle
inesperado es **una sola** voz display (serif itálica) que aparece únicamente sobre las fotos de
campaña, en contraste con la sans de toda la interfaz.

## REFERENCIA

Las imágenes de `referencias/`: igualá la sensación y el estilo (paleta, ritmo de la grilla,
proporción y tratamiento de fotos, peso tipográfico, interacciones), no el contenido.
No copies textos, logos, fotos, productos ni marcas.

## INTENCIÓN

Quien entra tiene que sentir en segundos la identidad de la marca (que es una marca con criterio,
no un catálogo genérico) y encontrar rápido qué comprar: el producto y su foto son siempre
protagonistas, y la interfaz se corre del medio. Comprar tiene que sentirse fácil y confiable:
precio claro, talles claros, envío y cambios a la vista. Quien compra el template tiene que percibir
un producto terminado y listo para cargar su catálogo.

## JERARQUÍA Y LAYOUT

Lo que más tiene que destacar son las fotos de producto y de campaña, el nombre y precio de cada
prenda, y el botón "Agregar al carrito".

Páginas (todas construidas):

- **Home**: barra de anuncios (envío gratis / cuotas) → header con logo, navegación, búsqueda y
  carrito con contador → hero de campaña a pantalla completa (imagen o video corto) → colecciones
  destacadas → grilla de novedades → bloque editorial (foto grande + texto de marca) → categorías →
  beneficios (envío, cuotas, cambios) → newsletter → footer.
  - Ritmo de las referencias: alternar bloques full-bleed de campaña con filas de producto
    (título de sección centrado en mayúsculas → fila de 4 cards). En mobile, las filas de la home
    pueden ser scroll horizontal **manual** con indicador de progreso fino (línea de 1-2px) y
    flechas en desktop; nunca autoplay.
  - Header sobre el hero en transparente con texto claro; pasa a fondo `bg` al scrollear.
  - Categorías: tiles 4:5 con la foto y el nombre en mayúsculas sobre la imagen.
- **Catálogo / colección**: grilla de 2 columnas en mobile y 3-4 en desktop (3 con la columna de
  filtros a la izquierda en `lg`, 4 en `2xl`), filtros (categoría, talle, color, precio) y orden,
  del lado del cliente sin recargar. Arriba de la grilla: chips de categoría y "N productos" +
  selector de orden a la derecha.
- **Ficha de producto**: galería (scroll vertical en desktop, swipe en mobile) + panel fijo con
  nombre, precio, cuotas, selector de color y talle, guía de talles en modal, agregar al carrito,
  fila de 3 garantías debajo del botón (envío, cambios, pago seguro), acordeón (descripción,
  composición y cuidados, envíos y cambios) y "completá el look".
- **Carrito** como drawer lateral, y página de carrito/checkout de demostración.
- **Páginas informativas**: guía de talles, envíos, cambios y devoluciones, preguntas frecuentes,
  contacto/showroom, términos y política de privacidad (+ botón de arrepentimiento).

Las fotos de producto van en proporción 4:5 y full-bleed en la campaña. El texto va en un
contenedor de 1280-1440px y la grilla de producto puede usar todo el ancho con márgenes chicos.

## SISTEMA VISUAL

- **Tipografía**
  - UI, cuerpo **y titulares de sección**: una sans grotesca neutra y firme
    (**"Inter Tight"** variable; alternativas: "Geist", "Inter"). Titulares de ficha en 600-700,
    tracking levemente negativo (-0.01 a -0.02em), en caja normal.
  - Títulos de sección: mayúsculas, 600, 13-15px, tracking 0.06-0.1em, centrados (patrón de las
    referencias: "NOVEDADES", "COMPRÁ POR CATEGORÍA").
  - Display de campaña: **"Instrument Serif"** (itálica) solo sobre fotos de campaña, grande,
    blanca, escala fluida con `clamp()`. Es el detalle inesperado: no la uses en otro lado.
  - Etiquetas de UI (badges, labels de filtro, "Color", "Talle"): mayúsculas chicas, 11-12px,
    tracking 0.08-0.12em.
  - Nombre de producto en card: 13-14px regular; precio debajo, 13-14px en `ink` (anterior tachado
    en `ink-muted`).
  - Fuentes self-hosted (Fontsource) con `font-display: swap`.
- **Color**: base monocromática fría-neutra para que las fotos manden. Tokens en `@theme`:
  - `--color-bg` `#FFFFFF` (fondo general; las referencias usan blanco puro, no blanco roto)
  - `--color-surface` `#F3F3F1` (fondo de fotos de producto, bandas de beneficios, sidebar de filtros)
  - `--color-ink` `#111111` (texto, botones primarios, barra de anuncios, estado activo)
  - `--color-ink-muted` `#6B6B6B` (texto secundario, precio tachado; 5.3:1 sobre blanco)
  - `--color-line` `#E6E6E3` (divisores y bordes de 1px)
  - `--color-accent` `#9C4B2F` (terracota de sierra; 6:1 sobre blanco) solo para ofertas, algún
    badge puntual y mensajes de error de formulario. Las referencias casi no usan color de acento: el estado activo es **negro relleno**.
  - `--color-sale` (por defecto igual a `--color-accent`)
  - `--color-on-ink` `#FFFFFF`
  - Nunca colores hardcodeados en componentes.
- **Bordes y formas**
  - Fotos y cards: **radio 0**, sin caja alrededor de la card (foto + texto debajo). Nada de sombras.
  - Botón primario: rectangular, relleno `ink`, radio 2px, alto ≥ 48px, texto en mayúsculas chicas
    o caja normal 500. Botón sobre foto de campaña: **pill blanco** con texto `ink`.
  - Selector de talle: cajas rectangulares con borde de 1px y radio 2px; activo = relleno `ink`;
    sin stock = texto `ink-muted` tachado y deshabilitado (también visible en la card, debajo del precio).
  - Selector de color: círculos de 28-32px con anillo de 1px; activo = anillo `ink` con separación.
  - Chips de filtro/categoría: pill con borde de 1px; activo relleno `ink`.
  - Badges ("Nuevo", "-12%"): rectángulo chico sobre la foto arriba a la izquierda, fondo `bg`,
    texto `ink` en mayúsculas 10-11px; oferta en `sale`.
  - Divisores de 1px en `line`; sombras solo en drawers y modales.
- **Espaciado**: escala de 4/8px; gutters de 8-12px en la grilla de productos y mucho aire
  (80-160px verticales) en los bloques editoriales.
- **Fotografía**: producto sobre fondo de estudio liso gris muy claro, encuadre centrado, 4:5.
  Campaña full-bleed (16:9 desktop, 4:5 mobile vía `<picture>` con fuentes por breakpoint) con
  texto centrado encima.
  Placeholders con la proporción correcta, neutros y claramente marcados ("FOTO: PRODUCTO FRENTE /
  ESPALDA / DETALLE / LOOK"), intercambiables desde las collections. Nunca fotos de stock ni de marcas reales.
- **Iconografía**: un solo set lineal (Lucide vía astro-icon o SVG inline), stroke 1.5 uniforme,
  20-22px en el header. Contador del carrito: círculo `ink` chico con número en `on-ink`.

## RESTRICCIONES

Siempre:

- HTML semántico y accesibilidad AA (contraste, foco visible, alt descriptivo en cada foto,
  selectores de talle/color como radio buttons accesibles, drawer y modales con focus trap y cierre
  con Esc, áreas táctiles ≥ 44px).
- Imágenes con `<Image />` y `<Picture />` de Astro (AVIF/WebP, srcset, lazy salvo el hero y la
  primera fila de la grilla), con width/height para evitar CLS.
- Precio final visible con IVA incluido y el precio sin impuestos nacionales en la ficha (Régimen
  de Transparencia Fiscal al Consumidor), "Botón de arrepentimiento" visible en el footer, y links a
  Defensa del Consumidor y a términos y condiciones.
- Aviso de demo visible en el footer cuando `site.demoNotice.enabled` es `true`.
- Datos estructurados JSON-LD (schema.org Product con Offer, precio y disponibilidad, y
  Organization/BreadcrumbList), Open Graph por producto, sitemap y títulos con nombre del producto + marca.
- Datos de marca y copy en `site.ts`, productos solo en las collections, y cero JS fuera de las
  islands que lo necesiten (carrito, filtros, galería, selectores).
- Lighthouse ≥ 95 en performance, accesibilidad, buenas prácticas y SEO.

Nunca:

- Un checkout que pida datos de tarjeta o pago real: el checkout es de demostración, lo deja claro
  en pantalla y está preparado para conectarse después a una pasarela real (ej. Mercado Pago
  Checkout Pro, o pedido armado por WhatsApp).
- Contadores de urgencia falsos ("quedan 2!", timers), reseñas inventadas presentadas como reales
  (las de ejemplo van marcadas como placeholder; las estrellas de las referencias no se replican)
  ni descuentos engañosos.
- Popups invasivos al entrar, carruseles automáticos en la grilla, librerías de componentes
  genéricas, frameworks de UI (React/Vue) salvo que sea imprescindible, emojis como íconos, lorem
  ipsum (usá copy creíble de marca), ni gradientes genéricos de "IA".
- Favoritos/wishlist o cuentas de usuario (aparecen en las referencias pero no están en el alcance).

## COMPORTAMIENTO

- Responsive mobile-first (breakpoints sm/md/lg/xl/2xl); la mayoría del tráfico va a ser mobile.
  En mobile: grilla de 2 columnas, menú en panel a pantalla completa, filtros en un bottom sheet,
  galería con swipe y botón "Agregar al carrito" fijo abajo en la ficha.
- Hover (solo en dispositivos con hover, con `@media (hover: hover)`): en la card de producto,
  cambio a la segunda foto con crossfade y aparición de "agregar rápido" con talles; links con
  subrayado animado; botones con inversión de color.
- Animaciones: reveal on scroll de bloques e imágenes (fade + translate 16-24px o máscara que se
  abre, con stagger en grillas) usando CSS scroll-driven animations con fallback en
  IntersectionObserver; parallax leve en la campaña; marquee lento en la barra de anuncios (fondo
  `ink`, texto `on-ink` en mayúsculas chicas, que se pausa con hover/foco); drawer del carrito con
  slide + overlay; feedback al agregar al carrito (contador que rebota y miniatura que confirma).
  Duraciones de 200-700ms con easing `cubic-bezier(0.22, 1, 0.36, 1)`. Solo animar transform,
  opacity y clip-path. Si hace falta JS de animación, usar Motion (motion.dev) en islands chicas.
- Transiciones entre páginas con View Transitions de Astro (`<ClientRouter />`), con
  `transition:name` para que la foto de la card se transforme en la foto principal de la ficha.
  El estado del carrito tiene que sobrevivir a la navegación (`transition:persist` en la isla).
- Respetar `prefers-reduced-motion`: sin parallax, marquee ni desplazamientos, solo fades instantáneos.
