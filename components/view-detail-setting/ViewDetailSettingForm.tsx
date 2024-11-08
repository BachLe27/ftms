"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";

const DetailSettingForm: React.FC = () => {
  const [status, setStatus] = useState("Active");
  const [value, setValue] = useState("room");
  const [settingName, setSettingName] = useState("Passion");
  const [description, setDescription] = useState("Class room1");

  const options = [
    { Label: "Role", Value: "role" },
    { Label: "Generation", Value: "generation" },
    { Label: "Room", Value: "room" },
  ];

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

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
          <h2 className="text-4xl font-bold">Setting Detail</h2>
        </div>
        <div className="bg-white rounded-[40px] p-8 max-w-[1200px] mx-auto">
          <form className="grid grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block font-bold mb-1">Setting Name*</label>
              <input
                type="text"
                value={settingName}
                onChange={(e) => setSettingName(e.target.value)}
                placeholder="Input SettingName"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-1">Setting Group*</label>
              <select
                className="w-full p-2.5 border border-gray-700 rounded"
                value={value}
                onChange={handleSelect}
              >
                {options.map((option) => (
                  <option key={option.Value} value={option.Value}>
                    {option.Label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-1">Status</label>
              <div className="flex items-center p-3">
              <label
                  className={`mr-10 py-3 px-3 ${
                    status === "Active" ? "text-green-500" : "text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={status === "Active"}
                    onChange={() => setStatus("Active")}
                    className="w-4 h-4 mr-3"
                  />
                  Active
                </label>
                <label
                  className={`${status === "Inactive" ? "text-red-500" : "text-black"}`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={status === "Inactive"}
                    onChange={() => setStatus("Inactive")}
                    className="w-4 h-4 mr-3"
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Input Description"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>
          </form>

          <div className="flex mt-10">
            <button
              type="submit"
              className="text-white bg-[#6FBC44] font-bold shadow-md hover:shadow-lg hover:bg-[#5da639] py-3 px-6 rounded mr-10"
            >
              Save
            </button>
            <button
              type="button"
              className="text-black bg-[#D5DCD0] font-bold shadow-md hover:shadow-lg hover:bg-gray-400 py-3 px-6 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSettingForm;
