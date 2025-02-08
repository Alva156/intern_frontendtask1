import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/userNavbar.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../App.css";

const User = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <UserNavbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default User;
