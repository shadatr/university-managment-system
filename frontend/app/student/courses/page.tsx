"use client";

import { CourseSectionType, StudentCourseType } from "@/types/types";
import axios from "axios";
import React, { act, useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";

export default function App() {
  const session = useSession();

  const [sections, setSections] = useState<CourseSectionType[]>([]);
  const [section, setSection] = useState<number>();
  const [studentCourses, setStudentCourses] = useState<StudentCourseType[]>([]);
  const [waitingStudentCourses, setWaitingStudentCourses] = useState<
    StudentCourseType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection`
        );
        const data: CourseSectionType[] = response.data;
        setSections(data);
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${session.data?.user.id}`
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
  }, [session.data?.user.id]);

  const handleAddCourseToMajor = () => {
    if (!section) {
      toast.error("Please select a course ");
      return;
    }

    const data = {
      student_id: session.data?.user.id,
      section_id: section,
      accepted: false,
      active: true,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse`, data)
      .then(async () => {
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${session.data?.user.id}`
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${session.data?.user.id}`
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

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="flex flex-col lg:w-[40vw] sm:w-[90vw]">
        <Tabs
          aria-label="Options"
          placement={"top"}
          className="flex justify-center items-center"
        >
          <Tab key="currentCourses" title="Current courses">
            <Table aria-label="Controlled table example with dynamic content">
              <TableHeader>
                <TableColumn>Course Name</TableColumn>
                <TableColumn>Teacher</TableColumn>
              </TableHeader>
              <TableBody
                items={studentCourses}
                emptyContent={"No Courses found"}
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
          <Tab key="coursesRequest" title="Courses request">
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
                <TableBody
                  emptyContent={"No Courses found"}
                  isLoading={isLoading}
                  loadingContent={<Spinner label="Loading..." />}
                >
                  {waitingStudentCourses.map((course) => (
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
        </Tabs>
      </div>
    </div>
  );
}
