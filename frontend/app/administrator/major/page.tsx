"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { DepartmentType, MajorType } from "@/types/types";
import { DeleteIcon } from "@/components/ui/DeleteIcon";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { BookIcon } from "@/components/ui/BookIcon";
import { UsersIcon } from "lucide-react";

export default function App() {
  const [majors, setMajors] = useState<MajorType[]>([]);
  const [majorName, setMajorName] = useState<string>();
  const [majorCredits, setMajorCredits] = useState<number>();
  const [selectedDepartment, setSelectedDepartment] = useState<number>();
  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major`
        );
        const data: MajorType[] = response.data;
        setMajors(data);

        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/department`
        );
        const departments: DepartmentType[] = response2.data;
        setDepartments(departments);
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
        if (!majorName || !majorCredits || !selectedDepartment) {
          toast.error("Please fill all fields");
          return;
        }
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/major`,
          {
            name: majorName,
            credits: majorCredits,
            department_id: selectedDepartment,
          }
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
      <div className="lg:w-[60vw] sm:w-[90vw]">
        <div className="flex items-center lg:gap-2 sm:gap-1 py-10">
          <Input
            type="text"
            placeholder="Enter major name"
            className="lg:w-[30rem] sm:w-[5rem]"
            onChange={(e) => setMajorName(e.target.value)}
          />
          <Input
            type="number"
            className="lg:w-[30rem] sm:w-[5rem]"
            placeholder="Credits"
            onChange={(e) => setMajorCredits(parseInt(e.target.value))}
          />

          <Select onValueChange={(e) => setSelectedDepartment(parseInt(e))}>
            <SelectTrigger className="lg:w-[30rem] sm:w-[5rem]">
              <SelectValue placeholder="Select a Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Department</SelectLabel>
                {departments.map((department) => (
                  <SelectItem
                    key={department.id}
                    value={department.id?.toString() || ""}
                  >
                    {department.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className=" bg-baby-blue hover:bg-blue-400 sm:w-[8rem] lg:[20rem]"
            onClick={handleAddMajor}
          >
            Add New Major
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>CREDITS</TableColumn>
            <TableColumn>DEPARTMENT</TableColumn>
          </TableHeader>
          <TableBody>
            {majors.map((major) => (
              <TableRow>
                <TableCell>{major?.name}</TableCell>
                <TableCell>{major?.credits}</TableCell>
                <TableCell className="flex w-full justify-between items-center">
                  <span>{major?.department.name}</span>
                  <div className="flex items-center gap-3">
                    <Tooltip content="Courses">
                      <Link
                        href={`/administrator/majorCourses/${major.id}`}
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      >
                        <BookIcon />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Students">
                      <Link
                        href={`/administrator/students/${major.id}`}
                        className="text-xsm cursor-pointer active:opacity-50"
                      >
                        <UsersIcon />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Delete major">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDelete(major.id || 0)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
