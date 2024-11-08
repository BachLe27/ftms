"use client";
import React from "react";
import { Home, Users, BookOpen, BookCheck, UserCircle, LogOut } from "lucide-react";

const SubjectDetailTraineeForm = () => {
  const grades = [
    { category: "Assignment", weight: "15%", grade: 8 },
    { category: "Practice Exam", weight: "40%", grade: 8 },
    { category: "Audit", weight: "45%", grade: 8 },
    { category: "Total", weight: "100%", grade: 8 },
  ];

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
        <div className="p-8 border-b">
          <h2 className="text-4xl font-bold">Grade detail report</h2>
        </div>

        <table className="w-full mt-10 table-auto border-collapse rounded">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 text-center tracking-wider">Grade category</th>
              <th className="px-6 py-3 text-center tracking-wider">Weight</th>
              <th className="px-6 py-3 text-center tracking-wider">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index} className="bg-white">
                <td className="border px-6 py-3 text-center">{grade.category}</td>
                <td className="border px-6 py-3 text-center">{grade.weight}</td>
                <td className="border px-6 py-3 text-center">{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8">
          <button className="text-black bg-[#D5DCD0] font-bold shadow-md hover:shadow-lg hover:bg-gray-400 py-3 px-6 rounded ">Back</button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailTraineeForm;
