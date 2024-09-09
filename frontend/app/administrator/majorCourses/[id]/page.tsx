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
  Tooltip,
  Button,
  Spinner,
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
import { toast } from "sonner";

export default function App({ params }: { params: { id: string } }) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [course, setCourse] = useState<number>();
  const [majorCourses, setMajorCourses] = useState<MajorCoursesType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };
    fetchData();
  }, [params.id]);

  const handleAddCourseToMajor = () => {
    if (!course) {
      toast.error("Please select a course");
      return;
    }
    setLoading(true);
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
    setLoading(false);
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
                <SelectLabel>Course</SelectLabel>
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
          >
            Add Course
          </Button>
        </div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Courses found"} isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}>
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
