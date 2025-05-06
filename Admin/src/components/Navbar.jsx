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
        <button onClick={() => handleNavigation("/")} className="relative pb-1 hover:text-black-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-700 hover:after:w-full after:transition-all after:duration-300 ">
          Home
        </button>
        <button onClick={() => handleNavigation("/about")} className="relative pb-1 hover:text-black-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-700 hover:after:w-full after:transition-all after:duration-300  ">
          About
        </button>
        <button onClick={() => handleNavigation("/contact")} className="relative pb-1 hover:text-black-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-700 hover:after:w-full after:transition-all after:duration-300  ">
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
