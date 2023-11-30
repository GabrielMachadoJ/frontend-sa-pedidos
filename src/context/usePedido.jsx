import { createContext, useContext, useEffect, useState } from "react";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [itensPedido, setItensPedido] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [idCardapio, setIdCardapio] = useState(0);

  const handleSetItensPedido = (opcaoAdicionada) => {
    const opcaoExistenteIndex = itensPedido.findIndex((item) => item.opcao.id === opcaoAdicionada.opcao.id);

    if (opcaoExistenteIndex !== -1) {
      const novoItensPedido = [...itensPedido];

      if (opcaoAdicionada.qtd < novoItensPedido[opcaoExistenteIndex].qtd) {
        // Substituir pela quantidade menor
        novoItensPedido[opcaoExistenteIndex] = { ...opcaoAdicionada };
      } else {
        // Soma da diferença se for maior
        const diferenca = opcaoAdicionada.qtd - novoItensPedido[opcaoExistenteIndex].qtd;
        novoItensPedido[opcaoExistenteIndex] = { ...opcaoAdicionada, qtd: opcaoAdicionada.qtd + diferenca };
      }

      setItensPedido(novoItensPedido);
    } else {
      setItensPedido([...itensPedido, opcaoAdicionada]);
    }
  };

  const handleCalculaTotalPedido = () => {
    let total = 0;
    itensPedido.forEach((item) => {
      total += item.opcao.preco * item.qtd;
    });
    setTotalPedido(total);
  };

  const handleChangeIdCardapio = (id) => {
    setIdCardapio(id);
  };

  useEffect(() => {
    if (itensPedido.length > 0) {
      handleCalculaTotalPedido();
    }
  }, [itensPedido]);

  return (
    <PedidoContext.Provider value={{ handleSetItensPedido, totalPedido, itensPedido, idCardapio, handleChangeIdCardapio }}>
    {children}
  </PedidoContext.Provider>
  );
}

export const usePedidoContext = () => {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error("usePedidoContext deve ser usado dentro de um PedidoProvider");
  }

  return context;
}
