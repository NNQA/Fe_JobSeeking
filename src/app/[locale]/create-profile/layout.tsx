import NavigationWithLogo from "@/components/NavigationWithLogo";
import Logo from "@/components/svg/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col w-screen">
      {children}
    </section>
  );;
}
