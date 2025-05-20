import Footer from "@/components/custom/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}
    <Footer />
  </section>;
}
