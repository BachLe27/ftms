"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TransactionColumnType } from "@/type/transaction";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import TransactionCellAction from "./TransactionCellAction";
import { cn } from "@/lib/utils";

export const getStatusTransaction = (status: string): string => {
  switch (status) {
    case "pending":
      return "Chờ thanh toán";
    case "paid":
      return "Đã thanh toán";
    case "confirmed":
      return "Đã thanh toán";
    case "complete":
      return "Đã thanh toán";
    default:
      return status;
  }
};

export const TransactionColumn: ColumnDef<TransactionColumnType>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: () => {
      return <div className="ml-4 text-crusta">Mã yêu cầu</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4">
          <p>#{row.getValue("id")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-crusta flex items-center">
            Tên Khách Hàng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <div className="flex items-center">
          <img
            className="rounded-full w-[36px] mr-2"
            src={row.original.customerAvatar}
            alt={row.original.customerName}
          />
          <div className="">
            <p>{row.getValue("customerName")}</p>
            <p className="text-gray-400 text-sm">
              {row.original.customerEmail}
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày giao dịch
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <i className="bi bi-gender-ambiguous text-crusta text-xl  mr-2" />
        <p className="mb-1">{row.getValue("date")}</p>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Số tiền
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <p>{row.getValue("amount")}</p>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <div
          className={cn(
            "flex items-center justify-center rounded-3xl py-1 w-36",
            row.getValue("status") === "pending" && "bg-yellow-100",
            row.getValue("status") === "paid" && "bg-green-100",
            row.getValue("status") === "confirmed" && "bg-green-100",
            row.getValue("status") == "complete" && "bg-green-100"
          )}
        >
          <span className="relative flex h-3 w-3 mr-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                row.getValue("status") === "pending" && "bg-yellow-400",
                row.getValue("status") === "paid" && "bg-green-400",
                row.getValue("status") == "confirmed" && "bg-green-400",
                row.getValue("status") == "complete" && "bg-green-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                row.getValue("status") === "pending" && "bg-yellow-500",
                row.getValue("status") === "paid" && "bg-green-500",
                row.getValue("status") == "confirmed" && "bg-green-500",
                row.getValue("status") == "complete" && "bg-green-500"
              )}
            ></span>
          </span>
          <p
            className={cn(
              row.getValue("status") === "pending" && "text-yellow-700",
              row.getValue("status") === "paid" && "text-green-700",
              row.getValue("status") === "confirmed" && "text-green-700",
              row.getValue("status") === "complete" && "text-green-700"
            )}
          >
            {getStatusTransaction(row.getValue("status"))}
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <TransactionCellAction id={row.original.id} />,
  },
];
