import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useMediaQuery } from "@mantine/hooks";

type Orientation = "vertical" | "horizontal";

const orientationContext = createContext<Orientation>("horizontal");

export const OrientationProvider = (
  props: PropsWithChildren & { orientation?: Orientation },
) => {
  const forcedOrientation = !!props.orientation;
  const [orientation, setOrientation] = useState<Orientation>(
    props.orientation ?? "horizontal",
  );
  const Provider = orientationContext.Provider;
  const isVertical = useMediaQuery("(max-aspect-ratio: 1/1)");

  useLayoutEffect(
    () => {
      if (forcedOrientation) return;
      const nextValue = isVertical ? "vertical" : "horizontal";
      setOrientation(nextValue);
    },
    forcedOrientation ? [] : [isVertical],
  );

  return <Provider value={orientation}>{props.children}</Provider>;
};

export const useAppOrientation = () => {
  const ctx = useContext(orientationContext);

  if (!ctx) {
    throw new Error("useOrientation should be used within OrientationProvider");
  }

  return {
    isVertical: ctx === "vertical",
    isHorizontal: ctx === "horizontal",
  };
};
