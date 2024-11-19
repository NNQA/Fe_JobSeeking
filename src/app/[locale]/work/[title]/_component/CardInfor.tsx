import { JobPostion, JobType } from "@/lib/models/Work";
import React from "react";
import Card from "./Card";
import {
  BriefcaseBusinessIcon,
  ComputerIcon,
  HourglassIcon,
  MapPinIcon,
} from "lucide-react";

interface Props {
  level: JobPostion;
  exp: string;
  type: JobType;
}
function CardInfor({ exp, level, type }: Props) {
  return (
    <Card>
      <div className="h-[290px] px-4 py-6 space-y-5">
        <h3 className="font-medium">Thông tin chung</h3>
        <div className="space-y-6">
          <div className="flex gap-5 items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
              <ComputerIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <p>Cấp bậc</p>
              <p className="font-bold">{level.jobPositionName}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
              <HourglassIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <p>Kinh nghiệm</p>
              <p className="font-bold">{exp}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
              <BriefcaseBusinessIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <p>Hình thức</p>
              <p className="font-bold">{type.jobTypeName}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CardInfor;
