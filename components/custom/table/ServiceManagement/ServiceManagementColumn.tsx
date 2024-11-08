"use client"
import { ColumnDef } from "@tanstack/react-table"
import DropdownMenuCard from "./components/DropdownMenuCard"

export type ServiceManagementColumn = {
  id: string,
  serviceName: string
  serviceDescription: string,
  serviceImage: string,
}
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6478/6478111.png";
  e.currentTarget.classList.add('error-image');
}

export const ServiceManagementColumn: ColumnDef<ServiceManagementColumn>[] = [
  {
    accessorKey: "id",
    enableGrouping: true,
    header: () => {
      return (
        <div className="text-crusta ">
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex border rounded-lg p-4 items-start justify-between min-h-[160px]">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                className="w-[140px] h-[120px] rounded-md object-cover"
                src={row.original.serviceImage}
                alt={row.original.serviceName}
                onError={handleImageError}
              />
            </div>

            <div className="ml-4 flex flex-col justify-between">
              <div>
                <p className="text-2xl font-semibold text-crusta">Dịch vụ</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-slate-700 w-[16vw]">{row.original.serviceName}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 min-h-[60px]">
                {row.original.serviceDescription.slice(0, 250)}...
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <DropdownMenuCard id={row.original.id} />
          </div>
        </div>
      )
    }
  },
]


