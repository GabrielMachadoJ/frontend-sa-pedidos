import {
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Radio,
  Tooltip,
} from "@mui/material";
import {
  CaretRight,
  Clock,
  DotsThreeVertical,
  House,
  Ticket,
  Trash,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCupomContext } from "../context/useCupom";
import { usePedidoContext } from "../context/usePedido";
import { api, apiRaul } from "../service/api";
import { getDecrypted } from "../utils/crypto";
import CupomDrawerContent from "./CupomDrawerContent";
import DialogCreateAdress from "./DialogCreateAdress";
import DialogFinalizarPedido from "./DialogFinalizarPedido";
import Notification from "./Notification";
import { useAdressContext } from "../context/useAdress";

export default function DrawerComponent({
  isPedidoOpen,
  handleClose,
  setFormaSelecionada,
  formaSelecionada,
}) {
  const [isFinalizandoPedido, setIsFinalizandoPedido] = useState(false);
  const {
    totalPedido,
    idCardapio,
    idRestaurante,
    nomeRestaurante,
    cepRestaurante,
    handleSetItens,
    itensPedido,
    handleCalculaTotalPedido,
  } = usePedidoContext();
  const { cupomSelecionado, qtdCupons, isCupom, handleSetIsCupom } =
    useCupomContext();
  const [isCadastrarEndereco, setIsCadastrarEndereco] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [valorDesconto, setValorDesconto] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorFrete, setValorFrete] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const { getCupom } = useCupomContext();
  const { adresses, handleSelectAdress, adress, selectedAdress, getAdress } =
    useAdressContext();

  useEffect(() => {
    if (isPedidoOpen) {
      const token = localStorage.getItem("token");
      const hashUser = localStorage.getItem("user");
      const user = getDecrypted(hashUser);
      const userId = user.id;
      getAdress(userId, token);
      calcularFrete();
      getCupom(token);
      setAnchorEl(null);
    }
  }, [isPedidoOpen]);

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
  }, [cupomSelecionado, totalPedido, valorFrete]);

  const calcularFrete = async () => {
    try {
      const cepCliente = adress.cep?.replace(/\D/g, "");
      if (cepCliente && cepRestaurante) {
        const resp = await apiRaul.get(
          `/frete/cepDeOrigem/${cepRestaurante}/cepDeDestino/${cepCliente}`
        );
        const valorFrete = resp.data.custo;
        setValorFrete(valorFrete);
        const valorTotal = totalPedido + valorFrete - valorDesconto;
        setValorTotal(valorTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveOpcao = (index) => {
    const novoArray = [...itensPedido];
    novoArray.splice(index, 1);
    handleSetItens(novoArray);
    if (novoArray.length === 0 && localStorage.getItem("id_restaurante")) {
      localStorage.removeItem("id_restaurante");
    }
  };

  const handleCalcula = (index) => {
    handleRemoveOpcao(index);
    handleCalculaTotalPedido();
  };

  const handleFinalizarPedido = async () => {
    try {
      setIsLoading(true);
      const adress = getDecrypted(adress);
      const idEndereco = adress.id;
      const idCliente = adress.cliente.id;
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
              {itensPedido.length > 0 ? (
                <div>
                  {itensPedido.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flexGrow: 1, whiteSpace: "nowrap" }}>
                        <h3
                          style={{
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginRight: "1rem",
                          }}
                        >
                          {`${item.qtd}x ${item.opcao.nome}`}
                        </h3>
                        <h3 style={{ fontWeight: 500 }}>
                          {`R$ ${(item.opcao.preco * item.qtd)
                            .toFixed(2)
                            .replace(".", ",")}`}
                        </h3>
                      </div>
                      <IconButton onClick={() => handleCalcula(index)}>
                        <Trash style={{ color: "red" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum item adicionado ao pedido.</p>
              )}
              <Divider style={{ margin: "1.5rem 0" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedAdress && (
                  <Paper
                    style={{
                      marginBottom: "1rem",
                      width: "19rem",
                      height: "7.5rem",
                      border: "1px solid #fc8f74",
                      padding: "0 1rem",
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
                        {selectedAdress.nome}
                      </h1>
                      <h3
                        style={{
                          fontWeight: 400,
                          fontSize: "1rem",
                        }}
                      >
                        {`${selectedAdress.rua}, ${selectedAdress.cep} - ${selectedAdress.bairro}, ${selectedAdress.cidade} - ${selectedAdress.estado}`}
                      </h3>
                      <h3
                        style={{
                          fontWeight: 400,
                          fontSize: ".9rem",
                        }}
                      >
                        {selectedAdress.complemento || ""}
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Radio
                          checked={!isCadastrarEndereco}
                          onClick={() => setIsCadastrarEndereco(false)}
                          size="small"
                          color="error"
                        />
                        <Tooltip title="Endereços" arrow>
                          <DotsThreeVertical
                            size={20}
                            color="#da0a0a"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleClick(e);
                            }}
                          />
                        </Tooltip>
                        <div>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => handleCloseMenu()}
                          >
                            {adresses
                              ? adresses.map((adress) => (
                                  <MenuItem
                                    onClick={() => {
                                      handleCloseMenu();
                                      handleSelectAdress(adress);
                                    }}
                                  >
                                    {adress.nome}
                                  </MenuItem>
                                ))
                              : ""}
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </Paper>
                )}

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
        adress={selectedAdress}
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
