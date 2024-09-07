import UserSession from "@/components/UserSession";
import StudentNavbar from "@/components/studentNavbar";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Tajawal } from "next/font/google";

const inter = Tajawal({style:"normal", weight:["200" , "300" , "400" , "500" ,"700", "800" ,"900"],subsets: ["latin"] });

export const metadata: Metadata = {
  title: "University Management System | Student",
};

export default function StudentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={inter.className}>
      <StudentNavbar />
      <UserSession role="student">{children}</UserSession>
    </div>
  );
}
