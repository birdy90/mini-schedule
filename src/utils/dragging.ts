import { clamp } from "@/utils/common";
import { daysOfWeek } from "@/data";

export function calculateDay(pos: number, step: number) {
  return clamp(Math.floor(pos / (step || 1)) + 1, 0, daysOfWeek.length);
}
