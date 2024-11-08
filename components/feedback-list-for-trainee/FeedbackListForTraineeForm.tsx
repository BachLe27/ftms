"use client";
import React, { useState, useEffect } from "react";
import { Home, Users, BookOpen, Settings, LogOut, UserSquare2, GraduationCap, ChevronDown } from "lucide-react";
import { FiEdit } from "react-icons/fi";

interface FeedbackData {
  id: number;
  subjectCode: string;
  rate: number;
  openDate: string;
  lastUpdate: string;
}

const FeedbackListForTraineeForm: React.FC = () => {
  // Original data
  const originalData: FeedbackData[] = [
    {
      id: 1,
      subjectCode: "Java",
      rate: 5,
      openDate: "dd/mm/yyyy",
      lastUpdate: "dd/mm/yyyy",
    },
    {
      id: 2,
      subjectCode: "Java",
      rate: 5,
      openDate: "dd/mm/yyyy",
      lastUpdate: "dd/mm/yyyy",
    },
    {
      id: 3,
      subjectCode: "Java",
      rate: 5,
      openDate: "dd/mm/yyyy",
      lastUpdate: "dd/mm/yyyy",
    },
    {
      id: 4,
      subjectCode: "Java",
      rate: 5,
      openDate: "dd/mm/yyyy",
      lastUpdate: "dd/mm/yyyy",
    },
    {
      id: 5,
      subjectCode: "Java",
      rate: 5,
      openDate: "dd/mm/yyyy",
      lastUpdate: "dd/mm/yyyy",
    },
  ];

  // States
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>(originalData);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showRateDropdown, setShowRateDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<string>("");
  const [showNotRated, setShowNotRated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [traineeName] = useState("Nguyen Thi Phuong Dieu");

  // Filter options
  const subjects = ["All", "Java", "Python", "React", "Node.js"];
  const rates = [
    { label: "All", value: null },
    { label: "5 ⭐", value: 5 },
    { label: "4 ⭐", value: 4 },
    { label: "3 ⭐", value: 3 },
    { label: "2 ⭐", value: 2 },
    { label: "1 ⭐", value: 1 },
  ];

  // Filter and sort data
  useEffect(() => {
    let filteredData = [...originalData];

    // Filter by subject
    if (selectedSubject && selectedSubject !== "All") {
      filteredData = filteredData.filter(
        (item) => item.subjectCode === selectedSubject
      );
    }

    // Filter by rate
    if (selectedRate !== null) {
      filteredData = filteredData.filter((item) => item.rate === selectedRate);
    }

    // Filter not rated
    if (showNotRated) {
      filteredData = filteredData.filter((item) => item.rate === 0);
    }

    // Sort data
    switch (orderBy) {
      case "latest":
        filteredData.sort(
          (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
        );
        break;
      case "high":
        filteredData.sort((a, b) => b.rate - a.rate);
        break;
      case "low":
        filteredData.sort((a, b) => a.rate - b.rate);
        break;
    }

    setFeedbacks(filteredData);
  }, [selectedSubject, selectedRate, orderBy, showNotRated]);

  // Handle subject selection
  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setShowSubjectDropdown(false);
  };

  // Handle rate selection
  const handleRateSelect = (rate: number | null) => {
    setSelectedRate(rate);
    setShowRateDropdown(false);
  };

  // Handle not rated toggle
  const handleNotRatedToggle = () => {
    setShowNotRated(!showNotRated);
    if (!showNotRated) {
      setSelectedRate(null);
      setShowRateDropdown(false);
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

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
            <GraduationCap className="w-6 h-6 mr-4" />
            <span className="font-bold">Class Management</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 mt-36 hover:bg-[#5da639]">
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <UserSquare2 className="w-6 h-6 mr-4" />
            <span className="font-bold">My Account</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-[#5da639]">
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
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
                {/* Subject Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                    className={`bg-[#6FBC44] text-white px-4 py-1 rounded flex items-center gap-2 ${
                      selectedSubject ? 'bg-[#5da639]' : ''
                    }`}
                  >
                    {selectedSubject || "Subject"}
                    <ChevronDown size={16} />
                  </button>
                  {showSubjectDropdown && (
                    <div className="absolute top-full mt-1 bg-white border rounded shadow-lg z-10">
                      {subjects.map((subject) => (
                        <div 
                          key={subject}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSubjectSelect(subject)}
                        >
                          {subject}
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

        {/* Trainee Name Display */}
        <div className="flex justify-end mb-4">
          <div className="bg-[#6FBC44] text-white px-4 py-2 rounded flex items-center">
            <span className="font-bold mr-2">Trainee Name:</span>
            <span>{traineeName}</span>
          </div>
        </div>

        {/* Feedback Table */}
        <table className="w-full bg-[#6FBC44] rounded-t-lg">
          <thead>
            <tr className="text-white">
              <th className="px-6 py-3 text-center">#</th>
              <th className="px-6 py-3 text-left">Subject Code</th>
              <th className="px-6 py-3 text-center">Rate</th>
              <th className="px-6 py-3 text-center">Open Date</th>
              <th className="px-6 py-3 text-center">Last Update</th>
              <th className="px-6 py-3 text-center">Detail</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="border-b">
                <td className="px-6 py-3 text-center">{feedback.id}</td>
                <td className="px-6 py-3">{feedback.subjectCode}</td>
                <td className="px-6 py-3 text-center">
                  {feedback.rate === 0 ? "Not Rated" : `${feedback.rate} ⭐`}
                </td>
                <td className="px-6 py-3 text-center">{feedback.openDate}</td>
                <td className="px-6 py-3 text-center">{feedback.lastUpdate}</td>
                <td className="px-6 py-3">
                  <div className="flex justify-center">
                    <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button 
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <div className="px-4 py-2 bg-[#6FBC44] text-white rounded">
            {currentPage}
          </div>
          <button 
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackListForTraineeForm;