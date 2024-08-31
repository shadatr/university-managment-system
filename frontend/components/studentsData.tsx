"use client"
import { StudentType } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

  const [students, setStudents] = useState<StudentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student`
      );
      const students: StudentType[] = response.data;
      setStudents(students);
    };
    fetchData();
  }, []);

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "SURAME", uid: "surname", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "MAJOR", uid: "major", sortable: true},
  {name: "ADVISOR", uid: "advisor"},
];


export {columns, students};
