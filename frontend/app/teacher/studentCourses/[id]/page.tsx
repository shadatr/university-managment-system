"use client";

import { CourseSectionType, StudentCourseType } from "@/types/types";
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
  Tabs,
  Tab,
  Spinner,
  Selection,
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
import { set } from "date-fns";

export default function App({ params }: { params: { id: string } }) {
  const [sections, setSections] = useState<CourseSectionType[]>([]);
  const [section, setSection] = useState<number>();
  const [studentCourses, setStudentCourses] = useState<StudentCourseType[]>([]);
  const [waitingStudentCourses, setWaitingStudentCourses] = useState<
    StudentCourseType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set([]));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection`
        );
        const data: CourseSectionType[] = response.data;
        setSections(data);
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${params.id}`
        );
        const data2: StudentCourseType[] = response2.data;
        const acceptedCourses = data2.filter((course) => course.accepted);
        const waitingCourses = data2.filter((course) => !course.accepted);
        setStudentCourses(acceptedCourses);
        setWaitingStudentCourses(waitingCourses);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAddCourseToMajor = () => {
    if (!section) {
      toast.error("Please select a course ");
      return;
    }

    const data = {
      student_id: parseInt(params.id),
      section_id: section,
      accepted: true,
      active: true,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse`, data)
      .then(async () => {
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${params.id}`
        );
        const data2: StudentCourseType[] = response2.data;
        const acceptedCourses = data2.filter((course) => course.accepted);
        const waitingCourses = data2.filter((course) => !course.accepted);
        setStudentCourses(acceptedCourses);
        setWaitingStudentCourses(waitingCourses);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/${id}`
      );
      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${params.id}`
      );
      const data2: StudentCourseType[] = response2.data;
      const acceptedCourses = data2.filter((course) => course.accepted);
      const waitingCourses = data2.filter((course) => !course.accepted);
      setStudentCourses(acceptedCourses);
      setWaitingStudentCourses(waitingCourses);
      toast.success("Course deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  const handleAcceptCourses = async () => {
    setLoading(true);
    try {
      for (const key of selectedKeys) {
        const course = waitingStudentCourses.find((course) => course.id == key);
        const data = {
          section_id: course?.section?.id,
          student_id: course?.student?.id,
          active: true,
          accepted: true,
        };
        console.log(data);
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/${key}`,
          data
        );
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${params.id}`
        );
        const data2: StudentCourseType[] = response2.data;
        const acceptedCourses = data2.filter((course) => course.accepted);
        const waitingCourses = data2.filter((course) => !course.accepted);
        setStudentCourses(acceptedCourses);
        setWaitingStudentCourses(waitingCourses);
        toast.success("Courses accepted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="flex flex-col lg:w-[40vw] sm:w-[90vw]">
        <Tabs
          aria-label="Options"
          placement={"top"}
          className="flex justify-center items-center"
        >
          <Tab key="Studentcourses" title="Student courses">
            <div>
              <div className="flex items-center gap-2 py-10">
                <Select onValueChange={(e) => setSection(parseInt(e))}>
                  <SelectTrigger className="lg:w-[30rem] sm:w-[25rem]">
                    <SelectValue placeholder="Select a Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Department</SelectLabel>
                      {sections.map((t) => (
                        <SelectItem key={t.id} value={t.id?.toString() || ""}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  className=" bg-baby-blue hover:bg-blue-400 text-white"
                  onClick={handleAddCourseToMajor}
                >
                  Add Course
                </Button>
              </div>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Courses found"}>
                  {studentCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="flex w-full justify-between items-center">
                        <span>{course?.section?.name}</span>
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
          </Tab>
          <Tab key="Courseswaiting" title="Courses Waiting for approval ">
            <Button
              className={`my-4 ${
                selectedKeys.size ? "bg-baby-blue text-white" : ""
              }`}
              onClick={handleAcceptCourses}
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
              Accept Courses
            </Button>
            <Table
              aria-label="Controlled table example with dynamic content"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys: Selection) => {
                setSelectedKeys(new Set(keys as Set<number>)); 
              }}            >
              <TableHeader>
                <TableColumn>Course Name</TableColumn>
                <TableColumn>Teacher</TableColumn>
              </TableHeader>
              <TableBody
                items={waitingStudentCourses}
                emptyContent={"No Courses found"}
                isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
              >
                {(course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.section?.name}</TableCell>
                    <TableCell>{course.section?.teacher.name}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
