import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

type Lead = {
  locale: "es" | "en";
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
  website: string;
};

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const rows = (l: Lead) =>
  [
    ["Nombre", l.name],
    ["Correo", l.email],
    ["Empresa o proyecto", l.company || "-"],
    ["Servicio", l.service || "-"],
    ["Presupuesto", l.budget || "-"],
    ["Tiempo", l.timeline || "-"],
    ["Sitio actual", l.website || "-"],
    ["Idioma del sitio", l.locale === "en" ? "English" : "Español"],
  ] as const;

async function sendEmail(l: Lead) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error("SENDGRID_API_KEY missing");
  sgMail.setApiKey(apiKey);

  const table = rows(l)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #E7E3E1;color:#5D5D5D;width:38%">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E7E3E1"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("");

  const html = `
  <div style="background:#FBFBFB;padding:24px;font-family:'Space Grotesk',Arial,sans-serif;color:#1A1A1A">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E7E3E1;border-radius:20px;overflow:hidden">
      <div style="background:#FA1F6F;padding:20px 24px"><strong style="font-size:18px;color:#1A1A1A">Nueva solicitud de llamada de discovery</strong></div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">${table}</table>
        <p style="margin:24px 0 8px;font-size:13px;color:#5D5D5D">Resumen del proyecto</p>
        <div style="padding:14px;background:#FBFBFB;border:1px solid #E7E3E1;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6">${esc(l.message)}</div>
        <p style="margin:24px 0 0">
          <a href="mailto:${esc(l.email)}" style="display:inline-block;background:#1A1A1A;color:#FBFBFB;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;font-size:14px">Responder a ${esc(l.name)}</a>
        </p>
      </div>
    </div>
    <p style="text-align:center;font-size:12px;color:#5D5D5D;margin-top:16px">Enviado desde el formulario de amoxtli.tech</p>
  </div>`;

  const text = [
    "Nueva solicitud de llamada de discovery",
    "",
    ...rows(l).map(([k, v]) => `${k}: ${v}`),
    "",
    "Resumen del proyecto:",
    l.message,
  ].join("\n");

  await sgMail.send({
    to: "hello@amoxtli.tech",
    from: "amoxtliweb@amoxtli.tech",
    replyTo: l.email,
    subject: `Discovery: ${l.name}${l.company ? ` · ${l.company}` : ""} (${l.service || "proyecto"})`,
    html,
    text,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot: bots fill hidden fields. Answer as if it worked.
    if (clip(body.hp, 100)) return NextResponse.json({ ok: true });

    const lead: Lead = {
      locale: body.locale === "en" ? "en" : "es",
      name: clip(body.name, 120),
      email: clip(body.email, 160),
      company: clip(body.company, 160),
      service: clip(body.service, 80),
      message: clip(body.message, 4000),
      budget: clip(body.budget, 80),
      timeline: clip(body.timeline, 80),
      website: clip(body.website, 200),
    };

    if (!lead.name || !emailOk(lead.email) || !lead.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await sendEmail(lead);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead email error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
