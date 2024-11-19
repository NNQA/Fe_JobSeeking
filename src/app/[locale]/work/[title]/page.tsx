import Navigation from "@/components/Navigation";
import { User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";
import ShowDetailsData from "./_component/ShowDetailsData";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/SeletonCard";
const getData = async () => {
  if (cookies().get("accessToken")) {
    console.log(cookies().get("accessToken"));
    const api = SessionApi.from(cookies());

    const response = await api.get("/api/user/getCurrentUser");

    if (response.isOk()) {
      const user = (await response.value.json()) as User;

      return user;
    }
  }
  return null;
};

export default async function Page() {
  const user = await getData();

  return (
    <div>
      <Navigation user={user ?? undefined} className="static"></Navigation>
      <div className="w-full h-[50px] bg-green-800"></div>
      <Suspense fallback={<SkeletonCard />}>
        <ShowDetailsData user={user} />
      </Suspense>
    </div>
  );
}
