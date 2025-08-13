import FormSendMailAgain from './_component/FormSendMail';
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
  const t = await getTranslations({ locale, namespace: "send-mail-again" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  }
}
export default function Page() {
  return (
    <FormSendMailAgain />
  );
}

