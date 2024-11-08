"use client";
import React, { useState } from "react";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

// Định nghĩa kiểu dữ liệu hợp lệ cho trạng thái
type StatusCategory = "assignment" | "practiceExam" | "audit";

const ViewSubjectGradeSettingForm: React.FC = () => {
  // Khởi tạo trạng thái ban đầu
  const [status, setStatus] = useState<{
    assignment: boolean;
    practiceExam: boolean;
    audit: boolean;
  }>({
    assignment: true,
    practiceExam: false,
    audit: false,
  });

  // Hàm toggle trạng thái cho mỗi loại điểm
  const toggleStatus = (category: StatusCategory) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [category]: !prevStatus[category as keyof typeof prevStatus],
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[250px] bg-[#6FBC44] h-full flex flex-col">
        <div className="p-10">
          <img
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-8"
          />
        </div>
        <nav className="flex flex-col flex-1 text-white">
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
            <span className="font-bold text-base">Curriculum Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Class Management</span>
          </a>
          <div className="mt-auto">
            <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
              <Settings className="w-6 h-6 mr-4" />
              <span className="font-bold text-base">Setting</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
              <LogOut className="w-6 h-6 mr-4" />
              <span className="font-bold text-base">Sign out</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 bg-[#EFF5EB] overflow-y-auto p-16">
        <div className="max-w-[1000px] mx-auto my-8">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-[#D9D9D9] p-4 rounded-t-lg">
              <h1 className="text-4xl font-bold px-4">Grades Setting</h1>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-6">
              {/* Chọn môn học */}
              <div className="flex items-center mb-4">
                <label className="text-2xl font-bold mr-4">Subject:</label>
                <select className="border border-gray-300 rounded px-4 py-2">
                  <option value="SQL">SQL</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                </select>
              </div>

              {/* Bảng điểm */}
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#6FBC44] text-white">
                    <th className="py-3 px-4 border">Grade Category</th>
                    <th className="py-3 px-4 border">Weight</th>
                    <th className="py-3 px-4 border">Date Lock</th>
                    <th className="py-3 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Hàng Assignment */}
                  <tr>
                    <td className="py-3 px-4 border">Assignment</td>
                    <td className="py-3 px-4 border">15%</td>
                    <td className="py-3 px-4 border">
                      <input type="date" defaultValue="2024-10-30" className="border rounded px-2" />
                    </td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => toggleStatus("assignment")}
                        className={`w-10 h-5 rounded-full ${
                          status.assignment ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 bg-white rounded-full transform ${
                            status.assignment ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                    </td>
                  </tr>
                  {/* Hàng Practice Exam */}
                  <tr>
                    <td className="py-3 px-4 border">Practice Exam</td>
                    <td className="py-3 px-4 border">40%</td>
                    <td className="py-3 px-4 border">
                      <input type="date" className="border rounded px-2" />
                    </td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => toggleStatus("practiceExam")}
                        className={`w-10 h-5 rounded-full ${
                          status.practiceExam ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 bg-white rounded-full transform ${
                            status.practiceExam ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                    </td>
                  </tr>
                  {/* Hàng Audit */}
                  <tr>
                    <td className="py-3 px-4 border">Audit</td>
                    <td className="py-3 px-4 border">45%</td>
                    <td className="py-3 px-4 border">
                      <input type="date" className="border rounded px-2" />
                    </td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => toggleStatus("audit")}
                        className={`w-10 h-5 rounded-full ${
                          status.audit ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 bg-white rounded-full transform ${
                            status.audit ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Nút Lưu và Huỷ */}
              <div className="flex justify-center gap-4 pt-6">
                <button className="w-[157px] h-[43px] bg-[#6FBC44] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-[#5da639]">
                  Save
                </button>
                <button className="w-[157px] h-[43px] bg-[#D5DCD0] text-black font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewSubjectGradeSettingForm;
