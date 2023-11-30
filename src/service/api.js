import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzY0NzQ5LCJleHAiOjE3MDEzNjY1NDl9.mDfz3DEX_XUQQJ7OEk_m4coHfn-n8sTRLg0XAmR0pdw`,
  },
});

export const apiKauan = axios.create({
  baseURL: "https://gestao-de-cadastros-api-production.up.railway.app/",
});
