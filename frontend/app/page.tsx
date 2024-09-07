"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    } else if (session.data?.user.userType == "student") {
      router.push("/student/profile");
    } else if (session.data?.user.userType == "teacher") {
      router.push("/teacher/profile");
    } else if (session.data?.user.userType == "admin") {
      router.push("/admin/profile");
    }
  }, []);

  return <div></div>;
}
