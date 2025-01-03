import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Page",
  description: "Search for jobs and opportunities",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full">
      <ScrollArea className="w-full h-screen">{children}</ScrollArea>
    </section>
  );
}
