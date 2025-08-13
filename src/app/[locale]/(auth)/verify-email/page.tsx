import { getTranslations } from "next-intl/server";
import FormVerifiCation from "./_component/FormVerifiCation";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string, locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "verify-email" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  }
}
export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }

}) {
  const { email } = searchParams;
  console.log(email)
  if (!email) {
    throw Error("Somethings went wrong");
  }
  return (
    <FormVerifiCation
      email={
        decodeURIComponent(email ?? "")
      }
    />
  );
} 
