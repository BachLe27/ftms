"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { getJwtToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_API_URL } from "@/config/constant";
import moment from 'moment';

const ViewCurriculumListForm: React.FC = () => {

  const [curriculum, setCurriculum] = useState([]);


  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [settingdata, setSettingdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchSettings = async (page = 0) => {
    const token = getJwtToken();
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/curriculums/search`,
        {
          keyword: searchTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const curriculums = response?.data.data.dataSource;

      if (Array.isArray(curriculums)) {
        setCurriculum(curriculums);
        setTotalPages(response.data.totalPages || 1); // Set total pages based on response
      } else {
        console.error("Data received is not an array:", curriculums);
        setSettingdata([]);
      }
      setError(null);
    } catch (err) {
      setError("Error fetching users");
      console.error("Error fetching users:", err);
      setSettingdata([]);

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSettings();
  }, []);

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
        `http://localhost:8080/api/v1/curriculums/update/${curriculumId}`,
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
              status: curriculum.status ? false : true,
            }
            : curriculum
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


  console.log(curriculum);

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 min-h-screen">
      <div className="flex justify-between items-center p-8 border-b">
        <h2 className="text-6xl font-bold">Curriculum List</h2>
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

      <table className="w-full mt-10 table-auto border-collapse rounded py-5">
        <thead>
          <tr className="bg-[#6FBC44] text-white">
            <th className="px-6 py-3 uppercase tracking-wider border-r-white">#</th>
            <th className="px-6 py-3 text-center tracking-wider border-r-white">
              Curriculum Name
            </th>
            <th className="px-6 py-3 text-center tracking-wider border-r-white">
              Description
            </th>
            <th className="px-6 py-3 text-center tracking-wider border-r-white">
              Created Date
            </th>
            <th className="px-6 py-3 text-center tracking-wider border-r-white">
              Status
            </th>
            <th className="px-6 py-3 text-center tracking-wider border-r-white">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {curriculum.map((curriculum) => (
            <tr
              key={curriculum.curriculumId}
              className={curriculum.status === "Inactive" ? "bg-green-300" : ""}
            >
              <td className="border px-6 py-3 text-center">{curriculum.curriculumId}</td>
              <td className="border px-6 py-3 text-center">{curriculum.curriculumName}</td>
              <td className="border px-6 py-3 text-center">{curriculum.descriptions}</td>
              <td className="border px-6 py-3 text-center">{moment(curriculum.createdDate).format('DD/MM/YYYY')}</td>
              <td className="border px-6 py-3 text-center">
                <div className="flex items-center justify-center">
                  <div
                    onClick={() => handleToggleStatus(curriculum.curriculumId)}
                    className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${curriculum.status
                      ? "justify-end bg-green-500"
                      : "justify-start bg-black"
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
              <td className="border px-6 py-3 justify-center-center">
                <div className="flex justify-center">
                  <Link href='#'>
                    <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCurriculumListForm;
