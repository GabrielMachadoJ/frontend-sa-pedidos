import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9090",
  // baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNzAwNDM0MjgzLCJleHAiOjE3MDA1MjA2ODN9.Bum_jZKUoHeWWNCanBX8ABXjJ3Ee2dbfgcrbjMlXTsk`,
  },
});
