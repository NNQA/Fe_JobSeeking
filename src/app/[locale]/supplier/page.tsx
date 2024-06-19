import { ERole, User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { useLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";
import Home from "./Dashboard";
import { SkeletonCard } from "@/components/SeletonCard";

const getData = async () => {
  if (cookies().get("accessToken")) {
    const api = SessionApi.from(cookies());

    const response = await api.get("/api/user/getCurrentUser");

    if (response.isOk()) {
      const user = (await response.value.json()) as User;
      console.log(user);
      return user;
    }
  }
  return null;
};

export default async function Page() {
  const user = getData();
  const locale = useLocale();
  return (
    <div>
      <Suspense fallback={<SkeletonCard />}>
        <Home userPromise={user}></Home>
      </Suspense>
    </div>
  );
}
