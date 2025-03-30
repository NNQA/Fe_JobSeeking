import NavigationWithLogo from "@/components/NavigationWithLogo";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await AuthActionFetching.verifyUserSession();
    return (
        <section className="w-full h-screen">
            <NavigationWithLogo key={"welcomeuser"} displayName={user?.name} email={user?.email} />
            {children}
        </section>
    );
}