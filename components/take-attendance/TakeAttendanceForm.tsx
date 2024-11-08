"use client";
import React, { useState } from "react";
import { Home, Users, BookOpen, Settings, LogOut, UserCircle, BookCheck } from "lucide-react";

interface Student {
  id: number;
  name: string;
  status: 'present' | 'absent';
  note?: string;
}

const TakeAttendanceForm: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Nguyen Thi Phuong Dieu",
      status: 'present',
    },
    {
      id: 2,
      name: "Nguyen Quynh Nga",
      status: 'present',
    },
    {
      id: 3,
      name: "Nguyen Dang Kien",
      status: 'present',
    },
    {
      id: 4,
      name: "Nguyen Anh Tuan",
      status: 'present',
    },
    {
      id: 5,
      name: "Nguyen Minh Hoang",
      status: 'present',
    },
    {
      id: 6,
      name: "",
      status: 'present',
    },
    {
      id: 7,
      name: "",
      status: 'present',
    },
  ]);

  const handleStatusChange = (id: number, status: 'present' | 'absent') => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status } : student
    ));
  };

  const handleSubmit = () => {
    console.log('Submitted attendance:', students);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-6">
          <img
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-6"
          />
        </div>

        <nav className="text-white">
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Home className="w-5 h-5 mr-3" />
            <span className="font-bold">Home</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <Users className="w-5 h-5 mr-3" />
            <span className="font-bold">User Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookOpen className="w-5 h-5 mr-3" />
            <span className="font-bold">Curriculum Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookCheck className="w-5 h-5 mr-3" />
            <span className="font-bold">Class Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-40 hover:bg-[#5da639]">
            <Settings className="w-5 h-5 mr-3" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserCircle className="w-5 h-5 mr-3" />
            <span className="font-bold">My Account</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] h-screen overflow-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-4xl font-bold">Take Attendance</h2>
        </div>

        {/* Content wrapper with vertical centering */}
        <div className="flex flex-col justify-center min-h-[calc(100vh-88px)] py-8">
          {/* Attendance table section */}
          <div className="px-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#6FBC44] text-white divide-x divide-white/30">
                    <th className="px-4 py-2 text-left w-16 border-r border-white/30">#</th>
                    <th className="px-4 py-2 text-left border-r border-white/30">Name</th>
                    <th className="px-4 py-2 text-center w-48 border-r border-white/30">Status</th>
                    <th className="px-4 py-2 text-left">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className={student.id % 2 === 0 ? 'bg-white' : 'bg-[#E8F5E2]'}>
                      <td className="border px-4 py-2">{student.id}</td>
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              checked={student.status === 'present'}
                              onChange={() => handleStatusChange(student.id, 'present')}
                              className="form-radio text-[#6FBC44]"
                            />
                            <span>Present</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              checked={student.status === 'absent'}
                              onChange={() => handleStatusChange(student.id, 'absent')}
                              className="form-radio text-[#6FBC44]"
                            />
                            <span>Absent</span>
                          </label>
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border rounded"
                          placeholder="Add note..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons section */}
          <div className="flex justify-center space-x-4 mt-6">
            <button className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 min-w-[120px]">
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#6FBC44] text-white rounded-md hover:bg-[#5da639] min-w-[120px]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendanceForm;