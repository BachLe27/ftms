"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { getJwtToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_API_URL } from "@/config/constant";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";

const ViewCurriculumListForm: React.FC = () => {
  const [curriculum, setCurriculum] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const router = useRouter();

  const fetchSettings = async (page = 1) => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/curriculums/search`,
        { keyword: searchTerm, page: page - 1, size: 10, orderBy: 'id', sortDirection: 'asc' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const curriculums = response?.data.data.dataSource;

      if (Array.isArray(curriculums)) {

        setCurriculum(curriculums);
        setTotalPages(response.data.data.pagination.totalPages || 1);
      } else {
        console.error("Data received is not an array:", curriculums);
        setCurriculum([]);
      }
      setError(null);
    } catch (err) {
      setError("Error fetching curriculum data");
      console.error("Error fetching curriculum:", err);
      setCurriculum([]);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleToggleStatus = async (curriculumId: number) => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      const updatingCurriculum = curriculum.find((u) => u.curriculumId === curriculumId);
      if (!updatingCurriculum) return;

      const newStatus = !updatingCurriculum.status;

      await axios.put(
        `${BASE_API_URL}/curriculums/update/${curriculumId}`,
        {
          id: curriculumId,
          curriculumName: updatingCurriculum.curriculumName,
          descriptions: updatingCurriculum.descriptions,
          status: newStatus,
          subjectList: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurriculum((prevData) =>
        prevData.map((curriculum) =>
          curriculum.curriculumId === curriculumId
            ? {
              ...curriculum,
              status: newStatus,
            }
            : curriculum
        )
      );

      toast.success("Curriculum status updated successfully!");
    } catch (err) {
      setError("Error updating curriculum status");
      console.error("Error updating curriculum status:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }

      toast.error("Failed to update curriculum status");
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button   
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded ${currentPage === i ? "bg-[#6FBC44] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) {
        buttons.push(
          <button key={1} onClick={() => handlePageChange(1)} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">
            1
          </button>
        );
        if (currentPage > 4) {
          buttons.push(<span key="left-ellipsis" className="px-2">...</span>);
        }
      }

      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded ${currentPage === i ? "bg-[#6FBC44] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          buttons.push(<span key="right-ellipsis" className="px-2">...</span>);
        }
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 min-h-screen">
      
      <div className="flex justify-between items-center p-8 border-b">
        <h2 className="text-6xl font-bold">Curriculum List</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setCurrentPage(1);
                fetchSettings(currentPage);
              }
            }}
          />
          <button onClick={() => {
            setCurrentPage(1);
            fetchSettings(currentPage);
          }} className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]">
            Search
          </button>
          <button onClick={() => {router.push('/feature/add-curriculum')}} className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#5da639]">
            + Add More
          </button>
        </div>
      </div>


      <>
        <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 uppercase tracking-wider border-r-white">#</th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">Curriculum Name</th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">Description</th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">Created Date</th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">Status</th>
              <th className="px-6 py-3 text-center tracking-wider border-r-white">Detail</th>
            </tr>
          </thead>
          <tbody>
            {curriculum.map((curriculum) => (
              <tr
                key={curriculum.curriculumId}
                className={!curriculum.status ? "bg-green-300" : ""}
              >
                <td className="border px-6 py-3 text-center">{curriculum.curriculumId}</td>
                <td className="border px-6 py-3 text-center">{curriculum.curriculumName}</td>
                <td className="border px-6 py-3 text-center">{curriculum.descriptions}</td>
                <td className="border px-6 py-3 text-center">{moment(curriculum.createdDate).format("DD/MM/YYYY")}</td>
                <td className="border px-6 py-3 text-center">
                  <div className="flex items-center justify-center">
                    <div
                      onClick={() => handleToggleStatus(curriculum.curriculumId)}
                      className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${curriculum.status ? "justify-end bg-green-500" : "justify-start bg-black"} px-[1px]`}
                    >
                      <motion.div
                        className="h-5 w-5 rounded-full bg-white"
                        layout
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      />
                    </div>
                  </div>
                </td>
                <td className="border px-6 py-3 justify-center-center">
                  <div className="flex justify-center">
                    <Link href={`/feature/view-curriculum-list/${curriculum.curriculumId}`}>
                      <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination mt-4 flex align-middle w-full justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>

          {renderPaginationButtons()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </>

    </div>
  );
};

export default ViewCurriculumListForm;
