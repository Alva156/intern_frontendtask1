import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGoogle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { AiOutlineUser, AiFillLinkedin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const validCredentials = [
    { email: "user@example.com", password: "password123" },
  ];
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const menuRef = useRef(null);
  const loginRef = useRef(null);
  const buttonRef = useRef(null);
  const loginButtonRef = useRef(null);
  const navigate = useNavigate();
  const menuItems = ["Home", "Companies", "Stories", "FAQs"];

  const handleNavigation = (path) => (
    navigate(path), setIsMobileMenuOpen(false)
  );
  const toggleState = (setter) => setter((prev) => !prev);

  const triggerLoading = (method) => {
    setLoginMethod(method);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/user/home");
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !menuRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      )
        setIsMobileMenuOpen(false);
      if (
        !loginRef.current?.contains(event.target) &&
        !loginButtonRef.current?.contains(event.target)
      )
        setIsLoginOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#284A93]  text-white p-4 relative">
      <div className="max-w-auto mx-auto flex justify-between items-center">
        <button
          ref={buttonRef}
          onClick={() => toggleState(setIsMobileMenuOpen)}
          className="lg:hidden"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <div className="hidden lg:flex space-x-8 ml-12">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                handleNavigation(
                  item === "Home" ? "/" : `/${item.toLowerCase()}`
                )
              }
              className="text-lg font-bold border-b-2 border-transparent hover:border-white transition-all"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          ref={loginButtonRef}
          onClick={() => toggleState(setIsLoginOpen)}
          className="relative ml-auto lg:mr-4 group"
        >
          {isLoginOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <MdLogin className="w-6 h-6" />
          )}
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {isLoginOpen ? "Close" : "Login"}
          </span>
        </button>
      </div>
      <div
        ref={menuRef}
        className={`absolute left-0 top-16 bg-[#284A93] w-56 rounded-lg shadow-lg p-4 z-50 transition-transform ml-2 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="block w-full px-4 py-2 hover:bg-blue-700 font-bold"
            onClick={() =>
              handleNavigation(item === "Home" ? "/" : `/${item.toLowerCase()}`)
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div
        ref={loginRef}
        className={`absolute top-16 sm:mr-2 sm:right-0 bg-[#284A93] w-80 rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out z-50 ${
          isLoginOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } ${
          isLoginOpen
            ? "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0"
            : "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-[0%]"
        }`}
      >
        <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-32">
            <div className="loader border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-white mt-4 font-bold">{loginMethod}</p>
          </div>
        ) : (
          <>
            <div className="h-5 w-full mb-4 flex justify-center items-center">
              {error && (
                <p className="text-red-500 text-center text-sm truncate w-full whitespace-nowrap">
                  {error}
                </p>
              )}
            </div>

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
              <a href="#" className="hover:underline">
                Forgot your password?
              </a>
            </div>
            <div className="text-center text-sm mt-4">
              <p>
                Don't have an account?{" "}
                <a href="#" className="hover:underline text-white font-bold">
                  Register now
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
