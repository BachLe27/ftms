"use client";
import React, { useState, useEffect } from "react";
import { Home, Users, BookOpen, Settings, LogOut, UserSquare2, GraduationCap, ChevronDown } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { BASE_API_URL } from "@/config/constant";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FeedbackData {
  feedbackId: number;
  userId: number;
  traineeName: string;
  subjectCode: string;
  avgRating: number;
  openDate: string;
  lastUpdate: string;
}

interface User {
  userId: number;
  fullName: string;
  email: string;
  roles: string;
  phone: string;
  status: true | false;
}

interface Subject {
  subjectId: string;
  subjectCode: string;
}

const FeedbackListForm: React.FC = () => {

  // States
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showTrainerDropdown, setShowTrainerDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showRateDropdown, setShowRateDropdown] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("All");
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<string>("");
  const [showNotRated, setShowNotRated] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([{ subjectId: "All", subjectCode: "All" }]);
  const [trainers, setTrainers] = useState<User[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string>("All");
  const trainerDropdownRef = React.useRef<HTMLDivElement>(null);
  const subjectDropdownRef = React.useRef<HTMLDivElement>(null);

  // Filter options
  const rates = [
    { label: "All", value: null },
    { label: "5 ⭐", value: 5 },
    { label: "4 ⭐", value: 4 },
    { label: "3 ⭐", value: 3 },
    { label: "2 ⭐", value: 2 },
    { label: "1 ⭐", value: 1 },
  ];

  const router = useRouter();

  // Fetch trainers with ROLE_TRAINER
  useEffect(() => {
    const fetchTrainers = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        router.push("/authen/login");
        return;
      }

      try {
        const response = await axios.get(`${BASE_API_URL}/user/management/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { role: "ROLE_TRAINER" },
        });

        const trainerData = response?.data?.users.filter((user: User) => user.status);
        if (Array.isArray(trainerData)) {
          setTrainers(trainerData);
        } else {
          console.error("Data received is not an array:", trainerData);
          setTrainers([]);
        }
      } catch (err) {
        console.error("Error fetching trainers:", err);
      }
    };

    fetchTrainers();
  }, []);

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbacks = async (page = 0) => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          router.push("/authen/login");
          return;
        }

        const response = await axios.post(`${BASE_API_URL}/feedback-management/search`, {
          page,
          pageSize: 10,
          userId: selectedTrainer !== "All" ? selectedTrainer : undefined,
          subjectId: selectedSubjectId !== "All" ? selectedSubjectId : undefined,
          rate: selectedRate !== null ? selectedRate : undefined,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const feedbackData = response.data.data.dataSource;
        setFeedbacks(feedbackData);
        setTotalPages(response.data.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks(currentPage);
  }, [currentPage, selectedTrainer, selectedSubjectId, selectedRate, showNotRated, orderBy]);

  // Fetch subjects for the dropdown
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          router.push("/authen/login");
          return;
        }

        const response = await axios.post(`${BASE_API_URL}/subject/search`, {
          keyword: '',
          page: 0,
          size: 100, // Adjust size as needed
          orderBy: 'id',
          sortDirection: 'asc'
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedSubjects = response.data.data.dataSource.map((subject: any) => ({
          subjectId: subject.subjectId,
          subjectCode: subject.subjectCode
        }));
        setSubjects([{ subjectId: "All", subjectCode: "All" }, ...fetchedSubjects]); // Add "All" option
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []); // Run once on component mount

  // Handle subject selection
  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setShowSubjectDropdown(false);
  };

  // Handle rate selection
  const handleRateSelect = (rate: number | null) => {
    setSelectedRate(rate);
    setShowRateDropdown(false);
  };

  // Handle trainer selection
  const handleTrainerSelect = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setShowTrainerDropdown(false);
  };

  // Handle not rated toggle
  const handleNotRatedToggle = () => {
    setShowNotRated(!showNotRated);
    if (!showNotRated) {
      setSelectedRate(null);
      setShowRateDropdown(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trainerDropdownRef.current &&
        !trainerDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTrainerDropdown(false);
      }
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSubjectDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24 relative min-h-screen">
      <h2 className="text-6xl font-bold mb-8">Feedback Management</h2>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Class code"
            className="border px-4 py-2 rounded"
          />
          <button className="bg-[#6FBC44] text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-2">Select by:</p>
            <div className="flex gap-2">
              {/* Trainer Dropdown */}
              <div className="relative" ref={trainerDropdownRef}>
                <button 
                  onClick={() => setShowTrainerDropdown(!showTrainerDropdown)}
                  className={`bg-[#6FBC44] text-white px-4 py-1 rounded flex items-center gap-2 ${
                    selectedTrainer ? 'bg-[#5da639]' : ''
                  }`}
                >
                  {selectedTrainer === "All" ? "All" : trainers.find(trainer => trainer.userId.toString() === selectedTrainer)?.fullName || "Trainer"}
                  <ChevronDown size={16} />
                </button>
                {showTrainerDropdown && (
                  <div className="absolute top-full mt-1 bg-white border rounded shadow-lg z-10 max-w-xs max-h-48 overflow-y-auto">
                    <div 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleTrainerSelect("All")}
                    >
                      All
                    </div>
                    {trainers.map((trainer) => (
                      <div 
                        key={trainer.userId}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTrainerSelect(trainer.userId.toString())}
                      >
                        {trainer.fullName}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subject Dropdown */}
              <div className="relative" ref={subjectDropdownRef}>
                <button 
                  onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                  className={`bg-[#6FBC44] text-white px-4 py-1 rounded flex items-center gap-2 ${
                    selectedSubjectId ? 'bg-[#5da639]' : ''
                  }`}
                >
                  {selectedSubjectId === "All" 
                    ? "All" 
                    : subjects.find(subject => subject.subjectId === selectedSubjectId)?.subjectCode || "Subject"}
                  <ChevronDown size={16} />
                </button>
                {showSubjectDropdown && (
                  <div className="absolute top-full mt-1 bg-white border rounded shadow-lg z-10 max-w-xs max-h-48 overflow-y-auto">
                    {subjects.map((subject) => (
                      <div 
                        key={subject.subjectId}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubjectSelect(subject.subjectId)}
                      >
                        {subject.subjectCode}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rate Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowRateDropdown(!showRateDropdown)}
                  className={`bg-[#6FBC44] text-white px-4 py-1 rounded flex items-center gap-2 ${
                    selectedRate !== null ? 'bg-[#5da639]' : ''
                  }`}
                  disabled={showNotRated}
                >
                  {selectedRate !== null ? `${selectedRate} ⭐` : "Rate"}
                  <ChevronDown size={16} />
                </button>
                {showRateDropdown && (
                  <div className="absolute top-full mt-1 bg-white border rounded shadow-lg z-10">
                    {rates.map((rate) => (
                      <div 
                        key={rate.label}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRateSelect(rate.value)}
                      >
                        {rate.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                className={`bg-[#6FBC44] text-white px-4 py-1 rounded ${
                  showNotRated ? 'bg-[#5da639]' : ''
                }`}
                onClick={handleNotRatedToggle}
              >
                Not Rate
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Order by:</p>
            <div className="flex gap-2">
              <button 
                className={`bg-[#6FBC44] text-white px-4 py-1 rounded ${
                  orderBy === 'latest' ? 'bg-[#5da639]' : ''
                }`}
                onClick={() => setOrderBy('latest')}
              >
                Latest
              </button>
              <button 
                className={`bg-[#6FBC44] text-white px-4 py-1 rounded ${
                  orderBy === 'high' ? 'bg-[#5da639]' : ''
                }`}
                onClick={() => setOrderBy('high')}
              >
                High
              </button>
              <button 
                className={`bg-[#6FBC44] text-white px-4 py-1 rounded ${
                  orderBy === 'low' ? 'bg-[#5da639]' : ''
                }`}
                onClick={() => setOrderBy('low')}
              >
                Low
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <table className="w-full bg-[#6FBC44] rounded-t-lg">
        <thead>
          <tr className="text-white">
            <th className="px-6 py-3 text-center">#</th>
            <th className="px-6 py-3 text-left">Trainee Name</th>
            <th className="px-6 py-3 text-left">Subject Code</th>
            <th className="px-6 py-3 text-center">Avg Rating</th>
            <th className="px-6 py-3 text-center">Open Date</th>
            <th className="px-6 py-3 text-center">Last Update</th>
            <th className="px-6 py-3 text-center">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {feedbacks.map((feedback, index) => (
            <tr key={feedback.feedbackId} className="border-b">
              <td className="px-6 py-3 text-center">{index + 1}</td>
              <td className="px-6 py-3">{feedback.traineeName}</td>
              <td className="px-6 py-3">{feedback.subjectCode}</td>
              <td className="px-6 py-3 text-center">{feedback.avgRating} ⭐</td>
              <td className="px-6 py-3 text-center">{new Date(feedback.openDate).toLocaleDateString()}</td>
              <td className="px-6 py-3 text-center">{new Date(feedback.lastUpdate).toLocaleDateString()}</td>
              <td className="border px-6 py-3 justify-center-center">
                <div className="flex justify-center">
                  <Link href={`#`}>
                    <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                  </Link>
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

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-3 py-2 rounded ${currentPage === index ? "bg-[#6FBC44] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FeedbackListForm;