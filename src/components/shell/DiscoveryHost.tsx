"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { Dict } from "@/locales/es";
import { trackLead } from "@/lib/track";
import type { Locale } from "@/lib/site";

const Dialog = dynamic(() => import("./DiscoveryDialog"), { ssr: false });
const preload = () => import("./DiscoveryDialog");

type Props = { d: Dict["form"]; locale: Locale; whatsappHref: string };

/**
 * Any element with [data-discovery] opens the dialog; [data-wa] links count as a lead.
 * Without JS, [data-discovery] anchors still jump to the contact section.
 */
export default function DiscoveryHost({ d, locale, whatsappHref }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<number | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const trigger = target?.closest<HTMLElement>("[data-discovery]");
      if (trigger) {
        e.preventDefault();
        const raw = trigger.dataset.service;
        setService(raw !== undefined && raw !== "" ? Number(raw) : null);
        setLoaded(true);
        setOpen(true);
        return;
      }
      if (target?.closest("[data-wa]")) trackLead("whatsapp");
    };
    const warm = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-discovery]")) preload();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", warm, { passive: true, once: false });
    document.addEventListener("focusin", warm);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  if (!loaded) return null;
  return <Dialog d={d} locale={locale} open={open} service={service} whatsappHref={whatsappHref} onClose={close} />;
}
