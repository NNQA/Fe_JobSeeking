import { toActionErrorsAsync } from "@/lib/error.server";
import { Applicant } from "@/lib/models/Applicant";
import { SessionApi } from "@/lib/service/session-api.server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Information from "./_component/Information";
import { Suspense } from "react";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

interface ResponseAction {
  status: string;
  message: string;
  data: Applicant | null;
}
// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     id: string;
//     user: string;
//   };
// }): Promise<Metadata> {
//   return {
//     title: `User ${params.user} - ID ${params.id}`,
//     description: `Details for user ${params.user}`,
//   };
// }

// export async function fetchingApplicantData(id: string, user: string) {
//   const api = SessionApi.from(cookies());
//   let response: ResponseAction;
//   try {
//     const result = await api.get(
//       `api/applicant/getDetailsApplicantUser/${id}/${user}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (result.isOk()) {
//       const data = (await result.value.json()) as Applicant;
//       response = {
//         status: "ok",
//         message: "",
//         data: data,
//       };
//       return response;
//     } else {
//       const errPro = await toActionErrorsAsync(result.error);
//       response = {
//         status: "failure",
//         message: errPro.form[0] ? errPro.form[0].split("+")[0] : errPro.from[1],
//         data: null,
//       };
//     }
//     return response;
//   } catch (error) {
//     console.error("Error upgrading user:", error);
//   }
// }
export default async function Page({
  params,
}: {
  params: {
    id: string;
    user: string;
  };
}) {
  console.log("params", params);
  const { id, user } = params;
  // console.log(user);
  // const data = await fetchingApplicantData(id, user);
  const locale = await getLocale();
  // if (!data || !data.data) {
  //   redirect(`${locale}/not-found`);
  // }
  return (
    <div className="px-6 py-4 space-y-12 mt-2">
      <h4>
        Information applicant for{" "}
        {/* <span className="text-sm font-bold ml-2">{data.data.job.title}</span> */}
      </h4>
      <Suspense fallback={<>Loading data applicant....</>}>
        {/* <Information applicant={data.data} key={"applicant"} /> */}
      </Suspense>
    </div>
  );
}
