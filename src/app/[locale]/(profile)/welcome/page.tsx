import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import WelcomeCard from "./_component/WelcomeCard";
import CarousellData from "./_component/CarousellData";

export default async function Page() {
    const user = await AuthActionFetching.verifyUserSession();
    return (
        <div className="h-full flex px-20 justify-between py-20">
            <WelcomeCard name={user?.email} />
            <div className="w-[40%]">
                <CarousellData />
            </div>
        </div>
    );
}