import { ScrollArea } from "@/components/ui/scroll-area";
import Error from "./error";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full bg-foreground/5">
      <ScrollArea className="w-full h-screen">{children}</ScrollArea>
    </section>
  );
}
