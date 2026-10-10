"use client";

import { useRef, useState } from "react";
import type { Dict } from "@/locales/es";
import { ArrowRight, Check } from "@/components/ui/Icons";

export default function Pricing({ p: d }: { p: Dict["pricing"] }) {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const plans = d.plans;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let target = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") target = (i + 1) % plans.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") target = (i - 1 + plans.length) % plans.length;
    if (target >= 0) {
      e.preventDefault();
      setActive(target);
      tabs.current[target]?.focus();
    }
  };

  return (
    <section id="pricing" className="section-y border-t border-line bg-white">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <h2 className="h2">{d.title}</h2>
          <p className="lede max-w-[28rem]">{d.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-10" data-reveal>
          <div
            role="tablist"
            aria-label={d.listLabel}
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1"
          >
            {plans.map((p, i) => (
              <button
                key={p.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`plan-tab-${p.key}`}
                aria-selected={i === active}
                aria-controls={`plan-${p.key}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`rounded-[20px] border p-4 text-left transition-colors sm:p-5 ${
                  i === active ? "border-ink bg-ink text-paper" : "border-ink/20 bg-paper hover:border-ink"
                }`}
              >
                <span className="block text-[1.05rem] font-semibold tracking-tight sm:text-lg">{p.title}</span>
                <span className={`mt-1 block text-sm ${i === active ? "text-primary" : "text-muted"}`}>
                  {d.from} {p.price}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            {plans.map((p, i) => (
              <div
                key={p.key}
                role="tabpanel"
                id={`plan-${p.key}`}
                aria-labelledby={`plan-tab-${p.key}`}
                hidden={i !== active}
                className="rounded-panel border border-ink p-7 sm:p-10"
              >
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h3>
                    <p className="mt-3 max-w-[24rem] text-muted">{p.description}</p>
                  </div>
                  <p className="shrink-0 sm:text-right">
                    <span className="block text-sm text-muted">{d.from}</span>
                    <span className="text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-none tracking-tight">{p.price}</span>
                  </p>
                </div>
                <ul className="mt-9 grid gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.98rem]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <a href="#contact" data-discovery data-service={i} className="btn btn-primary">
                    {d.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="text-sm text-muted">{d.custom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
