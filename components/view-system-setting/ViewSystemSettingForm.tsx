"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { getJwtToken } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/config/constant";

const ViewSystemSettingForm: React.FC = () => {
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
        `${BASE_API_URL}/settings/search`,
        {
          keyword: searchTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const settings = response?.data.data.dataSource;

      if (Array.isArray(settings)) {
        setSettingdata(settings);
        setTotalPages(response.data.totalPages || 1); // Set total pages based on response
      } else {
        console.error("Data received is not an array:", settings);
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

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 min-h-screen">
      <div className="flex justify-between items-center p-8 border-b">
        <h2 className="text-6xl font-bold">System Setting</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchSettings();
              }
            }}
          />
          <button onClick={() => {
            fetchSettings();
          }} className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:bg-lightgreen">
            Search
          </button>
          <button className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-md hover:bg-lightgreen" onClick={() => {
            router.push("/feature/add-setting");
          }}>
            + Add More
          </button>
        </div>
      </div>

      {
        loading ? <p> Loading... </p> : <table className="w-full mt-10 table-auto border-collapse rounded py-5">
          <thead>
            <tr className="bg-[#6FBC44] text-white">
              <th className="px-6 py-3 uppercase tracking-wider border-r-white">#</th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Setting Name
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Setting Group
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Description
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Status
              </th>
              <th className="px-6 py-3 text-center  tracking-wider border-r-white">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {settingdata?.sort((a, b) => a?.id - b?.id).map((settings, index) => {
              return (
                <tr key={settings.id}>
                  <td className="border px-6 py-3 text-center">{index + 1}</td>
                  <td className="border px-6 py-3 text-center">{settings.settingName}</td>
                  <td className="border px-6 py-3 text-center">{settings.settingGroup}</td>
                  <td className="border px-6 py-3 text-center">{settings.description}</td>
                  <td className="border px-6 py-3 text-center">
                    {settings.status ? 'Active' : 'Inactive'}
                  </td>
                  <td className="border px-6 py-3 justify-center-center">
                    <div className="flex justify-center">
                      <Link href={`/feature/view-system-setting/${settings.id}`}>
                        <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }

    </div>
  );
};

export default ViewSystemSettingForm;