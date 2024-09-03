"use client";
import UserSession from "@/components/UserSession";
import StudentNavbar from "@/components/studentNavbar";
import { SessionProvider } from "next-auth/react";

export default function StudentLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {

  return (
    <div>
      <StudentNavbar/>
      <SessionProvider session={session}>
        <UserSession role="student">{children}</UserSession>
      </SessionProvider>
    </div>
  );
}
