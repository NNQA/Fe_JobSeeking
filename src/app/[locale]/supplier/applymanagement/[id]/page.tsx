import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Header from "./_component/Header";
import FormEditJob from "./_component/FormEditJob";

import { Metadata } from "next";
import { getJobWithIdOrTitle } from "./action";
import ErrorData from "./_component/ErrorData";
interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params) {
  return {
    title: "Details job",
  };
}
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  //   if (id) {
  //     redirect("/not-found");
  //   }
  const jobData = await getJobWithIdOrTitle(id);

  if (jobData?.status === "failure") {
    return <ErrorData />;
  }
  return (
    <div className="px-6 py-4 space-y-12 mt-2">
      <Header></Header>
      <FormEditJob job={jobData?.data!} />
    </div>
  );
}
