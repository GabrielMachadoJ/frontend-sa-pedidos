import axios from "axios";

const token = process.env.REACT_APP_TOKEN_LAUDELINO;
const urlLaudelino = process.env.REACT_APP_URL_LAUDELINO;
const urlKauan = process.env.REACT_APP_URL_KAUAN;

export const apiLaudelino = axios.create({
  baseURL: urlLaudelino,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const apiKauan = axios.create({
  baseURL: urlKauan,
});
