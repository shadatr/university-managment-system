"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { StudentCourseType } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App({ params }: { params: { id: string } }) {
  const [students, setStudents] = useState<StudentCourseType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/sectionStudents/${params.id}`
      );
      const students: StudentCourseType[] = response.data;
      setStudents(students);
    };
    fetchData();
  }, []);

  const handleInputGrade = (value: string, id?: number, type?: string) => {
    const updatedStudents = students?.map((student) => {
      if (student.id == id) {
        return {
          ...student,
          [type as keyof StudentCourseType]: Number(value),
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const handleSaveChanges = async () => {
    console.log({students});
    const updateStudents= students.map((student) => {
      return{
        ...student,
        student_id: student.student?.id,
        section_id: student.section?.id,
      }
    });
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/studentCourse/updateGrades`,
        updateStudents
      );
      toast.success("Grades updated successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="lg:w-[70vw] sm:w-[90vw]">
        <Button className="my-4" onClick={handleSaveChanges}>Save Changes</Button>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>HOMEWORK</TableColumn>

            <TableColumn>MIDTERM</TableColumn>
            <TableColumn>FINAL</TableColumn>
            <TableColumn>FINAL GRADE</TableColumn>

            <TableColumn>PASSED</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Students found"}>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  {student?.student?.name} {student.student?.surname}
                </TableCell>
                <TableCell>
                  <Input
                    defaultValue={student?.homework?.toString() || ""}
                    className="w-20"
                    onChange={(e) =>
                      handleInputGrade(
                        e.target.value,
                        student.id,
                        "homework" || ""
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="w-20"
                    defaultValue={student?.midterm?.toString() || ""}
                    onChange={(e) =>
                      handleInputGrade(e.target.value, student.id, "midterm")
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="w-20"
                    defaultValue={student?.final_exam?.toString() || ""}
                    onChange={(e) =>
                      handleInputGrade(e.target.value, student.id, "final_exam")
                    }
                  />
                </TableCell>
                <TableCell>{student?.final_grade}</TableCell>
                <TableCell>
                  <span className={student.final_grade != null
                      ? student.passed?"text-green-500":"text-red-500":""}>
                    {student.final_grade != null
                      ? student.passed
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
}
