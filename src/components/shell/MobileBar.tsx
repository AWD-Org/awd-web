"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Whatsapp } from "@/components/ui/Icons";

type Props = { label: string; whatsappLabel: string; whatsappHref: string };

export default function MobileBar({ label, whatsappLabel, whatsappHref }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-mobile-bar
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <a href="#contact" data-discovery className="btn btn-primary flex-1 !px-4">
          {label}
          <ArrowRight className="h-4 w-4" />
        </a>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-wa
            aria-label={whatsappLabel}
            className="btn btn-line !px-4"
          >
            <Whatsapp />
          </a>
        )}
      </div>
    </div>
  );
}
