import { create } from "zustand";
import { ScheduleDayItem } from "@/types";
import { localStorageHandler } from "@/data/store/storageHelpers";
import { v4 as createUUID } from "uuid";

interface ItemsStoreState {
  itemsList: ScheduleDayItem[];
  editedItem?: ScheduleDayItem;

  fillItems: (data: ScheduleDayItem[]) => void;
  initialized: boolean;
  initializeItems: () => void;
  addItem: (item: ScheduleDayItem) => void;
  updateItem: (id: string | undefined, newItem: ScheduleDayItem) => void;
  deleteItem: (item: ScheduleDayItem) => void;

  setEditedItem: (item?: ScheduleDayItem) => void;
  clearEditedItem: () => void;
}

const findItemIndex = (list: ScheduleDayItem[], itemId: string): number => {
  return list.findIndex((t) => t.id === itemId);
};

export const useItemsStore = create<ItemsStoreState>()((set) => ({
  itemsList: [],
  editedItem: undefined,
  initialized: false,

  fillItems: (data) => {
    const itemsList = data.map((item) => {
      return {
        id: createUUID(),
        ...item,
      };
    });
    localStorageHandler.set(itemsList);
    set(() => ({ itemsList }));
  },

  initializeItems: () => {
    const itemsList = localStorageHandler.get();
    set(() => ({ itemsList, initialized: true }));
  },

  addItem: (item) => {
    set((state) => {
      const itemsList = [
        ...state.itemsList,
        {
          id: createUUID(),
          ...item,
        },
      ];
      localStorageHandler.set(itemsList);
      return { itemsList };
    });
  },
  updateItem: (id, newItem) => {
    set((state) => {
      if (!id) return {};

      const itemIndex = findItemIndex(state.itemsList, id);
      if (itemIndex === -1) return {};

      const itemsList = [...state.itemsList];
      itemsList[itemIndex] = newItem;
      localStorageHandler.set(itemsList);
      return { itemsList };
    });
  },
  deleteItem: (item) => {
    set((state) => {
      if (!item.id) return {};

      const itemIndex = findItemIndex(state.itemsList, item.id);
      if (itemIndex === -1) return {};

      const itemsList = [...state.itemsList];
      itemsList.splice(itemIndex, 1);
      localStorageHandler.set(itemsList);
      return { itemsList };
    });
  },

  setEditedItem: (item?: ScheduleDayItem) => set(() => ({ editedItem: item })),
  clearEditedItem: () => set(() => ({ editedItem: undefined })),
}));
