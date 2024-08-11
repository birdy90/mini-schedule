import { Ref } from "react";
import { ScheduleDayItem } from "@/types/Schedule";

export interface DataManager {
  data: Ref<ScheduleDayItem[]>;
}
