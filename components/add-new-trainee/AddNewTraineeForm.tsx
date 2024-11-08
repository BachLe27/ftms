"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ViewUserListForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [trainees, setTrainees] = useState([
    {
      id: 1,
      name: "DieuNTP",
      email: "dieuntphe161355@fpt.edu.vn",
      phone: "0336627895",
    },
    {
      id: 2,
      name: "NgaNQ",
      email: "nganqhe1625342@fpt.edu.vn",
      phone: "0337462847",
    },
    {
      id: 3,
      name: "TuanNA",
      email: "tuannahe151355@fpt.edu.vn",
      phone: "0336627895",
    },
    {
      id: 4,
      name: "KienND",
      email: "kienndhe141363@fpt.edu.vn",
      phone: "0336627895",
    },
  ]);

  const [inClass, setInClass] = useState([]);

  const handleAddToClass = (id: number) => {
    const userToAdd = trainees.find((user) => user.id === id);
    if (userToAdd) {
      // Kiểm tra và loại bỏ trùng lặp trong inClass
      setInClass((prevInClass) => {
        const filteredInClass = prevInClass.filter((user) => user.id !== id);
        return [...filteredInClass, userToAdd];
      });

      setTrainees((prevTrainees) =>
        prevTrainees.filter((user) => user.id !== id)
      );
    }
  };

  const handleRemoveFromClass = (id: number) => {
    const userToRemove = inClass.find((user) => user.id === id);
    if (userToRemove) {
      // Kiểm tra và loại bỏ trùng lặp trong trainees
      setTrainees((prevTrainees) => {
        const filteredTrainees = prevTrainees.filter((user) => user.id !== id);
        return [...filteredTrainees, userToRemove];
      });

      setInClass((prevInClass) => prevInClass.filter((user) => user.id !== id));
    }
  };

  // Filter trainees based on search term
  const filteredTrainees = trainees.filter((trainee) =>
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <span className="font-bold">Course Management</span>
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
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-10">
        <h2 className="text-4xl font-bold mb-10">Trainee (Choose max: 32)</h2>

        {/* Search bar and Add button */}
        

        {/* Trainee List */}
        <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 text-center">Account</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Phone number</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainees.map((user) => (
              <tr key={user.id}>
                <td className="border px-6 py-3 text-center">{user.id}</td>
                <td className="border px-6 py-3 text-center">{user.name}</td>
                <td className="border px-6 py-3 text-center">{user.email}</td>
                <td className="border px-6 py-3 text-center">{user.phone}</td>
                <td className="border px-6 py-3 text-center">
                  <CheckCircle
                    onClick={() => handleAddToClass(user.id)}
                    className="text-green-500 cursor-pointer w-6 h-6"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center mb-6 w-7/12 p-10">
          <input
            type="text"
            placeholder="Search Trainee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded mr-4 w-full"
          />
          
        </div>
        <h2 className="text-4xl font-bold mt-16 mb-10">In Class</h2>

        {/* In Class List */}
        <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 text-center">Account</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Phone number</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inClass.map((user) => (
              <tr key={user.id}>
                <td className="border px-6 py-3 text-center">{user.id}</td>
                <td className="border px-6 py-3 text-center">{user.name}</td>
                <td className="border px-6 py-3 text-center">{user.email}</td>
                <td className="border px-6 py-3 text-center">{user.phone}</td>
                <td className="border px-6 py-3 text-center">
                  <XCircle
                    onClick={() => handleRemoveFromClass(user.id)}
                    className="text-red-500 cursor-pointer w-6 h-6"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUserListForm;
