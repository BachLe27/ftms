"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceItemCellAction from "./ServiceItemCellAction"

export type ServiceItemColumnProps = {
  id: string,
  createdAt: string,
  workLocation: string,
  image: string,
  description: string,
}

export const ServiceItemColumn: ColumnDef<ServiceItemColumnProps>[] = [

  {
    accessorKey: "id",
    header: () => {
      return (
        <div className="text-crusta ">
          Mã Item
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
    accessorKey: "workLocation",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Vị trí làm việc
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-sm text-gray-600 ml-5">
        {row.getValue("workLocation")}
      </div>
    )
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hình ảnh minh họa
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-sm ml-5">
        <div className="flex items-center ">
          <img src={row.getValue('image')} alt="" className="rounded-lg w-[80px] h-[40px] object-cover" />
        </div>
      </div>
    )
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div className="text-crusta">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nội dung làm việc
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-sm ml-5 text-neutral-600">
        <p>
          {row.getValue("description")}
        </p>
      </div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ServiceItemCellAction id={row.original.id} />
    ),
  },
]


