import React from "react";
import { FaPlusCircle, FaBookOpen, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-600 mt-2">
          Start sharing your experiences or apply for new opportunities.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div
            onClick={() => navigate("/user/companies")}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Apply for a Job
              </h3>
              <p className="text-gray-500 mt-1">
                Explore new job opportunities.
              </p>
            </div>
            <FaPlusCircle className="text-blue-600 text-3xl" />
          </div>
          <div
            onClick={() => navigate("/user/stories")}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Write Your Experience
              </h3>
              <p className="text-gray-500 mt-1">
                Share your career journey and inspire others.
              </p>
            </div>
            <FaBookOpen className="text-green-600 text-3xl" />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FaClock className="text-gray-500" />
              <span className="text-gray-600">
                You applied for a job at XYZ Company
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaClock className="text-gray-500" />
              <span className="text-gray-600">
                You shared an experience about your first job
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaClock className="text-gray-500" />
              <span className="text-gray-600">
                Your story received 15 likes!
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
