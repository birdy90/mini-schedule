import { create } from "zustand";
import { SimplifiedScheduleDayItem } from "@/types";

export type HandleType = "start" | "end" | "item";
type Coords = { x: number | "50%"; y: number | "50%" };

interface DraggingStoreState {
  canDrag: boolean;
  draggedItem?: SimplifiedScheduleDayItem;
  positionWithinItem?: Coords;
  draggedHandle?: HandleType;

  updateDraggingItem(item: Partial<SimplifiedScheduleDayItem>): void;

  startDragging(
    handle: HandleType,
    item: SimplifiedScheduleDayItem,
    position?: Coords,
  ): void;

  stopDragging(): void;

  allowDragging(): void;

  cancelDragging(): void;
}

export const useDraggingStore = create<DraggingStoreState>()((set) => ({
  canDrag: true,
  draggedItem: undefined,
  positionWithinItem: undefined,
  draggedHandle: undefined,

  updateDraggingItem(draggedItem) {
    set((state) => ({
      draggedItem: {
        ...state.draggedItem,
        ...draggedItem,
      } as SimplifiedScheduleDayItem,
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
  cancelDragging() {
    set(() => ({ canDrag: false }));
  },
  allowDragging() {
    set(() => ({ canDrag: false }));
  },
}));
