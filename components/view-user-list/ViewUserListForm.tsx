"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

interface User {
  userId: number;
  fullName: string;
  email: string;
  roles: string;
  phone: string;
  status: true | false;
}

const ViewUserListForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // Start with page 0
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchUsers = async (page = 0) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/management/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page, searchTerm },
        }
      );

      const userData = response?.data?.users;
      if (Array.isArray(userData)) {
        setUsers(userData);
        setTotalPages(response.data.totalPages || 1); // Set total pages based on response
      } else {
        console.error("Data received is not an array:", userData);
        setUsers([]);
      }
      setError(null);
    } catch (err) {
      setError("Error fetching users");
      console.error("Error fetching users:", err);
      setUsers([]);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0); // Reset to first page (0) on search
    fetchUsers(0);
  };

  const handleToggleStatus = async (userId: number) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      const user = users.find((u) => u.userId === userId);
      if (!user) return;

      const newStatus = !user.status;

      await axios.post(
        `http://localhost:8080/api/v1/user/management/status/${userId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      setError("Error updating user status");
      console.error("Error updating user status:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    fetchUsers(page);
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are within the max visible range
      for (let i = 0; i < totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded ${currentPage === i ? "bg-[#6FBC44] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      // If there are many pages, show a subset with ellipses
      if (currentPage > 2) {
        pageButtons.push(
          <button key={0} onClick={() => handlePageChange(0)} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">
            1
          </button>
        );
        if (currentPage > 3) {
          pageButtons.push(<span key="left-ellipsis" className="px-2">...</span>);
        }
      }

      // Display pages around the current page
      for (
        let i = Math.max(0, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded ${currentPage === i ? "bg-[#6FBC44] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {i + 1}
          </button>
        );
      }

      // Add ellipses and last page if the current page is far from the last page
      if (currentPage < totalPages - 3) {
        if (currentPage < totalPages - 4) {
          pageButtons.push(<span key="right-ellipsis" className="px-2">...</span>);
        }
        pageButtons.push(
          <button
            key={totalPages - 1}
            onClick={() => handlePageChange(totalPages - 1)}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageButtons;
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24">
      <div className="flex justify-between items-center p-8 border-b">
        <h2 className="text-6xl font-bold">User List</h2>
        <div className="flex space-x-4">
          <form onSubmit={searchUsers} className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-[#5da639]"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
          <button
            className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-[#5da639]"
            onClick={() => router.push("/feature/add-user")}
          >
            +Add New User
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <table className="w-full mt-10 table-auto border-collapse rounded py-5">
            <thead>
              <tr className="bg-[#6FBC44] text-white">
                <th className="px-6 py-3 uppercase tracking-wider border-r-white">#</th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">User name</th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">Role</th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">Email</th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">Phone number</th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className={user.status === false ? "bg-green-300" : ""}>
                  <td className="border px-6 py-3 text-center">{user.userId}</td>
                  <td className="border px-6 py-3 text-center">{user.fullName}</td>
                  <td className="border px-6 py-3 text-center">{user.roles}</td>
                  <td className="border px-6 py-3 text-center">{user.email}</td>
                  <td className="border px-6 py-3 text-center">{user.phone}</td>
                  <td className="border px-6 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <div
                        onClick={() => handleToggleStatus(user.userId)}
                        className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${user.status ? "justify-end bg-green-500" : "justify-start bg-black"
                          } px-[1px]`}
                      >
                        <motion.div
                          className="h-5 w-5 rounded-full bg-white"
                          layout
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination mt-4 flex align-middle w-[100%] justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              &lt;
            </button>

            {renderPaginationButtons()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewUserListForm;
