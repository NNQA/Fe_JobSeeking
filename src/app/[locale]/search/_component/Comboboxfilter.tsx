import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
  valueStr: string;
  setValueStr: (value: React.SetStateAction<string>) => void;
  arrayValue: {
    value: string;
    label: string;
  }[];
  title: string;
  placeHolder: string;
  className?: string;
  classNameButton?: string;
}
function Comboboxfilter({
  open,
  setOpen,
  icon,
  valueStr,
  setValueStr,
  arrayValue,
  title,
  placeHolder,
  className,
  classNameButton,
}: Props) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outlineVariant"
          role="combobox"
          aria-expanded={open}
          className={clsx("w-[220px] justify-between border", classNameButton)}
        >
          <div className="flex items-center gap-2">
            {icon}
            {valueStr ? (
              (() => {
                const selectedFramework = arrayValue.find(
                  (framework) => framework.value === valueStr
                );

                return selectedFramework ? selectedFramework.label : null;
              })()
            ) : (
              <div className="flex items-center gap-1">
                <p>{title}</p>
              </div>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder={placeHolder} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {arrayValue.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValueStr(currentValue === valueStr ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      valueStr === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Comboboxfilter;
