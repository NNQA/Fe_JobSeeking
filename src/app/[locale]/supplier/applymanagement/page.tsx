import SkeletonTable from "@/components/SkeletonCustom/SkeletonTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  const a = [];

  return (
    <>
      {a.length === 0 ? (
        <div className="flex flex-1 items-center justify-center w-full h-[24rem] rounded-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no job
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You can start create job as soon as you add a job.
            </p>
            <Button className="mt-4 text-background" asChild>
              <Link href={"applymanagement/createapply"}>Create Job</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
