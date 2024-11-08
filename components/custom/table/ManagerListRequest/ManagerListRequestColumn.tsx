"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getStatusText } from "@/app/(pages)/staff-page/(root)/components/upcomingWorkCard"

export type ManagerListRequestProps = {
  id: string,
  serviceName: string
  date: string
  status: string
  staffNumber: number
  address: string
  customerName: string
  customerAvatar: string
}

export const ManagerListRequestColumn: ColumnDef<ManagerListRequestProps>[] = [
  {
    accessorKey: "id",
    header: () => {
      return (
        <div className="text-crusta ">
          Mã yêu cầu
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4 font-semibold">
          #{row.getValue("id")}
        </div>
      )
    }
  },
  {
    accessorKey: "serviceName",
    header: () => {
      return (
        <div className="text-crusta ">
          Dịch vụ
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-semibold">
          {row.getValue("serviceName")}
        </div>
      )
    }
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày đặt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3 text-neutral-500">
      <p>
        {row.getValue("date")}
      </p>
    </div>
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <div
          className={cn(
            "flex items-center justify-center rounded-3xl py-1 w-36",
            row.getValue("status") === "pending" && "bg-yellow-100",
            row.getValue("status") === "complete" && "bg-green-100",
            row.getValue("status") === "confirmed" && "bg-blue-100",
            row.getValue("status") === "paid" && "bg-orange-100",
            row.getValue("status") === "canceled" && "bg-red-100"
          )}
        >
          <span className="relative flex h-3 w-3 mr-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                row.getValue("status") === "pending" && "bg-yellow-400",
                row.getValue("status") === "paid" && "bg-orange-400",
                row.getValue("status") === "confirmed" && "bg-blue-400",
                row.getValue("status") === "complete" && "bg-green-400",
                row.getValue("status") === "canceled" && "bg-red-400"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                row.getValue("status") === "pending" && "bg-yellow-500",
                row.getValue("status") === "paid" && "bg-orange-500",
                row.getValue("status") === "confirmed" && "bg-blue-500",
                row.getValue("status") === "complete" && "bg-green-500",
                row.getValue("status") === "canceled" && "bg-red-500"
              )}
            ></span>
          </span>
          <p
            className={cn(
              row.getValue("status") === "pending" && "text-yellow-700",
              row.getValue("status") === "paid" && "text-orange-700",
              row.getValue("status") === "confirmed" && "text-blue-700",
              row.getValue("status") === "complete" && "text-green-700",
              row.getValue("status") === "canceled" && "text-red-700"
            )}
          >
            {getStatusText(row.getValue("status"))}
          </p>
        </div>
      </div>
    )
  },
  {
    accessorKey: "staffNumber",
    header: ({ column }) => {
      return (
        <div className="text-crusta ">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Số lượng nhân viên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex text-[16px] justify-center w-full">
          <p className="">
            {row.getValue("staffNumber")}
          </p>
        </div>
    )
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Địa chỉ
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3 text-neutral-600">
        <p>
          {row.getValue("address")}
        </p>
      </div>
    )
  },

  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Khách hàng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center ">
        <img src={row.original.customerAvatar} alt={row.original.customerName} className="w-[40px] h-[40px] object-cover rounded-full" />

        <div className="flex items-end text-[16px] ml-3 text-neutral-600">
          <p>
            {row.getValue("customerName")}
          </p>
        </div>
      </div>
    )
  },

  {
    accessorKey: "customerAvatar",
    header: () => { return (<div className="hidden"></div>) },
    cell: () => <div className="hidden"></div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/manager-page/list-request/${row.original.id}`}>
            <ChevronRight className="text-crusta" />
          </Link>
        </div>
      )
    },
  },
]

