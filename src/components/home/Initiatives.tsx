import type { Dict } from "@/locales/es";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function Initiatives({ d }: { d: Dict }) {
  return (
    <section id="initiatives" className="section-y border-t border-line">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-reveal>
          <h2 className="h2">{d.initiatives.title}</h2>
          <p className="lede mt-6 max-w-[26rem]">{d.initiatives.subtitle}</p>
        </div>
        <div className="lg:col-span-7">
          <ul className="border-b border-ink">
            {d.initiatives.items.map((it, i) => (
              <li
                key={it.key}
                className="flex flex-col gap-6 border-t border-ink py-8 sm:flex-row sm:items-center sm:justify-between"
                data-reveal
                style={{ ["--rd" as string]: `${i * 0.08}s` }}
              >
                <div className="max-w-[30rem]">
                  <h3 className="text-2xl font-semibold tracking-tight">{it.title}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted">{it.text}</p>
                </div>
                <a href={it.href} target="_blank" rel="noopener noreferrer" className="btn btn-line shrink-0">
                  {it.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
