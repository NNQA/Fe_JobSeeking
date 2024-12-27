import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import FormUpgradeAccount from "./FormUpgradeAccount";
import { Authorities, ERole } from "@/lib/models/User";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function Page() {
  const user = await AuthActionFetching.verifyUserSession();
  const locale = await getLocale();
  if (
    user &&
    user.authorities.some(
      (e: Authorities) => e.authority === ERole.ROLE_SUPPLIER
    )
  ) {
    redirect(`/${locale}/supplier`);
  }
  if (!user) {
    redirect(`/${locale}/auth/login`);
  }
  return <FormUpgradeAccount name={user?.name!} email={user?.email} />;
}
