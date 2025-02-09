import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoginForm from "../pages/authentication/loginForm";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const menuRef = useRef(null);
  const loginButtonRef = useRef(null);
  const navigate = useNavigate();
  const menuItems = ["Home", "Companies", "Stories", "FAQs"];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsLoginOpen(false);
  };

  const toggleState = (setter) => setter((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-700 text-white p-4 relative">
      <div className="max-w-auto mx-auto flex justify-between items-center">
        <button
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
              className="text-lg text-[#F5F5F5] font-bold border-b-2 border-transparent hover:border-white transition-all"
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
        </button>
      </div>
      <div
        ref={menuRef}
        className={`absolute left-0 top-16 bg-gradient-to-r from-blue-500 to-purple-700 w-56 rounded-lg shadow-lg p-4 z-50 transition-transform ml-2 ${
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
      {isLoginOpen && (
        <LoginForm isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
      )}
    </nav>
  );
};

export default Navbar;
