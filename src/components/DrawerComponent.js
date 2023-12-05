import {
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Radio,
} from "@mui/material";
import { CaretRight, Clock, House, Ticket } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCupomContext } from "../context/useCupom";
import { usePedidoContext } from "../context/usePedido";
import { api, apiLaudelino, apiRaul } from "../service/api";
import { getDecrypted } from "../utils/crypto";
import CupomDrawerContent from "./CupomDrawerContent";
import DialogCreateAdress from "./DialogCreateAdress";
import DialogFinalizarPedido from "./DialogFinalizarPedido";
import Notification from "./Notification";
import Loading from "./Loading";

export default function DrawerComponent({
  isPedidoOpen,
  handleClose,
  setFormaSelecionada,
  formaSelecionada,
}) {
  const [isFinalizandoPedido, setIsFinalizandoPedido] = useState(false);
  const {
    totalPedido,
    itensPedido,
    idCardapio,
    idRestaurante,
    nomeRestaurante,
    cepRestaurante,
  } = usePedidoContext();
  const { cupomSelecionado, qtdCupons, isCupom, handleSetIsCupom } =
    useCupomContext();
  const [userInfos, setUserInfos] = useState({});
  const [isCadastrarEndereco, setIsCadastrarEndereco] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [valorDesconto, setValorDesconto] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorFrete, setValorFrete] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPedidoOpen) {
      getUserInfos();
    }
  }, [isPedidoOpen]);

  const getUserInfos = () => {
    try {
      const userCrypto = localStorage.getItem("cliente") || "";
      if (userCrypto) {
        const decryptedUser = getDecrypted(userCrypto);
        setUserInfos(decryptedUser);
        calcularFrete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let valorDesconto = 0;
    if (
      Object.entries(cupomSelecionado).length !== 0 &&
      cupomSelecionado.id !== 0
    ) {
      valorDesconto = cupomSelecionado
        ? totalPedido * (cupomSelecionado.percentualDeDesconto / 100)
        : 0;
      setDesconto(cupomSelecionado.percentualDeDesconto);
    } else {
      valorDesconto = 0;
    }
    setValorDesconto(valorDesconto);
    const valorTotal = totalPedido + valorFrete - valorDesconto;
    setValorTotal(valorTotal);
  }, [cupomSelecionado]);

  const calcularFrete = async () => {
    try {
      const cepCliente = userInfos.cep?.replace(/\D/g, "");
      if (cepCliente && cepRestaurante) {
        const resp = await apiRaul.get(
          `/frete/cepDeOrigem/${cepRestaurante}/cepDeDestino/${cepCliente}`
        );
        const valorFrete = resp.data.custo;
        const valorTotal = totalPedido + valorFrete - valorDesconto;
        setValorTotal(valorTotal);
        setValorFrete(valorFrete);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizarPedido = async () => {
    try {
      setIsLoading(true);
      const user = localStorage.getItem("cliente");
      const decryptedUser = getDecrypted(user);
      console.log(decryptedUser);
      const idEndereco = decryptedUser.id;
      const idCliente = decryptedUser.cliente.id;
      const idCupom = cupomSelecionado ? cupomSelecionado.id : 0;

      const body = {
        retirada: "DELIVERY",
        pagamento: formaSelecionada === "dinheiro" ? "DINHEIRO" : "POS",
        valorTotal: Number(valorTotal.toFixed(2)),
        valorDesconto: Number(desconto.toFixed(2)),
        valorItens: Number(totalPedido.toFixed(1)),
        valorFrete: Number(valorFrete.toFixed(2)),
        idCliente,
        idCupom,
        idEndereco,
        idRestaurante,
        idDoCardapio: idCardapio,
        opcoes: itensPedido.map((item) => {
          const op = { idDaOpcao: item.opcao.id, qtdeItens: item.qtd };
          return op;
        }),
      };

      const resp = await api.post("/pedidos", JSON.stringify(body));
      if (resp.status === 201) {
        setOpenAlert(true);
        navigate("/pedidos");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer anchor={"right"} open={isPedidoOpen} onClose={handleClose}>
      <div
        style={{
          width: "25rem",
          height: "100vh",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {isCupom ? (
          <CupomDrawerContent setIsCupom={() => handleSetIsCupom(false)} />
        ) : (
          <>
            <div>
              <h4
                style={{
                  fontWeight: 300,
                  fontSize: ".8rem",
                  marginBottom: ".5rem",
                }}
              >
                Seu pedido em
              </h4>
              <h2 style={{ fontWeight: 500, fontSize: "1.4rem" }}>
                {nomeRestaurante || ""}
              </h2>
              <Divider style={{ margin: "1.5rem 0" }} />
              {itensPedido?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: ".9rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h3
                    style={{ fontWeight: 500 }}
                  >{`${item.qtd}x ${item.opcao.nome}`}</h3>
                  <h3 style={{ fontWeight: 500 }}>{`R$ ${(
                    item.opcao.preco * item.qtd
                  )
                    .toFixed(2)
                    .replace(".", ",")}`}</h3>
                </div>
              ))}
              <Divider style={{ margin: "1.5rem 0" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Paper
                  style={{
                    marginBottom: "1rem",
                    width: "18rem",
                    height: "6.5rem",
                    border: "1px solid #fc8f74",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <House size={60} />
                  <div
                    style={{
                      marginLeft: "1rem",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 600,
                      }}
                    >
                      {userInfos.nome}
                    </h1>
                    <h3
                      style={{
                        fontWeight: 400,
                        fontSize: "1rem",
                      }}
                    >
                      {`${userInfos.rua}, ${userInfos.cep} - ${userInfos.bairro}, ${userInfos.cidade} - ${userInfos.estado}`}
                    </h3>
                    <h3
                      style={{
                        fontWeight: 400,
                        fontSize: ".9rem",
                      }}
                    >
                      {userInfos.complemento || ""}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Radio
                      checked={!isCadastrarEndereco}
                      onClick={() => setIsCadastrarEndereco(false)}
                      size="small"
                      color="error"
                    />
                  </div>
                </Paper>
                <Card
                  style={{
                    width: "18rem",
                    height: "6.5rem",
                    border: "1px solid #fc8f74",
                    borderRadius: "1.2rem",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div>
                    <Clock size={30} />
                  </div>
                  <h3
                    style={{
                      marginLeft: "1rem",
                      fontWeight: 400,
                      fontSize: ".9rem",
                    }}
                  >
                    Cadastrar novo endereço?
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Radio
                      checked={isCadastrarEndereco}
                      onClick={() => setIsCadastrarEndereco(true)}
                      size="small"
                      color="error"
                    />
                  </div>
                </Card>
              </div>
              <Divider style={{ margin: "1.5rem 0" }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Ticket
                    size={30}
                    color="gray"
                    style={{
                      transform: "rotate(125deg)",
                      margin: "0 .7rem 0 0",
                    }}
                  />
                  <div>
                    <h1 style={{ color: "#3D3A3A", fontSize: "1.1rem" }}>
                      Cupom
                    </h1>
                    <h3
                      style={{
                        color: "#8d8888",
                        fontWeight: 400,
                        fontSize: ".8rem",
                      }}
                    >{`${qtdCupons || 1} cupom disponível`}</h3>
                  </div>
                </div>
                <IconButton onClick={() => handleSetIsCupom(true)}>
                  <CaretRight
                    size={22}
                    color="#d32f2f"
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              </div>
              <Divider style={{ margin: "1.5rem 0" }} />
              <div style={{ padding: "0 2rem" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>
                    Subtotal
                  </h4>
                  <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>
                    R$ {totalPedido.toFixed(2).replace(".", ",")}
                  </h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: ".5rem",
                  }}
                >
                  <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>
                    Desconto
                  </h4>
                  <h4
                    style={{
                      color: valorDesconto > 0 ? "#d32f2f" : "",
                      fontWeight: 400,
                      fontSize: "1rem",
                    }}
                  >
                    {`${valorDesconto <= 0 ? "" : "-"}R$ ${valorDesconto
                      .toFixed(2)
                      .replace(".", ",")}`}
                  </h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: ".5rem",
                  }}
                >
                  <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>
                    Taxa de entrega
                  </h4>
                  <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>
                    R$ {valorFrete.toFixed(2).replace(".", ",")}
                  </h4>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 1rem", marginBottom: "3rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h4 style={{ fontWeight: 500, fontSize: "1rem" }}>Total</h4>
                <h4 style={{ fontWeight: 500, fontSize: "1rem" }}>
                  R$ {valorTotal.toFixed(2).replace(".", ",")}
                </h4>
              </div>
              <Button
                size="large"
                color="error"
                variant="contained"
                fullWidth
                onClick={() => setIsFinalizandoPedido(true)}
              >
                Escolher forma de pagamento
              </Button>
            </div>
          </>
        )}
      </div>
      <DialogCreateAdress
        isOpen={isCadastrarEndereco}
        handleClose={() => setIsCadastrarEndereco(false)}
      />
      <DialogFinalizarPedido
        handleFinalizarPedido={() => handleFinalizarPedido()}
        isFinalizandoPedido={isFinalizandoPedido}
        setIsFinalizandoPedido={() => setIsFinalizandoPedido(false)}
        formaSelecionada={formaSelecionada}
        setFormaSelecionada={(forma) => setFormaSelecionada(forma)}
        userInfos={userInfos}
        isLoading={isLoading}
        handleStop={() => setIsLoading(false)}
      />
      <Notification
        handleClose={() => setOpenAlert(false)}
        message={"Pedido gerado!"}
        open={openAlert}
        type={"success"}
      />
    </Drawer>
  );
}
