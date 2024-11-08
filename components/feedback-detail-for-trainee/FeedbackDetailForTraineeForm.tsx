"use client";

import React, { useState } from "react";
import { Home, Users, BookOpen, Settings, LogOut, UserCircle, BookCheck } from "lucide-react";

interface FeedbackDetailData {
  class: string;
  trainer: string;
  subjectName: string;
  duration: string;
  curriculumRating: number;
  recommendCourse: boolean;
  satisfiedCurriculum: boolean;
  trainerTeachFull: boolean;
  trainerOnTime: boolean;
  description: string;
}

const FeedbackDetailForTraineeForm: React.FC = () => {
  // Use state for form data
  const [feedbackDetail, setFeedbackDetail] = useState<FeedbackDetailData>({
    class: "Java01",
    trainer: "HuyLT",
    subjectName: "Java",
    duration: "12/8/2024-12/12-2024",
    curriculumRating: 3,
    recommendCourse: true,
    satisfiedCurriculum: true,
    trainerTeachFull: true,
    trainerOnTime: true,
    description: ""
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving feedback...", feedbackDetail);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Canceling...");
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackDetail(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const renderStar = (position: number) => {
    return (
      <svg
        key={`star-${position}`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={position <= feedbackDetail.curriculumRating ? "#FFD700" : "none"}
        stroke="#FFD700"
        strokeWidth="2"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  };

  const handleRadioChange = (field: keyof FeedbackDetailData) => {
    setFeedbackDetail(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden bg-[#EFF5EB]">
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
        <div className="p-6 bg-white">
          <h2 className="text-4xl font-bold">Feedback Detail</h2>
        </div>

        {/* Content */}
        <div className="p-4 w-[95%] mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Feedback Detail Section */}
            <h3 className="text-2xl font-bold mb-6">Feedback Detail</h3>
            
            <div className="grid grid-cols-2 gap-y-4 mb-8">
              <div className="flex gap-2">
                <span className="font-bold">Class:</span>
                <span>{feedbackDetail.class}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Trainer:</span>
                <span>{feedbackDetail.trainer}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Subject Name:</span>
                <span>{feedbackDetail.subjectName}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Duration:</span>
                <span>{feedbackDetail.duration}</span>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mb-6">
              <p className="mb-2 font-medium">How would you rate the curriculum quality?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => renderStar(num))}
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div>
                <p className="mb-2">Would you recommend the course to others?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.recommendCourse}
                      onChange={() => handleRadioChange('recommendCourse')}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.recommendCourse}
                      onChange={() => handleRadioChange('recommendCourse')}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Does the trainer come to class on time?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="onTime"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.trainerOnTime}
                      onChange={() => handleRadioChange('trainerOnTime')}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="onTime"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.trainerOnTime}
                      onChange={() => handleRadioChange('trainerOnTime')}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Are you satisfied with the curriculum?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="satisfied"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.satisfiedCurriculum}
                      onChange={() => handleRadioChange('satisfiedCurriculum')}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="satisfied"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.satisfiedCurriculum}
                      onChange={() => handleRadioChange('satisfiedCurriculum')}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Does the trainer teach the full lesson?</p>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teachFull"
                      className="form-radio text-[#6FBC44]"
                      checked={feedbackDetail.trainerTeachFull}
                      onChange={() => handleRadioChange('trainerTeachFull')}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="teachFull"
                      className="form-radio text-[#6FBC44]"
                      checked={!feedbackDetail.trainerTeachFull}
                      onChange={() => handleRadioChange('trainerTeachFull')}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <p className="font-bold mb-2">Description</p>
              <textarea
                className="w-full min-h-[200px] p-4 border rounded-lg bg-gray-50 resize-none"
                value={feedbackDetail.description}
                onChange={handleDescriptionChange}
                placeholder="Enter your feedback description here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#6FBC44] text-white rounded-lg hover:bg-[#5da639] font-semibold"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailForTraineeForm;