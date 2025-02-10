import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "profile", "logout", or null
  const modalRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const menuItems = ["Dashboard", "Companies", "Stories", "FAQs"];
  const userName = "Andrei Alvarico";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setModalType("loading");
    setTimeout(() => navigate("/"), 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalType(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-700 text-white p-4 relative">
      <div className="max-w-auto mx-auto flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="lg:hidden"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 ml-12">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
              className="text-lg text-[#F5F5F5] font-bold border-b-2 border-transparent hover:border-white transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Profile Icon */}
        <button
          className="ml-auto lg:mr-4"
          onClick={() => setModalType("profile")}
        >
          <FaUserCircle className="w-8 h-8" />
        </button>
      </div>

      {/* Profile Modal */}
      {modalType === "profile" && (
        <div
          ref={modalRef}
          className={`absolute top-[70px] sm:mr-2 sm:right-0 bg-gradient-to-r from-blue-500 to-purple-700 w-[21rem] rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out z-50 
            opacity-100 visible left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0`}
        >
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-4">
            <div>
              <p className="text-lg font-semibold">{userName}</p>
              <p className="text-sm text-gray-200">andrei@example.com</p>{" "}
              {/* Replace with dynamic email */}
            </div>
          </div>

          {/* Profile Actions */}
          <div className="space-y-3">
            <button className="w-full bg-white text-blue-700 py-2 rounded hover:bg-gray-200 transition flex items-center justify-center">
              View Profile
            </button>

            <button className="w-full bg-white text-blue-700 py-2 rounded hover:bg-gray-200 transition flex items-center justify-center">
              Settings
            </button>
          </div>

          {/* Logout Button */}
          <button
            className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            onClick={() => setModalType("logout")}
          >
            Logout
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {modalType === "logout" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <p className="text-lg text-blue-900 font-semibold mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setModalType(null)}
                className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
            onClick={() => handleNavigation(`/user/${item.toLowerCase()}`)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Logging Out Modal */}
      {modalType === "loading" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg text-blue-900 font-semibold">
              Logging out...
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
