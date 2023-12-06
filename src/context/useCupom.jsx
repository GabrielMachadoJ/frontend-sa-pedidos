import { createContext, useContext, useEffect, useState } from "react";
import { getDecrypted } from "../utils/crypto";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState([]);
  const [qtdCupons, setQtdCupons] = useState(0);
  const [cupomSelecionado, setCupomSelecionado] = useState({});
  const [isCupom, setIsCupom] = useState(false);

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
      }}
    >
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
