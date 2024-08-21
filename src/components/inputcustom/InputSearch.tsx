import React, { Dispatch, SetStateAction, useState } from "react";
import InputCustomIcon, { InputCustomProps } from "./InputCustomIcon";
import { InputIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transition } from "@headlessui/react";
import ProgressCircle from "../svg/ProgressCircle";
import { cn } from "@/lib/utils";

interface PropsValue {
  id: number;
  name: string;
}
export interface InputSearchProps extends InputCustomProps {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  valueInput?: PropsValue;
  setValueInput: Dispatch<SetStateAction<PropsValue>>;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  items: PropsValue[];
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left" | undefined;
  classNameSroll?: string;
}

export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      isOpen,
      setIsOpen,
      valueInput,
      setValueInput,
      handleOnChange,
      items,
      align,
      side,
      classNameSroll,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className="w-full">
            <InputCustomIcon
              ref={ref}
              {...props}
              className={className}
              value={valueInput?.name!}
              onChange={handleOnChange}
            />
          </PopoverTrigger>
          <PopoverContent align={align} side={side}>
            <ScrollArea className={cn("h-[200px]", classNameSroll)}>
              {items.length > 0 ? (
                items.map((item, index: number) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-primary hover:text-accent outline-none rounded-md"
                    onClick={() => {
                      setValueInput(item);
                    }}
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div>
                  <Transition
                    show={true}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0 scale-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0 scale-0"
                  >
                    <div className="w-[30px] h-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex flex-col items-center justify-center mb-20">
                        <ProgressCircle
                          className="w-[30px] h-[50px] text-primary"
                          aria-label="signing in"
                        />
                        <p>Loading......</p>
                      </div>
                    </div>
                  </Transition>
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

InputSearch.displayName = "InputSearch";
