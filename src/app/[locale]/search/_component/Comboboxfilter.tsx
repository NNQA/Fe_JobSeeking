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

interface ComboboxFilterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  icon?: React.ReactNode;
  valueStr: string;
  setValueStr: (value: string) => void;
  arrayValue: {
    value: string;
    label: string;
  }[];
  title: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  emptyMessage?: string;
}
function Comboboxfilter({
  open,
  setOpen,
  icon,
  valueStr,
  setValueStr,
  arrayValue,
  title,
  placeholder = "Search...",
  className,
  buttonClassName,
  emptyMessage = "No items found.",
}: ComboboxFilterProps) {
  const selectedItem = React.useMemo(
    () => arrayValue.find((item) => item.value === valueStr),
    [valueStr, arrayValue]
  );

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      setValueStr(currentValue === valueStr ? "" : currentValue);
      setOpen(false);
    },
    [valueStr, setValueStr, setOpen]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outlineVariant"
          role="combobox"
          aria-expanded={open}
          className={clsx("w-[220px] justify-between border", buttonClassName)}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="truncate">
              {selectedItem ? selectedItem.label : title}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {arrayValue.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      valueStr === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
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
