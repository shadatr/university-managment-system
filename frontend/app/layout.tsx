"use client";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function RootLayout({
  children,
  params: { session, ...params },
}: {
  children: React.ReactNode;
  params: { session?: Session };  // Adjust the type of session if necessary
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <NextUIProvider>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
          <Toaster position="bottom-right" richColors />
        </NextUIProvider>
      </body>
    </html>
  );
}
