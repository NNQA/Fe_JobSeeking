import React from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

export interface InputCustomProps extends InputProps {
  icon: React.ReactNode;
}
const InputCustomIcon = React.forwardRef<HTMLInputElement, InputCustomProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <Input className={cn("pr-10", className)} ref={ref} {...props} />
        <div className="absolute right-0 top-0 h-full px-3 py-2">{icon}</div>
      </div>
    );
  }
);

export default InputCustomIcon;
