import Footer from "@/components/custom/footer";
import NavigationWithLogo from "@/components/NavigationWithLogo";
import { ScrollArea } from "@/components/ui/scroll-area";



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ScrollArea>
            <div className="px-8">
                <section>
                    {children}
                </section>
            </div>
            <Footer />
        </ScrollArea>
    );
}