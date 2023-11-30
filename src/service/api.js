import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzY1ODA3LCJleHAiOjE3MDEzNjc2MDd9.ST7HA9D5H3bhxm1w9q2HFZlTdwuJK1CbWLeBGpYwRtM`,
  },
});

export const apiKauan = axios.create({
  baseURL: "https://gestao-de-cadastros-api-production.up.railway.app/",
});
