import { cn } from "@/lib/utils";
import React from "react";
interface Props {
  className?: string;
  children: React.ReactNode;
}
function Card({ children, className }: Props) {
  return (
    <div className={cn("bg-card rounded-lg shadow-md", className)}>
      {children}
    </div>
  );
}

export default Card;
