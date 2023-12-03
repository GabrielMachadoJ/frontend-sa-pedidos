import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN_LAUDELINO;
const URL_LAUDELINO = process.env.REACT_APP_URL_LAUDELINO;
const URL_KAUAN = process.env.REACT_APP_URL_KAUAN;

export const apiLaudelino = axios.create({
  baseURL: URL_LAUDELINO,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const apiKauan = axios.create({
  baseURL: URL_KAUAN,
});
