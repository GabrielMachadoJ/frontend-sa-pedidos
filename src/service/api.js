import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9090",
  // baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAwODY1MjM4LCJleHAiOjE3MDA5NTE2Mzh9.sJd1ERx1IBa50wXjaiJXH0tGkJCBoazmVfrmnp21NL4`,
  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
