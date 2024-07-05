import { create } from "zustand";
import { ScheduleDayItem } from "@/types";
import { localStorageHandler } from "@/data/store/storageHelpers";
import { v7 as createUUID } from "uuid";

interface ItemsStoreState {
  itemsList: ScheduleDayItem[];
  editedItem?: ScheduleDayItem;

  fillItems: (data: ScheduleDayItem[]) => void;
  initializeItems: () => void;
  addItem: (item: ScheduleDayItem) => void;
  updateItem: (item: ScheduleDayItem) => void;
  deleteItem: (item: ScheduleDayItem) => void;

  setEditedItem: (item?: ScheduleDayItem) => void;
  clearEditedItem: () => void;
}

const findItemIndex = (
  list: ScheduleDayItem[],
  item: ScheduleDayItem,
): number => {
  return list.findIndex((t) => t.id === item.id);
};

export const useItemsStore = create<ItemsStoreState>()((set) => ({
  itemsList: [],
  editedItem: undefined,

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
    set(() => ({ itemsList }));
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
  updateItem: (item: ScheduleDayItem) => {
    set((state) => {
      const itemIndex = findItemIndex(state.itemsList, item);
      if (itemIndex === -1) return {};

      const itemsList = [...state.itemsList];
      itemsList[itemIndex] = item;
      localStorageHandler.set(itemsList);
      return { itemsList };
    });
  },
  deleteItem: (item: ScheduleDayItem) => {
    set((state) => {
      const itemIndex = findItemIndex(state.itemsList, item);
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
