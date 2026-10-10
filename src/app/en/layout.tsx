import RootShell from "@/components/shell/RootShell";
import { viewport as sharedViewport } from "@/lib/seo";

export const viewport = sharedViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
