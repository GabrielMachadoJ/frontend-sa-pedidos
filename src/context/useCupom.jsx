import { createContext, useContext, useEffect, useState } from "react";
import { getDecrypted } from "../utils/crypto";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState([]);
  const [qtdCupons, setQtdCupons] = useState(0);

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

  return (
    <CupomContext.Provider value={{ cupons, qtdCupons }}>
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
