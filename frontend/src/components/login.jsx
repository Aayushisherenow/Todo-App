import React, { useState } from "react";
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext.jsx";

const Login = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { login } = useUserContext();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password } = formData;

    // Validation
    if (!username || !password || (!isLogin && !email)) {
      setError("All fields are required");
      return;
    }

    if (username.length < 6) {
      setError("Username must be at least 6 characters long");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
      return;
    }

    try {
      if (isLogin) {
        const res = await axiosInstance.post("users/login", {
          username: username.trim(),
          password: password.trim(),
        });
        setSuccess("Login successful");
          localStorage.setItem("token", res.data.token);
          console.log("User data:", res.data.user);
        login(res.data.user, res.data.token); 
        navigate("/");
      } else {
        const res = await axiosInstance.post("users/register", {
            username: username.trim(),
            email: email.trim(),
          password: password.trim(),
        });
        setSuccess("Registration successful");
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">
        {/* Toggle buttons */}
        <div className="flex justify-between mb-6 border-b">
          <button
            className={`w-1/2 py-3 text-lg font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-blue-500 text-white rounded-t-2xl shadow-md"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-3 text-lg font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-blue-500 text-white rounded-t-2xl shadow-md"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Error & Success */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold text-white transition-all duration-300 ${
              isLogin
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
