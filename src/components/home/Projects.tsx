import Image from "next/image";
import type { Dict } from "@/locales/es";
import { ArrowUpRight } from "@/components/ui/Icons";
import { projectImages, type ProjectKey } from "./projectImages";

export default function Projects({ d }: { d: Dict }) {
  return (
    <section id="projects" className="section-y border-t border-line bg-white">
      <div className="shell flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
        <h2 className="h2 max-w-[18ch]">{d.projects.title}</h2>
        <p className="lede max-w-[26rem]">{d.projects.subtitle}</p>
      </div>

      <div
        role="region"
        aria-label={d.projects.railLabel}
        tabIndex={0}
        className="relative mt-12 flex scroll-pl-5 snap-x snap-mandatory sm:scroll-pl-8 lg:scroll-pl-[max(2rem,calc((100vw-1240px)/2+2rem))] gap-5 overflow-x-auto pb-6 pl-5 pr-5 [scrollbar-color:rgb(var(--color-ink))_transparent] [scrollbar-width:thin] sm:pl-8 lg:pl-[max(2rem,calc((100vw-1240px)/2+2rem))]"
      >
        {d.projects.items.map((p) => (
          <a
            key={p.key}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[68vw] shrink-0 snap-start sm:w-[300px] lg:w-[320px]"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-panel bg-line transition-transform duration-500 group-hover:-translate-y-2">
              <Image
                src={projectImages[p.key as ProjectKey]}
                alt={d.projects.alts[p.key as keyof typeof d.projects.alts]}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 68vw"
                loading="lazy"
                quality={68}
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.kind}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink transition-colors group-hover:border-primary group-hover:bg-primary">
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">{d.projects.view}</span>
              </span>
            </div>
          </a>
        ))}
        <span aria-hidden className="w-3 shrink-0" />
      </div>
    </section>
  );
}
