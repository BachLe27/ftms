"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";

const ViewCurriculumListForm: React.FC = () => {
  const [curriculum, setCurriculum] = useState([
    {
      id: 1,
      curriculum_name: "KS",
      description: "Korea",
      created_date: "20/09/2024",
      status: "Active",
      detailLink: "/details/1",
    },
    {
      id: 2,
      curriculum_name: "JS",
      description: "Japan",
      created_date: "19/08/2024",
      status: "Active",
      detailLink: "/details/2",
    },
    {
      id: 3,
      curriculum_name: ".Net",
      description: "C#",
      created_date: "15/07/2024",
      status: "Active",
      detailLink: "/details/3",
    },
    {
      id: 4,
      curriculum_name: "Java",
      description: "Java Core",
      created_date: "12/06/2024",
      status: "Active",
      detailLink: "/details/4",
    },
    {
      id: 5,
      curriculum_name: "AI",
      description: "Artificial Intelligence",
      created_date: "05/05/2024",
      status: "Inactive",
      detailLink: "/details/5",
    },
  ]);

  const handleToggleStatus = (curriculumId: number) => {
    setCurriculum((prevData) =>
      prevData.map((curriculum) =>
        curriculum.id === curriculumId
          ? {
              ...curriculum,
              status: curriculum.status === "Active" ? "Inactive" : "Active",
            }
          : curriculum
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
          <h2 className="text-6xl font-bold">Curriculum List</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded"
            />
            <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]">
              Search
            </button>
            <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]">
              + Add More
            </button>
          </div>
        </div>

        <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 uppercase tracking-wider border-r-white">#</th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">
                Curriculum Name
              </th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">
                Description
              </th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">
                Created Date
              </th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">
                Status
              </th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {curriculum.map((curriculum) => (
              <tr
                key={curriculum.id}
                className={curriculum.status === "Inactive" ? "bg-green-300" : ""}
              >
                <td className="border px-6 py-3 text-center">{curriculum.id}</td>
                <td className="border px-6 py-3 text-center">{curriculum.curriculum_name}</td>
                <td className="border px-6 py-3 text-center">{curriculum.description}</td>
                <td className="border px-6 py-3 text-center">{curriculum.created_date}</td>
                <td className="border px-6 py-3 text-center">
                  <div className="flex items-center justify-center">
                    <div
                      onClick={() => handleToggleStatus(curriculum.id)}
                      className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${
                        curriculum.status === "Active"
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
                  </div>
                </td>
                <td className="border px-6 py-3 justify-center-center">
                  <div className="flex justify-center">
                    <Link href={curriculum.detailLink}>
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

export default ViewCurriculumListForm;
