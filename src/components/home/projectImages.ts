import xianna from "@/assets/opt/phone-xianna.webp";
import psique from "@/assets/opt/phone-psique.webp";
import fratellis from "@/assets/opt/phone-fratellis.webp";
import sucre from "@/assets/opt/phone-sucre.webp";
import mgsi from "@/assets/opt/phone-mgsi.webp";
import cmc from "@/assets/opt/phone-cmc.webp";

export const projectImages = { xianna, psique, fratellis, sucre, mgsi, cmc } as const;
export type ProjectKey = keyof typeof projectImages;
