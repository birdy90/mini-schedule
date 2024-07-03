'use client'

import {createTheme, MantineColorsTuple, MantineProvider} from '@mantine/core';
import {PropsWithChildren} from "react";
import config from '../../tailwind.config';

const mainColor: MantineColorsTuple = Object.values<string>((config.theme?.colors as any).main).slice(1, 11) as [string, string, string, string, string, string, string, string, string, string, ...string[]];

const theme = createTheme({
  colors: {
    main: mainColor,
  },
  primaryColor: 'main',
});

export function Providers({children}: PropsWithChildren) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  )
}