"use client";

import { useEffect, useState, type CSSProperties, type ReactElement } from "react";
import type { Dict } from "@/locales/es";
import { Check } from "@/components/ui/Icons";
import s from "./studio.module.css";

type SceneDict = Dict["process"]["scene"];
type Props = { t: SceneDict; titles: string[] };

const d = (n: number): CSSProperties => ({ ["--d" as string]: `${n}s` });
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function Person() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4" strokeLinecap="round" />
    </svg>
  );
}

/* 1. Exploración: llamada de discovery */
function Discover({ t }: Props) {
  return (
    <div className={cx(s.scene, s.discover)}>
      <div className={s.callCol}>
        <div className={s.tiles}>
          <div className={cx(s.tile, s.a, s.pop)} style={d(0)}>
            <span className={s.avatar}>
              <Person />
            </span>
            <em>{t.you}</em>
          </div>
          <div className={cx(s.tile, s.speaking, s.a, s.pop)} style={d(0.15)}>
            <span className={cx(s.avatar, s.avatarPink)}>A</span>
            <em>{t.us}</em>
          </div>
        </div>
        <ul className={s.chat}>
          <li className={cx(s.bubble, s.q, s.a, s.rise)} style={d(0.5)}>{t.q1}</li>
          <li className={cx(s.bubble, s.ans, s.a, s.rise)} style={d(1.4)}><i /><i /></li>
          <li className={cx(s.bubble, s.q, s.a, s.rise)} style={d(2.4)}>{t.q2}</li>
          <li className={cx(s.bubble, s.ans, s.a, s.rise)} style={d(3.2)}><i /><i /></li>
          <li className={cx(s.bubble, s.q, s.a, s.rise)} style={d(4.1)}>{t.q3}</li>
          <li className={cx(s.bubble, s.ans, s.a, s.rise)} style={d(4.9)}><i /></li>
        </ul>
      </div>
      <aside className={cx(s.card, s.brief)}>
        <h4>{t.brief}</h4>
        {[
          [t.goal, 1.6, "78%"],
          [t.audience, 3.4, "62%"],
          [t.scope, 5.1, "88%"],
        ].map(([label, delay, w]) => (
          <div key={label as string} className={s.briefRow}>
            <span>{label}</span>
            <i className={cx(s.a, s.grow)} style={{ ...d(delay as number), ["--w" as string]: w as string }} />
          </div>
        ))}
        <div className={cx(s.fit, s.a, s.pop)} style={d(6)}>
          <Check className="h-4 w-4" />
          {t.fit}
        </div>
      </aside>
    </div>
  );
}

/* 2. Definición: estructura, stack, requerimientos y tiempos */
function Scoping({ t, titles }: Props) {
  const nodes = [
    { x: 4, label: t.services },
    { x: 64, label: t.projects },
    { x: 124, label: t.contact },
    { x: 184, label: t.admin },
  ];
  return (
    <div className={cx(s.scene, s.scoping)}>
      <div className={cx(s.card, s.tree)}>
        <h4>{t.sitemap}</h4>
        <svg viewBox="0 0 240 130" className={s.treeSvg} role="img" aria-label={t.sitemap}>
          <g className={s.treeLines}>
            {nodes.map((n, i) => (
              <path key={n.label} d={`M120 36 V54 H${n.x + 26} V84`} className={cx(s.a, s.draw)} style={{ ...d(0.7 + i * 0.25), ["--len" as string]: 90 }} />
            ))}
          </g>
          <g className={cx(s.a, s.pop, s.node, s.rootNode)} style={d(0.1)}>
            <rect x="90" y="8" width="60" height="28" rx="9" className={s.nodeRoot} />
            <text x="120" y="26" textAnchor="middle">{t.home}</text>
          </g>
          {nodes.map((n, i) => (
            <g key={n.label} className={cx(s.a, s.pop, s.node)} style={d(1.1 + i * 0.25)}>
              <rect x={n.x} y="84" width="52" height="28" rx="9" />
              <text x={n.x + 26} y="102" textAnchor="middle">{n.label}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className={cx(s.card, s.reqs)}>
        <ul>
          {[t.includes, t.budget, t.timeline].map((label, i) => (
            <li key={label} className={cx(s.a, s.rise)} style={d(0.6 + i * 0.7)}>
              <span className={cx(s.tick, s.a, s.pop)} style={d(1 + i * 0.7)}>
                <Check className="h-3 w-3" />
              </span>
              {label}
            </li>
          ))}
        </ul>
        <h4>{t.stack}</h4>
        <div className={s.chips}>
          {["Next.js", "TypeScript", "Tailwind", "Supabase"].map((c, i) => (
            <span key={c} className={cx(s.chip, s.a, s.pop)} style={d(2.8 + i * 0.18)}>{c}</span>
          ))}
        </div>
      </div>

      <div className={cx(s.card, s.gantt)}>
        <h4>{t.timeline}</h4>
        {[
          [titles[2], "0%", "30%", 3.2],
          [titles[3], "22%", "56%", 3.7],
          [titles[4], "70%", "30%", 4.2],
        ].map(([label, left, w, delay]) => (
          <div key={label as string} className={s.ganttRow}>
            <span>{label}</span>
            <div className={s.ganttTrack}>
              <i className={cx(s.a, s.grow)} style={{ ...d(delay as number), left: left as string, width: w as string }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3. Diseño: de wireframe a alta fidelidad */
function Design({ t }: Props) {
  const [hi, setHi] = useState(false);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (touched) return;
    const id = window.setTimeout(() => setHi(true), 2200);
    return () => window.clearTimeout(id);
  }, [touched]);
  const pick = (v: boolean) => {
    setTouched(true);
    setHi(v);
  };

  return (
    <div className={cx(s.scene, s.design)}>
      <div className={s.canvasWrap}>
        <div className={s.toggle} role="group" aria-label={t.wire + " / " + t.hifi}>
          <button type="button" aria-pressed={!hi} onClick={() => pick(false)}>{t.wire}</button>
          <button type="button" aria-pressed={hi} onClick={() => pick(true)}>{t.hifi}</button>
        </div>
        <div className={cx(s.canvas, hi && s.hi)}>
          <div className={s.cNav}>
            <b />
            <span><i /><i /><i /></span>
          </div>
          <div className={s.cHero}>
            <div className={s.cCopy}>
              <i className={s.l1} />
              <i className={s.l2} />
              <i className={s.l3} />
              <em className={s.cBtn} />
            </div>
            <div className={s.cImg} />
          </div>
          <div className={s.cCards}>
            <div /><div /><div />
          </div>
          <span className={cx(s.cursor, s.a)} style={d(0.3)} aria-hidden>
            <svg viewBox="0 0 20 20" width="18" height="18"><path d="M3 2l13 7-5.5 1.6L8 16 3 2Z" fill="#fff" stroke="#111" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            <em>{t.cursor}</em>
          </span>
        </div>
      </div>
      <div className={s.designSide}>
        <div className={cx(s.card, s.palette)}>
          <h4>{t.palette}</h4>
          <div>
            {["#FA1F6F", "#FFADD3", "#1A1A1A", "#FBFBFB"].map((c, i) => (
              <span key={c} className={cx(s.swatch, s.a, s.pop)} style={{ ...d(1.2 + i * 0.2), background: c }} title={c} />
            ))}
          </div>
        </div>
        <div className={cx(s.card, s.type)}>
          <h4>{t.type}</h4>
          <p className={cx(s.aa, s.a, s.rise)} style={d(1.9)}>Aa</p>
          <p className={s.fontName}>Space Grotesk</p>
        </div>
      </div>
    </div>
  );
}

/* 4. Desarrollo: código, vista previa y build */
function Development({ t }: Props) {
  const lines: [string, ReactElement][] = [
    ["a", <><span className={s.k}>export default function</span> <span className={s.f}>Page</span>() {"{"}</>],
    ["b", <>  <span className={s.k}>return</span> (</>],
    ["c", <>    {"<"}<span className={s.f}>main</span>{">"}</>],
    ["d", <>      {"<"}<span className={s.f}>Hero</span> <span className={s.at}>cta</span>=<span className={s.str}>&quot;discovery&quot;</span> {"/>"}</>],
    ["e", <>      {"<"}<span className={s.f}>Services</span> <span className={s.at}>items</span>={"{services}"} {"/>"}</>],
    ["f", <>      {"<"}<span className={s.f}>Contact</span> {"/>"}</>],
    ["g", <>    {"</"}<span className={s.f}>main</span>{">"}</>],
    ["h", <>  );</>],
    ["i", <>{"}"}</>],
  ];
  return (
    <div className={cx(s.scene, s.dev)}>
      <div className={cx(s.card, s.editor)}>
        <div className={s.tabsRow}>
          <span>page.tsx</span>
          <em>dev</em>
        </div>
        <pre className={s.code} aria-hidden>
          {lines.map(([k, node], i) => (
            <div key={k} className={cx(s.line, s.a, s.type2)} style={d(0.3 + i * 0.32)}>
              <span className={s.ln}>{i + 1}</span>
              <span>{node}</span>
            </div>
          ))}
        </pre>
      </div>
      <div className={cx(s.card, s.preview)}>
        <div className={s.previewBar}>
          <span>{t.preview}</span>
        </div>
        <div className={s.pv}>
          <div className={cx(s.pvNav, s.a, s.rise)} style={d(1.2)}><b /><i /><i /><i /></div>
          <div className={cx(s.pvHero, s.a, s.rise)} style={d(2.2)}>
            <div><i /><i /><em /></div>
            <span />
          </div>
          <div className={cx(s.pvCards, s.a, s.rise)} style={d(3.1)}><i /><i /><i /></div>
        </div>
      </div>
      <div className={cx(s.card, s.term)}>
        <p className={cx(s.a, s.rise)} style={d(0.6)}><span>$</span> git switch -c dev</p>
        <p className={cx(s.a, s.rise)} style={d(3.4)}><span>$</span> npm run build</p>
        <p className={cx(s.ok, s.a, s.rise)} style={d(4.6)}>✓ Compiled successfully</p>
      </div>
    </div>
  );
}

/* 5. Revisión: QA, métricas y despliegue */
function Review({ t }: Props) {
  const C = 2 * Math.PI * 24;
  return (
    <div className={cx(s.scene, s.review)}>
      <div className={cx(s.card, s.qa)}>
        <h4>{t.qaTitle}</h4>
        <ul>
          {t.qa.map((label, i) => (
            <li key={label} className={cx(s.a, s.rise)} style={d(0.3 + i * 0.7)}>
              <span className={cx(s.tick, s.a, s.pop)} style={d(0.7 + i * 0.7)}>
                <Check className="h-3 w-3" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className={cx(s.card, s.gauges)}>
        {t.gauges.map((label, i) => (
          <div key={label} className={s.gauge}>
            <svg viewBox="0 0 60 60" aria-hidden>
              <circle cx="30" cy="30" r="24" className={s.gTrack} />
              <circle
                cx="30"
                cy="30"
                r="24"
                className={cx(s.gFill, s.a, s.ring)}
                style={{ ...d(0.8 + i * 0.35), ["--c" as string]: C, strokeDasharray: C }}
                transform="rotate(-90 30 30)"
              />
            </svg>
            <span className={cx(s.gCheck, s.a, s.pop)} style={d(1.9 + i * 0.35)}>
              <Check className="h-4 w-4" />
            </span>
            <em>{label}</em>
          </div>
        ))}
      </div>
      <div className={cx(s.card, s.pipe)}>
        <div className={s.pipeLine}>
          <i className={cx(s.a, s.grow)} style={{ ...d(3), animationDuration: "2.4s" }} />
        </div>
        {t.pipe.map((label, i) => (
          <div key={label} className={cx(s.pipeNode, i === 3 && s.live)}>
            <span className={cx(s.pipeDot, s.a, s.pop)} style={d(3 + i * 0.8)} />
            <em>{label}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 6. Soporte: monitoreo y mejoras continuas */
function Support({ t }: Props) {
  const bars = Array.from({ length: 36 }, (_, i) => i);
  const tickets = [t.t1, t.t2, t.t3];
  return (
    <div className={cx(s.scene, s.support)}>
      <div className={cx(s.card, s.status)}>
        <p className={s.statusRow}>
          <span className={s.live2} aria-hidden />
          {t.status}
        </p>
        <h4>{t.uptime}</h4>
        <div className={s.bars} aria-hidden>
          {bars.map((i) => (
            <i key={i} className={cx(s.a, s.rise)} style={{ ...d(0.2 + i * 0.04), height: `${86 + ((i * 7) % 14)}%` }} />
          ))}
        </div>
      </div>
      <div className={cx(s.card, s.board)}>
        <h4>{t.tickets}</h4>
        <div className={s.cols}>
          {[t.todo, t.doing, t.done].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className={s.lane}>
          {tickets.map((label, i) => (
            <div key={label} className={s.ticket} style={{ ["--row" as string]: i, ["--td" as string]: `${0.6 + i * 1.3}s` }}>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SCENES: Record<string, (p: Props) => ReactElement> = {
  discovering: Discover,
  scoping: Scoping,
  design: Design,
  development: Development,
  review: Review,
  support: Support,
};
