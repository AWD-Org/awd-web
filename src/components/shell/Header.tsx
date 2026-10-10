"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowRight, Close, Menu } from "@/components/ui/Icons";
import type { Dict } from "@/locales/es";
import type { Locale } from "@/lib/site";

type Props = { locale: Locale; nav: Dict["nav"]; logoAlt: string; homeLabel: string };

const ORDER = ["about", "services", "process", "projects", "testimonials", "pricing", "initiatives"] as const;

export default function Header({ locale, nav, logoAlt, homeLabel }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY < 320) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = ORDER.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const other: Locale = locale === "es" ? "en" : "es";
  const switchHref = other === "es" ? "/" : "/en";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-paper/90 shadow-[0_1px_0_rgb(var(--color-line))] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href={locale === "es" ? "/" : "/en"} aria-label={homeLabel} className="shrink-0 text-primary">
          <Wordmark className="h-[22px] w-auto sm:h-6" label={logoAlt} />
        </Link>

        <nav aria-label={nav.mainLabel} className="hidden items-center gap-1 xl:flex">
          {ORDER.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors hover:text-ink ${
                active === id ? "bg-ink text-paper hover:text-paper" : "text-ink/70"
              }`}
            >
              {nav.links[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={switchHref}
            hrefLang={other === "es" ? "es-MX" : "en-US"}
            lang={other === "es" ? "es-MX" : "en"}
            aria-label={`${other === "es" ? nav.langEs : nav.langEn} · ${other === "es" ? nav.langEsLabel : nav.langEnLabel}`}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-ink/20 px-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            prefetch={false}
          >
            {other === "es" ? nav.langEs : nav.langEn}
          </Link>
          <a href="#contact" data-discovery className="btn btn-primary hidden !min-h-[44px] !px-5 sm:inline-flex">
            {nav.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-paper xl:hidden">
          <nav aria-label={nav.mainLabel} className="shell flex flex-col py-6">
            {ORDER.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-[1.75rem] font-semibold tracking-tight"
              >
                {nav.links[id]}
              </a>
            ))}
            <a href="#contact" data-discovery onClick={() => setOpen(false)} className="btn btn-primary mt-8">
              {nav.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
