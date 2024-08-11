import { clamp } from "@/utils/common";
import { daysOfWeek } from "@/data";

export function calculateRow(y: number, stepY: number) {
  return clamp(Math.floor(y / (stepY || 1)) + 1, 0, daysOfWeek.length);
}
