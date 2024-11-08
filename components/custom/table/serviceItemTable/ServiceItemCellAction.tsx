"use client";

import { useState } from "react";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
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

type SeviceItemCellProps = {
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

export default function ServiceItemCellAction(props: SeviceItemCellProps) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service/${params.serviceId}/service-item/${props.id}`
      );
      toast.success("Xóa item dịch vụ thành công!");
      window.location.reload();
    } catch (err) {
      toast.error("Xóa item dịch vụ thất bại!");
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="text-crusta cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 py-2">
          <DropdownMenuItem className="w-full h-full">
            <Link
              className="flex items-center text-blue-500"
              href={`/manager-page/service-management/${params.serviceId}/service-item/${props.id}`}
            >
              <Edit className="w-4 h-4" />
              <span className="ml-4"></span>
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          <StyledDropdownMenuItem
            className="w-full text-red-500 cursor-pointer hover:text-red-500"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Trash2 className="hover:text-red-500" />
            <p className="delete-item-text">Xóa</p>
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
