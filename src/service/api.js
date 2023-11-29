import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzAwODM5LCJleHAiOjE3MDEzMDI2Mzl9.EahK4VluJVB_TNtN6Bqg2JhR8020OLfeG0w6SJNrwh8`,

  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
