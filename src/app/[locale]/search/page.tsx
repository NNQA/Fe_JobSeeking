import Navigation from "@/components/Navigation";
import SectionSearch from "./_component/SectionSearch";
import { AuthActionFetching } from "@/lib/action/auth/auth.action";
import { ApiServicePromiseFetching } from "@/lib/service/api-allfetching-promise.service";
import { Suspense } from "react";
import { fetchSearchResults } from "./action";
import ShowDataSearch from "./_component/ShowDataSearch";
import { formateParams } from "@/lib/utils/formatParams";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const [user, searchingData] = await Promise.all([
    AuthActionFetching.verifyUserSession(),
    ApiServicePromiseFetching.fetchingSearchingPage(),
  ]);

  if (
    !searchingData?.cate ||
    !searchingData?.provinceName ||
    !searchingData?.position
  ) {
    throw new Error("Failed to load required search data");
  }

  const searchStr = formateParams(searchParams);

  const initialData = searchStr ? await fetchSearchResults(searchStr) : [];
  return (
    <div>
      <Navigation user={user ?? undefined}></Navigation>
      <Suspense fallback={<div>Loading search section......</div>}>
        <SectionSearch
          cate={searchingData.cate}
          provinceName={searchingData.provinceName!}
          level={searchingData.position}
        />
      </Suspense>

      <Suspense fallback={<div>Loading search section......</div>}>
        <ShowDataSearch initialData={initialData} initialSearch={searchStr} />{" "}
      </Suspense>
    </div>
  );
}

export default Home;
