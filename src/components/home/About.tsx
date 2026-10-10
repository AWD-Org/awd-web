import Image from "next/image";
import type { Dict } from "@/locales/es";
import team from "@/assets/opt/team.webp";

export default function About({ d }: { d: Dict }) {
  return (
    <section id="about" className="section-y border-t border-line">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6" data-reveal>
            <h2 className="h2">{d.about.title}</h2>
            <p className="lede mt-6 max-w-[32rem]">{d.about.objective}</p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {d.about.metrics.map((m) => (
                <li key={m} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6" data-reveal style={{ ["--rd" as string]: "0.1s" }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-line">
              <Image
                src={team}
                alt={d.about.teamAlt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
          </div>
        </div>

        <dl className="mt-14 grid gap-x-8 gap-y-0 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {d.about.pillars.map((p, i) => (
            <div
              key={p.title}
              className="border-t border-ink py-6 md:pr-6"
              data-reveal
              style={{ ["--rd" as string]: `${i * 0.07}s` }}
            >
              <dt className="text-xl font-semibold tracking-tight">{p.title}</dt>
              <dd className="mt-3 text-[0.98rem] leading-relaxed text-muted">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
