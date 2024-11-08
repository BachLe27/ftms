"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight, Contact, MapPin, MoreHorizontal, Star, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { StaffReportType } from "@/type/report"
import Link from "next/link"
import { getReportStatusText } from "@/app/(pages)/staff-page/(root)/components/upcomingWorkCard"
import { cn } from "@/lib/utils"


export const StaffReportColumn: ColumnDef<StaffReportType>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="ml-4 text-crusta">
          Mã đơn
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4">
          <p>#{row.getValue("id")}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "staffName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-crusta flex items-center">
            Nhân viên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
      )
    },

    cell: ({ row }) => <div className="flex items-center text-[16px] ml-3">
      <img className="rounded-full w-[36px] mr-2" src={row.original.staffAvatar} alt={row.original.staffName} />
      <div className="">
        <p>
          {row.getValue("staffName")}
        </p>
        <p className="text-sm text-gray-400">
          {row.original.staffEmail}
        </p>
      </div>
    </div>
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

            Ngày gửi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <i className="bi bi-gender-ambiguous text-crusta text-xl  mr-2" />
      <p className="mb-1">
        {row.getValue("date")}
      </p>
    </div>
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
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <div className={cn(
          "flex items-center justify-center rounded-3xl py-1 w-36",
          row.getValue("status") === 'Chờ xử lý' && 'bg-yellow-200',
          row.getValue("status") === 'Đã từ chối' && 'bg-red-200',
          row.getValue("status") === 'Đã chấp thuận' && 'bg-green-200',
        )}>
          <span className="relative flex h-3 w-3 mr-2" >
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              row.getValue("status") === 'Chờ xử lý' && 'bg-yellow-400',
              row.getValue("status") === 'Đã từ chối' && 'bg-red-400',
              row.getValue("status") === 'Đã chấp thuận' && 'bg-green-400',
            )}></span>
            <span className={cn(
              "relative inline-flex rounded-full h-3 w-3",
              row.getValue("status") === 'Chờ xử lý' && 'bg-yellow-500',
              row.getValue("status") === 'Đã từ chối' && 'bg-red-500',
              row.getValue("status") === 'Đã chấp thuận' && 'bg-green-500',
            )}></span>
          </span>
          <p className={cn(
            row.getValue("status") === 'Chờ xử lý' && 'text-yellow-700',
            row.getValue("status") === 'Đã từ chối' && 'text-red-700',
            row.getValue("status") === 'Đã chấp thuận' && 'text-green-700',
          )}>
            {getReportStatusText(row.getValue("status"))}
          </p>
        </div>
      </div>
    )
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Loại đơn
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <p>
        {row.getValue("type")}
      </p>
    </div>
  },

  {
    accessorKey: "actions",
    header: ({ column }) => (
      <div></div>
    ),
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <div className="text-crusta">
        <Link href={`/manager-page/report-management/${row.original.id}`} >
          <ChevronRight />
        </Link>
      </div>
    </div>
  },





]




