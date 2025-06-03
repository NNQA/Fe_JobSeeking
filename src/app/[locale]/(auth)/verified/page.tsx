import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import AlertCheckedTokenResult from "./_components/AlertCheckedTokenResult";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Retrieve password',
}
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) {
  if (!searchParams.token) {
    throw new Error("Cannot find token in url");
  }
  const checkToken = await AuthActionFetching.VerifiedToken(searchParams.token);

  if (checkToken) {
    redirect("/login");
  }
  return <AlertCheckedTokenResult isOpen={checkToken} />;
}
