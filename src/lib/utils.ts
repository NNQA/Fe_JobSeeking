import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkInstanceResponsce(input: String) {
  switch (input){
    case "/system/checkcode":{
      return 1;
    }
  }
  return 0;
}

export function getErrorMessage(errors: Record<string, string[]>): string {
  if (!errors || typeof errors !== "object") return "Something is error.";

  return errors.form?.[0] || Object.values(errors)[0]?.[0] || "Something is error.";
}


export enum JobType {
  Art,
  Bussiness,
  Communications,
  Education,
  Hospitality,
  "Information technology",
  "Sales and Marketing",
}