import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:9090",
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMTMxMDkxLCJleHAiOjE3MDExMzI4OTF9.81Cuu1Upz8sY3Zkx06hm-TrNmfzsFE86RTmF7VOqE2k`,
  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
