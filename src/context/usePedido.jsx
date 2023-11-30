import { createContext, useContext, useEffect, useState } from "react";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [itensPedido, setItensPedido] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [idCardapio, setIdCardapio] = useState(0);

  const handleSetItensPedido = (opcaoAdicionada) => {
    setItensPedido([...itensPedido, opcaoAdicionada]);
  };

  const handleCalculaTotalPedido = () => {
    let total = 0;
    itensPedido.forEach((item) => {
      total += item.opcao.preco * item.qtd;
    });
    console.log(total);
    setTotalPedido(total);
  };

  const handleChangeIdCardapio = (id) => {
    setIdCardapio(id);
  };

  useEffect(() => {
    if (itensPedido.length > 0) {
      handleCalculaTotalPedido();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itensPedido]);

  return (
    <PedidoContext.Provider
      value={{
        handleSetItensPedido,
        totalPedido,
        itensPedido,
        idCardapio,
        handleChangeIdCardapio,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export const usePedidoContext = () => useContext(PedidoContext);
