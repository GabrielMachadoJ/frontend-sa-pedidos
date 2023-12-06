import { createContext, useContext, useEffect, useState } from "react";
import { getDecrypted, getEncrypted } from "../utils/crypto";
import { apiKauan } from "../service/api";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState([]);
  const [qtdCupons, setQtdCupons] = useState(0);
  const [cupomSelecionado, setCupomSelecionado] = useState({});
  const [isCupom, setIsCupom] = useState(false);

  const URL = process.env.REACT_APP_URL_KAUAN;

  const handleSetCupomSelecionado = (id) => {
    setCupomSelecionado(id);
  };

  const handleSetCupons = () => {
    const hashCupom = localStorage.getItem("cupom");

    if (hashCupom) {
      const cupom = getDecrypted(hashCupom);
      setCupons(cupom.listagem);
      setQtdCupons(cupom.totalDeItens);
    }
  };

  const getCupom = async (token) => {
    const response = await apiKauan.get(`${URL}cupons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    if (data) {
      const hashCupom = getEncrypted(data);
      localStorage.setItem("cupom", hashCupom);
      handleSetCupons();
    }
  };

  const handleSetIsCupom = (openOrNot) => {
    setIsCupom(openOrNot);
  };

  return (
    <CupomContext.Provider
      value={{
        cupons,
        qtdCupons,
        isCupom,
        cupomSelecionado,
        handleSetIsCupom,
        handleSetCupomSelecionado,
        handleSetCupons,
        getCupom,
      }}
    >
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
