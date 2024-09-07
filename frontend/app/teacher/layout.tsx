import UserSession from "@/components/UserSession";
import TeacherNavbar from "@/components/teacherNavbar";
import { Metadata } from "next";
import { Tajawal } from "next/font/google";

const inter = Tajawal({style:"normal", weight:["200" , "300" , "400" , "500" ,"700", "800" ,"900"],subsets: ["latin"] });

export const metadata: Metadata = {
  title: "University Management System | Teacher",
};


export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={inter.className}>
      <TeacherNavbar/>
        <UserSession role="teacher">{children}</UserSession>
    </div>
  );
}
