import { createContext, useContext, useState } from "react";
import { apiKauan } from "../service/api";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };
  const getAddress = async (idCliente, token) => {
    const response = await apiKauan.get(
      `/enderecos?idDoCliente=${idCliente}&page=2`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const content = response.data?.content;
    console.log(content);
    setAddresses(content);
    setSelectedAddress(content[0]);
  };

  return (
    <AddressContext.Provider
      value={{ getAddress, handleSelectAddress, selectedAddress, addresses }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddressContext = () => useContext(AddressContext);
