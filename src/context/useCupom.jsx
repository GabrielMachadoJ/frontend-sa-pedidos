import { createContext, useContext, useEffect, useState } from "react";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState(null);
  const [qtdCupons, setQtdCupons] = useState(0);

  useEffect(() => {}, []);

  return (
    <CupomContext.Provider value={{ cupons, qtdCupons }}>
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
