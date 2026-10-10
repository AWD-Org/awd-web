"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/locales/es";

const KEY = "amoxtli-cookies";
type Prefs = { analytics: boolean; marketing: boolean };

export default function CookieBanner({ d }: { d: Dict["cookies"] }) {
  const [visible, setVisible] = useState(false);
  const [panel, setPanel] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ analytics: true, marketing: true });

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    if (stored) return;
    const id = window.setTimeout(() => setVisible(true), 1800);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.cookieOpen = String(visible);
    return () => {
      delete document.documentElement.dataset.cookieOpen;
    };
  }, [visible]);

  const save = (p: Prefs) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...p, ts: Date.now() }));
    } catch {}
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    const v = (b: boolean) => (b ? "granted" : "denied");
    g?.("consent", "update", {
      analytics_storage: v(p.analytics),
      ad_storage: v(p.marketing),
      ad_user_data: v(p.marketing),
      ad_personalization: v(p.marketing),
    });
    setVisible(false);
  };

  if (!visible) return null;

  const toggle = (k: keyof Prefs) => (
    <button
      type="button"
      role="switch"
      aria-checked={prefs[k]}
      aria-label={d[k].title}
      onClick={() => setPrefs((p) => ({ ...p, [k]: !p[k] }))}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${prefs[k] ? "bg-primary" : "bg-ink/25"}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${prefs[k] ? "left-6" : "left-1"}`} />
    </button>
  );

  return (
    <div
      role="dialog"
      aria-label={d.title}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[520px] rounded-[24px] border border-line bg-paper p-5 shadow-2xl sm:left-6 sm:right-auto sm:mx-0"
    >
      {!panel ? (
        <>
          <p className="text-sm leading-relaxed">{d.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="btn btn-ink !min-h-[44px] !px-5 !text-sm">
              {d.accept}
            </button>
            <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="btn btn-line !min-h-[44px] !px-5 !text-sm">
              {d.reject}
            </button>
            <button type="button" onClick={() => setPanel(true)} className="btn !min-h-[44px] !px-4 !text-sm underline underline-offset-4">
              {d.customize}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">{d.title}</h2>
          <p className="mt-1 text-sm text-muted">{d.subtitle}</p>
          <ul className="mt-4 divide-y divide-line">
            <li className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-semibold">{d.necessary.title}</p>
                <p className="text-sm text-muted">{d.necessary.text}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-muted">{d.alwaysOn}</span>
            </li>
            {(["analytics", "marketing"] as const).map((k) => (
              <li key={k} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{d[k].title}</p>
                  <p className="text-sm text-muted">{d[k].text}</p>
                </div>
                {toggle(k)}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => save(prefs)} className="btn btn-ink !min-h-[44px] !px-5 !text-sm">
              {d.save}
            </button>
            <button type="button" onClick={() => setPanel(false)} className="btn btn-line !min-h-[44px] !px-5 !text-sm">
              {d.close}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
