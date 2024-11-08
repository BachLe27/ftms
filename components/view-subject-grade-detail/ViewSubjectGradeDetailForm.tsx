"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut, UserCircle, Filter, BookLock, BookA, BookIcon, BookAIcon, BookAudio, BookCheck } from "lucide-react";
import { FiEdit } from "react-icons/fi";


// Hàm tính toán điểm trung bình từ 3 môn
const calculateTotal = (subject1: number, subject2: number, subject3: number) => {
  return ((subject1 + subject2 + subject3) / 3).toFixed(1); // Chia đều và làm tròn đến 1 chữ số thập phân
};

const ViewSubjectGradeDetailForm: React.FC = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      subject1: 9,
      subject2: 9,
      subject3: 9,
      detailLink: "/details/1",
    },
    {
      id: 2,
      name: "Trần Văn B",
      subject1: 8.5,
      subject2: 9,
      subject3: 8,
      detailLink: "/details/2",
    },
    {
      id: 3,
      name: "Mã Đình Thị Thái H",
      subject1: 8,
      subject2: 7,
      subject3: 9,
      detailLink: "/details/3",
    },
    {
      id: 4,
      name: "Hoàng Hoài A",
      subject1: 8,
      subject2: 7,
      subject3: 7.5,
      detailLink: "/details/4",
    },
    {
      id: 5,
      name: "Đinh Thái M",
      subject1: 9.5,
      subject2: 9,
      subject3: 9,
      detailLink: "/details/5",
    },
  ]);

  // Trạng thái lưu khoảng điểm để lọc
  const [filter, setFilter] = useState("all");

  // Hàm lọc học viên theo khoảng điểm
  const filteredStudents = students.filter((student) => {
    const total = parseFloat(calculateTotal(student.subject1, student.subject2, student.subject3));

    if (filter === "below-5") {
      return total < 5;
    } else if (filter === "5-6") {
      return total >= 5 && total < 6;
    } else if (filter === "6-7") {
      return total >= 6 && total < 7;
    } else if (filter === "7-8") {
      return total >= 7 && total < 8;
    } else if (filter === "8-9") {
      return total >= 8 && total < 9;
    } else if (filter === "above-9") {
      return total >= 9;
    }
    return true; // Mặc định hiển thị tất cả nếu không có lọc
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-10">
          <img
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
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <BookCheck className="w-6 h-6 mr-4" />
            <span className="font-bold">Class Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserCircle className="w-6 h-6 mr-4" />
            <span className="font-bold">My Account</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 ">
        <div className="flex justify-between items-center p-8 border-b">
          <h2 className="text-4xl font-bold">FA24_Fresher_Java01-Java</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded"
            />
            <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]">
              Search
            </button>
            <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]">
              + Add More
            </button>
          </div>
        </div>

        <table className="w-full mt-10 table-auto border-collapse rounded">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-center tracking-wider">Trainee Name</th>
              <th className="px-6 py-3 text-center tracking-wider">Grade 1</th>
              <th className="px-6 py-3 text-center tracking-wider">Grade 2</th>
              <th className="px-6 py-3 text-center tracking-wider">Grade 3</th>
              <th className="px-6 py-3 text-center tracking-wider">
                <div className="flex justify-between items-center">
                  <span className="flex-1 text-center">Total</span>
                  
                  
                  <select
                    onChange={(e) => setFilter(e.target.value)}
                    className=" bg-white text-black rounded py-1 "
                    defaultValue="all"
                  >
                    <option value="all">All</option>
                    <option value="below-5">Below 5</option>
                    <option value="5-6">5-6</option>
                    <option value="6-7">6-7</option>
                    <option value="7-8">7-8</option>
                    <option value="8-9">8-9</option>
                    <option value="above-9">Above 9</option>
                  </select>
                </div>
              </th>
              <th className="px-6 py-3 text-center tracking-wider">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="bg-white">
                <td className="border px-6 py-3 text-center">{student.id}</td>
                <td className="border px-6 py-3 text-center">{student.name}</td>
                <td className="border px-6 py-3 text-center">{student.subject1}</td>
                <td className="border px-6 py-3 text-center">{student.subject2}</td>
                <td className="border px-6 py-3 text-center">{student.subject3}</td>
                <td className="border px-6 py-3 text-center">
                  {calculateTotal(student.subject1, student.subject2, student.subject3)}
                </td>
                <td className="border px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <Link href={student.detailLink}>
                      <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubjectGradeDetailForm;
