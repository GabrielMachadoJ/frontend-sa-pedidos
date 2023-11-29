import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMjg4Nzg3LCJleHAiOjE3MDMwMTY3ODd9.VN6j8fMaURQhj81unxQOYth7Bb9L-rixZVwABddO8RI`,

  },
});

export const apiKauan = axios.create({
  baseURL: "http://localhost:9091",
});
