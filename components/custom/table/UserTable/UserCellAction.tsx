"use client";

import { useState } from "react";
import { Edit, Edit2, Ellipsis, Trash, Trash2Icon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { AlertModal } from "@/components/custom/modals/AlertModal";
import styled from "styled-components";

type UserCellProps = {
  id: string;
};
const StyledDropdownMenuItem = styled(DropdownMenuItem)`
  .delete-item-text {
    width: 100%;
    text-align: center;
  }

  &:hover .delete-item-text {
    color: #ff6a28;
    font-weight: bold;
  }
`;

export default function UserCellAction(props: UserCellProps) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/manage-user/${props.id}`
      );
      toast.success("Xóa người dùng thành công!");
      window.location.reload();
    } catch (err) {
      toast.error("Xóa người dùng thất bại!");
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="text-crusta cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 py-2 ">
          <DropdownMenuItem className="flex items-center justify-between w-full  border-b">
            <Edit className="w-4 h-4 text-blue-700" />
            <Link
              className="w-full h-full text-center text-blue-700"
              href={`${process.env.NEXT_PUBLIC_API_URL}/admin-page/user-management/${props.id}`}
            >

              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          <StyledDropdownMenuItem
            className="w-full flex items-center text-center justify-between cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Trash2Icon className="w-4 h-4 text-red-500 " />
            <div className="flex items-center justify-center w-full">
              <p className="text-center text-red-500 ">Xóa</p>
            </div>
          </StyledDropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
    </div>
  );
}
