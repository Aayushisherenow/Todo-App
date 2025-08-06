import axios from "axios";

const isProd = import.meta.env.MODE === "production";


export const axiosInstance = axios.create({
    baseURL: isProd
        ? import.meta.env.VITE_API_URL
        : import.meta.env.VITE_LOCAL_API_URL,
});

// export const authAxios = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   }
// });


