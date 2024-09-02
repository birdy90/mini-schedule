"use client";

import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import config from "../../tailwind.config";
import { OrientationProvider } from "@/components/providers/OrientationContext";

const mainColor: MantineColorsTuple = Object.values<string>(
  (config.theme?.colors as any).main,
).slice(1, 11) as [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  ...string[],
];

const theme = createTheme({
  colors: {
    main: mainColor,
  },
  primaryColor: "main",
  primaryShade: 5,
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={theme}>
      <OrientationProvider>{children}</OrientationProvider>
    </MantineProvider>
  );
}
