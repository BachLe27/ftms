"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MapPin, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StaffColumn } from "@/type/staff/staff-columns"
import StaffCellAction from "./staffCellAction"
import StarRate from "../../starRate"

export const staffColumns: ColumnDef<StaffColumn>[] = [
  {
    accessorKey: "staffName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="ml-4"
        >
          Nhân viên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div className="flex items-center text-crusta text-[16px] ml-3">

      <div className="ml-4">
        <img src={row.original.staffAvatar} alt="avatar" className="h-12 w-12 rounded-lg object-cover" />
      </div>

      <p className="ml-4 font-semibold">
        {row.getValue("staffName")}
      </p>
    </div>
  },

  {
    accessorKey: "staffGender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giới tính
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <i className="bi bi-gender-ambiguous text-crusta text-xl  mr-2" />
      <p className="mb-1">
        {row.getValue("staffGender")}
      </p>
    </div>


  },


  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3"><MapPin className=" text-crusta text-sm mr-2" />
      <p>
        {row.getValue("address")}
      </p>
    </div>


  },


  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tuổi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3"><UserRound className=" text-crusta text-sm mr-2" />
      <p>
        {row.getValue("age")}
      </p>
    </div>
  },


  {
    accessorKey: "credibility",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đánh giá
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <i className="bi bi-star-fill text-crusta text-lg  mr-2"></i>
      <StarRate rate={+row.getValue("credibility")} />

    </div>


  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <StaffCellAction id={row.original.id} />
      )
    },
  },
]


