import { Navbar } from "@/components/Navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full">
      <Navbar />
      <ScrollArea className="w-full h-screen">{children}</ScrollArea>
    </section>
  );
}
