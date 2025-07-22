export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="grid place-items-center">
            {children}
        </section>
    );
}