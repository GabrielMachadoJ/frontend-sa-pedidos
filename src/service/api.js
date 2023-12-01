import axios from "axios";

export const apiLaudelino = axios.create({
  baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAxMzk0MDEzLCJleHAiOjE3MDEzOTU4MTN9.769bqDBcoThRiqKVMA3f2ITVJFDRlHC11qu-IkZw3cA`,
  },
});

export const apiKauan = axios.create({
  baseURL: "https://gestao-de-cadastros-api-production.up.railway.app/",
});
