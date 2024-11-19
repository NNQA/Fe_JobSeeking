"use client";
import React, { useEffect, useState } from "react";
import { Work } from "@/lib/models/Work";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getJobDetailsWithTitle, IsCheckApplied } from "../actions";
import CardItemTitle from "./CardItemTitle";
import CardComp from "./CardComp";
import CardDescription from "./CardDescription";
import CardInfor from "./CardInfor";
import { User } from "@/lib/models/User";

interface Props {
  user: User | null;
}
function getTitleFromPathname(input: String) {
  return input.replace("/vi/work", "").split("/")[1];
}
function ShowDetailsData({ user }: Props) {
  const [work, setWork] = useState<Work | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const path = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const title = getTitleFromPathname(path);
        if (!title) return;

        const jobResult = await getJobDetailsWithTitle(title);
        if (jobResult.status === "ok" && jobResult.data) {
          setWork(jobResult.data);

          const checkApplied = await IsCheckApplied(jobResult.data.id);
          if (checkApplied.status === "ok") {
            setIsApplied(checkApplied.data!);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path]);

  console.log(isApplied);

  console.log(work?.expiredDate);
  return (
    <div className="w-[75%] mx-auto px-4 py-4 flex gap-2 overflow-y-auto">
      {work ? (
        <div className="w-full flex gap-3">
          <div className="basis-[70%] w-full space-y-4">
            <CardItemTitle
              title={work.title || "Không có tiêu đề"}
              address={work.address || "Không có địa chỉ"}
              ex={work.experience || "Không yêu cầu kinh nghiệm"}
              expired={work.expiredDate || "Không có ngày hết hạn"}
              sal={work.salary?.value || "Không có thông tin lương"}
              key={work.id}
              className="w-full"
              user={user}
              idJob={work.id}
              isApplied={isApplied}
            />
            <CardDescription
              des={work.description || "Không có mô tả"}
              expired={work.expiredDate || "Không có ngày hết hạn"}
              className=""
              key="w.desc"
            />
          </div>

          <div className="basis-[30%] w-full flex flex-col gap-5">
            {work.company && <CardComp comp={work.company} />}
            <CardInfor
              level={work.position || "Không có thông tin"}
              exp={work.experience || "Không yêu cầu kinh nghiệm"}
              type={work.type || "Không có thông tin"}
            />
          </div>
        </div>
      ) : (
        <div>Loading dữ liệu công việc...</div>
      )}
    </div>
  );
}

export default ShowDetailsData;
