import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/api/"
});

export const authAxios = axios.create({
  baseURL: "http://localhost:3333/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});


