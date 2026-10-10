import type { Dict } from "@/locales/es";
import { ArrowRight, Whatsapp } from "@/components/ui/Icons";

export default function Contact({ d, whatsappHref }: { d: Dict; whatsappHref: string }) {
  return (
    <section id="contact" className="on-pink section-y bg-primary text-ink">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7" data-reveal>
          <h2 className="h1 !text-[clamp(2.75rem,7vw,6rem)]">{d.contact.title}</h2>
          <p className="mt-8 max-w-[32rem] text-xl font-medium leading-snug">{d.contact.subtitle}</p>
          <p className="mt-4 max-w-[32rem] text-base leading-relaxed">{d.contact.note}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" data-discovery className="btn btn-ink">
              {d.contact.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-wa
                className="btn border border-ink text-ink hover:bg-ink hover:text-paper"
              >
                <Whatsapp />
                {d.contact.whatsapp}
              </a>
            )}
          </div>
          <p className="mt-8 text-base">
            {d.contact.emailLabel}{" "}
            <a href={`mailto:${d.footer.email}`} className="link-line font-semibold">
              {d.footer.email}
            </a>
          </p>
        </div>

        <div className="lg:col-span-5" data-reveal style={{ ["--rd" as string]: "0.1s" }}>
          <h3 className="text-2xl font-semibold tracking-tight">{d.contact.faqTitle}</h3>
          <div className="mt-5 border-b border-ink">
            {d.contact.faq.map((f) => (
              <details key={f.q} name="faq" className="group border-t border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.02rem] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-xl transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 pr-8 text-[0.98rem] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
