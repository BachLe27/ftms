"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

type TransactionCellProps = {
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

export default function TransactionCellAction(props: TransactionCellProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transaction/${props.id}`
      );
      router.refresh();
      toast.success("Transaction deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="text-crusta cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 py-2 bg-white">
          <DropdownMenuItem className="bg-white">
            <Link
              className="w-full h-full justify-between text-center flex text-blue-500 hover:bg-gray-100 hover:text-blue-500"
              href={`/admin-page/transaction-management/${props.id}`}
            >
              <Edit className="w-4 h-4 ml-1" />
              <span className="mr-5">
                Chi tiết
              </span>
            </Link>
          </DropdownMenuItem>
          <StyledDropdownMenuItem
            className="w-full text-red-500 flex items-center justify-between cursor-pointer hover:text-red-500 hover:bg-red-500"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Trash2 className="w-4 h-4 text-red-500 ml-1" />
            <p className="text-red-500 hover:text-red-500 mr-8">Xóa</p>
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
