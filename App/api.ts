import axios from "axios";

const BASE_URL = "https://bard-api-nextjs-theta.vercel.app"; //Replace with System PC IP address

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const getBardApi = (msg: string) =>
  axiosClient.get("/api/bardapi", { params: { msg } });
