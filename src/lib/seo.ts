import type { Metadata, Viewport } from "next";
import { getDict } from "./dict";
import {
  EMAIL,
  INSTAGRAM,
  LINKEDIN,
  PARTNERS,
  SITE_URL,
  isIndexable,
  localeTag,
  ogLocale,
  urlFor,
  type Locale,
} from "./site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FA1F6F",
};

export function buildMetadata(locale: Locale): Metadata {
  const d = getDict(locale);
  const indexable = isIndexable();
  const image = `/assets/og-${locale}.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.meta.title, template: "%s | Amoxtli®" },
    description: d.meta.description,
    applicationName: "Amoxtli",
    category: "technology",
    authors: [{ name: "Amoxtli", url: SITE_URL }],
    creator: "Amoxtli",
    publisher: "Amoxtli",
    referrer: "origin-when-cross-origin",
    formatDetection: { telephone: false, email: false, address: false },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: urlFor(locale),
      languages: {
        "es-MX": urlFor("es"),
        "en-US": urlFor("en"),
        "x-default": urlFor("es"),
      },
    },
    openGraph: {
      type: "website",
      url: urlFor(locale),
      siteName: "Amoxtli",
      title: d.meta.ogTitle,
      description: d.meta.ogDescription,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "es" ? "en" : "es"]],
      images: [{ url: image, width: 1200, height: 630, alt: d.meta.ogAlt, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.ogTitle,
      description: d.meta.ogDescription,
      images: [{ url: image, alt: d.meta.ogAlt }],
      site: "@amoxtlitech",
      creator: "@amoxtlitech",
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        }
      : { index: false, follow: false },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
  };
}

export function buildJsonLd(locale: Locale) {
  const d = getDict(locale);
  const org = `${SITE_URL}/#organization`;
  const site = `${SITE_URL}/#website`;
  const page = `${urlFor(locale)}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": org,
        name: "Amoxtli",
        legalName: "Amoxtli Web Developers",
        alternateName: ["Amoxtli tech", "AWD"],
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/icon-512.png`, width: 512, height: 512 },
        image: `${SITE_URL}/assets/og-${locale}.jpg`,
        description: d.meta.description,
        slogan: d.meta.slogan,
        foundingDate: "2022",
        email: EMAIL,
        address: { "@type": "PostalAddress", addressLocality: "Ciudad de México", addressRegion: "CDMX", addressCountry: "MX" },
        areaServed: { "@type": "Country", name: "Mexico" },
        knowsAbout: ["Software development", "Web design", "Branding", "SaaS", "Artificial intelligence", "Digital transformation"],
        sameAs: [INSTAGRAM, LINKEDIN, PARTNERS],
        contactPoint: {
          "@type": "ContactPoint",
          email: EMAIL,
          contactType: "sales",
          availableLanguage: ["Spanish", "English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: d.meta.serviceCatalog,
          itemListElement: d.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": site,
        url: SITE_URL,
        name: "Amoxtli",
        inLanguage: [localeTag.es, localeTag.en],
        publisher: { "@id": org },
      },
      {
        "@type": "WebPage",
        "@id": page,
        url: urlFor(locale),
        name: d.meta.title,
        description: d.meta.description,
        inLanguage: localeTag[locale],
        isPartOf: { "@id": site },
        about: { "@id": org },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/assets/og-${locale}.jpg`, width: 1200, height: 630 },
      },
      {
        "@type": "FAQPage",
        "@id": `${urlFor(locale)}#faq`,
        inLanguage: localeTag[locale],
        mainEntity: d.contact.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
