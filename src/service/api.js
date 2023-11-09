import axios from "axios";

const token = process.env.REACT_APP_TOKEN;

export const api = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
});
