import React from "react";
import { Link } from "react-router-dom";
import Internlogo from "../assets/internlogo.png";

const Header = () => {
  return (
    <header className="bg-hgray w-full mx-auto md:px-12 py-3 flex items-center justify-between px-2">
      {/* Left Side */}
      <div className="flex items-center">
        <Link to="/">
          {" "}
          <img
            src={Internlogo}
            alt="Intern"
            className="h-9  sm:h-12 md:h-16  h-16 w-auto"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
