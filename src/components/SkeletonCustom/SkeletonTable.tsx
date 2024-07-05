import React from "react";
import { Skeleton } from "../ui/skeleton";

function SkeletonTable() {
  return (
    <div className="w-2/3 h-2/3 shadow-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export default SkeletonTable;
