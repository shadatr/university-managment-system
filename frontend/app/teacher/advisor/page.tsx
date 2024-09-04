"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/ui/verticalDotsIcon";
import { SearchIcon } from "@/components/ui/searchIcon";
import { StudentType } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon } from "@/components/ui/EyeIcon";
import { BookIcon } from "@/components/ui/BookIcon";
import { useSession } from "next-auth/react";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "surname",
  "major",
  "advisor",
  "actions",
];
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "SURNAME", uid: "surname", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "MAJOR", uid: "major", sortable: true },
  { name: "ADVISOR", uid: "advisor" },
  { name: "ACTIONS", uid: "actions" },
];

export default function App() {
  const session = useSession();

  const [filterValue, setFilterValue] = React.useState("");

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const router = useRouter();
  const [students, setStudents] = useState<StudentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/student/advisorStudents/${session.data?.user.id}`
      );
      const students: StudentType[] = response.data;
      setStudents(students);
      console.log(students);
    };
    fetchData();
  }, [session.data?.user.id]);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);


  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...students];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [students, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: StudentType, b: StudentType) => {
      const first = a[sortDescriptor.column as keyof StudentType] as number;
      const second = b[sortDescriptor.column as keyof StudentType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: StudentType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof StudentType];

      switch (columnKey) {
        case "name":
          return (
            <User
              description={user.email}
              name={typeof cellValue === "string" ? cellValue : ""}
            >
              {user.email}
            </User>
          );
        case "surname":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {typeof cellValue === "string" ? cellValue : ""}
              </p>
            </div>
          );
        case "major":
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {cellValue && typeof cellValue === "object" && "name" in cellValue
                ? (cellValue as { name: string }).name
                : ""}
            </Chip>
          );
        case "advisor":
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {cellValue && typeof cellValue === "object" && "name" in cellValue
                ? (cellValue as { name: string }).name
                : ""}
            </Chip>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2 pl-5">
              <Tooltip content="Courses">
                <Link href={`/administrator/studentCourses/${user.id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <BookIcon />
                </Link>
              </Tooltip>
              <Tooltip content="View profile">
                <Link href={`/teacher/studentInformation/${user.id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </Link>
              </Tooltip>
          
            </div>
          );
        default:
          return (
            <span>
              {typeof cellValue === "string" || typeof cellValue === "number"
                ? cellValue
                : ""}
            </span>
          );
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {students.length} students
          </span>
          <div className="flex justify-center items-center gap-2">
        
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    students.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [ items.length, page, pages, hasSearchFilter]);

  return (
    <div className="flex justify-center items-center w-[100vw] pt-10">
      <div className="lg:w-[70vw] sm:w-[90vw] ">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[700px]",
          }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No students found"} items={sortedItems}>
            {(item) => (
              <TableRow>
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
