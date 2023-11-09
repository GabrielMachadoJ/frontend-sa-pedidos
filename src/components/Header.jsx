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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../service/api";

const mock = [
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 10",
    id: 47,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 12",
    id: 49,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 14",
    id: 51,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 16",
    id: 53,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 18",
    id: 55,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 2",
    id: 39,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 20",
    id: 57,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 22",
    id: 59,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 24",
    id: 61,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 26",
    id: 63,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 28",
    id: 65,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 30",
    id: 67,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 32",
    id: 69,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 34",
    id: 71,
    status: "A",
  },
  {
    tipo: "RESTAURANTE",
    nome: "Categoria 36",
    id: 73,
    status: "A",
  },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    navigate("/");
  };

  // const teste = async () => {
  //   try {
  //     const resp = await api.get(
  //       "/restaurantes?nome=rest&id-categoria=239&pagina=0",
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXBlbCI6IkNMSUVOVEUiLCJzdWIiOiJ1c3VhcmlvNi5jbGllbnRlIiwiaWF0IjoxNjk5NDgzOTE3LCJleHAiOjE2OTk0ODU3MTd9.aGQKsUlc1SQh_dG-DM8M-i_PIFj_X3wruckeKGKbuhc`,
  //         },
  //       }
  //     );

  //     console.log(resp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        // onClick={() => teste()}
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
      <span style={{ fontSize: "1.4rem" }}>Gestão de Pedidos</span>
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <IconButton style={{ borderRadius: 0, padding: 0 }}>
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
                R$ 0,00
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
                G
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
      {/* <div>
        <Tooltip arrow title="Perfil">
          <IconButton
            style={{
              padding: ".2rem",
            }}
            size="sm"
          >
            <User size={24} />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Sair">
          <IconButton
            style={{
              padding: ".2rem",
            }}
          >
            <SignOut size={24} />
          </IconButton>
        </Tooltip>
      </div> */}
    </div>
  );
}
