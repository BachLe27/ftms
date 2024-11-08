import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
};

export default function StaffCellAction(props: Props) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="text-crusta cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 py-2">
          <DropdownMenuItem className="w-full h-full">
            <Link
              className="w-full h-full text-center"
              href={`${process.env.NEXT_PUBLIC_API_URL}/staff/${props.id}`}
            >
              Xem chi tiết
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
