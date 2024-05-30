"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Amplify } from "aws-amplify";
import awsmobile from "../src/aws-exports";
Amplify.configure(awsmobile);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Vehicle Inventory</title>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
