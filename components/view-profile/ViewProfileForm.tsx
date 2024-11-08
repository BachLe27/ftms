"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Settings, Users, LogOut } from "lucide-react";
import axios from "axios";
import { Console } from "console";
import { useRouter } from "next/navigation";

const ViewProfileForm = () => {
  const [avatarUrl, setAvatarUrl] = useState("/assets/images/default-avatar.png");
  const [profileData, setProfileData] = useState<any>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    emergencyPhone: "",
    roles: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      // Upload logic can go here
    }
  };

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
        setProfileData(response.data);
      })
      .catch(() => {
        router.push("/login"); // Chuyển hướng nếu có lỗi
      })
      .finally(() => {
        
      });
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-10">
          <Image
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-8"
          />
        </div>

        <nav className="text-white">
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </a>
          <a href="/feature/view-user-list" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
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

      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24">
        <div className="bg-white rounded-[40px] p-8 max-w-[1066px] mx-auto">
          <div className="flex gap-8">
            {/* Profile Image Section */}
            <div className="w-[296px] flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-[130px] h-[130px] rounded-full bg-[#E5E5E5] overflow-hidden">
                  <Image src={avatarUrl} alt="User avatar" width={130} height={130} className="rounded-full object-cover" />
                </div>
                <button onClick={handleAvatarClick} className="absolute bottom-0 right-0 w-[25px] h-[25px] bg-[#FFBA34] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e5a82f] transition-colors">
                  <span className="text-white text-xs">📷</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <h3 className="font-bold text-xl mb-1">Account</h3>
              <p className="text-[#6C757D]">{profileData.email}</p>
            </div>

            {/* Profile Information Section */}
            <div className="flex-1">
              <div className="border-b mb-8">
                <div className="flex gap-8 mb-[-2px]">
                  <button className="px-4 py-2 font-bold text-[#41464B] border-b-4 border-[#6FBC44]">
                    User Profile
                  </button>
                  <button
                  onClick={() =>{router.push("/authen/change-password")}}
                  className="px-4 py-2 font-bold text-[#41464B]">
                    Change Password
                  
                  </button>
                </div>
              </div>

              <div className="px-4">
                <h2 className="text-2xl font-bold mb-8">Profile Information</h2>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-gray-600">Full name</p>
                    <p className="font-semibold">{profileData.fullName}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600">Date of Birth</p>
                    <p className="font-semibold">{profileData.dateOfBirth}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600">Phone Number</p>
                    <p className="font-semibold">{profileData.phone}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600">Address</p>
                    <p className="font-semibold">{profileData.address}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600">Emergency Number</p>
                    <p className="font-semibold">{profileData.emergencyPhone}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600">Role</p>
                    <p className="font-semibold">{profileData.roles}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button className="bg-[#6FBC44] text-white hover:bg-[#5da639] px-8 py-2 rounded-lg font-semibold shadow-md">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileForm;
