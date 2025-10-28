import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const range = (start: number, end: number) => {
    return [...Array(end - start).keys()].map((el) => el + start);
}