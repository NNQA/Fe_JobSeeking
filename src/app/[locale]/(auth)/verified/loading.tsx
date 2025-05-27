import SourceLoading from "@/components/custom/SourceLoading";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <SourceLoading></SourceLoading>
      <p>Please wait...</p>
    </div>
  );
}

export default Loading;
