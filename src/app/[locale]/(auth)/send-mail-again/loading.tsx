import SourceLoading from "@/components/custom/SourceLoading";
import React from "react";

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-1/2">
            <SourceLoading></SourceLoading>
            <p>Please wait...</p>
        </div>
    );
}

export default Loading;
