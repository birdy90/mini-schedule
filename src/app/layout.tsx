import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {ColorSchemeScript} from "@mantine/core";
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Schedule",
  description: "",
};

export default function RootLayout(
    {
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>
) {
  return (
      <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      </body>
      </html>
  );
}
