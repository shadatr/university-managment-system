import UserSession from "@/components/UserSession";
import AdministratorNavbar from "@/components/administratorNavbar";
import { Metadata } from "next";
import { Tajawal } from "next/font/google";

const inter = Tajawal({style:"normal", weight:["200" , "300" , "400" , "500" ,"700", "800" ,"900"],subsets: ["latin"] });

export const metadata: Metadata = {
  title: "University Management System | Administrator",
};

export default function AdministatorLayout({
  children,
}:
Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <AdministratorNavbar />
      <UserSession role="admin">{children}</UserSession>
    </div>
  );
}
