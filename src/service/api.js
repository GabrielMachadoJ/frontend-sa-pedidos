import axios from "axios";

const token = process.env.REACT_APP_TOKEN;

export const api = axios.create({
  baseURL: "http://localhost:9090",
  // baseURL: "https://cardapios-mktplace-api-production.up.railway.app",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkxPSklTVEEiLCJzdWIiOiJ1c3VhcmlvNS5sb2ppc3RhIiwiaWF0IjoxNjk5NjYzNjI2LCJleHAiOjE2OTk2NjU0MjZ9.ftE7fHcpabUPIDSF24iWZ-Bxf690rzHMW1r93nPABXI`,
  },
});
