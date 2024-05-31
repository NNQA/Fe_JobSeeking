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


