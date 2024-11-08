"use client";
import React from "react";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const ViewClassDetailForTraineeForm: React.FC = () => {
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
        <div className="p-12">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-[#D9D9D9] p-6 rounded-t-lg">
              <h1 className="text-4xl font-normal px-4">Class Detail</h1>
            </div>

            {/* Form Content */}
            <div className="p-12 space-y-8">
              <div className="grid grid-cols-2 gap-12">
                {/* Class Code Section */}
                <div>
                  <label className="block text-2xl font-bold mb-3">Class code</label>
                  <p className="text-xl">Java01</p>
                </div>

                {/* Class Admin Section */}
                <div>
                  <label className="block text-2xl font-bold mb-3">Class Admin</label>
                  <p className="text-xl">DungNTP9</p>
                </div>
              </div>

              {/* Date Section */}
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <label className="block text-2xl font-bold mb-3">Start Date</label>
                  <p className="text-xl">01/09/2024</p>
                </div>
                <div>
                  <label className="block text-2xl font-bold mb-3">End Date</label>
                  <p className="text-xl">01/09/2024</p>
                </div>
              </div>

              {/* Description and Grade Table Section */}
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <label className="block text-2xl font-bold mb-3">Description:</label>
                  <p className="text-xl">This class are training about OOP, SQL and should graduated ....</p>
                </div>
                <div>
                  {/* Grade Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="bg-[#6FBC44] text-white px-6 py-3 text-xl">Code</th>
                          <th className="bg-[#6FBC44] text-white px-6 py-3 text-xl">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-6 py-3 text-center">
                            <Link href="/sql-detail" className="text-xl text-black hover:text-gray-700 underline">
                              SQL
                            </Link>
                          </td>
                          <td className="px-6 py-3 text-center text-xl">40%</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3 text-center">
                            <Link href="/java-detail" className="text-xl text-black hover:text-gray-700 underline">
                              Java
                            </Link>
                          </td>
                          <td className="px-6 py-3 text-center text-xl">60%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Back Button - Centered */}
              <div className="flex justify-center pt-8">
                <Link href="/classes">
                  <button className="w-[157px] h-[43px] bg-[#D5DCD0] text-black font-bold rounded-lg">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewClassDetailForTraineeForm;