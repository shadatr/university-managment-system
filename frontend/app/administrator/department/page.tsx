"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { DepartmentType } from "@/types/types";
import { DeleteIcon } from "@/components/ui/DeleteIcon";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function App() {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [departmentName, setDepartmentName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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
        setLoading(true);
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
      setLoading(false);
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
          <Button
            isLoading={loading}
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
            className=" bg-baby-blue hover:bg-blue-400"
            onClick={handleAddDepartment}
          >
            Add New Department
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
          >
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
