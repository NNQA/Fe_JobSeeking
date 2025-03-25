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
  console.log(searchParams.token);
  const checkToken = await AuthActionFetching.VerifiedToken(searchParams.token);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (checkToken) {
    redirect("/auth/login");
  }
  return <AlertCheckedTokenResult isOpen={checkToken} />;
}
