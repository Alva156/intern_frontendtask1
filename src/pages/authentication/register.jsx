import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [useFaceScan, setUseFaceScan] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthday: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "gender",
      "birthday",
    ];
    const isEmptyField = requiredFields.some(
      (field) => formData[field].trim() === ""
    );

    if (isEmptyField) {
      setErrorMessage("Please fill up all required fields.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setErrorMessage("Password does not follow the requirements");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/user/home");
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-blue-900 p-6">
      {/* Error Popup */}
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg">
          {errorMessage}
        </div>
      )}

      {/* Registration Loading Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-lg font-semibold">Registering...</p>
          </div>
        </div>
      )}

      {/* Left Section - Register */}
      <div className="bg-[#F5F5F5] shadow-2xl rounded-3xl p-8 w-full max-w-2xl lg:w-1/2 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center">
          Join us and enhance your career!
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white p-3 rounded-full hover:bg-gray-200">
            <FaGoogle className="text-red-500 text-2xl" />
          </button>
          <button
            onClick={() => setUseFaceScan(!useFaceScan)}
            className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-200"
          >
            <AiOutlineUser className="text-xl" />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-gray-200">
            <FaLinkedin className="text-blue-600 text-2xl" />
          </button>
        </div>

        {!useFaceScan && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Gender *</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}
        <div className="text-xs text-red-600 w-full flex flex-col items-left">
          <div className="w-full max-w-sm">
            <p className="font-semibold mb-2">Password Requirements:</p>
            <ul className="list-disc pl-5">
              <li>Must be at least 8 characters long</li>
              <li>Must include at least one uppercase letter</li>
              <li>Must have at least one lowercase letter</li>
              <li>Must have at least one number</li>
              <li>Must have at least one special character</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-indigo-700"
        >
          {useFaceScan ? "Register with Face Scan" : "Register"}
        </button>
      </div>

      {/* Right Section - Extra Info */}
      <div className="hidden lg:flex flex-col justify-center items-center text-white p-8 w-1/2">
        <h3 className="text-2xl font-semibold mb-4">Why Join Us?</h3>
        <ul className="list-disc pl-5 space-y-2 text-lg">
          <li>Get access to exclusive internships</li>
          <li>Enhance your career with top-tier mentors</li>
          <li>Expand your network with industry professionals</li>
          <li>Receive personalized job recommendations</li>
          <li>Unlock advanced career-building resources</li>
          <li>Participate in industry workshops and events</li>
        </ul>
      </div>
    </div>
  );
};

export default Register;
