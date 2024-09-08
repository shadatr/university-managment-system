"use client";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import AuthContext from "@/components/authContext";

export interface AccountLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: AccountLayoutProps) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <AuthContext>
          <NextUIProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </NextUIProvider>
        </AuthContext>
      </body>
    </html>
  );
}
