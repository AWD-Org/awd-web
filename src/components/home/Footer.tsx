import type { Dict } from "@/locales/es";
import { Wordmark } from "@/components/ui/Wordmark";
import { AXOLOTLS, INSTAGRAM, LINKEDIN, PARTNERS } from "@/lib/site";

export default function Footer({ d }: { d: Dict }) {
  return (
    <footer className="on-dark bg-night text-paper">
      <div className="shell pt-16 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold text-paper/70">{d.footer.links}</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={AXOLOTLS} target="_blank" rel="noopener noreferrer" className="link-line">
                  {d.footer.helpAxolotls}
                </a>
              </li>
              <li>
                <a href={PARTNERS} target="_blank" rel="noopener noreferrer" className="link-line">
                  {d.footer.partner}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-paper/70">{d.footer.social}</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="link-line">
                  Instagram
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link-line">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-paper/70">{d.form.email}</h2>
            <p className="mt-5">
              <a href={`mailto:${d.footer.email}`} className="link-line">
                {d.footer.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-20 text-primary sm:mt-28">
          <Wordmark className="h-auto w-full" />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-8 text-sm text-paper/70 sm:flex-row sm:items-center">
          <p>
            {d.footer.copyright} · {d.footer.rights}
          </p>
          <a href="#top" className="link-line">
            {d.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
