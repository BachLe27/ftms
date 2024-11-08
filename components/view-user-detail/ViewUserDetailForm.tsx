"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";


const ViewUserDetailForm: React.FC = () => {
  const [userDetail, setUserDatail] = useState<any>({
    account: "",
    fullName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    emergencyPhone: "",
    roles: "",
    createDate:"",
  });
  const router = useRouter();
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login"); // Chuyển hướng nếu không có token
      return;
    }

    // Gọi API để lấy thông tin người dùng
    axios
      .get("http://localhost:8080/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserDatail(response.data);
      })
      .catch(() => {
        router.push("/authen/login"); // Chuyển hướng nếu có lỗi
      })
      .finally(() => {
        
      });
  }, [router]);
  

    

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen shadow-md">
        <div className="p-10">
          <Image
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={179}
            height={127}
            className="mb-8 rounded-[200px]"
          />
        </div>

        <nav className="text-white">
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Home</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">User Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Course Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-10">
        <div className="bg-white rounded-[40px] p-8 max-w-[1066px] mx-auto">
          {/* Header */}
          <div className="border-b border-[#CDCDCD] pb-6 mb-6">
            <h1 className="text-4xl font-bold text-[#41464B] mb-2">User Detail</h1>
            
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-2 gap-y-8">
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Account</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.email}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Role</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.roles}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Full name</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.fullName}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Date of Birth</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.dateOfBirth}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Phone Number</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.phone}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Address</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.address}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Emergency Number</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.emergencyPhone}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Generation</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.generation}</p>
            </div>
            <div>
              <p className="font-bold text-[22px] text-[#41464B] mb-2">Create date</p>
              <p className="text-[22px] text-[#41464B]">{userDetail.createDate}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end mt-8">
            <button className="bg-[#6FBC44] text-white px-6 py-2 rounded-lg opacity-70 hover:opacity-100 flex items-center gap-2">
              <span className="text-lg">✏️</span>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetailForm;
