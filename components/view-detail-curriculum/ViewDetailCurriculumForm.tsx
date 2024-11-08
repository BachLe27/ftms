import React from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut, Edit } from "lucide-react";

const ViewDetailCurriculumForm: React.FC = () => {
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
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-16">
      <h1 className="text-5xl font-bold mb-4 absolute top-2 left-1/2 transform -translate-x-1/2">Curriculum Detail</h1>
        <div className="bg-white rounded-[40px] p-8 max-w-[1101px] mx-auto">
          <div className="bg-[#D9D9D9] rounded-t-[40px] p-5 -mx-8 -mt-8 mb-8">
            <h1 className="text-4xl font-normal">Curriculum Information</h1>
          </div>

          <form className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <label className="block font-bold text-3xl mb-2">Name*</label>
              <input type="text" className="w-full border border-[#D4CBCB] h-11 rounded" />
            </div>
            <div>
              <label className="block font-bold text-3xl mb-2">Code*</label>
              <input type="text" className="w-full border border-[#D4CBCB] h-11 rounded" />
            </div>
            <div>
              <label className="block font-bold text-3xl mb-2">Type*</label>
              <input type="text" className="w-full border border-[#D4CBCB] h-11 rounded" />
            </div>
            <div>
              <label className="block font-bold text-3xl mb-2">Order*</label>
              <input type="text" className="w-full border border-[#D4CBCB] h-11 rounded" />
            </div>
            <div>
              <label className="block font-bold text-3xl mb-2">Weight*</label>
              <input type="text" className="w-full border border-[#D4CBCB] h-11 rounded" />
            </div>
            <div>
              <label className="block font-bold text-3xl mb-2">Status</label>
              <div className="flex items-center space-x-4 mt-2">
                <input type="radio" id="active" name="status" className="w-6 h-6" />
                <label htmlFor="active" className="text-2xl">Active</label>
                <input type="radio" id="inactive" name="status" className="w-6 h-6" />
                <label htmlFor="inactive" className="text-2xl">Inactive</label>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-3xl mb-2">Description</label>
              <textarea className="w-full border border-[#D4CBCB] h-52 rounded"></textarea>
            </div>
          </form>

          <div className="flex justify-end mt-8">
            <button className="bg-[#6FBC44] px-12 py-2 rounded-lg opacity-70 hover:opacity-100 flex items-center gap-2">          
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailCurriculumForm;