import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import { GA_ID, localeTag, type Locale } from "@/lib/site";
import { getDict } from "@/lib/dict";
import "@/app/globals.css";

const spaceGrotesk = localFont({
  src: "../../app/fonts/space-grotesk-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: "Arial",
});

const consentInit = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
var c={};try{c=JSON.parse(localStorage.getItem('amoxtli-cookies')||'{}')}catch(e){}
var g=function(v){return v?'granted':'denied'};
gtag('consent','default',{analytics_storage:g(c.analytics),ad_storage:g(c.marketing),ad_user_data:g(c.marketing),ad_personalization:g(c.marketing),wait_for_update:400});
gtag('js',new Date());gtag('config','${GA_ID}');`;

export default function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const d = getDict(locale);
  return (
    <html lang={localeTag[locale]} className={spaceGrotesk.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
        >
          {d.a11y.skip}
        </a>
        {children}
        <Script id="gtag-init" strategy="lazyOnload">
          {consentInit}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      </body>
    </html>
  );
}
