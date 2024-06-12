"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsmobile from "../src/aws-exports";
import { ColorSchemeScript } from "@mantine/core";
Amplify.configure(awsmobile);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Vehicle Inventory</title>
        <ColorSchemeScript />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
