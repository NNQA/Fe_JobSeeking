import Logo from "@/components/svg/Logo";
import { Package2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <Logo />
      {children}
    </section>
  );
}
