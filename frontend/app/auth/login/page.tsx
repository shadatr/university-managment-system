"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();
  const [role, setRole] = React.useState<React.Key>("student");

  const handleLogin = async () => {
    
    try {
      const res=await signIn(role.toString(), {
        email,
        password,
        redirect: false,
      })
      console.log(res);
      if (res?.status===200) {
        localStorage.setItem("user", JSON.stringify({
          email: email,
          role: role,
        }));
        if (role === "admin") {
          router.push("/administrator/profile");
        } else if (role === "student") {
          router.push("/student/profile");
        } else if (role === "teacher") {
          router.push("/teacher/profile");
        }
      }else
      {
        toast.error("password or email is incorrect");
      }
    } catch (error) {
      toast.error("password or email is incorrect");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#000D2E] w-[100vw]">
      <BackgroundGradient className="max-w-full lg:w-[450px] sm:w-[380px] h-[400px] p-5 rounded-3xl bg-white ">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            // selectedKey={role}
            onSelectionChange={setRole}
          >
            <Tab key="student" title="Student">
              <form
                className="flex flex-col gap-4 justify-center items-center h-full "
                onSubmit={(e)=>{e.preventDefault();handleLogin()}}
              >
                <p className="font-black text-[20px] py-4 text-baby-blue">
                  Login to Student account
                </p>
                <Input placeholder="Enter your email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)}/>

                <div className="flex gap-2 justify-end w-full">
                  <Button fullWidth className="bg-baby-blue text-white" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="teacher" title="Teacher">
              <form
                className="flex flex-col gap-4 justify-center items-center h-full "
                onSubmit={handleLogin}
              >
                <p className="font-black text-[20px] py-4 text-baby-blue">
                  Login to teacher account
                </p>
                <Input placeholder="Enter your email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)}/>

                <div className="flex gap-2 justify-end w-full">
                <Button fullWidth className="bg-baby-blue text-white" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="admin" title="Administrator">
              <form
                className="flex flex-col gap-4 justify-center items-center h-full "
                onSubmit={handleLogin}
              >
                <p className="font-black text-[20px] py-4 text-baby-blue">
                  Login to administrator account
                </p>
                <Input placeholder="Enter your email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)}/>

                <div className="flex gap-2 justify-end w-full" >
                <Button fullWidth className="bg-baby-blue text-white" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
      </BackgroundGradient>
    </div>
  );
};

export default LoginPage;
