"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import { MajorType } from "@/types";
import { DeleteIcon } from "@/components/ui/DeleteIcon";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [majors, setMajors] = useState<MajorType[]>([]);
  const [majorName, setMajorName] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/aajor`
        );
        const data: MajorType[] = response.data;
        setMajors(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major/${id}`
      );
      setMajors(majors.filter((major) => major.id !== id));
      toast.success("Major deleted successfully");
    } catch (error) {
      toast.error("Error deleting major");
    }
  };

  const handleAddMajor = async () => {
    if (majorName) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major`,
          { name: majorName }
        );
        const response2 = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major`
          );
          const data: MajorType[] = response2.data;
          setMajors(data);
        toast.success("Major added successfully");
      } catch (error) {
        toast.error("Error adding Major");
      }
    }
  };

  return (
    <div className="w-[100vw] flex justify-center items-center">
      <div className="w-[700px]">
        <div className="flex items-center gap-8 py-10">
          <Input
            type="text"
            placeholder="Enter major name"
            onChange={(e) => setMajorName(e.target.value)}
          />
          <Button className=" bg-baby-blue hover:bg-blue-400" onClick={handleAddMajor}>
            Add New Major
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
          </TableHeader>
          <TableBody>
            {majors.map((major) => (
              <TableRow>
                <TableCell className="flex w-full justify-between items-center">
                  <span>{major?.name}</span>
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => handleDelete(major.id || 0)}
                  >
                    <DeleteIcon />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
