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
  setValueStr: (value: string) => void;
  title: string;
  buttonClassName?: string;
  placeholder?: string;
  className?: string;
  emptyMessage?: string;
}

export const salaryOptions = [
  { label: "Dưới 10 triệu", value: "1" },
  { label: "10 - 15 triệu", value: "2" },
  { label: "15 - 20 triệu", value: "3" },
  { label: "20 - 25 triệu", value: "4" },
  { label: "25 - 30 triệu", value: "5" },
  { label: "30 - 50 triệu", value: "6" },
  { label: "Trên 50 triệu", value: "8" },
  { label: "Thỏa thuận", value: "127" },
];
function SalaryFilter({
  open,
  setOpen,
  icon,
  valueStr,
  setValueStr,
  title,
  placeholder = "Search...",
  className,
  buttonClassName,
  emptyMessage = "No items found.",
}: Props) {
  const selectedItem = React.useMemo(
    () => salaryOptions.find((item) => item.value === valueStr),
    [valueStr, salaryOptions]
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
              {salaryOptions.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value.toString()}
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

export default SalaryFilter;
