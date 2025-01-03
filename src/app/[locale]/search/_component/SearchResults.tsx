import React, { use } from "react";
import { fetchSearchResults } from "../action";
import CardWork from "./CardWork";
import Image from "next/image";
export function SearchResults({ searchStr }: { searchStr: string }) {
  if (searchStr === "" || !searchStr) {
    return (
      <div className="border w-full h-[190px] rounded-md shadow-md bg-card flex flex-col items-center justify-center">
        <Image
          src="/nonejob.webp"
          width={150}
          height={150}
          alt="No jobs found"
        />
        <p className="text-sm font-medium text-foreground/50">
          Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn
        </p>
      </div>
    );
  }
  const works = use(fetchSearchResults(searchStr));

  if (works.length === 0) {
    return (
      <div className="border w-full h-[190px] rounded-md shadow-md bg-card flex flex-col items-center justify-center">
        <Image
          src="/nonejob.webp"
          width={150}
          height={150}
          alt="No jobs found"
        />
        <p className="text-sm font-medium text-foreground/50">
          Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn
        </p>
      </div>
    );
  }

  return (
    <div className="flex basis-[75%] flex-col gap-3">
      {works.map((work) => (
        <div className="w-full flex flex-col gap-3" key={work.id}>
          <CardWork work={work} />
        </div>
      ))}
    </div>
  );
}
