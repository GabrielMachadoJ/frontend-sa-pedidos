import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzQxNzY5LCJleHAiOjE3MDEzNDM1Njl9.n4QBURkD34kuEPTrWhqcuVAqCG1NgA5W2OJA5YuAPbQ`,

  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
