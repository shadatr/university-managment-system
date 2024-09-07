"use client";
import UserSession from "@/components/UserSession";
import StudentNavbar from "@/components/studentNavbar";
import { Session } from "next-auth";
import { ReactNode } from "react";

export default function StudentLayout({
  children,
}: {
  children: ReactNode;
  // session: Session;
}) {
  return (
    <div>
      <StudentNavbar />

      <UserSession role="student">{children}</UserSession>
    </div>
  );
}
