import axios from "axios";

const token = process.env.REACT_APP_TOKEN;

console.log(token);
export const api = axios.create({
  baseURL: "http://localhost:9090",
  //baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json.",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});
