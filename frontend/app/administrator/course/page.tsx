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
import { DepartmentType, CourseType } from "@/types/types";
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
import { EyeIcon } from "@/components/ui/EyeIcon";

export default function App() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [courseName, setCourseName] = useState<string>();
  const [courseCredits, setCourseCredits] = useState<number>();
  const [courseHours, setCourseHours] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course`
        );
        const data: CourseType[] = response.data;
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/${id}`
      );
      setCourses(courses.filter((course) => course.id !== id));
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Error deleting course");
    }
  };

  const handleAddCourse = async () => {
    if (courseName) {
      try {
        if (!courseName || !courseCredits || !courseHours) {
          toast.error("Please fill all fields");
          return;
        }
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course`,
          {
            name: courseName,
            credits: courseCredits,
            hours: courseHours,
          }
        );
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course`
        );
        const data: CourseType[] = response2.data;
        setCourses(data);
        toast.success("Course added successfully");
      } catch (error) {
        toast.error("Error adding Course");
      }
    }
  };

  return (
    <div className="w-[100vw] flex justify-center items-center">
      <div className="lg:w-[70vw] sm:w-[90vw]">
        <div className="flex items-center gap-2 py-10">
          <Input
            type="text"
            placeholder="Enter course name"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Credits"
            onChange={(e) => setCourseCredits(parseInt(e.target.value))}
          />

          <Input
            type="number"
            placeholder="Hours"
            onChange={(e) => setCourseHours(parseInt(e.target.value))}
          />
          <Button
            className=" bg-baby-blue hover:bg-blue-400"
            onClick={handleAddCourse}
          >
            Add New Course
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>CREDITS</TableColumn>
            <TableColumn>HOURS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No courses found">
            {courses.map((course) => (
              <TableRow>
                <TableCell>{course?.name}</TableCell>
                <TableCell>{course?.credits}</TableCell>
                <TableCell className="flex w-full justify-between items-center">
                  <span>{course?.hours}</span>
                  <div className="flex items-center gap-3">
                    <Tooltip content="Course and sections">
                      <Link
                        href={`/administrator/course/${course.id}`}
                        className="text-xsm cursor-pointer active:opacity-50"
                      >
                        <EyeIcon />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Delete course">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDelete(course.id || 0)}
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
