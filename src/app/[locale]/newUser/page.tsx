import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import ChooseRoleUi from "./ChooseRole-ui";

export default async function Page() {
  const user = await AuthActionFetching.verifyUserSession();

  if (!user?.newUser) {
    redirect("/");
  }
  return (
    <div className="w-fit mx-auto">
      <ChooseRoleUi />
    </div>
  );
}
