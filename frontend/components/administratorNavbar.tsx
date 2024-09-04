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
import { LogOut, User } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import { signOut } from "next-auth/react";

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
    href: "/administrator/teachers",
    description: "Search for teacher, edit teacher information and view courses and students.",
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
    href: "/administrator/administrators",
    description: "Search for admin and edit admin information.",
  },
];

const faculitiesComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Department",
    href: "/administrator/department",
    description: "Add, view and delete university departments.",
  },

  {
    title: "Major",
    href: "/administrator/major",
    description:
      "Add, view and delete major to the university and view major students.",
  },

  {
    title: "Course",
    href: "/administrator/course",
    description: "Add a new Course and view courses and thier sections and grades.",
  },

];

const AdministratorNavbar = () => {
  return (
    <div className=" bg-baby-blue flex justify-center items-center ">
      <NavigationMenu className="lg:pt-14 sm:pt-10">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-baby-blue text-white lg:text-base sm:text-xs">
              Students
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] sm:w-[250px] ">
                {studnetComponents.map((component) => (
                  <ListItem
                  className=""
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
          <NavigationMenuTrigger className="bg-baby-blue text-white lg:text-base sm:text-xs">
              Teachers
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] sm:w-[250px]">
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
          <NavigationMenuTrigger className="bg-baby-blue text-white lg:text-base sm:text-xs">
              Administrators
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] sm:w-[250px]">
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
          <NavigationMenuTrigger className="bg-baby-blue text-white lg:text-base sm:text-xs">
              Faculities
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] sm:w-[250px]">
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
      
      <div  className="lg:m-5 sm:m-2 top-0 right-0 absolute hover:cursor-pointer lg:mx-10 flex items-center gap-3">
        <Link href={"/administrator/profile"}>
        <Avatar className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"/>
        </Link>
        <LogOut className="w-6 h-6" onClick={() => {signOut({ redirect: true }); localStorage.removeItem("user")}}/></div>
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
            "block select-none space-y-1 rounded-md lg:p-3 sm:p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="lg:text-sm sm:text-xsm  font-medium leading-none">{title}</div>
          <p className="line-clamp-2 lg:text-sm sm:text-xsm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default AdministratorNavbar;
