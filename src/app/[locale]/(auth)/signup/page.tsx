import { redirect } from "next/navigation";
import FormSignup from "./_component/FormSignUp";
import { ERole } from "@/lib/models/User";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string, locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "signup" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  }
}
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
  return (
    <FormSignup role={validRole} />
  );
}
