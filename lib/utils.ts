import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function onlyUnique(value: any, index: any, array: any) {
  return array.indexOf(value) === index;
}

