'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSubjectSchema, AddSubjectFormData } from "@/schema/add-subject-schema";
import { useRouter } from "next/navigation";


const AddSubjectForm: React.FC = () => {
  const [status, setStatus] = useState("Active");
  const { register, handleSubmit, formState: { errors } } = useForm<AddSubjectFormData>({
    resolver: zodResolver(addSubjectSchema),
  });

  const onSubmit = (data: AddSubjectFormData) => {
    console.log(data);
    // Xử lý gửi dữ liệu ở đây
  };


  const router = useRouter();

  return (

    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-16 min-h-screen">
      <div className="flex items-center justify-center">
      </div>

      <div className="bg-white rounded-[40px] p-8 max-w-[1280px] mx-auto">
        <h1 className="text-5xl font-medium mb-4">Add New Subject</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <label className="block font-bold text-2xl mb-2">Subject name*</label>
              <input
                {...register("subjectName")}
                type="text"
                className="w-full p-3 border border-[#D4CBCB] rounded"
              />
              {errors.subjectName && <p className="text-red-500">{errors.subjectName.message}</p>}
            </div>
            <div>
              <label className="block font-bold text-2xl mb-2">Subject code*</label>
              <input
                {...register("subjectCode")}
                type="text"
                className="w-full p-3 border border-[#D4CBCB] rounded"
              />
              {errors.subjectCode && <p className="text-red-500">{errors.subjectCode.message}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectForm;