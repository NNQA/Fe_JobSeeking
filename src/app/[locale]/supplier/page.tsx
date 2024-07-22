import { Suspense } from "react";
import { SkeletonCard } from "@/components/SeletonCard";

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<SkeletonCard />}></Suspense>
    </div>
  );
}
