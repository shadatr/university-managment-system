"use client";
import UserSession from "@/components/UserSession";
import AdministratorNavbar from "@/components/administratorNavbar";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function AdministatorLayout({
  children,
  // session,
}: Readonly<{
  children: React.ReactNode;
  // session: Session;
}>) {
  return (
    <div>
      <AdministratorNavbar />
      {/* <SessionProvider session={session}> */}
        <UserSession role="admin">

        {children}
        </UserSession> 
        {/* </SessionProvider> */}
    </div>
  );
}
