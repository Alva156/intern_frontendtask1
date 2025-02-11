import React from "react";
import Internlogo from "../assets/internlogo.png";
import { Link } from "react-router-dom";
//All Imported Icons in this page
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-white py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Left - Brand and About */}
          <Link to="/">
            {" "}
            <img
              src={Internlogo}
              alt="Intern"
              className="h-12  md:h-16  h-16 w-auto"
            />
          </Link>

          {/* Right - Social Media Links */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <div className="flex space-x-4 mt-6 md:mt-0">
              <a
                href="#"
                className="text-white bg-blue-900 hover:text-gray-400 transition rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white bg-blue-900 hover:text-gray-400 transition rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white bg-blue-900 hover:text-gray-400 transition rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white bg-blue-900 hover:text-gray-400 transition rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="border-t border-blue-900 mt-6 pt-4 text-center text-sm text-blue-900">
          © 2025 internship. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
