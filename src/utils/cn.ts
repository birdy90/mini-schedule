import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...c: ClassValue[]) {
  return twMerge(clsx(c))
}
