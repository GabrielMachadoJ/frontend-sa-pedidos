import {
  Button,
  Card,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { usePedidoContext } from "../context/usePedido";
import {
  CaretRight,
  Clock,
  CreditCard,
  House,
  Money,
  Ticket,
} from "@phosphor-icons/react";
import { apiLaudelino } from "../service/api";
import { useLocation } from "react-router-dom";
import CupomDrawerContent from "./CupomDrawerContent";
import { useCupomContext } from "../context/useCupom";
import { getDecrypted } from "../utils/crypto";

export default function DrawerComponent({
  isPedidoOpen,
  handleClose,
  setFormaSelecionada,
  formaSelecionada,
}) {
  const [isFinalizandoPedido, setIsFinalizandoPedido] = useState(false);
  const { totalPedido, itensPedido, idCardapio } = usePedidoContext();
  const [isCupom, setIsCupom] = useState(false);
  const location = useLocation();
  const idRestaurante = location.pathname.split("/")[2];
  const { qtdCupons } = useCupomContext();
  const [userInfos, setUserInfos] = useState({});
  const [isCadastrarEndereco, setIsCadastrarEndereco] = useState(false);

  useEffect(() => {
    try {
      const userCrypto = localStorage.getItem("cliente") || "";
      if (userCrypto) {
        const decryptedUser = getDecrypted(userCrypto);
        setUserInfos(decryptedUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFinalizarPedido = async () => {
    try {
      const body = {
        retirada: "RETIRADA",
        pagamento: formaSelecionada === "dinheiro" ? "DINHEIRO" : "POS",
        valorTotal: totalPedido,
        valorDesconto: 0,
        valorItens: totalPedido,
        valorFrete: 0,
        idCliente: 7,
        idCupom: 3,
        idEndereco: 1,
        idRestaurante,
        idDoCardapio: idCardapio,
        opcoes: itensPedido.map((item) => {
          const op = { idDaOpcao: item.opcao.id, qtdeItens: item.qtd };
          return op;
        }),
      };

      await apiLaudelino.post("/pedidos", body);
    } catch (error) {
      console.log(error);
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
          <CupomDrawerContent setIsCupom={() => setIsCupom(false)} />
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
                McDonalds - Tubarão
              </h2>
              <Divider style={{ margin: "1.5rem 0" }} />
              {itensPedido?.map((item) => (
                <div
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
                <IconButton onClick={() => setIsCupom(true)}>
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
                    Taxa de entrega
                  </h4>
                  <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>R$ 0,00</h4>
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
                  R$ {totalPedido.toFixed(2).replace(".", ",")}
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
      <Dialog
        open={isFinalizandoPedido}
        onClose={() => setIsFinalizandoPedido(false)}
        fullWidth
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "1rem" }}>
          <h1 style={{ fontWeight: 600, fontSize: "2rem" }}>
            Finalize seu pedido
          </h1>
          <div style={{ padding: "1rem" }}>
            <h3 style={{ color: "#eb7575" }}>Entrega</h3>
            endereco aqui
            <Divider />
            <div
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h3 style={{ color: "#eb7575" }}>Pague na entrega</h3>
              <IconButton
                style={{ borderRadius: 0 }}
                onClick={() => setFormaSelecionada("dinheiro")}
              >
                <div
                  style={{
                    width: "8rem",
                    borderRadius: ".3rem",
                    display: "flex",
                    padding: ".5rem 1rem",
                    alignItems: "center",
                    border:
                      formaSelecionada === "dinheiro"
                        ? "1px solid #b8b4b4"
                        : "1px solid #f7f7f7",
                  }}
                >
                  <Money color="green" />
                  <h4
                    style={{
                      marginLeft: "1rem",
                      fontSize: ".8rem",
                      fontWeight: 400,
                    }}
                  >
                    Dinheiro
                  </h4>
                </div>
              </IconButton>
              <IconButton
                style={{ borderRadius: 0 }}
                onClick={() => setFormaSelecionada("cartao")}
              >
                <div
                  style={{
                    width: "8rem",
                    borderRadius: ".3rem",
                    display: "flex",
                    padding: ".5rem 1rem",
                    alignItems: "center",
                    border:
                      formaSelecionada === "cartao"
                        ? "1px solid #b8b4b4"
                        : "1px solid #f7f7f7",
                  }}
                >
                  <CreditCard />
                  <h4
                    style={{
                      marginLeft: "1rem",
                      fontSize: ".8rem",
                      fontWeight: 400,
                    }}
                  >
                    Cartão
                  </h4>
                </div>
              </IconButton>
            </div>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => handleFinalizarPedido()}
            >
              Fazer pedido
            </Button>
          </div>
        </div>
      </Dialog>
    </Drawer>
  );
}
