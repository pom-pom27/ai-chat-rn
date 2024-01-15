import axios from "axios";

const BASE_URL = "https://bard-api-nextjs-theta.vercel.app"; //Replace with System PC IP address

let ab: AbortController = new AbortController();

const resetAC = () => {
  ab = new AbortController();
};

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  signal: ab.signal,
});

export const getBardApi = (msg: string) =>
  axiosClient.get("/api/bardapi", { params: { msg } });

export const resetSignal = () => {
  ab.abort();

  resetAC();

  axiosClient.defaults.signal = ab.signal;
};
