import Navigation from "@/components/Navigation";
import ShowDetailsData from "./_component/ShowDetailsData";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/SeletonCard";
import { getJobDetailsWithTitle } from "./actions";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string };
}) {
  const slug = decodeURIComponent((await params).slug);
  const id = searchParams.id;
  if (!slug || !id) {
    throw new Error("Fail to fetch data");
  }
  const [user, job] = await Promise.all([
    AuthActionFetching.verifyUserSession(),
    getJobDetailsWithTitle(slug, id),
  ]);

  if (job.status === "failure") {
    throw new Error("Fail to fetch data");
  }

  return (
    <div>
      <Navigation user={undefined} className="static"></Navigation>
      <div className="w-full h-[50px] bg-green-800"></div>
      <Suspense fallback={<SkeletonCard />}>
        <ShowDetailsData user={user} job={job.data} />
      </Suspense>
    </div>
  );
}
