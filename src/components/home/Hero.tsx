import Image from "next/image";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowRight } from "@/components/ui/Icons";
import type { Dict } from "@/locales/es";
import { projectImages, type ProjectKey } from "./projectImages";
import styles from "./hero.module.css";

export default function Hero({ d }: { d: Dict }) {
  const items = d.projects.items;
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[112px] sm:pt-[132px] md:pb-24">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="text-[0.95rem] text-muted">
            <span className="font-semibold text-ink">{d.hero.word}</span>{" "}
            <span lang="nah">{d.hero.ipa}</span> {d.hero.gloss}
          </p>
          <h1 className="h1 mt-6 flex flex-wrap items-baseline gap-x-[0.28em]">
            <span>{d.hero.lead}</span>
            <Wordmark className="h-[0.72em] w-auto translate-y-[0.02em] text-primary" />
            <span className="sr-only">{d.hero.h1Extra}</span>
          </h1>
          <p className="lede mt-8 max-w-[34rem]">{d.hero.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" data-discovery className="btn btn-primary">
              {d.hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="btn btn-line">
              {d.hero.secondaryCta}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {d.hero.facts.map((f) => (
              <li key={f} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink/80">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto w-[min(76vw,340px)] lg:ml-auto lg:mr-6 lg:w-[min(100%,340px)]">
            <div aria-hidden className="absolute -right-5 -top-5 h-full w-full rounded-panel bg-primary sm:-right-7 sm:-top-7" />
            <div
              className={`${styles.showcase} relative aspect-[9/16] overflow-hidden rounded-panel bg-ink`}
              role="group"
              aria-label={d.hero.showcaseLabel}
            >
              {items.map((p, i) => (
                <figure key={p.key} className={styles.slide} style={{ ["--i" as string]: i }}>
                  <Image
                    src={projectImages[p.key as ProjectKey]}
                    alt={d.projects.alts[p.key as keyof typeof d.projects.alts]}
                    fill
                    sizes="(min-width: 1024px) 340px, 76vw"
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    quality={62}
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-full bg-paper px-4 py-2.5 text-ink shadow-sm">
                    <span className="truncate text-sm font-semibold">{p.title}</span>
                    <span className="shrink-0 text-xs text-muted">{p.kind}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
