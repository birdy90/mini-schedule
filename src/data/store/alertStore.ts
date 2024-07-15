import { create } from "zustand";
import { AlertObject } from "@/types";

interface AlertsStoreState {
  alertList: AlertObject[];

  closeAlert(): void;

  showAlert(alert: AlertObject): void;
}

export const useAlertsStore = create<AlertsStoreState>()((set) => ({
  alertList: [],
  showAlert(alert: AlertObject) {
    set((state) => ({
      alertList: [...state.alertList, alert],
    }));
  },
  closeAlert() {
    set((state) => ({
      alertList: state.alertList.slice(1),
    }));
  },
}));
