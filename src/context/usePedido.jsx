import { createContext, useContext, useEffect, useState } from "react";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [itensPedido, setItensPedido] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [idCardapio, setIdCardapio] = useState(0);
  const [idRestaurante, setIdRestaurante] = useState(0);
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [cepRestaurante, setCepRestaurante] = useState("");

  const handleSetItensPedido = (opcaoAdicionada) => {
    const opcaoExistenteIndex = itensPedido.findIndex(
      (item) => item.opcao.id === opcaoAdicionada.opcao.id
    );

    if (opcaoExistenteIndex !== -1) {
      const novoItensPedido = [...itensPedido];

      if (opcaoAdicionada.qtd < novoItensPedido[opcaoExistenteIndex].qtd) {
        novoItensPedido[opcaoExistenteIndex] = { ...opcaoAdicionada };
      } else {
        const diferenca =
          opcaoAdicionada.qtd - novoItensPedido[opcaoExistenteIndex].qtd;
        novoItensPedido[opcaoExistenteIndex] = {
          ...opcaoAdicionada,
          qtd: opcaoAdicionada.qtd + diferenca,
        };
      }

      setItensPedido(novoItensPedido);
    } else {
      setItensPedido([...itensPedido, opcaoAdicionada]);
    }
  };

  const handleSetItens = (op) => {
    setItensPedido(op);
  }

  const handleCalculaTotalPedido = () => {
    let total = 0;
    itensPedido.forEach((item) => {
      total += item.opcao.preco * item.qtd;
    });
    setTotalPedido(total);
  };

  const handleSetNomeRestaurante = (nome) => {
    setNomeRestaurante(nome);
  };

  const handleSetCepRestaurante = (cep) => {
    setCepRestaurante(cep);
  };

  const handleChangeIdCardapio = (id) => {
    setIdCardapio(id);
  };

  const handleSetIdRestaurante = (id) => {
    setIdRestaurante(Number(id));
  };

  useEffect(() => {
    if (itensPedido.length > 0) {
      handleCalculaTotalPedido();
    }
  }, [itensPedido]);

  return (
    <PedidoContext.Provider
      value={{
        handleSetItensPedido,
        totalPedido,
        itensPedido,
        idCardapio,
        idRestaurante,
        nomeRestaurante,
        cepRestaurante,
        handleSetIdRestaurante,
        handleChangeIdCardapio,
        handleSetNomeRestaurante,
        handleSetCepRestaurante,
        handleSetItens,
        handleCalculaTotalPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export const usePedidoContext = () => {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error(
      "usePedidoContext deve ser usado dentro de um PedidoProvider"
    );
  }

  return context;
};
