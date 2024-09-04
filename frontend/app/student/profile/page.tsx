"use client";
import { MajorType, StudentType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [student, setStudent] = useState<StudentType>();
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/${session.data?.user.id}`
        );
        const data: StudentType = response.data;
        setStudent(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [session]);


  return (
    <div className="w-[1000wv] justify-center items-center flex">
      <div className="lg:w-[50vw] sm:w-[90vw] pt-20">
    
        <Table isStriped aria-label="Example static collection table ">
          <TableHeader>
            <TableColumn>Student INFORMATION</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Name</TableCell>
              <TableCell>{student?.name}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Surname</TableCell>
              <TableCell>{student?.surname}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Birth Date</TableCell>
              <TableCell>{student?.birth_date}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Email</TableCell>
              <TableCell>{student?.email}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Phone</TableCell>
              <TableCell>{student?.phone}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Address</TableCell>
              <TableCell>{student?.address}</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Major</TableCell>
              <TableCell>{student?.major?.name}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell className="lg:w-[8rem] sm:w-[3rem]">Advisor</TableCell>
              <TableCell>{student?.advisor?.name} {student?.advisor?.surname}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
