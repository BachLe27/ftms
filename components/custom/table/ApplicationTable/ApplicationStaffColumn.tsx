"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight, CircleAlert, CircleCheckBig, CircleX, Contact, MapPin, MoreHorizontal, Star, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ApplicationType } from "@/type/report"
import Link from "next/link"
import { cn } from "@/lib/utils"



export const ApplicationColumn: ColumnDef<ApplicationType>[] = [
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

    cell: ({ row }) => <div className=" text-[16px] ml-3">
      <div className="flex items-center">
        <img className="rounded-full w-[36px] mr-2" src={row.original.staffAvatar} alt={row.original.staffName} />
        <div className="flex flex-col">
          <p>
            {row.getValue("staffName")}
          </p>
          <p className="text-sm text-gray-400">
            {row.original.staffEmail}
          </p>
        </div>
      </div>
    </div>
  },

  {
    accessorKey: "createdAt",
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
      <p className="mb-1 ml-1 text-sm text-slate-600 font-semibold">
        {row.getValue("createdAt")}
      </p>
    </div>
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >

            Ngày xử lý
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },

    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <p className="mb-1 ml-1 text-sm text-slate-600 font-semibold">
        {row.getValue("updatedAt") !== "01/01/1970 07:00" ? row.getValue("updatedAt") : "N/A"}
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
    cell: ({ row }) => <div className="flex items-end ml-3">
      {
        row.getValue("status") == "Đã chấp thuận" && (
          <div className="flex items-center justify-center text-green-400 rounded-lg ">
            <CircleCheckBig className="w-10 " />
            <div>
              {row.getValue("status")}
            </div>
          </div>
        )

      }
      {
        row.getValue("status") == "Đã từ chối" && (
          <div className="flex items-center justify-center text-red-400 rounded-lg ">
            <CircleX className="w-10" />
            {row.getValue("status")}
          </div>
        )
      }

      {
        row.getValue("status") == "Chờ xử lý" && (
          <div className="flex items-center justify-center text-blue-400 rounded-lg ">

            <CircleAlert className="w-10" />
            {row.getValue("status")}
          </div>
        )
      }


    </div>
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
        <Link href={`/staff-page/view-application/${row.original.id}`} >
          <ChevronRight />
        </Link>
      </div>
    </div>
  },





]




