import { createContext, useContext, useEffect, useState } from "react";
import { getDecrypted } from "../utils/crypto";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState([]);
  const [qtdCupons, setQtdCupons] = useState(0);
  const [cupomSelecionado, setCupomSelecionado] = useState({});

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
  return (
    <CupomContext.Provider
      value={{ cupons, qtdCupons, cupomSelecionado, handleSetCupomSelecionado }}
    >
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
