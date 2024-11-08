"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut, Table } from "lucide-react";

const AttendanceTracking: React.FC = () => {
  const [subject, setSubject] = useState("SQL");
  const [classSelected, setClassSelected] = useState("Class_001");

  const attendanceData = [
    {
      id: 1,
      name: "Nguyen Thi Phuong Dieu",
      slots: ["A", "P", "P", "A", "P"],
      absentPercent: "10%",
      note: "",
    },
    {
      id: 2,
      name: "Nguyen Quynh Nga",
      slots: ["P", "P", "P", "P", "P"],
      absentPercent: "0%",
      note: "",
    },
    {
      id: 3,
      name: "Nguyen Dang Kien",
      slots: ["P", "P", "A", "P", "P"],
      absentPercent: "5%",
      note: "",
    },
    {
      id: 4,
      name: "Nguyen Anh Tuan",
      slots: ["P", "P", "P", "P", "P"],
      absentPercent: "0%",
      note: "",
    },
    {
      id: 5,
      name: "Nguyen Minh Hoang",
      slots: ["A", "A", "P", "P", "P"],
      absentPercent: "10%",
      note: "",
    },
  ];

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
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Curriculum Management</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <Table className="w-6 h-6 mr-4" />
            <span className="font-bold">Class Management</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]"
          >
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24">
        <div className="flex justify-between items-center p-2 border-b">
          <h2 className="text-6xl font-bold mb-10">Attendance Tracking</h2>

          {/* Filters */}
          <div className="flex items-center mb-6 space-x-6">
            <div className="flex items-center space-x-2">
              <label className="font-bold">Subject:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border px-4 py-2 rounded"
              >
                <option value="SQL">SQL</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="font-bold">Class:</label>
              <select
                value={classSelected}
                onChange={(e) => setClassSelected(e.target.value)}
                className="border px-4 py-2 rounded"
              >
                <option value="Class_001">Class_001</option>
                <option value="Class_002">Class_002</option>
                <option value="Class_003">Class_003</option>
              </select>
            </div>
          </div>
        </div>
        {/* Attendance Table */}
        <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Slot 1</th>
              <th className="px-6 py-3 text-center">Slot 2</th>
              <th className="px-6 py-3 text-center">Slot 3</th>
              <th className="px-6 py-3 text-center">Slot 4</th>
              <th className="px-6 py-3 text-center">Slot 5</th>
              <th className="px-6 py-3 text-center">Absent Percent</th>
              <th className="px-6 py-3 text-center">Note</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student) => (
              <tr key={student.id}>
                <td className="border px-6 py-3 text-center">{student.id}</td>
                <td className="border px-6 py-3 text-center">{student.name}</td>
                {student.slots.map((slot, index) => (
                  <td
                    key={index}
                    className={`border px-6 py-3 text-center ${
                      slot === "A" ? "text-red-500" : ""
                    }`}
                  >
                    {slot}
                  </td>
                ))}
                <td className="border px-6 py-3 text-center">
                  {student.absentPercent}
                </td>
                <td className="border px-6 py-3 text-center">{student.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTracking;
