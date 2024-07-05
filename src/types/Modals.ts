export interface BaseModalProps {
  actions: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}
