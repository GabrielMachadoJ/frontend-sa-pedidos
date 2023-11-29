import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:9090",
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMjkwMzY5LCJleHAiOjE3MDEyOTIxNjl9.P7-7jS39AJT2Y6PxJ7p7BEV4DB5TC026XWaUKmAfAWk`,
  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
