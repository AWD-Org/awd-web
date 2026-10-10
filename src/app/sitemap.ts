import type { MetadataRoute } from "next";
import { urlFor } from "@/lib/site";

const lastModified = new Date("2026-10-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { "es-MX": urlFor("es"), "en-US": urlFor("en") };
  return [
    { url: urlFor("es"), lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: urlFor("en"), lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
