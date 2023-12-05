import { Button, MenuItem, TextField } from "@mui/material";
import Header from "../../components/Header";
import PedidoCard from "../../components/PedidoCard";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { getDecrypted } from "../../utils/crypto";

export default function PedidosPage() {
  const [statusSelecionado, setStatusSelecionado] = useState("REALIZADO");
  const [pedidos, setPedidos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "";
    if (path === "/pedidos") {
      getPedidos();
    }
  }, [statusSelecionado]);

  const getPedidos = async () => {
    const user = localStorage.getItem("cliente");
    const decryptedUser = getDecrypted(user);
    const idCliente = decryptedUser.cliente.id;
    const response = await api.get(
      `/pedidos?status=${statusSelecionado}&resumo=0&id-cliente=${idCliente}`
    );
    setPedidos(response.data.listagem);
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          margin: "5rem 0 0 1.2rem",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "5rem",
        }}
      >
        <h1 style={{ fontWeight: 400, color: "#3d3c3c" }}>Meus pedidos</h1>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontWeight: 500, color: "#3d3c3c" }}>Histórico</h2>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Status pedido"
              defaultValue="REALIZADO"
              value={statusSelecionado}
              style={{
                width: "15rem",
              }}
              onChange={(e) => setStatusSelecionado(e.target.value)}
            >
              <MenuItem value={"REALIZADO"}>Realizado</MenuItem>
              <MenuItem value={"ACEITO_PELO_RESTAURANTE"}>
                Aceito pelo restaurante
              </MenuItem>
              <MenuItem value={"PRONTO_PARA_COLETA"}>
                Pronto para coleta
              </MenuItem>
              <MenuItem value={"ACEITO_PARA_ENTREGA"}>
                Aceito para entrega
              </MenuItem>
              <MenuItem value={"ENTREGUE"}>Entregue</MenuItem>
              <MenuItem value={"CANCELADO"}>Cancelado</MenuItem>
            </TextField>
            <Button
              style={{
                padding: ".96rem",
                margin: "0 1rem",
              }}
              variant="contained"
            >
              Listar
            </Button>
          </div>
        </div>
      </div>
      {pedidos.map((pedido) => (
        <PedidoCard
          idRestaurante={pedido.restaurante.id_restaurante}
          opcao={pedido.opcoes}
          status={pedido.status}
          nomeRestaurante={pedido.restaurante.nome}
        />
      ))}
    </div>
  );
}
