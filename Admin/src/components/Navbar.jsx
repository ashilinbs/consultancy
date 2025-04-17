import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate("/login"); // Redirect to login before accessing any page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">My Shop</h1>
      <div className="space-x-4">
        <button onClick={() => handleNavigation("/")} className="hover:underline">
          Home
        </button>
        <button onClick={() => handleNavigation("/about")} className="hover:underline">
          About
        </button>
        <button onClick={() => handleNavigation("/contact")} className="hover:underline">
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
