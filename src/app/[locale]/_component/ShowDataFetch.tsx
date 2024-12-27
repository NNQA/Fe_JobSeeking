"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Work } from "@/lib/models/Work";
import React from "react";

function ShowDataFetch({ jobList }: { jobList: Work[] }) {
  return (
    <div className="min-h-[200px]">
      <section className="mx-auto w-[70%] p-2">
        <div className="grid grid-cols-3 grid-flow-row gap-5">
          {jobList.map((item, index) => (
            <div
              key={index}
              className="w-[350px] h-[120px] rounded-md flex flex-col bg-white p-2 gap-3 shadow-md"
            >
              <div className="flex gap-4 pt-1">
                <div className="w-20 h-20 border rounded-2xl overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col mt-2 gap-2 flex-1 overflow-hidden">
                  <h3 className="font-semibold text-sm text-foreground/70 text-ellipsis overflow-hidden whitespace-nowrap leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-bold text-xs text-muted-foreground/75 text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.company?.nameCompany}
                  </p>
                  <div className="flex gap-3">
                    <Badge className="bg-foreground/5 text-foreground">
                      {item.address.provinceName}
                    </Badge>
                    <Badge className="bg-foreground/5 text-foreground">
                      {item.experience}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShowDataFetch;
