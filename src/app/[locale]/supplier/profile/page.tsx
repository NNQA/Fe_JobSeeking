import HeadProFileComp from "./_component/HeadProFileComp";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";
import { Company } from "@/lib/models/Company";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import ShowDetailsComp from "./_component/ShowDetailsComp";
import { Suspense } from "react";
export const getCurrentCompany = async () => {
  const locale = await getLocale();
  const api = SessionApi.from(cookies());

  try {
    const result = await api.get("api/supplier/getCurrentCompany", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.isOk()) {
      const user = (await result.value.json()) as Company;
      console.log(user);
      return user;
    }

    redirect(`/${locale}/auth/login`);
  } catch (error) {
    console.error("Error upgrading user:", error);
    redirect(`/${locale}/auth/login`);
  }
};
export default async function Page() {
  const company = await getCurrentCompany();
  return (
    <>
      <div className="px-6 py-4 space-y-12 mt-2">
        <h4>Profile</h4>
        <HeadProFileComp />
        <Suspense fallback={<>Loading company...</>}>
          <ShowDetailsComp company={company} />
        </Suspense>
      </div>
    </>
  );
}
