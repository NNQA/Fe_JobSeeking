import React from "react";
import Card from "./Card";
import { Company } from "@/lib/models/Company";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPinIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  comp: Company;
}
function CardComp({ comp }: Props) {
  return (
    <Card>
      <div className="h-[230px] px-4 py-6">
        <div className="flex gap-4">
          <div className="w-28 h-28 border rounded-2xl aspect-auto p-2">
            <Avatar className="w-full h-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-md"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-2 basis-[60%] h-full pl-3">
            <h3 className="font-semibold text-lg text-foreground/70 leading-tight">
              {comp.nameCompany}
            </h3>
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="flex items-start gap-2">
            <div className="flex basis-[50%] items-center gap-1 text-foreground/60">
              <MapPinIcon className="w-4 h-4" />
              <p className="font-medium">Địa điểm:</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="basis-[90%]">
                  <p className="text-sm text-ellipsis font-medium overflow-hidden whitespace-nowrap w-full">
                    {comp.address?.formattedAddressName}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                    {comp.address?.formattedAddressName}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="text-center">
          <Button asChild variant={"link"}>
            <Link href={"*"}>Xem trang công ty</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CardComp;
