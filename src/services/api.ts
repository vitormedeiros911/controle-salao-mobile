import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.254.7:3000",
});
