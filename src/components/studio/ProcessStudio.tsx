"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/locales/es";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Replay } from "@/components/ui/Icons";
import { SCENES } from "./Scenes";
import s from "./studio.module.css";

const STAGE_MS = 9000;

export default function ProcessStudio({ p }: { p: Dict["process"] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [run, setRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const last = p.stages.length - 1;

  useEffect(() => {
    if (!playing || !inView) return;
    const id = window.setTimeout(() => {
      if (active >= last) setPlaying(false);
      else setActive((a) => a + 1);
    }, STAGE_MS);
    return () => window.clearTimeout(id);
  }, [playing, inView, active, run, last]);

  const select = useCallback((i: number, manual = true) => {
    setActive(i);
    setRun((r) => r + 1);
    if (manual) setPlaying(false);
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let t = -1;
    if (e.key === "ArrowRight") t = Math.min(i + 1, last);
    if (e.key === "ArrowLeft") t = Math.max(i - 1, 0);
    if (e.key === "Home") t = 0;
    if (e.key === "End") t = last;
    if (t >= 0) {
      e.preventDefault();
      select(t);
      tabs.current[t]?.focus();
    }
  };

  const Scene = SCENES[p.stages[active].key];
  const titles = p.stages.map((x) => x.title);

  return (
    <section id="process" className="on-dark section-y overflow-hidden bg-night text-paper">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8" data-reveal>
          <h2 className="h2 lg:col-span-7">{p.title}</h2>
          <p className="max-w-[28rem] text-[1.0625rem] leading-relaxed text-paper/75 sm:text-lg lg:col-span-5">{p.intro}</p>
        </div>

        <div ref={root} className="mt-14 sm:mt-16">
          <div role="tablist" aria-label={p.tablistLabel} className={s.rail}>
            {p.stages.map((st, i) => (
              <button
                key={st.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`stage-tab-${st.key}`}
                aria-selected={i === active}
                aria-controls={`stage-panel-${st.key}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`${s.tab} ${i < active ? s.done : ""} ${i === active ? s.on : ""}`}
              >
                <span className={s.track} aria-hidden>
                  {i === active && playing && inView ? (
                    <i key={`${active}-${run}`} className={s.fill} style={{ animationDuration: `${STAGE_MS}ms` }} />
                  ) : null}
                </span>
                <span className={s.tabName}>{st.title}</span>
                <span className={s.tabDur}>{st.duration}</span>
              </button>
            ))}
          </div>

          <div className={s.window}>
            <div className={s.chrome}>
              <span className={s.lights} aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className={s.chromeTitle}>{p.stages[active].title}</span>
              <div className={s.controls}>
                <button type="button" onClick={() => select(Math.max(active - 1, 0), true)} aria-label={p.prev} disabled={active === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!playing && active >= last) select(0, false);
                    setPlaying((v) => !v);
                  }}
                  aria-label={playing ? p.pause : p.play}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button type="button" onClick={() => select(active, false)} aria-label={p.replay}>
                  <Replay className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => select(Math.min(active + 1, last), true)} aria-label={p.next} disabled={active === last}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className={s.body}>
              <div className={s.stage}>{seen && <Scene key={`${active}-${run}`} t={p.scene} titles={titles} />}</div>
              <div className={s.info}>
                {p.stages.map((st, i) => (
                  <div
                    key={st.key}
                    role="tabpanel"
                    id={`stage-panel-${st.key}`}
                    aria-labelledby={`stage-tab-${st.key}`}
                    hidden={i !== active}
                  >
                    <span className={s.durChip}>{st.duration}</span>
                    <h3 className={s.infoTitle}>{st.title}</h3>
                    <p className={s.infoText}>{st.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className={s.caption}>{p.caption}</p>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-center">
            <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight">{p.ctaTitle}</p>
            <a href="#contact" data-discovery className="btn btn-primary">
              {p.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
