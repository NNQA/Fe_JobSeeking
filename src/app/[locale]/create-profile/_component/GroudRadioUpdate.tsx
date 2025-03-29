import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<{
    phone: string;
    name: string;
    university: string;
    experiencelevel: string;
  }>;
}
function GroudRadioUpdate({ setValue }: Props) {
  const [valueSelected, setValueSelected] = useState<string>("entrylevel");

  const onChange = (value: string) => {
    setValueSelected(value);
    setValue("experiencelevel", value);
  };

  return (
    <RadioGroup
      className="flex gap-3"
      value={valueSelected}
      onValueChange={onChange}
    >
      {[
        {
          label: "Entry level",
          description: "I am relatively new to this field",
          value: "entrylevel",
        },
        {
          label: "Intermediate",
          description: "I have substantial experience in this field",
          value: "intermediate",
        },
        {
          label: "Expert",
          description: "I have comprehensive and deep expertise in this field",
          value: "expert",
        },
      ].map((item) => (
        <div
          key={item.value}
          className={cn(
            "flex items-start pt-1 space-x-2 border rounded-md p-2 h-[120px] w-[300px] justify-between cursor-pointer",
            { "border-primary bg-foreground/5": valueSelected === item.value }
          )}
        >
          <div className="space-y-1 p-2">
            <Label
              htmlFor={item.value}
              className="text-lg font-normal"
              style={{
                WebkitTapHighlightColor: "transparent",
                pointerEvents: "auto",
              }}
            >
              {item.label}
            </Label>
            <p
              className="text-xs text-foreground/65 font-medium"
              style={{
                WebkitTapHighlightColor: "transparent",
                pointerEvents: "auto",
              }}
            >
              {item.description}
            </p>
          </div>
          <RadioGroupItem
            value={item.value}
            id={item.value}
            className={cn("size-[20px] border-foreground/40", {
              "border-primary": valueSelected === item.value,
            })}
            classNameIcon="w-3 h-3"
            checked={valueSelected === item.value}
          />
        </div>
      ))}
    </RadioGroup>
  );
}

export default GroudRadioUpdate;
