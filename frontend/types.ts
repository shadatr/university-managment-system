export type StudentType ={
    id?: number;
    name: string;
    surname: string;
    email: string;
    phone: number;
    address: string;
    birth_date: string;
    password: string;
    major?: MajorType;
    advisor?: TeacherType;
    studentCourses?: StudentCourseType[];
    major_id: number;
    advisor_id?: number;
}

export type TeacherType ={
    id?: number;
    name: string;
    surname: string;
    email: string;
    phone: number;
    address: string;
    birth_date: string;
    password: string;
    major:string;
    department: string;
    courseSection?: CourseSectionType[];
}
export type AdministratorType ={
    id?: number;
    name: string;
    surname: string;
    email: string;
    phone: number;
    address: string;
    birth_date: string;
    password: string;
}

export type DepartmentType ={   
    id: number;
    name: string;
    majors: MajorType[];
}

export type MajorType ={
    id: number;
    name: string;
    credits: number;
    department: DepartmentType;
    students: StudentType[];
    majorCourses: MajorCoursesType[];
}

export type CourseType ={
    id: number;
    name: string;
    credits: number;
    hours: number;
    courseSections: CourseSectionType[];
    majorCourses: MajorCoursesType[];
}

export type MajorCoursesType ={
    id: number;
    major: MajorType;
    course: CourseType;
}

export type CourseSectionType ={
    id: number;
    name: string;
    course: CourseType;
    teacher: TeacherType;
    students: StudentCourseType[];
}

export type StudentCourseType ={
    id: number;
    student: StudentType;
    section: CourseSectionType;
    homeworks: number;
    midterm: number;
    final_exam: number;
    final_grade: number;
    passed: boolean;
    active: boolean;
    accepted: boolean;
}

