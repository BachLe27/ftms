'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubjectDetailSchema, SubjectDetailFormData } from "@/schema/subject-detail-schema";


const AddSubjectForm: React.FC = () => {
  const [status, setStatus] = useState("Active");
  const { register, handleSubmit, formState: { errors } } = useForm<SubjectDetailFormData>({
    resolver: zodResolver(SubjectDetailSchema),
  });

  const onSubmit = (data: SubjectDetailFormData) => {
    console.log(data);
    // Xử lý gửi dữ liệu ở đây
  };

  return (
    <div className="flex min-h-screen bg-[#EFF5EB]">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen shadow-md">
        <div className="p-10">
          <Image
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={179}
            height={127}
            className="mb-8 rounded-full"
          />
        </div>

        <nav className="text-white">
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Course Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-16">
      <h1 className="text-5xl font-bold mb-4 absolute top-2 left-1/2 transform -translate-x-1/2">Subject Detail</h1>
        <div className="bg-white rounded-[40px] p-8 max-w-[1101px] mx-auto">
          <div className="bg-[#D9D9D9] rounded-t-[40px] p-5 -mx-8 -mt-8 mb-8">
            <h1 className="text-4xl font-normal">Subject Information</h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-2xl mb-2">Document*</label>
                <input
                  {...register("document")}
                  type="text"
                  className="w-full p-3 border border-[#D4CBCB] rounded"
                />
                {errors.document && <p className="text-red-500">{errors.document.message}</p>}
              </div>
              <div>
                <label className="block font-bold text-2xl mb-2">Status</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("status")}
                      value="Active"
                      checked={status === "Active"}
                      onChange={() => setStatus("Active")}
                      className="mr-2"
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("status")}
                      value="Inactive"
                      checked={status === "Inactive"}
                      onChange={() => setStatus("Inactive")}
                      className="mr-2"
                    />
                    <span>Inactive</span>
                  </label>
                </div>
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
              </div>
            </div>
            
            <div>
              <label className="block font-bold text-2xl mb-2">Description:</label>
              <textarea
                {...register("description")}
                className="w-full p-3 border border-[#D4CBCB] rounded h-[239px]"
              ></textarea>
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#6FBC44] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#5da639]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectForm;