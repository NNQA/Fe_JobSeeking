import React from "react";
import Card from "./Card";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

interface Props {
  des: string;
  expired: Date;
  className?: string;
}
function CardDescription({ des, expired, className }: Props) {
  return (
    <Card>
      <div className="w-full px-6 py-4">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <hr className="w-[0.4rem] h-7 bg-primary" />
              <h3 className="font-bold text-foreground/80">
                Chi tiết tuyển dụng
              </h3>
            </div>
            <Button
              className="basis-[30%] w-fit space-x-3 border-primary/70 text-primary hover:border-2 hover:text-primary hover:bg-none"
              variant={"outlineVariant"}
            >
              <BellIcon className="w-4 h-4"></BellIcon>
              <p className="font-medium">Gửi tôi việc làm tương tự</p>
            </Button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: des }} />
          <div className="flex gap-2 w-[30%]">
            <Button className="">
              <p>Ứng tuyển ngay</p>
            </Button>
            <Button
              className="w-full border-primary text-primary hover:border-2 hover:text-primary hover:bg-none"
              variant={"outlineVariant"}
            >
              <p>Lưu tin</p>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CardDescription;
