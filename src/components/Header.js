import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  TabPanel,
  Tabs,
  Tooltip,
} from "@mui/material";
import {
  CreditCard,
  Handbag,
  House,
  Money,
  ShoppingCartSimple,
  SignOut,
  Ticket,
  User,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePedidoContext } from "../context/usePedido";
import { apiLaudelino } from "../service/api";
import { useScreenSizeContext } from "../context/useScreenSize";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPedidoOpen, setIsPedidoOpen] = useState(false);
  const [isFinalizandoPedido, setIsFinalizandoPedido] = useState(false);
  const [formaSelecionada, setFormaSelecionada] = useState("dinheiro");
  const [nomeCliente, setNomeCliente] = useState("X");
  const navigate = useNavigate();
  const { totalPedido, itensPedido, idCardapio } = usePedidoContext();
  const open = Boolean(anchorEl);
  const location = useLocation();
  const idRestaurante = location.pathname.split("/")[2];
  const { screenWidth } = useScreenSizeContext();

  useEffect(() => {
    const localData = localStorage.getItem("user_data");
    if (localData) {
      const userData = JSON.parse(localData);
      const { nomeCliente } = userData;
      setNomeCliente(nomeCliente);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    window.localStorage.clear();
    navigate("/");
  };

  const handleGoToHome = () => {
    navigate("/home");
  };

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
    <div
      style={{
        width: "100%",
        backgroundColor: "#f3f3f3",
        borderBottom: "1px solid #e2dcdc",
        height: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        style={{ borderRadius: 0, padding: 0 }}
        onClick={() => handleGoToHome()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #e2dcdc",
            height: "2.5rem",
            padding: "1rem",
          }}
        >
          <House style={{ marginRight: ".5rem" }} color="#FF2A00" size={24} />
          <span style={{ fontSize: "1.2rem", color: "#474342" }}>Início</span>
        </div>
      </IconButton>
      {screenWidth > 450 ? (
        <span style={{ fontSize: "1.4rem" }}>Gestão de Pedidos</span>
      ) : (
        ""
      )}
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <IconButton
            onClick={() => setIsPedidoOpen(true)}
            style={{ borderRadius: 0, padding: 0 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid #e2dcdc",
                height: "2.5rem",
                padding: "1rem",
              }}
            >
              <Handbag
                style={{ marginRight: ".5rem" }}
                color="#FF2A00"
                size={24}
              />
              <span style={{ fontSize: "1.2rem", color: "#474342" }}>
                R$ {`${totalPedido.toFixed(2)}`.replace(".", ",")}
              </span>
            </div>
          </IconButton>
          <Tooltip title="Ações da Conta">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 1, mr: 1 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                style={{ backgroundColor: "#FF2A00" }}
                sx={{ width: 32, height: 32 }}
              >
                {nomeCliente.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => {}}>
            <ShoppingCartSimple
              color="#FF2A00"
              style={{ marginRight: ".5rem" }}
              size={24}
            />{" "}
            Pedidos
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Ticket
              color="#FF2A00"
              style={{ marginRight: ".5rem" }}
              size={24}
            />{" "}
            Cupons
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <CreditCard
              color="#FF2A00"
              style={{ marginRight: ".5rem" }}
              size={24}
            />{" "}
            Pagamento
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <User color="#FF2A00" style={{ marginRight: ".5rem" }} size={24} />{" "}
            Perfil
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <SignOut color="#FF2A00" size={24} fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </>

      <Drawer
        anchor={"right"}
        open={isPedidoOpen}
        onClose={() => setIsPedidoOpen(false)}
      >
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
              <Card
                style={{
                  marginBottom: "1rem",
                  width: "18rem",
                  height: "6.5rem",
                  border: "1px solid #fc8f74",
                  padding: "1rem",
                }}
              >
                {" "}
                endereco 1
              </Card>
              <Card
                style={{
                  width: "18rem",
                  height: "6.5rem",
                  border: "1px solid #fc8f74",
                  borderRadius: "1.2rem",
                  padding: "1rem",
                }}
              >
                {" "}
                endereco 1
              </Card>
            </div>
            <Divider style={{ margin: "1.5rem 0" }} />
            <div>Cupom aqui</div>
            <Divider style={{ margin: "1.5rem 0" }} />
            <div style={{ padding: "0 2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontWeight: 400, fontSize: "1rem" }}>Subtotal</h4>
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
    </div>
  );
}
