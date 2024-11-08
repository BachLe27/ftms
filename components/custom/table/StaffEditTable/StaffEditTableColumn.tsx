"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight, Contact, Keyboard, MapPin, MoreHorizontal, Star, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import StaffEditAction from "./StaffEditAction"
import { StaffColumn } from "@/type/staff/staff-columns"


export const staffEditColumn: ColumnDef<StaffColumn>[] = [
  {
    id: "staffAvatar",
    accessorKey: "staffAvatar",
    header: ({ column }) => {
      return (
        <div className="ml-4">
          avatar
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="ml-4">
          <img src={row.getValue("staffAvatar")} alt="avatar" className="h-12 w-12 rounded-lg object-cover" />
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
          name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3"><Contact className="text-crusta text-sm mr-2" />
      <p>
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
          gender
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
          location
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
          age
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
          credibility
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <div className="w-[100px] flex items-center justify-center">
        <div className="min-w-20">
          <i className="bi bi-star-fill text-crusta text-lg  mr-2"></i>
          <p className="mb-1 ">
            {row.getValue("credibility")}
          </p>
        </div>
      </div>
    </div>
  },

  {
    accessorKey: "distance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Khoảng cách
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <div className="w-[100px] flex items-center justify-center">
        {
          row.getValue("distance") !== -1 &&
          <div className="min-w-20">
            <i className="bi bi-star-fill text-crusta text-lg  mr-2"></i>
            <p className="mb-1 ">
              {row.getValue("distance")} km
            </p>
          </div>
        }
      </div>
    </div>
  },


  {
    accessorKey: "action",
    cell: ({ row }) =>
    (
      <div>
        <StaffEditAction staffId={row.original.id} />
      </div>
    )
  }


]



