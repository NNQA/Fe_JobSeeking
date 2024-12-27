"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingDataFetch() {
  const a = Array.from({ length: 8 }, (_, index) => index);
  return (
    <div className="min-h-[200px]">
      <section className="mx-auto w-[70%] p-2">
        <div className="grid grid-cols-4 grid-flow-row gap-5">
          {a.map((iteam, index) => (
            <div
              key={index}
              className="w-[250px] h-[120px] rounded-md flex flex-col bg-white p-2 gap-3"
            >
              <div className="flex gap-4">
                <Skeleton className="w-[50px] aspect-square rounded-md" />
                <div className="space-y-3">
                  <Skeleton className="w-[150px] h-4 aspect-square rounded" />
                  <Skeleton className="w-[150px] h-4 aspect-square rounded" />
                </div>
              </div>
              <div className="space-x-2 flex">
                <Skeleton className="w-full h-4 aspect-square rounded" />
                <Skeleton className="w-full h-4 aspect-square rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LoadingDataFetch;
