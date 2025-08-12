import ChooseRoleUi from "./_components/ChooseRole-ui";


import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string, locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newUser" });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  }
}
export default async function Page() {
  return (
    <ChooseRoleUi />
  );
}
