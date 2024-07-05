import { atom } from "jotai";
import { ScheduleDayItem } from "@/types";

export const editedItemAtom = atom<ScheduleDayItem | undefined>(undefined);
