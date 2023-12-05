import { createContext, useContext, useEffect, useState } from "react";
import { getDecrypted } from "../utils/crypto";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState([]);
  const [qtdCupons, setQtdCupons] = useState(0);
  const [cupomSelecionado, setCupomSelecionado] = useState({});
  const [isCupom, setIsCupom] = useState(false);

  useEffect(() => {
    const handleSetCupons = () => {
      const hashCupom = localStorage.getItem("cupom") || "";

      if (hashCupom) {
        const cupom = getDecrypted(hashCupom);
        console.log(cupom);
        setCupons(cupom.listagem);
        setQtdCupons(cupom.totalDeItens);
      }
    };
    handleSetCupons();
  }, []);

  const handleSetCupomSelecionado = (id) => {
    setCupomSelecionado(id);
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
      }}
    >
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
