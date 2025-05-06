import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, Cell, CartesianGrid, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/admin/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching admin orders:", err));
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total_price) || 0), 0);
  const canceled = orders.filter(o => o.delivery_status === "Canceled").length;
  const pending = orders.filter(o => o.delivery_status === "Pending").length;
  const delivered = orders.filter(o => o.delivery_status === "Delivered").length;

  const statusData = [
    { name: "Delivered", value: delivered },
    { name: "Pending", value: pending },
    { name: "Canceled", value: canceled },
  ];

  const paymentData = [
    { name: "COD", value: orders.filter(o => o.payment_method === "COD").length },
    { name: "Online", value: orders.filter(o => o.payment_method === "Online").length },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl mt-2">{totalOrders}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl mt-2">₹{totalRevenue}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-2xl mt-2">{pending}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-lg font-semibold">Delivered Orders</h3>
          <p className="text-2xl mt-2">{delivered}</p>
        </div>
      </div>

      {/* Delivery Status Pie Chart */}
      <div className="mt-8 bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#4CAF50', '#FFC107', '#F44336'][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Method Pie Chart */}
      <div className="mt-8 bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Methods</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#03A9F4', '#FF9800'][index % 2]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Analysis;
