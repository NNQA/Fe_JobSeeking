import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "../ui/form";
interface Props {
  onChange: (...event: any[]) => void;

  selectValue: any;
  value: any;
}
function SelectCustom({ onChange, value, selectValue }: Props) {
  return (
    <Select
      onValueChange={(newValue) => onChange!(parseInt(newValue))}
      value={value?.toString()}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Choose your JobType link" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          {selectValue.map((e: { label: string; value: number }) => (
            <SelectItem key={e.value} value={e.value.toString()}>
              {e.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCustom;
