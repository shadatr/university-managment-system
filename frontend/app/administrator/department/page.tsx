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
import { DepartmentType } from "@/types/types";
import { DeleteIcon } from "@/components/ui/DeleteIcon";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [departmentName, setDepartmentName] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/department`
        );
        const data: DepartmentType[] = response.data;
        setDepartments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/department/${id}`
      );
      setDepartments(departments.filter((department) => department.id !== id));
      toast.success("Department deleted successfully");
    } catch (error) {
      toast.error("Error deleting department");
    }
  };

  const handleAddDepartment = async () => {
    if (departmentName) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/department`,
          { name: departmentName }
        );
        const response2 = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/department`
          );
          const data: DepartmentType[] = response2.data;
          setDepartments(data);
        toast.success("Department added successfully");
      } catch (error) {
        toast.error("Error adding department");
      }
    }
  };

  return (
    <div className="w-[100vw] flex justify-center items-center">
      <div className="lg:w-[70vw] sm:w-[90vw]">
        <div className="flex items-center lg:gap-8 sm:gap-2 py-10">
          <Input
            type="text"
            placeholder="Enter department name"
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <Button className=" bg-baby-blue hover:bg-blue-400" onClick={handleAddDepartment}>
            Add New Department
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="flex w-full justify-between items-center">
                  <span>{department?.name}</span>
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => handleDelete(department.id || 0)}
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
