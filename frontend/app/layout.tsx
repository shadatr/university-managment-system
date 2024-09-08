"use client";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <NextUIProvider>
          <SessionProvider >

          {children}
          </SessionProvider>

          <Toaster position="bottom-right" richColors />
        </NextUIProvider>
      </body>
    </html>
  );
}
