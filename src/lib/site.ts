export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.amoxtli.tech").replace(/\/$/, "");

export const localePath: Record<Locale, string> = { es: "/", en: "/en" };
export const localeTag: Record<Locale, string> = { es: "es-MX", en: "en-US" };
export const ogLocale: Record<Locale, string> = { es: "es_MX", en: "en_US" };

export const urlFor = (locale: Locale) =>
  locale === "es" ? `${SITE_URL}/` : `${SITE_URL}${localePath.en}`;

export const EMAIL = "hello@amoxtli.tech";
export const INSTAGRAM = "https://www.instagram.com/amoxtli.tech";
export const LINKEDIN = "https://www.linkedin.com/company/amoxtli-web-developers";
export const PARTNERS = "https://partners.amoxtli.tech";
export const AXOLOTLS = "https://reptilarioyajolotarioquetzal.com/";

export const GA_ID = "AW-11564510788";
export const GA_CONVERSION = "AW-11564510788/2KE2COqTsooaEMTcsYor";

/** Vercel (VERCEL_ENV) and Netlify (CONTEXT) mark every non-production deploy; those stay noindex. */
export const isIndexable = () => {
  if (process.env.SITE_NOINDEX === "1") return false;
  const vercel = process.env.VERCEL_ENV;
  if (vercel) return vercel === "production";
  const ctx = process.env.CONTEXT;
  return !ctx || ctx === "production";
};

export const whatsappUrl = (message: string) => {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  if (!number) return "";
  const custom = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE;
  const text = custom ? (custom.includes("%") ? custom : encodeURIComponent(custom)) : encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
};
