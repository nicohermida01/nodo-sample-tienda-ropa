# TRAMA Estudio — tienda online de demostración

Tienda estática de una marca de ropa **ficticia** (TRAMA Estudio, Córdoba, Argentina), construida por Estudio Nodo como sitio de muestra y template para marcas de indumentaria independientes. La marca, el copy y el catálogo están centralizados: rebrandear es cambiar datos, no reescribir componentes.

**Demo:** https://nodo-sample-tienda-ropa.vercel.app

> La marca, los productos y los precios son ficticios. El checkout es de demostración: no pide datos de pago ni procesa compras.

## Inicio rápido

Requiere **Node 24** (`engines.node: "24.x"`).

```sh
npm install
npm run dev      # dev server en http://localhost:4321 (o el siguiente puerto libre)
npm run build    # build estático en dist/ — valida el catálogo
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build estático a `dist/`. Un producto inválido rompe el build |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run check` | Chequeo de tipos (`astro check`) |

## Qué incluye

| Área | Detalle |
| --- | --- |
| Home | Barra de anuncios, hero de campaña con compra rápida, colecciones, novedades, bloque editorial, categorías, beneficios, newsletter |
| Catálogo | `/tienda`, `/novedades`, `/colecciones/[slug]` con filtros (categoría, talle, color, precio) y orden del lado del cliente |
| Ficha | `/productos/[slug]`: galería, selector de color y talle, guía de talles, precio sin impuestos nacionales, cuotas, "Completá el look" |
| Carrito | Drawer persistente entre páginas (`localStorage`) y `/carrito` con checkout de demostración y pedido por WhatsApp |
| Informativas | Guía de talles, envíos, cambios, preguntas frecuentes, contacto/showroom, términos, privacidad, botón de arrepentimiento, 404 |
| SEO | Sitemap, Open Graph por producto, JSON-LD (Product, BreadcrumbList, Organization) |

**Stack:** Astro 7 (salida estática) · TypeScript strict · Tailwind CSS v4 · Content Collections con Zod · nanostores · fuentes self-hosted (Inter Tight, Instrument Serif). Sin frameworks de UI: el JS vive solo en islands chicas.

## Rebrandear para un cliente

1. **Marca y reglas comerciales** → `src/config/site.ts`
   - `url`: dominio público (canonical, Open Graph, sitemap).
   - `brand`, `copy`, `nav`: nombre, bajada, textos globales y navegación.
   - `commerce`: umbral de envío gratis, cuotas, descuento por transferencia, días de cambio, IVA. Los anuncios se generan a partir de estos valores.
   - `contact`, `social`, `showroom`, `legal`.
   - `demoNotice.enabled`: ponelo en `false` para sacar el aviso de demostración.
2. **Colecciones** → `src/content/collections/*.json` (nombre, estado, textos, portada y hero).
3. **Productos** → `src/content/products/<slug>.json`, un archivo por producto. El nombre del archivo tiene que coincidir con `slug`.
4. **Fotos** → `src/assets/products/<slug>/` y `src/assets/campaign/`. Pisá el archivo existente o cambiá la ruta `src` en el JSON (ver tabla).
5. **Verificá** con `npm run check && npm run build`.

### Fotos

| Uso | Ubicación | Tamaño recomendado |
| --- | --- | --- |
| Producto (2 a 4 por producto) | `src/assets/products/<slug>/{frente,espalda,detalle,look}.jpg` | 1200×1500 (4:5), fondo de estudio liso |
| Hero desktop | `src/assets/campaign/<coleccion>-hero.jpg` | 2400×1350 (16:9) |
| Hero mobile | `src/assets/campaign/<coleccion>-hero-mobile.jpg` | 1200×1500 (4:5) |
| Portada de colección | `src/assets/campaign/<coleccion>-cover.jpg` | 1200×1500 (4:5), tercio inferior oscuro para el texto |

Astro optimiza todo en el build (AVIF/WebP y `srcset`). Cada foto necesita un `alt` descriptivo en su JSON.

### Reglas que valida el build

- `compareAtPrice` mayor que `price` (los descuentos tienen que ser reales).
- La composición de la tela suma 100%.
- Talles sin repetir; entre 2 y 4 imágenes por producto.
- La colección referenciada existe y el `slug` coincide con el nombre del archivo.

## Deploy

Está configurado para **Vercel** sin `vercel.json`: Vercel detecta Astro, corre `npm run build` y publica `dist/`. Cada push a `main` despliega. Si cambiás de dominio, actualizá `url` en `src/config/site.ts`.

## Documentación del proyecto

| Archivo | Para qué |
| --- | --- |
| `CLAUDE.md` | Reglas de diseño, contenido y comportamiento del template |
| `PRODUCT.md` | Audiencias, propósito y principios del producto |
| `DESIGN.md` | Sistema visual tal como quedó construido (tokens, componentes, reglas) |
| `referencias/` | Imágenes de referencia visual. No se importan desde el código |

## Estado de las fotos

Algunas fotos son generadas con IA y el resto son placeholders marcados ("FOTO: PRODUCTO FRENTE"). Cada imagen lleva su origen embebido en los metadatos. Para un cliente real, reemplazalas por fotografía propia con las mismas proporciones.
