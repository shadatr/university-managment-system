"use client";

import { CourseSectionType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function App({ params }: { params: { id: string } }) {
  const [teacherCourses, setTeacherCourses] = useState<CourseSectionType[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courseSection/teacherCourses/${params.id}`
        );
        const data2: CourseSectionType[] = response2.data;
        setTeacherCourses(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="flex justify-center items-center w-[100vw] pt-20">
      <div className="flex flex-col lg:w-[60vw] sm:w-[90vw]">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>COURSE NAME</TableColumn>
            <TableColumn>SRCTION NAME</TableColumn>
            <TableColumn>HOURS</TableColumn>
            <TableColumn>CREDITS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Courses found"}>
            {teacherCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell >
                  {course?.course.name}
                </TableCell>
                <TableCell >
                  {course?.name}
                </TableCell>
                <TableCell >
                  {course?.course.hours}
                </TableCell>
                <TableCell >
                  {course?.course.credits}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
