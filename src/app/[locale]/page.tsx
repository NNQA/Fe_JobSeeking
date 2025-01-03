import Navigation from "@/components/Navigation";
import SectionSearch from "./_component/SectionSearch";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingDataFetch from "./_component/LoadingDataFetch";
import ShowDataFetch from "./_component/ShowDataFetch";
import { ApiServicePromiseFetching } from "@/lib/service/api-allfetching-promise.service";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import { Package2 } from "lucide-react";
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
      <Navigation user={user ?? undefined}></Navigation>
      <SectionSearch
        cate={homePageData.cate}
        provinceName={homePageData.provinceName!}
      />
      <div className="min-h-[30px] mt-1">
        <section className="mx-auto w-[78%] p-4 flex items-center">
          <div className="border-r-2 border-foreground/20 pr-4">
            <h3 className="font-bold text-primary">Việc làm tốt nhất.</h3>
          </div>
          <div className="flex gap-1 px-10 font-bold text-foreground/75">
            <Package2 className="h-6 w-6"></Package2>
            <span>Job Seeking</span>
          </div>
        </section>
      </div>
      <Suspense fallback={<LoadingDataFetch></LoadingDataFetch>}>
        <ShowDataFetch jobList={homePageData.jobList}></ShowDataFetch>
      </Suspense>
    </div>
  );
}

export default Home;
