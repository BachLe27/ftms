"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";

const ViewClassDetailForm: React.FC = () => {
  const [status, setStatus] = useState("Active");

  const toggleStatus = () => {
    setStatus(status === "Active" ? "Inactive" : "Active");
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
          
          {/* Bottom nav items */}
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

      {/* Main Content */}
      <main className="flex-1 bg-[#EFF5EB] overflow-y-auto">
        <div className="max-w-[1000px] mx-auto my-8">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-[#D9D9D9] p-4 rounded-t-lg">
              <h1 className="text-4xl font-normal px-4">Class Detail</h1>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Class Code Section */}
                <div>
                  <label className="block text-2xl font-bold mb-2">Class code*</label>
                  <input
                    type="text"
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  />
                </div>

                {/* Class Admin Section */}
                <div>
                  <label className="block text-2xl font-bold mb-2">Class Admin*</label>
                  <select
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  >
                    <option value="">Select admin</option>
                  </select>
                </div>
              </div>

              {/* Date Section */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-2xl font-bold mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  />
                </div>
                <div>
                  <label className="block text-2xl font-bold mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full h-11 border border-[#D4CBCB] rounded-lg px-4"
                  />
                </div>
              </div>

              {/* Description and Status Section */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-2xl font-bold mb-2">Description:</label>
                  <textarea
                    className="w-full h-[147px] border border-[#D4CBCB] rounded-lg p-4"
                  />
                </div>
                <div>
                  <div className="mb-6">
                    <label className="block text-2xl font-bold mb-2">Status</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={status === "Active"}
                          onChange={() => setStatus("Active")}
                          className="mr-2"
                        />
                        Active
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={status === "Inactive"}
                          onChange={() => setStatus("Inactive")}
                          className="mr-2"
                        />
                        Inactive
                      </label>
                    </div>
                  </div>
                  
                  {/* Links Section - Moved here */}
                  <div className="space-y-4">
                    <div className="flex gap-8">
                      <Link href="/trainee" className="text-2xl font-bold underline">
                        Trainee
                      </Link>
                      <Link href="/grade" className="text-2xl font-bold underline">
                        Grade
                      </Link>
                    </div>
                    <div>
                      <Link href="/grade-setting" className="text-2xl font-bold underline">
                        Grade setting
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <button className="w-[157px] h-[43px] bg-[#6FBC44] text-white font-bold rounded-lg">
                  Save
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

export default ViewClassDetailForm;