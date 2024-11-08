"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { GraduationCap } from "lucide-react";
import { UserSquare2 } from "lucide-react";

const ViewClassListForm: React.FC = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      class_code: "Class_001",
      admin: "Admin",
      trainee: "30/32",
      start_date: "05/09/2024",
      end_date: "28/12/2024",
      status: "Active",
      detailLink: "/details/1",
    },
    {
      id: 2,
      class_code: "Class_002",
      admin: "Admin1",
      trainee: "28/32",
      start_date: "05/09/2024",
      end_date: "28/12/2024",
      status: "Active",
      detailLink: "/details/2",
    },
    {
      id: 3,
      class_code: "Class_003",
      admin: "Admin2",
      trainee: "20/32",
      start_date: "05/09/2024",
      end_date: "28/12/2024",
      status: "Active",
      detailLink: "/details/3",
    },
    {
      id: 4,
      class_code: "Class_004",
      admin: "Admin3",
      trainee: "25/32",
      start_date: "05/09/2024",
      end_date: "28/12/2024",
      status: "Active",
      detailLink: "/details/4",
    },
    {
      id: 5,
      class_code: "Class_005",
      admin: "Admin4",
      trainee: "27/32",
      start_date: "05/09/2024",
      end_date: "28/12/2024",
      status: "Inactive",
      detailLink: "/details/5",
    },
  ]);

  const handleToggleStatus = (classId: number) => {
    setClasses((prevData) =>
      prevData.map((classItem) =>
        classItem.id === classId
          ? {
              ...classItem,
              status: classItem.status === "Active" ? "Inactive" : "Active",
            }
          : classItem
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
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <GraduationCap className="w-6 h-6 mr-4" />
            <span className="font-bold">Class Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-36 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserSquare2 className="w-6 h-6 mr-4" />
            <span className="font-bold">My Account</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 relative min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-6xl font-bold">Class List</h2>
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
              + Add more
            </button>
          </div>
        </div>

        <table className="w-full mt-4 table-auto border-collapse rounded">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 text-center">#</th>
              <th className="px-6 py-3 text-center">Class code</th>
              <th className="px-6 py-3 text-center">Admin</th>
              <th className="px-6 py-3 text-center">Trainee</th>
              <th className="px-6 py-3 text-center">Start date</th>
              <th className="px-6 py-3 text-center">End date</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Detail</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr
                key={classItem.id}
                className={classItem.status === "Inactive" ? "bg-green-300" : ""}
              >
                <td className="border px-6 py-3 text-center">{classItem.id}</td>
                <td className="border px-6 py-3 text-center">{classItem.class_code}</td>
                <td className="border px-6 py-3 text-center">{classItem.admin}</td>
                <td className="border px-6 py-3 text-center">{classItem.trainee}</td>
                <td className="border px-6 py-3 text-center">{classItem.start_date}</td>
                <td className="border px-6 py-3 text-center">{classItem.end_date}</td>
                <td className="border px-6 py-3 text-center">
                  <div className="flex items-center justify-center">
                    <div
                      onClick={() => handleToggleStatus(classItem.id)}
                      className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${
                        classItem.status === "Active"
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
                <td className="border px-6 py-3">
                  <div className="flex justify-center">
                    <Link href={classItem.detailLink}>
                      <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 absolute bottom-8 left-0 right-0">
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            &lt;
            </button>
            <button className="px-3 py-1 rounded bg-[#6FBC44] text-white">
                1
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
                &gt;
            </button>
        </div>
      </div>
    </div>
  );
};

export default ViewClassListForm;