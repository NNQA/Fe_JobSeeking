import { redirect } from "next/navigation";
import FormSignup from "./_component/FormSignUp";
import { ERole } from "@/lib/models/User";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const recordRole: Record<string, ERole> = {
    "CANDIDATE": ERole.ROLE_USER,
    "SUPPLIER": ERole.ROLE_SUPPLIER,
  };
  const role = searchParams.role;
  if (!role) {
    redirect("/newUser")
  }

  const validRole = recordRole[role];
  if (!validRole) {
    redirect("/newUser");
  }
  console.log(validRole)
  return (
    <FormSignup role={validRole} />
  );
}
