import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <ScrollArea className="w-full overflow-y-hidden">{children}</ScrollArea>
        </section>
    );
}