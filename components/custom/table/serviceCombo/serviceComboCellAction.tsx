"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Edit, Ellipsis, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/custom/modals/AlertModal";
import styled from "styled-components";

type Props = { id: string };

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

function ServiceComboCellAction(props: Props) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service/${params.serviceId}/service-combo/${props.id}`
      );
      toast.success("Service Combo deleted successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
              className="w-full h-full flex items-center justify-center text-blue-600"
              href={`/manager-page/service-management/${params.serviceId}/service-combo/${props.id}`}
            >
              <Edit className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          <StyledDropdownMenuItem
            className="w-full cursor-pointer flex items-center justify-center text-red-600"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <p className="min-w-[64px] text-center">Xóa</p>
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

export default ServiceComboCellAction;
