import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full">
      <ScrollArea className="w-full h-[600px]">{children}</ScrollArea>
    </section>
  );
}
