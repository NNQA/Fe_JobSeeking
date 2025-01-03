"use client";
import React, { Suspense } from "react";
import { Work } from "@/lib/models/Work";
import { useSearchParams } from "next/navigation";
import Promote from "./Promote";
import { SearchHeader } from "./SearchHeader";
import { SearchResults } from "./SearchResults";
interface PropsShowDataSearch {
  initialData: Work[];
  initialSearch: string;
}

function ShowDataSearch({ initialData, initialSearch }: PropsShowDataSearch) {
  const searchParams = useSearchParams();
  return (
    <section className="bg-foreground/5 h-fit flex flex-col gap-3 flex-1">
      <Suspense
        fallback={
          <SearchHeader
            workCount={0}
            location={searchParams.get("provinceName")}
          />
        }
      >
        <SearchHeader
          workCount={initialData?.length}
          location={searchParams.get("provinceName")}
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
