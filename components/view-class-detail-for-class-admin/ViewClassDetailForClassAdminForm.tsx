import React from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";

const ViewClassDetailForClassAdminForm: React.FC = () => {
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
        <div className="mx-auto my-20 max-w-[1000px]">
          <div className="rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="rounded-t-lg bg-[#D9D9D9] p-6">
              <h1 className="text-4xl font-bold">Class Detail</h1>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                {/* Class Code Section */}
                <div>
                  <label className="mb-2 block text-2xl font-bold">Class code</label>
                  <p className="h-11 w-full rounded-lg border border-[#D4CBCB] px-4 leading-10">
                    Java01
                  </p>
                </div>

                {/* Date Section */}
                <div>
                  <label className="mb-2 block text-2xl font-bold">Start Date</label>
                  <p className="h-11 w-full rounded-lg border border-[#D4CBCB] px-4 leading-10">
                    01/09/2024
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Description Section */}
                <div>
                  <label className="mb-2 block text-2xl font-bold">Description</label>
                  <textarea
                    className="h-[147px] w-full rounded-lg border border-[#D4CBCB] p-4 resize-none"
                    placeholder="Enter class description"
                  >
                    This class are training about OOP, SQL and should graduated .....
                  </textarea>
                </div>

                {/* End Date and Navigation Section */}
                <div>
                  <label className="mb-2 block text-2xl font-bold">End Date</label>
                  <p className="h-11 w-full rounded-lg border border-[#D4CBCB] px-4 leading-10">
                    01/09/2024
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-8">
                    <Link href="/trainee" className="text-2xl font-bold underline">
                      Trainee
                    </Link>
                    <Link href="/grade-setting" className="text-2xl font-bold underline">
                      Grade setting
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Link href="/grade" className="text-2xl font-bold underline">
                      Grade
                    </Link>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <Link
                  href="#"
                  className="flex h-[43px] w-[157px] items-center justify-center rounded-lg bg-[#D5DCD0] text-black font-bold"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewClassDetailForClassAdminForm;