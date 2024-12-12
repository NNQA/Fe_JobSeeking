import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AvataUser() {
  return (
    <Avatar className="h-[90px] w-[90px] rounded-md">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default AvataUser;
