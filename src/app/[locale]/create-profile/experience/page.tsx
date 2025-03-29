import NavigationWithLogo from "@/components/NavigationWithLogo";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";

export default async function Page() {
    const user = await AuthActionFetching.verifyUserSession();
    return (
        <div>
            <NavigationWithLogo key={"updateUser"} displayName={user?.name} email={user?.email} />

        </div>
    );
}