"use client";

import { CourseType, MajorCoursesType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Tooltip,
  Button,
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
import { DeleteIcon } from "@/components/ui/DeleteIcon";
import Link from "next/link";
import { toast } from "sonner";

export default function App({ params }: { params: { id: string } }) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [course, setCourse] = useState<number>();
  const [majorCourses, setMajorCourses] = useState<MajorCoursesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course`
        );
        const data: CourseType[] = response.data;
        setCourses(data);
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/majorCourses/major/${params.id}`
        );
        const data2: MajorCoursesType[] = response2.data;
        setMajorCourses(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

  const handleAddCourseToMajor = () => {
    if (!course) {
      toast.error("Please select a course");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/majorCourses`, {
        major_id: params.id,
        course_id: course,
      })
      .then(async (response) => {
        const response2 = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/majorCourses/major/${params.id}`
          );
          const data2: MajorCoursesType[] = response2.data;
          setMajorCourses(data2);
        toast.success("Course added successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred");
      });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/majorCourses/${id}`
      );
      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/majorCourses/major/${params.id}`
      );
      const data2: MajorCoursesType[] = response2.data;
      setMajorCourses(data2);
      toast.success("Course deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="lg:w-[40vw] sm:w-[90vw]">
        <div className="flex items-center gap-2 py-10">
          <Select onValueChange={(e) => setCourse(parseInt(e))}>
            <SelectTrigger className="lg:w-[30rem] ">
              <SelectValue placeholder="Select a Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Department</SelectLabel>
                {courses.map((t) => (
                  <SelectItem key={t.id} value={t.id?.toString() || ""}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className=" bg-baby-blue hover:bg-blue-400"
            onClick={handleAddCourseToMajor}
          >
            Add Course
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Courses found"} >
            {majorCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="flex w-full justify-between items-center">
                  <span>{course?.course.name}</span>
                  <div className="flex items-center gap-3">
                    <Tooltip content="Delete section">
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
