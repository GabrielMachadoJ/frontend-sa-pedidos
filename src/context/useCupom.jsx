import { createContext, useContext, useEffect, useState } from "react";
import { apiKauan } from "../service/api";

const CupomContext = createContext();

export function CupomProvider({ children }) {
  const [cupons, setCupons] = useState(null);
  const [qtdCupons, setQtdCupons] = useState(0);

  useEffect(() => {
    const getCupom = async () => {
      const token = localStorage.getItem("user");
      const response = await apiKauan.get(
        "https://gestao-de-cadastros-api-production.up.railway.app/cupons",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      if (data) {
        setQtdCupons(data.totalDeItens);
        setCupons(data.listagem);
      }
    };
    getCupom();
  }, []);

  return (
    <CupomContext.Provider value={{ cupons, qtdCupons }}>
      {children}
    </CupomContext.Provider>
  );
}

export const useCupomContext = () => useContext(CupomContext);
