import axios from "axios";

const obterNovoToken = async () => {
  try {
    const response = await axios.post('https://cardapios-mktplace-api-production.up.railway.app/auth', {
      login: 'usuario5.lojista',
      senha: '123456',
    });

    const novoToken = response.data.token;
    console.log('Novo Token:', novoToken);
    return novoToken;
  } catch (error) {
    console.error('Erro ao obter novo token:', error);
    throw error;
  }
};

export const apiLaudelino = axios.create({
  baseURL: 'https://cardapios-mktplace-api-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

const configurarTokenNaApi = async () => {
  const tokenAtual = await obterNovoToken();
  apiLaudelino.defaults.headers.Authorization = `Bearer ${tokenAtual}`;
};

configurarTokenNaApi();
setInterval(configurarTokenNaApi, 20 * 60 * 1000);

export const apiKauan = axios.create({
  baseURL: "https://gestao-de-cadastros-api-production.up.railway.app/",
});
