"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronRight,
  Contact,
  HandPlatter,
  MapPin,
  MoreHorizontal,
  Star,
  Timer,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type BookingHistoryColumn = {
  id: string;
  staffName: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
  staffEmail: string;
  staffAvatar: string;
  paymentLink?: string;
  paymentMethod?: string;
};

export const requestHistoryCollumn: ColumnDef<BookingHistoryColumn>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <Contact className="text-crusta text-sm mr-2" />
        <p>{row.getValue("id")}</p>
      </div>
    ),
  },

  {
    accessorKey: "staffName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên nhân viên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="flex text-[16px] ml-3">
        <div className="flex items-center">
          <img
            className="rounded-full min-w-[32px] max-w-[32px] mr-2"
            src={row.original.staffAvatar}
            alt={row.original.staffName}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p>{row.getValue("staffName")}</p>
          <p className="text-sm text-gray-400">{row.original.staffEmail}</p>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "serviceName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên Dịch vụ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <HandPlatter className=" text-crusta text-sm mr-2" />
        <p className="mb-1">{row.getValue("serviceName")}</p>
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tháng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <Timer className=" text-crusta text-sm mr-2" />
        <p>{row.getValue("date")}</p>
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <Timer className=" text-crusta text-sm mr-2" />
        <p>{row.getValue("time")}</p>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <div className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center rounded-3xl py-1 w-36",
              row.getValue("status") === "pending" && "bg-yellow-100",
              row.getValue("status") === "paid" && "bg-blue-100",
              row.getValue("status") === "confirmed" && "bg-orange-100",
              row.getValue("status") == "complete" && "bg-green-100",
              row.getValue("status") == "canceled" && "bg-red-100"
            )}
          >
            <span className="relative flex h-3 w-3">
              <span
                className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  row.getValue("status") == "pending" && "bg-yellow-400",
                  row.getValue("status") == "paid" && "bg-blue-400",
                  row.getValue("status") == "confirmed" && "bg-orange-400",
                  row.getValue("status") == "canceled" && "bg-red-400",
                  row.getValue("status") == "complete" && "bg-green-400"
                )}
              ></span>
              <span
                className={cn(
                  "relative inline-flex rounded-full h-3 w-3 bg-sky-500",
                  row.getValue("status") == "pending" && "bg-yellow-500",
                  row.getValue("status") == "paid" && "bg-blue-500",
                  row.getValue("status") == "confirmed" && "bg-orange-500",
                  row.getValue("status") == "canceled" && "bg-red-500",
                  row.getValue("status") == "complete" && "bg-green-500"
                )}
              ></span>
            </span>
            <p className="mb-1 ml-2">
              {row.getValue("status") === "pending" && "Chờ thanh toán"}
              {row.getValue("status") === "paid" && "Chờ xác nhận"}
              {row.getValue("status") === "confirmed" && "Đã xác nhận"}
              {row.getValue("status") === "complete" && "Hoàn thành"}
              {row.getValue("status") === "canceled" && "Đã hủy"}
              {![
                "pending",
                "complete",
                "canceled",
                "confirmed",
                "paid",
              ].includes(row.getValue("status")) && row.getValue("status")}
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "customerAvatar",
    header: () => {
      return <div className="hidden"></div>;
    },
    cell: () => <div className="hidden"></div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/profile/booking-history/detail/${row.original.id}`}>
            <ChevronRight className="text-crusta" />
          </Link>
        </div>
      );
    },
  },
];
