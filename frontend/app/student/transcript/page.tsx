"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { StudentCourseType } from "@/types/types";

import axios from "axios";
import { useSession } from "next-auth/react";

const Page = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const [transcriptGrades, setTranscriptGrades] = useState<StudentCourseType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/pastStudentCourses/${params.id}`
        );
        const data: StudentCourseType[] = response.data;
        setTranscriptGrades(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [session.data?.user.id]);

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
      <div className="flex flex-col lg:w-[70vw] sm:w-[90vw] justify-end items-center">
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
                  <div className="flex items-center justify-between">
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
        {Object.keys(groupedTranscriptGrades).length === 0 && (
          <Card
          className="lg:w-[400px] h-[300px] sm:w-[300px] lg:p-3 sm:p-1 mt-5 sm:text-xsm lg:text-lg"
        >
  
          <CardBody>
            <p className="text-center flex justify-center items-center h-full text-gray-400 ">No transcript found</p>
          </CardBody>
        </Card>
        )}
      </div>
    </div>
  );
};

export default Page;
