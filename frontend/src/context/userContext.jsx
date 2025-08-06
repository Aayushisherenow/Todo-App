import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const isProd = import.meta.env.MODE === "production";


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

 const logout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   setUser(null);
   setToken(null);
 };

 
const authAxios = axios.create({
  baseURL: isProd
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_LOCAL_API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    config.headers["Content-Type"] = "application/json";
  return config;
});


  return (
    <userContext.Provider value={{ user, token, login, logout, authAxios }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
