import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'This is the sign up page',
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section >
      {children}
    </section>
  );
}
