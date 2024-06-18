import { usePathname } from "next/navigation";
import React from "react";

function Step() {
  const pathName = usePathname();

  return <div>Step</div>;
}

export default Step;
