import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { motion } from "framer-motion";
//Array of security tips
const securityTips = [
  "Make sure your email is valid to receive important updates.",
  "Avoid using common passwords like '123456' or 'password'.",
  "Review your details before submitting to avoid errors.",
  "Keep your login credentials safe and do not share them.",
];
//Array of common issues
const commonIssues = [
  "Make sure all required fields are filled in correctly.",
  "If your email is already registered, try logging in instead.",
  "Passwords must meet the requirements to proceed.",
  "Ensure your internet connection is stable before submitting.",
  "Refresh the page if you experience any loading issues.",
];

const Register = () => {
  //Initialization
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);
  const nextTip = () => setTipIndex((prev) => (prev + 1) % securityTips.length);
  const modalRef = useRef(null);
  const modalRefInfo = useRef(null);
  const [useFaceScan, setUseFaceScan] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [state, setState] = useState({
    showPopup: false,
    errorMessage: "",
    loading: false,
    showFaceScanModal: false,
    scanning: false,
  });
  //Password Validations, passsword must be atleast one uppercase letter, lowercase letter, one number, and one special character
  const isPasswordValid = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const triggerPopup = (message) => {
    setState((prev) => ({ ...prev, showPopup: true, errorMessage: message }));
    setTimeout(() => setState((prev) => ({ ...prev, showPopup: false })), 3000);
  };

  const handleRegister = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      birthday,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !birthday
    )
      return triggerPopup("Please fill in all required fields.");
    if (!isPasswordValid(password))
      return triggerPopup("Password does not meet security requirements.");
    if (password !== confirmPassword)
      return triggerPopup("Passwords do not match.");
    setState((prev) => ({ ...prev, showFaceScanModal: true }));
  };

  const proceedWithRegistration = () => {
    setState({ loading: true });
    setTimeout(() => {
      setState({ loading: false });
      navigate("/user/dashboard");
      localStorage.setItem("loginSuccess", "true");
    }, 3000);
  };

  const handleFaceScanDecision = (decision) => {
    setState((prev) => ({
      ...prev,
      showFaceScanModal: false,
      scanning: decision === "yes",
    }));
    if (decision === "yes") setTimeout(() => proceedWithRegistration(), 4000);
    else proceedWithRegistration();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) ||
        (modalRefInfo.current && !modalRefInfo.current.contains(event.target))
      ) {
        setState((prev) => ({
          ...prev,
          showFaceScanModal: false,
          showInfoModal: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-blue-900 p-6">
      {state.showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg">
          {state.errorMessage}
        </div>
      )}
      {state.loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-lg font-semibold">Registering...</p>
          </div>
        </div>
      )}
      {state.showFaceScanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <p className="text-lg font-semibold">
              Do you want to use Face Scan?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => handleFaceScanDecision("yes")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => handleFaceScanDecision("no")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {state.scanning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-lg font-semibold">Scanning Face...</p>
            <div className="mt-4 animate-bounce text-gray-500">
              Please hold...
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full overflow-hidden">
        {/* Left form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full xl:w-[50%] bg-[#F5F5F5] shadow-2xl rounded-3xl p-8 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h2>

          {!useFaceScan && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "firstName",
                "lastName",
                "email",
                "phone",
                "birthday",
                "password",
                "confirmPassword",
              ].map((field, index) => (
                <>
                  {/* Insert Gender dropdown after the second field (Last Name) */}
                  {index === 2 && (
                    <select
                      key="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="" disabled>
                        Select Gender *
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Rather not say</option>
                    </select>
                  )}

                  {/* Render Input Fields */}
                  <input
                    key={index}
                    type={
                      field.includes("password") || field === "confirmPassword"
                        ? "password"
                        : field === "birthday"
                        ? "date"
                        : "text"
                    }
                    name={field}
                    placeholder={
                      field
                        .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
                        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                        .trim() + " *"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 placeholder-black text-black"
                  />
                </>
              ))}
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
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-indigo-700 mt-4"
          >
            Register
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-black"></div>
            <span className="px-3">OR</span>
            <div className="flex-1 border-t border-black"></div>
          </div>
          <div className="flex justify-center gap-4 md:gap-12">
            <button
              onClick={proceedWithRegistration}
              className="bg-white p-6 rounded-full hover:bg-gray-200 relative group"
            >
              <FaGoogle className="text-red-500 text-2xl" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 min-w-[80px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Google
              </span>
            </button>

            <button
              onClick={proceedWithRegistration}
              className="bg-white p-6 rounded-full hover:bg-gray-200 group relative"
            >
              <FaLinkedin className="text-blue-600 text-2xl" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 min-w-[80px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                LinkedIn
              </span>
            </button>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl xl:w-[48%] min-h-[60vh] xl:min-h-[50vh] flex flex-col justify-between space-y-6 text-white px-4 sm:px-6 md:px-12"
        >
          {/* Security Tips */}
          <div className="p-6 bg-[#F5F5F5] rounded-2xl shadow-md text-center flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-900">
              🔒 Security Tip
            </h3>
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-2 text-base text-blue-900 opacity-90"
            >
              {securityTips[tipIndex]}
            </motion.p>
            <button
              onClick={nextTip}
              className="mt-3 px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300"
            >
              Next Tip
            </button>
          </div>

          {/* Common Issues */}
          <div className="p-6 bg-[#F5F5F5] rounded-2xl shadow-md text-center flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-900">
              ⚠️ Common Issues
            </h3>
            <ul className="mt-2 text-base text-blue-900 opacity-90 space-y-2 text-center">
              {commonIssues.map((issue, index) => (
                <li key={index} className="flex justify-center items-center">
                  <span className="mr-2">•</span> {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Support */}
          <div className="p-6 bg-[#F5F5F5] rounded-2xl shadow-md text-center flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-900">
              📩 Need More Help?
            </h3>
            <p className="mt-2 text-base text-blue-900 opacity-90">
              If you're still facing issues, contact support at{" "}
              <span className="font-semibold">support@example.com</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Register;
