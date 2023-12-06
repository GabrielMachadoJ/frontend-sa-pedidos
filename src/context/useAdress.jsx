import { createContext, useContext, useState } from "react";
import { apiKauan } from "../service/api";

const AdressContext = createContext();

export function AdressProvider({ children }) {
  const [adresses, setAdresses] = useState([]);
  const [selectedAdress, setSelectedAdress] = useState({});

  const handleSelectAdress = (adress) => {
    setSelectedAdress(adress);
  };
  const getAdress = async (idCliente, token) => {
    const response = await apiKauan.get(
      `/enderecos?idDoCliente=${idCliente}&pagina=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const content = response.data?.content;
    setAdresses(content);
    setSelectedAdress(content[0]);
  };

  return (
    <AdressContext.Provider
      value={{ getAdress, handleSelectAdress, selectedAdress, adresses }}
    >
      {children}
    </AdressContext.Provider>
  );
}

export const useAdressContext = () => useContext(AdressContext);
