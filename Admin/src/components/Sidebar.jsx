import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardListIcon,
  ShoppingCartIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-800 mb-8 tracking-wide">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition"
          >
            <ClipboardListIcon className="h-6 w-6" />
            <span className="font-medium">Orders Placed</span>
          </button>

          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="font-medium">Manage Products</span>
          </button>

          <button
            onClick={() => navigate("/analysis")}
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition"
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="font-medium">Analytics</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t">
          <p className="text-sm text-gray-400">© 2025 Christal Market</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
