import type { Dict } from "@/locales/es";
import { ArrowRight } from "@/components/ui/Icons";
import ServiceArt from "./ServiceArt";

export default function Services({ d }: { d: Dict }) {
  return (
    <section id="services" className="section-y border-t border-line">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28" data-reveal>
            <h2 className="h2">{d.services.title}</h2>
            <p className="lede mt-6 max-w-[28rem]">{d.services.subtitle}</p>
            <a href="#contact" data-discovery className="btn btn-ink mt-10">
              {d.services.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-b border-ink">
            {d.services.items.map((s, i) => (
              <li key={s.key} data-reveal style={{ ["--rd" as string]: `${i * 0.05}s` }}>
                <details name="services" open={i === 0} className="group border-t border-ink">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 marker:hidden [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary-deep">
                      {s.title}
                    </h3>
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink text-2xl leading-none transition-transform duration-300 group-open:rotate-45 group-open:bg-primary group-open:border-primary"
                    >
                      +
                    </span>
                  </summary>
                  <div className="grid gap-6 pb-8 sm:grid-cols-[1fr_200px] sm:items-center">
                    <p className="max-w-[32rem] text-[1.02rem] leading-relaxed text-muted">{s.text}</p>
                    <div className="h-[120px] w-[190px] text-ink sm:justify-self-end">
                      <ServiceArt name={s.key} />
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
