import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  CreditCard,
  Handbag,
  House,
  ShoppingCartSimple,
  SignOut,
  Ticket,
  User,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePedidoContext } from "../context/usePedido";
import { useScreenSizeContext } from "../context/useScreenSize";
import DrawerComponent from "./DrawerComponent";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPedidoOpen, setIsPedidoOpen] = useState(false);
  const [formaSelecionada, setFormaSelecionada] = useState("dinheiro");
  const [nomeCliente, setNomeCliente] = useState("X");
  const { totalPedido } = usePedidoContext();
  const { screenWidth } = useScreenSizeContext();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

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
        top: 0,
        zIndex: 1000,
        position: "fixed",
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
      <DrawerComponent
        isPedidoOpen={isPedidoOpen}
        handleClose={() => setIsPedidoOpen(false)}
        setFormaSelecionada={(forma) => setFormaSelecionada(forma)}
        formaSelecionada={formaSelecionada}
      />
    </div>
  );
}
