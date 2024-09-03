"use client";
import { MajorType, TeacherType } from "@/types/types";
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
  const [teacher, setTeacher] = useState<TeacherType>();
  const [edit, setEdit] = useState<boolean>(false);
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const major = useRef<HTMLInputElement>(null);
  const department = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/${params.id}`
        );
        const data: TeacherType = response.data;
        setTeacher(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [edit]);

  const handleEdit = async () => {
    const data = {
      name: name.current?.value,
      surname: surname.current?.value,
      birth_date: date?.toISOString().split("T")[0] || teacher?.birth_date,
      email: email.current?.value,
      department: department.current?.value,
      major: major.current?.value,
      phone: parseInt(phone.current?.value || ""),
      address: address.current?.value,
    };
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher/${params.id}`,
          data
        )
        .then(() => {
          setEdit(!edit);
          toast.success("Teacher information updated successfully");
        });
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
            Edit Teacher Information
          </Button>
        )}
        <Table isStriped aria-label="Example static collection table ">
          <TableHeader>
            <TableColumn>Teacher INFORMATION</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="w-[100px]">Name</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.name || ""}
                    type="text"
                    ref={name}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.name}</TableCell>
              )}
            </TableRow>
            <TableRow key="2">
              <TableCell className="w-[100px]">Surname</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.surname}
                    type="text"
                    ref={surname}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.surname}</TableCell>
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
                <TableCell>{teacher?.birth_date}</TableCell>
              )}
            </TableRow>
            <TableRow key="8">
              <TableCell className="w-[100px]">Email</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.email}
                    type="text"
                    ref={email}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.email}</TableCell>
              )}
            </TableRow>
            <TableRow key="7">
              <TableCell className="w-[100px]">Department</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.department}
                    type="text"
                    ref={department}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.department}</TableCell>
              )}
            </TableRow>
            <TableRow key="4">
              <TableCell className="w-[100px]">Major</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.major}
                    type="text"
                    ref={major}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.major}</TableCell>
              )}
            </TableRow>
            <TableRow key="5">
              <TableCell className="w-[100px]">Phone</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.phone.toString()}
                    type="number"
                    ref={phone}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.phone}</TableCell>
              )}
            </TableRow>
            <TableRow key="6">
              <TableCell className="w-[100px]">Address</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    size="sm"
                    defaultValue={teacher?.address}
                    type="text"
                    ref={address}
                  />
                </TableCell>
              ) : (
                <TableCell>{teacher?.address}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
