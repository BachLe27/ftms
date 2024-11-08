"use client";
import React from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";

const AddNewClassForm: React.FC = () => {
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
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Home</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">User Management</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Curriculum Management</span>
          </Link>
          <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold text-base">Class Management</span>
          </Link>

          {/* Bottom nav items */}
          <div className="mt-auto">
            <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
              <Settings className="w-6 h-6 mr-4" />
              <span className="font-bold text-base">Setting</span>
            </Link>
            <Link href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
              <LogOut className="w-6 h-6 mr-4" />
              <span className="font-bold text-base">Sign out</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#EFF5EB] overflow-y-auto">
        <div className="max-w-[1000px] mx-auto my-8">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-[#D9D9D9] p-4 rounded-t-lg">
              <h1 className="text-4xl font-normal px-4">Add new class</h1>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-6">
              {/* First Row */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block text-2xl font-normal mb-2">Class code</label>
                  <input
                    type="text"
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  />
                </div>
                <div>
                  <label className="block text-2xl font-normal mb-2">Admin</label>
                  <select className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4 bg-white">
                    <option value="">Select admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-2xl font-normal mb-2">Room</label>
                  <select className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4 bg-white">
                    <option value="">Select room</option>
                  </select>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-2xl font-normal mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  />
                </div>
                <div>
                  <label className="block text-2xl font-normal mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  />
                </div>
              </div>

              {/* Description and Links Section */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-2xl font-normal mb-2">Description</label>
                  <textarea
                    className="w-full h-[147px] border border-[#D4CBCB] rounded-lg p-4"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <Link href="/trainee" className="text-2xl font-bold underline">
                    Trainee
                  </Link>
                  <Link href="/grade-setting" className="text-2xl font-bold underline">
                    Grade setting *
                  </Link>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <button className="w-[157px] h-[43px] bg-[#6FBC44] text-white font-bold rounded-lg">
                  Add
                </button>
                <button className="w-[157px] h-[43px] bg-[#D5DCD0] text-black font-bold rounded-lg">
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

export default AddNewClassForm;