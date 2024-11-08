"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getStatusText } from "@/app/(pages)/staff-page/(root)/components/upcomingWorkCard"

export type WorkHistoryColumn = {
  id: string,
  date: string
  status: string
  customerAvatar: string,
  customerName: string
  address: string
}

export const workHistorytColumn: ColumnDef<WorkHistoryColumn>[] = [
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
        <div className={cn(
          "flex items-center justify-center rounded-3xl py-1 w-36",
          row.getValue("status") === 'complete' && 'bg-green-100',
          row.getValue("status") === 'canceled' && 'bg-red-100'
        )}>
          <span className="relative flex h-3 w-3 mr-2" >
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              row.getValue("status") === 'complete' && 'bg-green-400',
              row.getValue("status") === 'canceled' && 'bg-red-400'
            )}></span>
            <span className={cn(
              "relative inline-flex rounded-full h-3 w-3",
              row.getValue("status") === 'complete' && 'bg-green-500',
              row.getValue("status") === 'canceled' && 'bg-red-500'
            )}></span>
          </span>
          <p className={cn(
            row.getValue("status") === 'complete' && 'text-green-700',
            row.getValue("status") === 'canceled' && 'text-red-700'
          )}>
            {getStatusText(row.getValue("status"))}
          </p>
        </div>
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
      <div className="flex items-end text-[16px] ml-3">
        <div className="flex items-center ">
          <img src={row.getValue("customerAvatar")} className="rounded-full h-10 object-cover w-10 mr-2" />
          <p>
            {row.getValue("customerName")}
          </p>
        </div>
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
    accessorKey: "customerAvatar",
    header: () => { return (<div className="hidden"></div>) },
    cell: () => <div className="hidden"></div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/staff-page/work-history/${row.original.id}`}>
            <ChevronRight className="text-crusta" />
          </Link>
        </div>
      )
    },
  },
]
