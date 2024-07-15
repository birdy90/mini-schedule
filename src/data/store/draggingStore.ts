import { create } from "zustand";
import { SimplifiedScheduleDayItem } from "@/types";

export type HandleType = "start" | "end" | "item";
type Coords = { x: number; y: number };

interface DraggingStoreState {
  draggedItem?: SimplifiedScheduleDayItem;
  positionWithinItem?: Coords;
  draggedHandle?: HandleType;

  updateDraggingItem(item: SimplifiedScheduleDayItem): void;

  startDragging(
    handle: HandleType,
    item: SimplifiedScheduleDayItem,
    position?: Coords,
  ): void;

  stopDragging(): void;
}

export const useDraggingStore = create<DraggingStoreState>()((set) => ({
  draggedItem: undefined,
  positionWithinItem: undefined,
  draggedHandle: undefined,

  updateDraggingItem(draggedItem) {
    set(() => ({
      draggedItem,
    }));
  },
  startDragging(draggedHandle, draggedItem, position) {
    set(() => ({
      draggedItem,
      draggedHandle,
      positionWithinItem: position,
    }));
  },
  stopDragging() {
    set(() => ({ draggedItem: undefined, draggedHandle: undefined }));
  },
}));
