import NavigationWithLogo from "@/components/NavigationWithLogo";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import { ActionProgressWrapper } from './_component/ActionProgressWrapper';
import { ScrollArea } from "@/components/ui/scroll-area";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await AuthActionFetching.verifyUserSession();
  return (
    <section className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <NavigationWithLogo key={"create-profile"} displayName={user?.name} email={user?.email} />
      <div className="w-screen flex-grow">
        {children}
      </div>
      <ActionProgressWrapper />
    </section>
  );;
}
