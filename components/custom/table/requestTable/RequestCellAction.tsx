"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Edit, MoreHorizontal, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequestColumn } from "./requestCollumn";
import { AlertModal } from "../../modals/AlertModal";

interface CellActionProps {
  data: RequestColumn;
}
export const RequestCellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`copied ${id}`);
  };

  const onUpdate = () => {
    router.push(`/${params.storeId}/size/${data.id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/size/${data.id}`);
      router.refresh();
      router.push(`${params.storeId}/size`);
      toast.success("size deleted");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-center">
        <Button onClick={() => onUpdate()} className="mr-4 text-green-700 bg-green-100 rounded-lg">
          <Check className="h-3 w-3 mr-2" />
          Chấp nhận
        </Button>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <X className="h-3 w-3" />
          Tu choi
        </Button>
      </div>
    </div>
  );
};

