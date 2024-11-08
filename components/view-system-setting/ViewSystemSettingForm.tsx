"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";

const ViewSystemSettingForm: React.FC = () => {
  const [settingdata, setSettingdata] = useState([
    {
      id: 1,
      setting_name: "ROLE_SYSTEM_ADMIN",
      setting_group: "Role",
      description: "Admin of system",
      status: "Active",
      detailLink: "/details/1",
    },
    {
      id: 2,
      setting_name: "ROLE_COORDINATOR",
      setting_group: "Role",
      description: "Manager of system",
      status: "Active",
      detailLink: "/details/2",
    },
    {
      id: 3,
      setting_name: "ROLE_CLASS_ADMIN",
      setting_group: "Role",
      description: "Class Admin of System",
      status: "Active",
      detailLink: "/details/3",
    },
    {
      id: 4,
      setting_name: "ROLE_TRAINER",
      setting_group: "Role",
      description: "Trainer of System",
      status: "Active",
      detailLink: "/details/4",
    },
    {
      id: 5,
      setting_name: "ROLE_TRAINEE",
      setting_group: "Role",
      description: "Trainee of System",
      status: "Active",
      detailLink: "/details/5",
    },
    {
      id: 6,
      setting_name: "K17A",
      setting_group: "Generation",
      description: "Gen1 of System",
      status: "Active", 
      detailLink: "/details/6",
    },
    {
        id: 7,
        setting_name: "Passion",
        setting_group: "Room",
        description: "Class Room1",
        status: "Active", 
        detailLink: "/details/7",
      },
  ]);

  const handleToggleStatus = (settingId: number) => {
    setSettingdata((prevData) =>
      prevData.map((setting) =>
        setting.id === settingId
          ? {
              ...setting,
              status: setting.status === "Active" ? "Inactive" : "Active",
            }
          : setting
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-10">
          <img
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
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Curriculum Management</span>
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
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24">
        <div className="flex justify-between items-center p-8 border-b">
          <h2 className="text-6xl font-bold">System Setting</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded"
            />
            <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:bg-lightgreen">
              Search
            </button>
            <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:bg-lightgreen">
              + Add More
            </button>
          </div>
        </div>

        <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 uppercase tracking-wider border-r-white">#</th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Setting Name
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Setting Group
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Description
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Status
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {settingdata.map((setting) => (
              <tr
                key={setting.id}
                className={setting.status === "Inactive" ? "bg-green-300" : ""}
              >
                <td className="border px-6 py-3 text-center">{setting.id}</td>
                <td className="border px-6 py-3 text-center">{setting.setting_name}</td>
                <td className="border px-6 py-3 text-center">{setting.setting_group}</td>
                <td className="border px-6 py-3 text-center">{setting.description}</td>
                <td className="border px-6 py-3 text-center">
                  <div className="flex items-center justify-center">
                    {setting.id >= 6 ? (
                      // Toggle switch chỉ cho id >= 6
                      <div
                        onClick={() => handleToggleStatus(setting.id)}
                        className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${
                          setting.status === "Active"
                            ? "justify-end bg-green-500"
                            : "justify-start bg-black"
                        } px-[1px]`}
                      >
                        <motion.div
                          className="h-5 w-5 rounded-full bg-white"
                          layout
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                          }}
                        />
                      </div>
                    ) : (
                      // Chỉ hiển thị "Active" cho các setting khác
                      <span className="text-green-600 ">Active</span>
                    )}
                  </div>
                </td>
                <td className="border px-6 py-3 justify-center-center">
                  <div className="flex justify-center">
                    <Link href={setting.detailLink}>
                      <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSystemSettingForm;
