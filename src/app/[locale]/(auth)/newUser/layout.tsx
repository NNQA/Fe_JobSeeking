import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Are you a new user?',
  description: 'This is the sign up page',
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
