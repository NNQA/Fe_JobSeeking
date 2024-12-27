import { Package2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col">
      <div className="flex gap-1 px-10 font-bold text-foreground/75 pt-4">
        <Package2 className="h-6 w-6"></Package2>
        <span>Job Seeking</span>
      </div>
      {children}
    </section>
  );
}
