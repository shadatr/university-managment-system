"use client";

import { CourseSectionType, CourseType, StudentCourseType } from "@/types";
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
  Tabs,
  Tab,
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
  const [sections, setSections] = useState<CourseSectionType[]>([]);
  const [section, setSection] = useState<number>();
  const [studentCourses, setStudentCourses] = useState<StudentCourseType[]>([]);
  const [waitingStudentCourses, setWaitingStudentCourses] = useState<
    StudentCourseType[]
  >([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

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
    console.log(selectedKeys);
    try {
      for (const key of selectedKeys) {
        const course = waitingStudentCourses.find((course) => course.id == key);
        console.log(course);
        console.log(key);
        console.log(waitingStudentCourses);
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
  };

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="flex flex-col w-[800px] ">
        <Tabs
          aria-label="Options"
          placement={"top"}
          className="flex justify-center items-center"
        >
          <Tab key="Student courses" title="Studentcourses">
            <div className="w-[800px]">
              <div className="flex items-center gap-2 py-10">
                <Select onValueChange={(e) => setSection(parseInt(e))}>
                  <SelectTrigger className="w-[30rem]">
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
                <TableBody emptyContent={"No Courses found"}>
                  {studentCourses.map((course) => (
                    <TableRow>
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
            >
              Accept Courses
            </Button>
            <Table
              aria-label="Controlled table example with dynamic content"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn>Course Name</TableColumn>
                <TableColumn>Teacher</TableColumn>
              </TableHeader>
              <TableBody
                items={waitingStudentCourses}
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
        </Tabs>
      </div>
    </div>
  );
}
