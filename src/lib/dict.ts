import { es, type Dict } from "@/locales/es";
import { en } from "@/locales/en";
import type { Locale } from "./site";

export const getDict = (locale: Locale): Dict => (locale === "en" ? en : es);
export type { Dict };
