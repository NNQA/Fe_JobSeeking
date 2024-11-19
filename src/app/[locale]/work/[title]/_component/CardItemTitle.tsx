import { Address } from "@/lib/models/Address";
import React from "react";
import Card from "./Card";
import { formatDate } from "@/lib/utils/dates";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  CoinsIcon,
  HeartIcon,
  HourglassIcon,
  MapPinIcon,
} from "lucide-react";
import ModalApply from "./ModalApply";
import { User } from "@/lib/models/User";
interface Props {
  sal: string;
  address: Address;
  ex: string;
  expired: Date;
  title: string;
  className?: string;
  user: User | null;
  idJob?: string;
  isApplied: boolean;
}
function CardItemTitle({
  sal,
  address,
  ex,
  expired,
  title,
  className,
  user,
  idJob,
  isApplied,
}: Props) {
  return (
    <Card className={className}>
      <div className="w-full flex flex-col px-6 py-6 gap-6">
        <div className="">
          <h2 className="w-full whitespace-nowrap font-medium text-foreground/80">
            {title}
          </h2>
        </div>
        <div className="w-[86%] flex justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-600">
              <CoinsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p>Mức lương</p>
              <p className="font-bold">{sal}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-600">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p>Địa điểm</p>
              <p className="font-bold">{address.provinceName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-600">
              <HourglassIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p>Kinh Nghiệm</p>
              <p className="font-bold">{ex}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center bg-foreground/10 w-fit px-3 rounded-md py-1">
          <div className="w-6 h-6 flex items-center justify-center bg-slate-500 rounded-full">
            <ClockIcon className="w-4 h-4 text-white" />
          </div>
          <p>Hạn nộp hồ sơ: {formatDate(expired)}</p>
        </div>
        <div className="flex justify-between gap-6">
          <ModalApply
            title={title}
            user={user}
            idJob={idJob!}
            isApplied={isApplied}
          ></ModalApply>
          <Button
            className="basis-[18%] space-x-3 w-full border-primary text-primary hover:border-2 hover:text-primary hover:bg-none"
            variant={"outlineVariant"}
          >
            <HeartIcon className="w-4 h-4" />
            <p>Lưu tin</p>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CardItemTitle;
