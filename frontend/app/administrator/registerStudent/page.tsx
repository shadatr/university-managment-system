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
import { MajorType, StudentType, TeacherType } from "@/types";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Page = () => {
  const [majors, setMajors] = useState<MajorType[]>([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [email, setEmail] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
  const [selectedMajor, setSelectedMajor] = useState<number>();
  const [selectedTeacher, setSelectedTeacher] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major`
      );
      const majors: MajorType[] = response.data;
      setMajors(majors);

      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher`
      );
      const teachers: TeacherType[] = response2.data;
      setTeachers(teachers);
    };
    fetchData();
  }, []);

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
      !selectedMajor ||
      !date ||
      !selectedTeacher
    ) {
      toast.error("Please fill all fields");
      return;
    }
    console.log(`${date?.getDay()}-${date?.getMonth()}-${date?.getFullYear()}`);
    
    const data: StudentType = {
      name,
      surname,
      phone,
      email,
      address,
      password,
      major_id: selectedMajor,
      birth_date: date?.toISOString().split("T")[0],
      advisor_id: selectedTeacher,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student`, data)
      .then(() => {
        toast.success("Student registered successfully");
      })
      .catch((e) => {
        toast.error("Error registering student");
        console.error(e);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="font-bold pt-10 text-lg">Register new student</div>
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
      <Select onValueChange={(e) => setSelectedMajor(parseInt(e))}>
        <SelectTrigger className="w-[30rem]">
          <SelectValue placeholder="Select a major" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Majors</SelectLabel>
            {majors.map((major) => (
              <SelectItem key={major.id} value={major.id.toString()}>
                {major.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(e) => setSelectedTeacher(parseInt(e))}>
        <SelectTrigger className="w-[30rem]">
          <SelectValue placeholder="Select a Advisor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Advisors</SelectLabel>
            {teachers.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id.toString()}>
                {teacher.name} {teacher.surname}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
