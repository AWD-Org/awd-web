import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en");

export default function Page() {
  return <Home locale="en" />;
}
