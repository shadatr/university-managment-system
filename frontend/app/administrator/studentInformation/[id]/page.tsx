"use client";
import { MajorType, StudentType, TeacherType } from "@/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

const Page = ({ params }: { params: { id: string } }) => {
  const [student, setStudent] = useState<StudentType>();
  const [edit, setEdit] = useState<boolean>(false);
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [majors, setMajors] = useState<MajorType[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<number>();
  const [selectedTeacher, setSelectedTeacher] = useState<number>();
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/${params.id}`
        );
        const data: StudentType = response.data;
        setStudent(data);
        const response3 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major`
        );
        const majors: MajorType[] = response3.data;
        setMajors(majors);

        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher`
        );
        const teachers: TeacherType[] = response2.data;
        setTeachers(teachers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [edit]);

  const handleEdit = async () => {
    const data={
      name: name.current?.value,
      surname: surname.current?.value,
      birth_date: date?.toISOString().split("T")[0] || student?.birth_date,
      email: email.current?.value,
      major_id: selectedMajor||student?.major?.id,
      phone: parseInt(phone.current?.value||""),
      address: address.current?.value,
      advisor_id: selectedTeacher||student?.advisor?.id,
    }
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/${params.id}`,
        data
      ).then(() => {
        setEdit(!edit);
        toast.success("Student information updated successfully");
      }
      );
   
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-[1000wv] justify-center items-center flex">
      <div className="w-[800px] pt-20">
        {edit ? (
          <Button
            className="my-2"
            onClick={() => {
              handleEdit();
            }}
          >
             Save Changes
          </Button>
        ) : (
          <Button
            className="my-2"
            onClick={() => {
              setEdit(!edit);
            }}
          >
           Edit Student Information
          </Button>
        )}
        <Table isStriped aria-label="Example static collection table ">
          <TableHeader>
            <TableColumn>STUDENT INFORMATION</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="w-[100px]">Name</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={student?.name || ""}
                    type="text"
                    ref={name}
                  />
                </TableCell>
              ) : (
                <TableCell>{student?.name}</TableCell>
              )}
            </TableRow>
            <TableRow key="2">
              <TableCell className="w-[100px]">Surname</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    value={student?.surname}
                    type="text"
                    ref={surname}
                  />
                </TableCell>
              ) : (
                <TableCell>{student?.surname}</TableCell>
              )}
            </TableRow>
            <TableRow key="3">
              <TableCell className="w-[100px]">Birth Date</TableCell>
              {edit ? (
                <TableCell>
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
                </TableCell>
              ) : (
                <TableCell>{student?.birth_date}</TableCell>
              )}
            </TableRow>
            <TableRow key="8">
              <TableCell className="w-[100px]">Email</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    value={student?.email}
                    type="text"
                    ref={email}
                  />
                </TableCell>
              ) : (
                <TableCell>{student?.email}</TableCell>
              )}
            </TableRow>
            <TableRow key="4">
              <TableCell className="w-[100px]">Major</TableCell>
              {edit ? (
                <TableCell>
                  <Select
                    value={student?.major?.id.toString()}
                    onValueChange={(e) => setSelectedMajor(parseInt(e))}
                  >
                    <SelectTrigger className="w-[30rem]">
                      <SelectValue placeholder="Select a major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Majors</SelectLabel>
                        {majors.map((major) => (
                          <SelectItem
                            key={major.id}
                            value={major.id.toString()}
                          >
                            {major.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              ) : (
                <TableCell>{student?.email}</TableCell>
              )}
            </TableRow>
            <TableRow key="5">
              <TableCell className="w-[100px]">Phone</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    value={student?.phone.toString()}
                    type="number"
                    ref={phone}
                  />
                </TableCell>
              ) : (
                <TableCell>{student?.phone}</TableCell>
              )}
            </TableRow>
            <TableRow key="6">
              <TableCell className="w-[100px]">Address</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    value={student?.address}
                    type="text"
                    ref={address}
                  />
                </TableCell>
              ) : (
                <TableCell>{student?.address}</TableCell>
              )}
            </TableRow>
            <TableRow key="7">
              <TableCell className="w-[100px]">Advisor</TableCell>
              {edit ? (
                <TableCell>
                  <Select
                    value={student?.advisor?.id.toString()}
                    onValueChange={(e) => setSelectedTeacher(parseInt(e))}
                  >
                    <SelectTrigger className="w-[30rem]">
                      <SelectValue placeholder="Select a Advisor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Advisors</SelectLabel>
                        {teachers.map((teacher) => (
                          <SelectItem
                            key={teacher.id}
                            value={teacher.id.toString()}
                          >
                            {teacher.name} {teacher.surname}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              ) : (
                <TableCell>{student?.name}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
