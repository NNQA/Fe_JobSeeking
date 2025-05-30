"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";
import AvatarProfile from "../../_component/AvatarProfile";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
function HeadComp() {
  const locale = useLocale();
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/${locale}/supplier/profile`);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AvatarProfile />
        <div className="justify-end flex flex-col pt-4">
          <p className="text-2xl font-medium text-foreground/60">
            Công ty phân phối thực phẩm
          </p>
          <p className="text-sm font-medium text-card-foreground/40">
            <Button asChild variant={"link"} className="p-0 m-0 h-fit pl-1">
              <Link href={"/asdasd"}>trachnhiemhuuhan.vn/sisplus</Link>
            </Button>
          </p>
        </div>
      </div>
      <div className=" flex pt-4 items-end text-end justify-end">
        <Button variant={"default"} onClick={() => handleViewProfile()}>
          View profile
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default HeadComp;
