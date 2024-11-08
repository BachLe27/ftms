"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut, UserCircle, BookCheck } from "lucide-react";
import { FiEdit } from "react-icons/fi";

const ViewSubjectGradeListTraineeForm: React.FC = () => {
  const [grades, setGrades] = useState([
    {
      id: 1,
      subject: "SQL",
      weight: "30%",
      grade: 8,
      detailLink: "/grade-details/1",
    },
    {
      id: 2,
      subject: "Java Core",
      weight: "35%",
      grade: 8,
      detailLink: "/grade-details/2",
    },
    {
      id: 3,
      subject: "Java Spring",
      weight: "35%",
      grade: 8,
      detailLink: "/grade-details/3",
    },
    {
      id: 4,
      subject: "Total",
      weight: "100%",
      grade: 8,
      detailLink: null,
    },
  ]);

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
            <BookCheck className="w-6 h-6 mr-4" />
            <span className="font-bold">Class Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-32 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserCircle className="w-6 h-6 mr-4" />
            <span className="font-bold">My Account</span>
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
          <h2 className="text-6xl font-bold">Grade</h2>
        </div>

        <table className="w-full mt-10 table-auto border-collapse rounded">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 text-center tracking-wider">Subject</th>
              <th className="px-6 py-3 text-center tracking-wider">Weight</th>
              <th className="px-6 py-3 text-center tracking-wider">Grade</th>
              <th className="px-6 py-3 text-center tracking-wider">Detail</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id} className="bg-white">
                <td className="border px-6 py-3 text-center">{grade.subject}</td>
                <td className="border px-6 py-3 text-center">{grade.weight}</td>
                <td className="border px-6 py-3 text-center">{grade.grade}</td>
                <td className="border px-6 py-3 text-center">
                  {grade.detailLink ? (
                    <div className="flex justify-center">
                      <Link href={grade.detailLink}>
                        <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                      </Link>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubjectGradeListTraineeForm;
