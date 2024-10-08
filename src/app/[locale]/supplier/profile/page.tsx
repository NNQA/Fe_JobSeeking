import Link from "next/link";
import AvatarProfile from "./_component/AvatarProfile";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div className="px-6 py-4 space-y-12 mt-2">
        <h5 className="font-bold text-card-foreground/70">My Profile</h5>
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
            <Button variant={"default"} className="">
              Edit profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
