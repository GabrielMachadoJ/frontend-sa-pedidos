import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzY1MTk3LCJleHAiOjE3MDEzNjY5OTd9.qtDEvz06ds0-l3JSl9OTU-PkNA3WSHoRockK9RziS2A`,
  },
});

export const apiKauan = axios.create({
  baseURL: "https://gestao-de-cadastros-api-production.up.railway.app/",
});
