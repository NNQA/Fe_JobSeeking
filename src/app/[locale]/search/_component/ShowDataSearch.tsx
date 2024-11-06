"use client";
import React, { useEffect, useState } from "react";
import { searchResult } from "../action";
import { Work } from "@/lib/models/Work";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CardWork from "./CardWork";
import Promote from "./Promote";
import { formatDate } from "@/lib/utils/dates";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

function ShowDataSearch() {
  const [listWork, setListWork] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchStr = Object.keys(Object.fromEntries(searchParams.entries()))
    .length
    ? Array.from(searchParams.entries())
        .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
        .join("&")
    : "";

  useEffect(() => {
    if (searchStr === "") return;
    const fethData = async () => {
      setIsLoading(true);
      try {
        const result = await searchResult(searchStr);
        if (result.status === "ok") {
          setListWork(result.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fethData();
  }, [searchParams.toString()]);
  return (
    <div>
      <div className="w-[75%] gap-3 mx-auto px-4 py-1">
        <div className="flex justify-between">
          <div className="space-y-3">
            {searchParams.get("provinceName") ? (
              <div className="text-sm">
                Địa điểm tìm kiếm:{" "}
                <Badge className="bg-primary">
                  {searchParams.get("provinceName")}
                </Badge>{" "}
              </div>
            ) : null}
            <p className="text-sm font-bold">
              Tuyển dụng {listWork.length > 0 ? listWork.length : null} việc làm{" "}
              {searchParams.get("title")} [Update {formatDate(new Date())}]
            </p>
          </div>
          <div className="flex items-end">
            <Button className="flex items-center" variant={"outlineVariant"}>
              <BellIcon className="w-5 h-5"></BellIcon>
              <p>Tạo thông báo việc làm</p>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[75%] mx-auto px-4 py-4 flex gap-2 overflow-y-auto">
        <div className="w-full">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="w-full flex">
              {listWork.length > 0 ? (
                <div className="flex basis-[75%] flex-col gap-3">
                  {listWork.map((a) => (
                    <div className="w-full flex flex-col gap-3" key={a.id}>
                      <CardWork work={a} key={a.id} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border w-full h-[190px] rounded-md shadow-md bg-card flex flex-col items-center justify-center">
                  <Image
                    src="/nonejob.webp"
                    width={150}
                    height={150}
                    alt="Picture of the author"
                  />
                  <p className="text-sm font-medium text-foreground/50">
                    Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn
                  </p>
                </div>
              )}
              <div className="">
                <Promote />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ShowDataSearch);
