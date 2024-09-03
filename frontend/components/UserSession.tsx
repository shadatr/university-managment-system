import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const UserSession = ({
  children,
  role,
}: Readonly<{
  children: React.ReactNode;
  role: string;
}>) => {
  const session = useSession();
  const user=localStorage.getItem("user");
  console.log(session);
  console.log(user);
  if (session.status != "loading"&&!user) {
    if (!session.data?.user || session.data?.user.userType != role) {
      redirect("/auth/login");
    }
  }
  return <div>{children}</div>;
};

export default UserSession;
