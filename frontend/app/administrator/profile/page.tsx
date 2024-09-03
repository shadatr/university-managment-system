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
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Page = ({ params }: { params: { id: string } }) => {
  const [administrator, setAdministrator] = useState<AdministratorType>();
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/administrator/${session.data?.user.id}`
        );
        const data: AdministratorType = response.data;
        setAdministrator(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [session]);


  return (
    <div className="w-[1000wv] justify-center items-center flex">
      <div className="w-[800px] pt-20">
    
        <Table isStriped aria-label="Example static collection table ">
          <TableHeader>
            <TableColumn>Administrator INFORMATION</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="w-[100px]">Name</TableCell>
              <TableCell>{administrator?.name}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="w-[100px]">Surname</TableCell>
              <TableCell>{administrator?.surname}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="w-[100px]">Birth Date</TableCell>
              <TableCell>{administrator?.birth_date}</TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell className="w-[100px]">Email</TableCell>
              <TableCell>{administrator?.email}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell className="w-[100px]">Phone</TableCell>
              <TableCell>{administrator?.phone}</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell className="w-[100px]">Address</TableCell>
              <TableCell>{administrator?.address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
