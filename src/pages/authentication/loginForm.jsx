import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineUser, AiFillLinkedin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ isLoginOpen, setIsLoginOpen }) => {
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginRef = useRef(null);
  const navigate = useNavigate();
  //static array of credentials
  const validCredentials = [
    { email: "andrei@example.com", password: "Abc123@@fg" },
  ];
  //Login function, checks if inputs are filled, and if matches the static array of credentials
  const handleLogin = () => {
    if (!email || !password) {
      setError("Enter username/email and password");
    } else {
      const isValid = validCredentials.some(
        (cred) => cred.email === email && cred.password === password
      );
      if (!isValid) {
        setError("Incorrect username/email or password");
      } else {
        setError("");
        triggerLoading("Logging in...");
      }
    }
  };
  //call to execute the loading
  const triggerLoading = (method) => {
    setLoginMethod(method);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/user/dashboard");
      localStorage.setItem("loginSuccess", "true");
    }, 3000);
  };
  //setting the error to blank ""
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  //It is for closing modals for clicking outside of the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!loginRef.current?.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsLoginOpen]);

  return (
    // to open the login modal
    <div
      ref={loginRef}
      className={`absolute top-16 sm:mr-2 sm:right-0 bg-gradient-to-r from-blue-500 to-purple-700 w-[21rem] rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out z-50 
    ${isLoginOpen ? "opacity-100 visible" : "opacity-0 invisible"} 
    ${
      isLoginOpen
        ? "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0"
        : "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-[0%]"
    }`}
    >
      <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
      {/* Loading interface */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-32">
          <div className="loader border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-white mt-4 font-bold">{loginMethod}</p>
        </div>
      ) : (
        <>
          <div className="h-5 w-full mb-4 flex justify-center items-center">
            {error && (
              <p className="text-white bg-red-500 text-center text-sm truncate w-full whitespace-nowrap px-4 py-2 rounded-md ">
                {error}
              </p>
            )}
          </div>
          {/* Login Form */}
          <input
            type="text"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 text-black w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 text-black w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLogin}
            className="bg-white text-[#284A93] py-3 w-full rounded-lg font-bold hover:bg-gray-100"
          >
            Log In
          </button>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-6">
            {[
              {
                Icon: FaGoogle,
                label: "Logging in Google Account",
                color: "text-red-600",
                tooltip: "Google",
              },
              {
                Icon: AiOutlineUser,
                label: "Scanning Face",
                color: "text-blue-600",
                tooltip: "Face Scan",
              },
              {
                Icon: AiFillLinkedin,
                label: "Logging in LinkedIn Account",
                color: "text-blue-600",
                tooltip: "LinkedIn",
              },
            ].map(({ Icon, label, color, tooltip }, index) => (
              <button
                key={index}
                onClick={() => triggerLoading(label)}
                className="relative bg-white p-3 rounded-full hover:bg-gray-200 mt-2 group"
              >
                <Icon className={`w-7 h-7 ${color}`} />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 min-w-[80px] py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {tooltip}
                </span>
              </button>
            ))}
          </div>
          <div className="text-center text-sm mt-6">
            <button
              onClick={() => {
                navigate("/forgot-password");
                setIsLoginOpen(false);
              }}
              className="hover:underline text-white font-bold"
            >
              Forgot your password?
            </button>
          </div>
          <div className="text-center text-sm mt-4">
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                  setIsLoginOpen(false);
                }}
                className="hover:underline text-white font-bold"
              >
                Register now
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// Define PropTypes
LoginForm.propTypes = {
  isLoginOpen: PropTypes.bool.isRequired,
  setIsLoginOpen: PropTypes.func.isRequired,
};

export default LoginForm;
