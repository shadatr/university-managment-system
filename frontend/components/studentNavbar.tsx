"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import { signOut } from "next-auth/react";

const StudentNavbar = () => {
  return (
    <div className=" bg-baby-blue flex justify-center items-center ">
      <NavigationMenu className="lg:pt-14 sm:pt-10">
        <NavigationMenuList className="flex gap-10 font-medium p-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              href={"/student/courses"}
              className={"bg-baby-blue text-white text-base"}
            >
              Courses
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <NavigationMenuLink
              href={"/student/grades"}
              className={"bg-baby-blue text-white text-base"}
            >
              Grades
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuLink
              href={"/student/transcript"}
              className={"bg-baby-blue text-white text-base"}
            >
              Transcript
            </NavigationMenuLink>
  
        </NavigationMenuList>
      </NavigationMenu>
      <div className="lg:m-5 sm:m-2 top-0 right-0 absolute hover:cursor-pointer lg:mx-10 flex items-center gap-3">
        <Link href={"/student/profile"}>
          <Avatar className="sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
        </Link>
        <LogOut
          className="w-6 h-6"
          onClick={() => {
            signOut({ redirect: true });
            localStorage.removeItem("user");
          }}
        />
      </div>
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

export default StudentNavbar;
