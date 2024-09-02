import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useIsDragging = () => {
  const [isDragging, setIsDragging] = useState(false);

  function onPointerUp() {
    setIsDragging(false);
  }

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return [isDragging, setIsDragging] as [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
};
