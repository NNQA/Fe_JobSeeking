import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import ChooseRoleUi from "./_components/ChooseRole-ui";

export default async function Page() {
  return (
    <ChooseRoleUi />
  );
}
