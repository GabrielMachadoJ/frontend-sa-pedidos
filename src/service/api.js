import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9090",
  // baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAwNzg2NTI5LCJleHAiOjE3MDA3ODgzMjl9.52fRtjqwbaPsvWVY330F4eVjzo-IdWGJHxdtKvXZ5W0`,
  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
