"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import {
  ArrowLeft,
  ArrowRight,
  CircleArrowLeft,
  CircleArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const router = useRouter();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const [position, setPosition] = useState(
    table
      .getAllColumns()
      .filter((item) => !item.id.toLowerCase().includes("avatar"))[0].id
  );
  useEffect(() => {
    router.refresh();
    table.setPageSize(6);
  }, []);

  const labelArray = {
    id: "Mã ID",
    date: "Ngày đặt",
    workoption: "Diện tích làm việc",
    workduration: "Thời gian làm việc",
    staffnumber: "Số lượng nhân viên",
    price: "Giá",
    actions: "",
    username: "Tên Khách Hàng",
    role: "Vai trò",
    createdat: "Ngày tạo",
    status: "Trạng Thái",
    customername: "Tên Khách Hàng",
    datetransaction: "Ngày giao dịch",
    amount: "Số tiền",
    worklocation: "Vị trí làm việc",
    image: "Hình ảnh minh họa",
    description: "Nội dung làm việc",
    servicename: "Dịch vụ",
    address: "Địa chỉ",
    customeravatar: "",
    staffname: "Nhân viên",
    type: "Loại đơn",
    staffgender: "Giới tính",
    age: "Tuổi",
    credibility: "Đánh giá",
  };
  return (
    <div>
      <div className="flex lg:items-center gap-2 py-4 lg:flex-row flex-col">
        <div className="flex lg:flex-row md:flex-row flex-col gap-2">
          <Input
            placeholder={`Tìm kiếm theo ${labelArray[position.toLowerCase() as keyof typeof labelArray]
              }`}
            value={
              (table.getColumn(position)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              let searchKeywork = event.target.value
              return table
                .getColumn(position)
                ?.setFilterValue(searchKeywork);
            }}
            className="min-w-[250px] mr-4 text-center"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto border-2">
                {position
                  ? `${labelArray[
                  position.toLowerCase() as keyof typeof labelArray
                  ]
                  }`
                  : "Columns"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {table
                  .getAllColumns()
                  .filter((item) => {
                    return (
                      !item.id.toLowerCase().includes("image") &&
                      !item.id.toLowerCase().includes("avatar")
                    );
                  })
                  .filter((column) => column.id != "actions")
                  .map((column) => {
                    return (
                      <DropdownMenuRadioItem
                        key={column.id}
                        className="capitalize"
                        value={column.id}
                      >
                        {`${labelArray[
                          column.id.toLowerCase() as keyof typeof labelArray
                        ]
                          }`}
                      </DropdownMenuRadioItem>
                    );
                  })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Chọn cột hiển thị
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter(column => column.id !== "actions" && column.id !== "customerAvatar")
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {`${labelArray[column.id.toLowerCase() as keyof typeof labelArray]}`}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="mt-4 shadow-md"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 text-crusta">
        <Button
          variant="outline"
          className="px-5 py-2 rounded-lg"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft className="w-4 mr-1" />
          Trước
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center px-5 py-2 rounded-lg"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sau
          <ArrowRight className="w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
