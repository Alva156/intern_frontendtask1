import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../App.css";

//Overall layout for the Guest Pages
const Guest = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Guest;
