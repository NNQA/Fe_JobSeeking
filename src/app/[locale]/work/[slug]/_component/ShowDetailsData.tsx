"use client";
import React, { useEffect, useState } from "react";
import { Work } from "@/lib/models/Work";

import { getJobDetailsWithTitle, IsCheckApplied } from "../actions";
import CardItemTitle from "./CardItemTitle";
import CardComp from "./CardComp";
import CardDescription from "./CardDescription";
import CardInfor from "./CardInfor";
import { User } from "@/lib/models/User";

interface Props {
  user: User | null;
  job: Work;
}
function ShowDetailsData({ user, job }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (!user) return;
        if (!job) return;
        const result = await IsCheckApplied(job.id);
        if (result.status === "ok" && result.data) {
          setIsApplied(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [job]);

  return (
    <div className="w-[80%] mx-auto px-4 py-4 flex gap-2 overflow-y-auto">
      {job ? (
        <div className="w-full flex gap-3">
          <div className="basis-[70%] w-full space-y-4">
            <CardItemTitle
              title={job.title || "Không có tiêu đề"}
              address={job.address || "Không có địa chỉ"}
              ex={job.experience || "Không yêu cầu kinh nghiệm"}
              expired={job.expiredDate || "Không có ngày hết hạn"}
              sal={job.salary?.value || "Không có thông tin lương"}
              key={job.id}
              className="w-full"
              user={user}
              idJob={job.id}
              isApplied={isApplied}
            />
            <CardDescription
              des={job.description || "Không có mô tả"}
              expired={job.expiredDate || "Không có ngày hết hạn"}
              className=""
              key="w.desc"
            />
          </div>

          <div className="basis-[30%] w-full flex flex-col gap-5">
            {job.company && <CardComp comp={job.company} />}
            <CardInfor
              level={job.position || "Không có thông tin"}
              exp={job.experience || "Không yêu cầu kinh nghiệm"}
              type={job.type || "Không có thông tin"}
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
