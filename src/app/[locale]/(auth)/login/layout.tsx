import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login',
    description: 'This is the login page',
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}