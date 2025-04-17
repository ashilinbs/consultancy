import React, { useState } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom"; // ✅

const CustomerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ✅

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`); // ✅
    }
  };

  return (
    <div>
      <nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-between items-center shadow-md sticky top-0 z-50 gap-4">
        <h1 className="text-xl font-bold">🛒 SuperMarket one</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 rounded-md text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <ul className="flex gap-6">
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-bold hover:underline" : "hover:underline"
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-bold hover:underline" : "hover:underline"
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-bold hover:underline" : "hover:underline"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-yellow-400 font-bold hover:underline" : "hover:underline"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerDashboard;
