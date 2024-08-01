import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuthHook = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPURL,
  headers: { "Content-Type": "application/json" },
});
