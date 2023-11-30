import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzA2NjgxLCJleHAiOjE3MDEzMDg0ODF9.mNHQbxmQ_FP6aaJEtahZpa1VmKKKmzqpzGHC-kN2sHU`,
  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9090",
});
