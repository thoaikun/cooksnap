import axios from "axios";

const base = axios.create({
  baseURL: "http://192.168.88.138:8080",
});

export default base;