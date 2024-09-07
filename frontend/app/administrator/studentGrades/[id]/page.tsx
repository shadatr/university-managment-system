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

const Page = ({ params }: { params: { id: string } }) => {
  const [transcriptGrades, setTranscriptGrades] = useState<StudentCourseType[]>(
    []
  );
  const [currentGrades, setCurrentGrades] = useState<StudentCourseType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/pastStudentCourses/${params.id}`
        );
        const data: StudentCourseType[] = response.data;
        setTranscriptGrades(data);

        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/activeStudentCourses/${params.id}`
        );
        const data2: StudentCourseType[] = response2.data;
        setCurrentGrades(data2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const groupBySemester = (grades: any) => {
    return grades.reduce((acc: any, grade: any) => {
      const semester = grade.section?.semester;
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(grade);
      return acc;
    }, {});
  };

  const groupedTranscriptGrades = groupBySemester(transcriptGrades);

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="flex flex-col lg:w-[70vw] sm:w-[90vw] justify-end items-center ">
        <Tabs
          aria-label="Options"
          placement={"top"}
          className="flex justify-center items-center"
        >
          <Tab key="Studentcourses" title="Student Grades">
            <Table
              isStriped
              aria-label="Example static collection table"
              className="lg:w-[70vw] sm:w-[90vw]"
            >
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
                    <TableCell>{currentGrade?.section?.name} </TableCell>
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
          </Tab>
          <Tab key="transcript" title="Transcript">
            {Object.keys(groupedTranscriptGrades).map((semester) => (
              <Card
                key={semester}
                className="lg:w-[400px] sm:w-[300px] lg:p-3 sm:p-1 mt-5 sm:text-xsm lg:text-lg"
              >
                <CardHeader className="flex gap-3 items-center justify-center">
                  <p className="text-md">{semester} Semester</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  {groupedTranscriptGrades[semester].map(
                    (grade: StudentCourseType, index: any) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <p key={index}>{grade.section?.course.name}</p>
                        <p
                          key={index}
                          className={
                            grade.passed ? "text-green-500" : "text-red-500"
                          }
                        >
                          {grade.final_grade}
                        </p>
                      </div>
                    )
                  )}
                </CardBody>
              </Card>
            ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
