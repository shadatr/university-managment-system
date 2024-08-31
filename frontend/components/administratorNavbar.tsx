"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const studnetComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Register Student",
    href: "/administrator/registerStudent",
    description: "Add a new student to the university.",
  },
  {
    title: "Student Information",
    href: "/administrator/students",
    description: "Search for student and edit student information.",
  },
  {
    title: "Student Courses",
    href: "/administrator/studentCourses",
    description: "View student courses and accept sleceted courses.",
  },
  {
    title: "Student grades",
    href: "/administrator/studentGrades",
    description: "View student grades and gpa for all semester.",
  },
];

const TeacherComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Register Teacher",
    href: "/administrator/registerTeacher",
    description: "Add a new teacher to the university.",
  },
  {
    title: "Teacher Information",
    href: "/administrator/teacherInformation",
    description: "Search for teacher and edit teacher information.",
  },
  {
    title: "Teacher Courses",
    href: "/administrator/teacherCourses",
    description: "View teacher currect courses.",
  },
  {
    title: "Teacher advisor students",
    href: "/administrator/teacherAdvisorStudents",
    description:
      "View teacher advisor students, add, delete or upadte advisor students.",
  },
];

const AdministratorComponents: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: "Register Admin",
      href: "/administrator/registerAdmin",
      description: "Add a new Admin to the university.",
    },
    {
      title: "Admin Information",
      href: "/administrator/adminInformation",
      description: "Search for admin and edit admin information.",
    }
  ];

const faculitiesComponents: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: "Register Department",
      href: "/administrator/registerDepartment",
      description: "Add a new Department to the university.",
    },
    {
      title: "Department Information",
      href: "/administrator/departmentInformation",
      description: "Search for department and edit department majors.",
    },
    {
        title: "Register major",
        href: "/administrator/registerMajor",
        description: "Add a new major to the university.",
      },
      {
        title: "Major Information",
        href: "/administrator/majorInformation",
        description: "Search for major and edit major students and courses.",
      },
      {
        title: "Register Course",
        href: "/administrator/registerCourse",
        description: "Add a new Course to the university.",
      },
      {
        title: "Course Information",
        href: "/administrator/courseInformation",
        description: "Search for course and edit course information.",
      },
      {
        title: "Register Cousre Section",
        href: "/administrator/registerCourseSection",
        description: "Add a new Course Section to the university.",
      },
      {
        title: "Course Section Information",
        href: "/administrator/courseSectionInformation",
        description: "Search for courses sections and edit thier information (students, teacher and grades).",
      },

  ];

const AdministratorNavbar = () => {
  return (
    <div className="pt-14 bg-baby-blue flex justify-center items-center ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-baby-blue text-white text-base">Students</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {studnetComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-baby-blue text-white text-base">Teachers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {TeacherComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-baby-blue text-white text-base">Administrators</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {AdministratorComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-baby-blue text-white text-base">Faculities</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {faculitiesComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default AdministratorNavbar;
