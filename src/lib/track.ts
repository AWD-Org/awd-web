import { GA_CONVERSION } from "./site";

type Gtag = (...args: unknown[]) => void;
const gt = (): Gtag | undefined => (typeof window !== "undefined" ? (window as unknown as { gtag?: Gtag }).gtag : undefined);

export const track = (event: string, params?: Record<string, unknown>) => gt()?.("event", event, params);

/** The conversion that matters: someone asked for the discovery call. */
export const trackLead = (channel: "form" | "whatsapp") => {
  const g = gt();
  if (!g) return;
  g("event", "conversion", { send_to: GA_CONVERSION });
  g("event", "generate_lead", { method: channel });
};
