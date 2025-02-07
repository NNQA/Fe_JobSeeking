import React, { Suspense } from "react";
import { Work } from "@/lib/models/Work";
import Promote from "./Promote";
import { SearchHeader } from "./SearchHeader";
import { SearchResults } from "./SearchResults";
interface PropsShowDataSearch {
  initialData: Work[];
  initialSearch: string;
  searchParams: { [key: string]: string };
}

function ShowDataSearch({
  initialData,
  initialSearch,
  searchParams,
}: PropsShowDataSearch) {
  return (
    <section className="bg-foreground/5 h-fit flex flex-col gap-3 flex-1">
      <Suspense
        fallback={
          <SearchHeader workCount={0} location={searchParams.provinceName} />
        }
      >
        <SearchHeader
          workCount={initialData?.length}
          location={searchParams.provinceName}
        />
      </Suspense>

      <div className="w-[75%] mx-auto px-4 py-4 flex gap-2 overflow-y-auto">
        <div className="w-full">
          <div className="w-full flex">
            <Suspense
              fallback={
                <div className="w-full h-40 animate-pulse bg-gray-200 rounded-md" />
              }
            >
              <SearchResults searchStr={initialSearch} />
            </Suspense>
            <div className="">
              <Promote />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ShowDataSearch);
