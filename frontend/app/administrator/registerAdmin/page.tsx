"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { MajorType, AdministratorType } from "@/types";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Page = () => {
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [email, setEmail] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>();

  const onSubmit = () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }
    if (
      !name ||
      !surname ||
      !phone ||
      !email ||
      !address ||
      !password ||
      !date 
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const data: AdministratorType = {
      name,
      surname,
      phone,
      email,
      address,
      password,
      birth_date: date?.toISOString().split("T")[0],
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/administrator`, data)
      .then(() => {
        toast.success("Administrator registered successfully");
      })
      .catch((e) => {
        toast.error("Error registering administrator");
        console.error(e);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="font-bold pt-10 text-lg">Register new administrator</div>
      <Input
        type="text"
        placeholder="Name"
        className="w-[30rem]"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Surname"
        className="w-[30rem]"
        onChange={(e) => setSurname(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Phone"
        className="w-[30rem]"
        onChange={(e) => setPhone(parseInt(e.target.value))}
      />
      <Input
        type="email"
        placeholder="Email"
        className="w-[30rem]"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Address"
        className="w-[30rem]"
        onChange={(e) => setAddress(e.target.value)}
      />
 
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[30rem] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Birth date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="password"
        placeholder="Password"
        className="w-[30rem]"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="Password Confirmation"
        className="w-[30rem]"
      />
      <Button
        className="w-[30rem] bg-baby-blue hover:bg-blue-300"
        onClick={onSubmit}
      >
        Register
      </Button>
    </div>
  );
};

export default Page;
