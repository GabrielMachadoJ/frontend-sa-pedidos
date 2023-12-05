import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN_LAUDELINO;
const TOKEN_PEDIDO = process.env.REACT_APP_TOKEN_PEDIDO;
const TOKEN_RAUL = process.env.REACT_APP_TOKEN_RAUL;
const URL_LAUDELINO = process.env.REACT_APP_URL_LAUDELINO;
const URL_KAUAN = process.env.REACT_APP_URL_KAUAN;
const URL_PEDIDO = process.env.REACT_APP_URL_PEDIDO;
const URL_RAUL = process.env.REACT_APP_URL_RAUL;
const URL_CEP = process.env.REACT_APP_URL_CEP;

export const apiLaudelino = axios.create({
  baseURL: URL_LAUDELINO,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const apiRaul = axios.create({
  baseURL: URL_RAUL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN_RAUL}`,
  },
});

export const apiKauan = axios.create({
  baseURL: URL_KAUAN,
});

export const apiCep = axios.create({
  baseURL: URL_CEP,
});

//nossa api(pedido)
export const api = axios.create({
  baseURL: URL_PEDIDO,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN_PEDIDO}`,
  },
});
