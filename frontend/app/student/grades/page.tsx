"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { StudentCourseType } from "@/types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";

const Page = () => {
  const [currentGrades, setCurrentGrades] = useState<StudentCourseType[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${session.data?.user.id}`
        );
        const data2: StudentCourseType[] = response2.data;
        setCurrentGrades(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="flex flex-col lg:w-[70vw] sm:w-[90vw] justify-end items-center ">
            <Table isStriped aria-label="Example static collection table" className="lg:w-[70vw] sm:w-[90vw]">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>HOMEWORK</TableColumn>

                <TableColumn>MIDTERM</TableColumn>
                <TableColumn>FINAL</TableColumn>
                <TableColumn>FINAL GRADE</TableColumn>

                <TableColumn>PASSED</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No currentGradess found"}>
                {currentGrades.map((currentGrade) => (
                  <TableRow key={currentGrade.id}>
                    <TableCell>
                      {currentGrade?.section?.name}{" "}
                    </TableCell>
                    <TableCell>{currentGrade?.homework}</TableCell>
                    <TableCell>{currentGrade?.midterm}</TableCell>
                    <TableCell>{currentGrade?.final_exam}</TableCell>
                    <TableCell>{currentGrade?.final_grade}</TableCell>
                    <TableCell>
                      <span
                        className={
                          currentGrade.final_grade != null
                            ? currentGrade.passed
                              ? "text-green-500"
                              : "text-red-500"
                            : ""
                        }
                      >
                        {currentGrade.final_grade != null
                          ? currentGrade.passed
                            ? "passed"
                            : "failed"
                          : ""}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
         
      </div>
    </div>
  );
};

export default Page;
