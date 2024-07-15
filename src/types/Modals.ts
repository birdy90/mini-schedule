export interface BaseModalProps {
  actions: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

export interface AlertObject {
  title: string;
  description?: string;
  type?: "error" | "info";
}
