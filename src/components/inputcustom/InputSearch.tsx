import React, { Dispatch, SetStateAction, useState } from "react";
import InputCustomIcon, { InputCustomProps } from "./InputCustomIcon";
import { InputIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transition } from "@headlessui/react";
import ProgressCircle from "../svg/ProgressCircle";
import { cn } from "@/lib/utils";

interface PropsValue {
  text: string;
}
export interface InputSearchProps extends InputCustomProps {
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  ({ className, align, side, ...props }, ref) => {
    return <InputCustomIcon ref={ref} {...props} className={className} />;
  }
);

InputSearch.displayName = "InputSearch";
