import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const base = axios.create({
  baseURL: "https://cooksnapbackend-production.up.railway.app",
});

base.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default base;