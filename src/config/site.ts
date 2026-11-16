/**
 * Single source of truth for brand data, global copy and commercial rules.
 * To rebrand the template, edit this file and the content collections
 * (src/content/**). Components must never hardcode any of these values.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  url: string;
  locale: string;
  lang: string;
  currency: 'ARS';
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    city: string;
    country: string;
  };
  copy: {
    announcements: string[];
    newsletter: { title: string; text: string; placeholder: string; cta: string; legal: string };
    addToCart: string;
    soldOut: string;
    selectSize: string;
    home: {
      heroCta: string;
      collectionsTitle: string;
      newArrivalsTitle: string;
      categoriesTitle: string;
      editorial: { title: string; text: string; cta: NavItem };
    };
    newsletterConfirmation: string;
  };
  nav: {
    main: NavItem[];
    footer: { title: string; links: NavItem[] }[];
  };
  commerce: {
    freeShippingThreshold: number;
    installments: { count: number; interestFree: boolean };
    /** 0.1 = 10% off when paying by bank transfer. */
    transferDiscount: number;
    returnWindowDays: number;
    /** VAT rate used to show the price without national taxes (Ley 27.743). */
    vatRate: number;
    maxQuantityPerItem: number;
  };
  contact: {
    email: string;
    whatsapp: { display: string; e164: string };
  };
  social: { instagram: { handle: string; url: string } };
  showroom: {
    address: string;
    city: string;
    byAppointment: boolean;
    note: string;
  };
  legal: {
    consumerDefenseUrl: string;
    termsHref: string;
    privacyHref: string;
    withdrawalHref: string;
  };
  demoNotice: { enabled: boolean; text: string };
  /** Reference body measurements in cm, per size. */
  sizeGuide: {
    note: string;
    columns: string[];
    rows: { size: string; values: number[] }[];
  };
}

const commerce: SiteConfig['commerce'] = {
  freeShippingThreshold: 150000,
  installments: { count: 3, interestFree: true },
  transferDiscount: 0.1,
  returnWindowDays: 30,
  vatRate: 0.21,
  maxQuantityPerItem: 10,
};

export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);

export const site: SiteConfig = {
  url: 'https://trama.example',
  locale: 'es-AR',
  lang: 'es',
  currency: 'ARS',
  brand: {
    name: 'TRAMA Estudio',
    shortName: 'TRAMA',
    tagline: 'Prendas para durar, diseñadas en Córdoba.',
    description:
      'Indumentaria de diseño independiente hecha en Córdoba. Buenos materiales, cortes pensados y prendas que se usan durante años.',
    city: 'Córdoba',
    country: 'Argentina',
  },
  copy: {
    announcements: [
      `Envío gratis en compras desde ${formatPrice(commerce.freeShippingThreshold)}`,
      `${commerce.installments.count} cuotas${commerce.installments.interestFree ? ' sin interés' : ''} con todas las tarjetas`,
      `${Math.round(commerce.transferDiscount * 100)}% off pagando por transferencia`,
      `Cambios sin costo dentro de los ${commerce.returnWindowDays} días`,
    ],
    newsletter: {
      title: 'Primero, vos',
      text: 'Avisamos cuando llega una colección nueva y cuando reponemos talles. Nada más.',
      placeholder: 'Tu email',
      cta: 'Suscribirme',
      legal: 'Podés darte de baja cuando quieras.',
    },
    addToCart: 'Agregar al carrito',
    soldOut: 'Sin stock',
    selectSize: 'Elegí un talle',
    home: {
      heroCta: 'Ver la colección',
      collectionsTitle: 'Colecciones',
      newArrivalsTitle: 'Novedades',
      categoriesTitle: 'Comprá por categoría',
      editorial: {
        title: 'Hecho despacio, para usarse mucho',
        text: 'Diseñamos en nuestro estudio de Córdoba y producimos en talleres chicos de la provincia, en tiradas cortas. Elegimos fibras nobles, terminaciones que aguantan el lavado y cortes que no dependen de una temporada. Preferimos que tengas pocas prendas y que las uses durante años.',
        cta: { label: 'Visitá el showroom', href: '/contacto' },
      },
    },
    newsletterConfirmation:
      'Listo, quedaste anotado. Es una tienda de demostración: no guardamos ni enviamos tu email.',
  },
  nav: {
    main: [
      { label: 'Novedades', href: '/novedades' },
      { label: 'Otoño Sierra', href: '/colecciones/otono-sierra' },
      { label: 'Básicos', href: '/colecciones/basicos' },
      { label: 'Tienda', href: '/tienda' },
      { label: 'Showroom', href: '/contacto' },
    ],
    footer: [
      {
        title: 'Tienda',
        links: [
          { label: 'Novedades', href: '/novedades' },
          { label: 'Colecciones', href: '/colecciones' },
          { label: 'Toda la tienda', href: '/tienda' },
        ],
      },
      {
        title: 'Ayuda',
        links: [
          { label: 'Guía de talles', href: '/guia-de-talles' },
          { label: 'Envíos', href: '/envios' },
          { label: 'Cambios y devoluciones', href: '/cambios-y-devoluciones' },
          { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
          { label: 'Contacto y showroom', href: '/contacto' },
        ],
      },
      {
        title: 'Legales',
        links: [
          { label: 'Términos y condiciones', href: '/terminos' },
          { label: 'Política de privacidad', href: '/privacidad' },
          { label: 'Botón de arrepentimiento', href: '/arrepentimiento' },
        ],
      },
    ],
  },
  commerce,
  contact: {
    email: 'hola@trama-ejemplo.com',
    whatsapp: { display: '+54 9 351 000-0000', e164: '5493510000000' },
  },
  social: {
    instagram: { handle: '@trama.ejemplo', url: 'https://instagram.com/trama.ejemplo' },
  },
  showroom: {
    address: 'Bv. San Juan 1234',
    city: 'Córdoba',
    byAppointment: true,
    note: 'Atendemos con cita previa. Escribinos por WhatsApp y coordinamos un horario.',
  },
  legal: {
    consumerDefenseUrl: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor',
    termsHref: '/terminos',
    privacyHref: '/privacidad',
    withdrawalHref: '/arrepentimiento',
  },
  demoNotice: {
    enabled: true,
    text: 'Tienda de demostración: la marca, los productos y los precios son ficticios.',
  },
  sizeGuide: {
    note: 'Medidas corporales de referencia, en centímetros. Si estás entre dos talles, para prendas de calce amplio elegí el menor; para camisas y sastrería, el mayor.',
    columns: ['Pecho', 'Cintura', 'Cadera', 'Largo de tiro'],
    rows: [
      { size: 'XS', values: [84, 68, 90, 76] },
      { size: 'S', values: [90, 74, 96, 78] },
      { size: 'M', values: [96, 80, 102, 80] },
      { size: 'L', values: [102, 86, 108, 82] },
      { size: 'XL', values: [110, 94, 116, 84] },
    ],
  },
};
