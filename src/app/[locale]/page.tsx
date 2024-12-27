import Navigation from "@/components/Navigation";
import SectionSearch from "./_component/SectionSearch";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingDataFetch from "./_component/LoadingDataFetch";
import { ModeToggle } from "@/components/ui/ModeToggle";
import ShowDataFetch from "./_component/ShowDataFetch";
import { ApiServicePromiseFetching } from "@/lib/service/api-allfetching-promise.service";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";

async function Home({ params: { locale } }: { params: { locale: string } }) {
  const [user, homePageData] = await Promise.all([
    AuthActionFetching.verifyUserSession(),
    ApiServicePromiseFetching.fetchingHomePageData(),
  ]);
  if (user && user.newUser) {
    redirect(`/${locale}/newUser`);
  }
  return (
    <div className="bg-secondary/60">
      <ModeToggle></ModeToggle>
      <Navigation user={user ?? undefined}></Navigation>
      <SectionSearch
        cate={homePageData.cate}
        provinceName={homePageData.provinceName!}
      />
      <div className="min-h-[30px] mt-1">
        <section className="mx-auto w-[70%] p-2">
          <h3 className="font-bold text-primary">Việc làm tốt nhất.</h3>
        </section>
      </div>
      <Suspense fallback={<LoadingDataFetch></LoadingDataFetch>}>
        <ShowDataFetch jobList={homePageData.jobList}></ShowDataFetch>
      </Suspense>
    </div>
  );
}

export default Home;
