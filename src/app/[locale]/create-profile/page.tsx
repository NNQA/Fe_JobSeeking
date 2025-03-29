import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import FormUpdate from "./_component/FormUpdate";
import NavigationWithLogo from "@/components/NavigationWithLogo";
import CarousellData from "./_component/CarousellData";
import WelcomeCard from "./_component/WelcomeCard";

export default async function Page() {
  const user = await AuthActionFetching.verifyUserSession();
  return (
    <div className="w-full h-screen">
      <NavigationWithLogo key={"updateUser"} displayName={user?.name} email={user?.email} />
      <div className="h-full flex px-20 justify-between py-20">
        <WelcomeCard name={user?.email} />
        <div className="w-[40%]">
          <CarousellData />
        </div>
      </div>
    </div>
  );
}
