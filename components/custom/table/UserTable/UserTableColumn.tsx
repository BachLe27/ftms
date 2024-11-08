"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserType } from "@/type/user"
import UserCellAction from "./UserCellAction"
import { getAccountStatusText } from "@/app/(pages)/staff-page/(root)/components/upcomingWorkCard"
import { cn } from "@/lib/utils"



function getRoleDisplayName(role: string): string {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'manager':
      return 'Quản lý';
    case 'staff':
      return 'Nhân viên';
    case 'user':
      return 'Khách hàng';
    default:
      return 'Không xác định';
  }
}

export const UserTableColumn: ColumnDef<UserType>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên Khách Hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div className="flex items-center text-[16px] ml-3">
      <img src={row.original.userAvatar} alt={row.getValue("userName")} className="h-10 w-10 rounded-full object-cover mr-2" />

      <div>
        <p>
          {row.getValue("userName")}
        </p>
        <p className="text-sm text-gray-400">
          {row.original.email}
        </p>
      </div>

    </div>
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vai trò
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <i className="bi bi-gender-ambiguous text-crusta text-xl  mr-2" />
      <p className="mb-1">
        {getRoleDisplayName(row.getValue("role"))}
      </p>
    </div>


  },


  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex items-end text-[16px] ml-3">
      <p>
        {row.getValue("createdAt")}
      </p>
    </div>


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
      )
    },
    cell: ({ row }) => (
      <div className="flex items-end text-[16px] ml-3">
        <div className={cn(
          "flex items-center justify-center rounded-3xl py-1 w-36",
          row.getValue("status") === 'Vô hiệu hóa' && 'bg-red-200',
          row.getValue("status") === 'Hoạt động' && 'bg-green-200',
        )}>
          <span className="relative flex h-3 w-3 mr-2" >
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              row.getValue("status") === 'Vô hiệu hóa' && 'bg-red-400',
              row.getValue("status") === 'Hoạt động' && 'bg-green-400',
            )}></span>
            <span className={cn(
              "relative inline-flex rounded-full h-3 w-3",
              row.getValue("status")  === 'Vô hiệu hóa' && 'bg-red-500',
              row.getValue("status") === 'Hoạt động' && 'bg-green-500',
            )}></span>
          </span>
          <p className={cn(
            row.getValue("status") ===  'Vô hiệu hóa' && 'text-red-700',
            row.getValue("status") ===  'Hoạt động' && 'text-green-700',
          )}>
            {getAccountStatusText(row.getValue("status"))}
          </p>
        </div>
      </div>
    )
  },



  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <>
          <UserCellAction id={row.original.id}/>
        </>
      )
    },
  },
]



