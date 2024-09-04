"use client";
import { MajorType, AdministratorType } from "@/types/types";
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
  const [administrator, setAdministrator] = useState<AdministratorType>();
  const [edit, setEdit] = useState<boolean>(false);
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/administrator/${params.id}`
        );
        const data: AdministratorType = response.data;
        setAdministrator(data);
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
      birth_date:
        date?.toISOString().split("T")[0] || administrator?.birth_date,
      email: email.current?.value,
      phone: parseInt(phone.current?.value || ""),
      address: address.current?.value,
    };
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/administrator/${params.id}`,
          data
        )
        .then(() => {
          setEdit(!edit);
          toast.success("administrator information updated successfully");
        });
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-[1000wv] justify-center items-center flex">
      <div className="lg:w-[50vw] sm:w-[90vw] pt-20">
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
            Edit Administrator Information
          </Button>
        )}
        <Table isStriped aria-label="Example static collection table ">
          <TableHeader>
            <TableColumn>Administrator INFORMATION</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Name</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    className="sm:w-[10rem]"
                    size="sm"
                    defaultValue={administrator?.name || ""}
                    type="text"
                    ref={name}
                  />
                </TableCell>
              ) : (
                <TableCell>{administrator?.name}</TableCell>
              )}
            </TableRow>
            <TableRow key="2">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Surname</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    className="sm:w-[10rem]"
                    size="sm"
                    defaultValue={administrator?.surname}
                    type="text"
                    ref={surname}
                  />
                </TableCell>
              ) : (
                <TableCell>{administrator?.surname}</TableCell>
              )}
            </TableRow>
            <TableRow key="3">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">
                Birth Date
              </TableCell>
              {edit ? (
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "lg:w-[30rem] sm:w-[10rem] justify-start text-left font-normal",
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
                <TableCell>{administrator?.birth_date}</TableCell>
              )}
            </TableRow>
            <TableRow key="8">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Email</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    className="sm:w-[10rem]"
                    size="sm"
                    defaultValue={administrator?.email}
                    type="text"
                    ref={email}
                  />
                </TableCell>
              ) : (
                <TableCell>{administrator?.email}</TableCell>
              )}
            </TableRow>

            <TableRow key="5">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Phone</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    className="sm:w-[10rem]"
                    size="sm"
                    defaultValue={administrator?.phone.toString()}
                    type="number"
                    ref={phone}
                  />
                </TableCell>
              ) : (
                <TableCell>{administrator?.phone}</TableCell>
              )}
            </TableRow>
            <TableRow key="6">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Address</TableCell>
              {edit ? (
                <TableCell>
                  <Input
                    className="sm:w-[10rem]"
                    size="sm"
                    defaultValue={administrator?.address}
                    type="text"
                    ref={address}
                  />
                </TableCell>
              ) : (
                <TableCell>{administrator?.address}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
