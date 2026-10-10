"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Dict } from "@/locales/es";
import fratellis from "@/assets/opt/logo-fratellis.webp";
import orza from "@/assets/opt/logo-orza.webp";
import rondo from "@/assets/opt/logo-rondo.webp";
import sucre from "@/assets/opt/logo-sucre.webp";

const logos = { fratellis, orza, rondo, sucre } as const;

export default function Testimonials({ t: d }: { t: Dict["testimonials"] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = d.items;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const vertical = window.matchMedia("(min-width: 1024px)").matches;
    const next = vertical ? "ArrowDown" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    let target = -1;
    if (e.key === next) target = (i + 1) % items.length;
    if (e.key === prev) target = (i - 1 + items.length) % items.length;
    if (target >= 0) {
      e.preventDefault();
      setActive(target);
      tabs.current[target]?.focus();
    }
  };

  return (
    <section id="testimonials" className="section-y border-t border-line">
      <div className="shell">
        <div className="max-w-[44rem]" data-reveal>
          <h2 className="h2">{d.title}</h2>
          <p className="lede mt-6">{d.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10" data-reveal>
          <div className="lg:col-span-8 lg:order-1">
            {items.map((t, i) => (
              <figure
                key={t.key}
                role="tabpanel"
                id={`quote-${t.key}`}
                aria-labelledby={`tab-${t.key}`}
                hidden={i !== active}
                className="rounded-panel bg-ink p-8 text-paper sm:p-12"
              >
                <blockquote className="text-[clamp(1.35rem,2.6vw,2.15rem)] font-medium leading-[1.25] tracking-tight">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white">
                    <Image src={logos[t.key as keyof typeof logos]} alt={t.logoAlt} fill sizes="56px" className="object-contain p-1.5" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{t.name}</span>
                    <span className="block text-sm text-paper/75">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div
            role="tablist"
            aria-label={d.listLabel}
            className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {items.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={i === active}
                aria-controls={`quote-${t.key}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`flex shrink-0 items-center gap-3 rounded-full border px-4 py-3 text-left transition-colors lg:rounded-[20px] ${
                  i === active ? "border-primary bg-primary text-ink" : "border-ink/20 bg-white hover:border-ink"
                }`}
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-ink/10">
                  <Image src={logos[t.key as keyof typeof logos]} alt="" fill sizes="40px" className="object-contain p-1" />
                </span>
                <span className="whitespace-nowrap pr-2 text-[0.95rem] font-semibold lg:whitespace-normal">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
