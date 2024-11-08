"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { currencyFormater } from "@/app/lib/currencyFormat"
import ServiceComboCellAction from "./serviceComboCellAction"

export type ServiceComboColumnProps = {
  id: string,
  createdAt: string
  workOption: string
  workDuration: string,
  staffNumber: string
  price: string
}

export const ServiceComboColumn: ColumnDef<ServiceComboColumnProps>[] = [

  {
    accessorKey: "id",
    header: () => {
      return (
        <div className="text-crusta ">
          Mã combo
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày tạo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-sm ml-4 text-neutral-500">
      <p>
        {row.getValue("createdAt")}
      </p>
    </div>
  },
  {
    accessorKey: "workOption",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Diện tích làm việc
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-sm text-gray-600 ml-5">
        {row.getValue("workOption")}
      </div>
    )
  },
  {
    accessorKey: "workDuration",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Thời gian làm việc
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-sm ml-5">
        <div className="flex items-center ">
          <p>
            {row.getValue("workDuration")}
          </p>
        </div>
      </div>
    )
  },
  {
    accessorKey: "staffNumber",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
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
      <div className="flex items-end text-sm ml-5 text-neutral-600">
        <p>
          {row.getValue("staffNumber")}
        </p>
      </div>
    )
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Giá
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-sm ml-4 text-neutral-600">
        <p>
          {`${currencyFormater.format(row.getValue("price"))}`}
        </p>
      </div>
    )

  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ServiceComboCellAction id={row.original.id} />
    ),
  },
]

