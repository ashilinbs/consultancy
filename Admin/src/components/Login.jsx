import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logincon from '../assets/logincon.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      if (res.data.token && res.data.role) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", email);
        localStorage.setItem("name", res.data.name);
        alert("Login Successful");

        if (res.data.role === "admin") {
          navigate("/admin");
        } else if (res.data.role === "customer") {
          navigate("/customer-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-2/5 hidden md:block h-full">
        <img
          src={logincon}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Login Section */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg w-96">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back!</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
