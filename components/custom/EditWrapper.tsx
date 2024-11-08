"use client";
import { useEditWrapperStore } from "@/app/store/useEditWrapperStore";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useEffect } from "react";

interface EditWrapperProps {
  children: React.ReactNode;
  defaultValue: {
    value: any;
    type: string;
  };
  triggerFunction: () => void;
  onEdit: boolean;
  setOnEdit: () => void;
}

const EditWrapper: React.FC<EditWrapperProps> = ({
  children,
  defaultValue,
  triggerFunction,
  onEdit,
  setOnEdit,
}) => {
  const inputValue = useEditWrapperStore((state) => state.input);
  const setInputValue = useEditWrapperStore((state) => state.setInput);

  useEffect(() => {
    if (onEdit) {
      setInputValue(defaultValue.value);
    }
  }, [onEdit, defaultValue.value]);

  const handleOnBlur = async () => {
    triggerFunction();
    setOnEdit();
  };

  return (
    <div className="relative flex items-center space-x-2">
      {!onEdit ? (
        <div className="flex items-center space-x-2">
          <div>{children}</div>
          <div onClick={setOnEdit} className="cursor-pointer">
            <Pencil className="text-crusta w-4" />
          </div>
        </div>
      ) : (
        <input
          className="border p-2 rounded-lg"
          placeholder={defaultValue.value}
          type={defaultValue.type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleOnBlur}
          autoFocus
        />
      )}
    </div>
  );
};

export default EditWrapper;
