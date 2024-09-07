"use client";
import { CourseType, CourseSectionType, TeacherType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DeleteIcon } from "@/components/ui/DeleteIcon";
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
import { UsersIcon } from "lucide-react";

const Page = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<CourseType>();
  const [edit, setEdit] = useState<boolean>(false);
  const name = useRef<HTMLInputElement>(null);
  const hours = useRef<HTMLInputElement>(null);
  const credits = useRef<HTMLInputElement>(null);
  const [courseSections, setCourseSections] = useState<CourseSectionType[]>([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [teacher, setTeacher] = useState<number>();
  const [year, setYear] = useState<string>();
  const [term, setTerm] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection`
        );
        const data: CourseSectionType[] = response.data;
        setCourseSections(data);
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/${params.id}`
        );
        const data2: CourseType = response2.data;
        setCourse(data2);

        const response3 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teacher`
        );
        const data3: TeacherType[] = response3.data;
        setTeachers(data3);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [edit]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection/${id}`
      );
      setCourseSections(courseSections.filter((c) => c.id !== id));
      toast.success("Section deleted successfully");
    } catch (error) {
      toast.error("Error deleting Section");
    }
  };

  const handleAddSection = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection`,
        {
          name: `${course?.name} (Section ${courseSections.filter((i)=>i.course.id==course?.id).length + 1})`,
          course_id: course?.id,
          semester: `${year}-${term}`,
          teacher_id: teacher,
        }
      );
      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection`
      );
      const data: CourseSectionType[] = response2.data;
      setCourseSections(data);
      toast.success("Section added successfully");
    } catch (error) {
      toast.error("Error adding Section");
    }
  };

  const handleEdit = async () => {
    const data = {
      name: name.current?.value,
      hours: parseInt(hours.current?.value || ""),
      credits: parseInt(credits.current?.value || ""),
    };
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/${params.id}`,
          data
        )
        .then(() => {
          setEdit(!edit);
          toast.success("Course information updated successfully");
        });
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-[100wv] justify-center items-center flex">
      <div className="flex flex-col lg:w-[60vw] sm:w-[90vw] pt-10 ">
        <Tabs
          aria-label="Options"
          placement={"top"}
          className="flex justify-center items-center"
        >
          <Tab key="courseInformation" title="Course Information">
            <div >
              {edit ? (
                <Button
                  className="my-2"
                  onClick={() => {
                    handleEdit();
                  }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  className="my-2"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  Edit Course Information
                </Button>
              )}
              <Table isStriped aria-label="Example static collection table ">
                <TableHeader>
                  <TableColumn>Course INFORMATION</TableColumn>
                  <TableColumn>{""}</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell className="w-[100px]">Name</TableCell>
                    {edit ? (
                      <TableCell>
                        <Input
                          size="sm"
                          defaultValue={course?.name || ""}
                          type="text"
                          ref={name}
                        />
                      </TableCell>
                    ) : (
                      <TableCell>{course?.name}</TableCell>
                    )}
                  </TableRow>
                  <TableRow key="2">
                    <TableCell className="w-[100px]">Hours</TableCell>
                    {edit ? (
                      <TableCell>
                        <Input
                          size="sm"
                          defaultValue={course?.hours.toString() || ""}
                          type="number"
                          ref={hours}
                        />
                      </TableCell>
                    ) : (
                      <TableCell>{course?.hours}</TableCell>
                    )}
                  </TableRow>
                  <TableRow key="3">
                    <TableCell className="w-[100px]">Credits</TableCell>
                    {edit ? (
                      <TableCell>
                        <Input
                          size="sm"
                          defaultValue={course?.credits.toString() || ""}
                          type="number"
                          ref={credits}
                        />
                      </TableCell>
                    ) : (
                      <TableCell>{course?.credits}</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Tab>
          <Tab key="sections" title="Course Sections">
            <div >
              <div className="flex items-center gap-2 py-10">
              <Select onValueChange={(e) => setTerm(e)}>
                  <SelectTrigger >
                    <SelectValue placeholder="Select a Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Term</SelectLabel>
              
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Spring">Spring</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select onValueChange={(e) => setYear(e)}>
                  <SelectTrigger >
                    <SelectValue placeholder="Select a Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year</SelectLabel>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              
                <Select onValueChange={(e) => setTeacher(parseInt(e))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Teachers</SelectLabel>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id?.toString() || ""}>
                          {t.name} {t.surname}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  className=" bg-baby-blue hover:bg-blue-400 lg:w-[30rem] sm:w-[10rem]"
                  onClick={handleAddSection}
                >
                  Add New Section
                </Button>
              </div>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>TEACHER</TableColumn>
                  <TableColumn>SEMESTER</TableColumn>
                </TableHeader>
                <TableBody>
                  {courseSections.map((section) => (
                    <TableRow key={section.id}>
                      <TableCell>{section?.name}</TableCell>
                      <TableCell>{section?.teacher.name}</TableCell>
                      <TableCell className="flex w-full justify-between items-center">
                        <span>{section?.semester}</span>
                        <div className="flex items-center gap-3">
                          <Tooltip content="Students Grades">
                            <Link
                              href={`/administrator/grades/${section.id}`}
                              className="text-xsm cursor-pointer active:opacity-50"
                            >
                              <UsersIcon />
                            </Link>
                          </Tooltip>
                          <Tooltip content="Delete section">
                            <span
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                              onClick={() => handleDelete(section.id || 0)}
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
};

export default Page;
