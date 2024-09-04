"use client";
import UserSession from "@/components/UserSession";
import TeacherNavbar from "@/components/teacherNavbar";
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
      <TeacherNavbar/>
      <SessionProvider session={session}>
        <UserSession role="teacher">{children}</UserSession>
      </SessionProvider>
    </div>
  );
}
