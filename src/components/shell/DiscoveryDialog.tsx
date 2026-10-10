"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/locales/es";
import { ArrowRight, Check, Close, Whatsapp } from "@/components/ui/Icons";
import { trackLead } from "@/lib/track";
import type { Locale } from "@/lib/site";

type Props = {
  d: Dict["form"];
  locale: Locale;
  open: boolean;
  service: number | null;
  whatsappHref: string;
  onClose: () => void;
};

type Values = {
  name: string;
  email: string;
  company: string;
  service: number;
  message: string;
  budget: number;
  timeline: number;
  website: string;
  hp: string;
};

const empty: Values = { name: "", email: "", company: "", service: 1, message: "", budget: 3, timeline: 2, website: "", hp: "" };
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function DiscoveryDialog({ d, locale, open, service, whatsappHref, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      if (status === "ok") {
        setV(empty);
        setStep(0);
        setStatus("idle");
      }
      if (service !== null) setV((prev) => ({ ...prev, service }));
      dlg.showModal();
    }
    if (!open && dlg.open) dlg.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, service]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof Values, string>> = {};
    if (s === 0) {
      if (!v.name.trim()) e.name = d.required;
      if (!v.email.trim()) e.email = d.required;
      else if (!emailOk(v.email.trim())) e.email = d.invalidEmail;
    }
    if (s === 1 && !v.message.trim()) e.message = d.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => s + 1);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2) return next();
    if (!validate(0)) return setStep(0);
    if (!validate(1)) return setStep(1);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          name: v.name.trim(),
          email: v.email.trim(),
          company: v.company.trim(),
          service: d.services[v.service],
          message: v.message.trim(),
          budget: d.budgetOptions[v.budget],
          timeline: d.timelineOptions[v.timeline],
          website: v.website.trim(),
          hp: v.hp,
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      trackLead("form");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "mt-2 w-full rounded-2xl border border-ink/20 bg-white px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";
  const label = "block text-sm font-semibold";
  const err = (k: keyof Values) =>
    errors[k] ? (
      <span role="alert" className="mt-1.5 block text-sm font-medium text-primary-deep">
        {errors[k]}
      </span>
    ) : null;

  const chip = (selected: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${
      selected ? "border-ink bg-ink text-paper" : "border-ink/20 bg-white hover:border-ink"
    }`;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="discovery-title"
      className="m-auto w-[min(920px,calc(100vw-20px))] max-h-[calc(100dvh-20px)] overflow-hidden rounded-panel bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/65 backdrop:backdrop-blur-sm"
    >
      <div className="grid max-h-[calc(100dvh-20px)] md:grid-cols-[320px_1fr]">
        <aside className="on-pink hidden flex-col justify-between bg-primary p-8 md:flex">
          <div>
            <h2 id="discovery-title" className="text-[2rem] font-semibold leading-[1.05] tracking-tight">
              {d.title}
            </h2>
            <p className="mt-4 leading-relaxed">{d.subtitle}</p>
          </div>
          {whatsappHref && (
            <div className="rounded-2xl bg-paper p-4">
              <p className="text-sm font-semibold">{d.qrTitle}</p>
              <p className="mt-1 text-sm text-muted">{d.qrText}</p>
              <div className="mt-3 flex justify-center rounded-xl bg-white p-3">
                <QRCodeSVG value={whatsappHref} size={132} level="M" marginSize={0} />
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-wa
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                <Whatsapp className="h-4 w-4" />
                {d.qrLink}
              </a>
            </div>
          )}
        </aside>

        <div className="relative flex min-h-0 flex-col overflow-y-auto p-6 sm:p-9">
          <button
            type="button"
            onClick={onClose}
            aria-label={d.close}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 hover:bg-ink hover:text-paper"
          >
            <Close className="h-4 w-4" />
          </button>

          <div className="md:hidden">
            <h2 className="pr-12 text-[1.6rem] font-semibold leading-tight tracking-tight">{d.title}</h2>
          </div>

          {status === "ok" ? (
            <div className="flex flex-1 flex-col items-start justify-center gap-5 py-10" role="status">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                <Check className="h-7 w-7" />
              </span>
              <h3 className="text-3xl font-semibold tracking-tight">{d.successTitle}</h3>
              <p className="max-w-[28rem] text-lg text-muted">{d.success}</p>
              <button type="button" onClick={onClose} className="btn btn-ink">
                {d.done}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 flex flex-1 flex-col md:mt-0 md:pt-6">
              <ol className="flex items-center gap-2 pr-14" aria-label={`${d.step} ${step + 1} ${d.of} 3`}>
                {d.steps.map((name, i) => (
                  <li key={name} className="flex items-center gap-2" aria-current={i === step ? "step" : undefined}>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        i <= step ? "bg-ink text-paper" : "bg-line text-muted"
                      }`}
                    >
                      {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className={`text-sm ${i === step ? "font-semibold" : "hidden text-muted sm:inline"}`}>{name}</span>
                    {i < 2 && <span aria-hidden className="mx-1 h-px w-5 bg-ink/20" />}
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex-1 space-y-5">
                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={v.hp}
                  onChange={(e) => set("hp", e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                {step === 0 && (
                  <>
                    <div>
                      <label htmlFor="f-name" className={label}>{d.name}</label>
                      <input id="f-name" autoComplete="name" className={field} value={v.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
                      {err("name")}
                    </div>
                    <div>
                      <label htmlFor="f-email" className={label}>{d.email}</label>
                      <input id="f-email" type="email" autoComplete="email" inputMode="email" className={field} value={v.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
                      {err("email")}
                    </div>
                    <div>
                      <label htmlFor="f-company" className={label}>
                        {d.company} <span className="font-normal text-muted">({d.optional})</span>
                      </label>
                      <input id="f-company" autoComplete="organization" className={field} value={v.company} onChange={(e) => set("company", e.target.value)} />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <fieldset>
                      <legend className={label}>{d.service}</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {d.services.map((name, i) => (
                          <label key={name} className={chip(v.service === i)}>
                            <input type="radio" name="service" className="sr-only" checked={v.service === i} onChange={() => set("service", i)} />
                            {name}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div>
                      <label htmlFor="f-msg" className={label}>{d.message}</label>
                      <textarea id="f-msg" rows={5} className={field} placeholder={d.messagePlaceholder} value={v.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} />
                      {err("message")}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <fieldset>
                      <legend className={label}>{d.budget}</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {d.budgetOptions.map((name, i) => (
                          <label key={name} className={chip(v.budget === i)}>
                            <input type="radio" name="budget" className="sr-only" checked={v.budget === i} onChange={() => set("budget", i)} />
                            {name}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className={label}>{d.timeline}</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {d.timelineOptions.map((name, i) => (
                          <label key={name} className={chip(v.timeline === i)}>
                            <input type="radio" name="timeline" className="sr-only" checked={v.timeline === i} onChange={() => set("timeline", i)} />
                            {name}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div>
                      <label htmlFor="f-web" className={label}>
                        {d.website} <span className="font-normal text-muted">({d.optional})</span>
                      </label>
                      <input id="f-web" type="url" inputMode="url" autoComplete="url" placeholder="https://" className={field} value={v.website} onChange={(e) => set("website", e.target.value)} />
                    </div>
                  </>
                )}

                {status === "error" && (
                  <p role="alert" className="rounded-2xl bg-primary/15 px-4 py-3 text-sm font-medium">
                    <strong>{d.errorTitle}.</strong> {d.error}
                  </p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-line">
                    {d.back}
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:opacity-60">
                  {step < 2 ? d.next : status === "sending" ? d.sending : d.submit}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
