import { getDict } from "@/lib/dict";
import { whatsappUrl, type Locale } from "@/lib/site";
import { buildJsonLd } from "@/lib/seo";
import Header from "@/components/shell/Header";
import MobileBar from "@/components/shell/MobileBar";
import RevealHost from "@/components/shell/RevealHost";
import DiscoveryHost from "@/components/shell/DiscoveryHost";
import CookieBanner from "@/components/shell/CookieBanner";
import ProcessStudio from "@/components/studio/ProcessStudio";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Initiatives from "./Initiatives";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const wa = whatsappUrl(d.whatsappMessage);
  const jsonLd = JSON.stringify(buildJsonLd(locale)).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Header locale={locale} nav={d.nav} logoAlt={d.a11y.logoAlt} homeLabel={d.a11y.home} />
      <main id="main">
        <Hero d={d} />
        <About d={d} />
        <Services d={d} />
        <ProcessStudio p={d.process} />
        <Projects d={d} />
        <Testimonials t={d.testimonials} />
        <Pricing p={d.pricing} />
        <Initiatives d={d} />
        <Contact d={d} whatsappHref={wa} />
      </main>
      <Footer d={d} />
      <MobileBar label={d.nav.cta} whatsappLabel={d.contact.whatsapp} whatsappHref={wa} />
      <RevealHost />
      <DiscoveryHost d={d.form} locale={locale} whatsappHref={wa} />
      <CookieBanner d={d.cookies} />
    </>
  );
}
