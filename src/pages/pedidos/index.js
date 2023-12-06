import { Button, MenuItem, TextField } from "@mui/material";
import Header from "../../components/Header";
import PedidoCard from "../../components/PedidoCard";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { getDecrypted } from "../../utils/crypto";
import Loading from "../../components/Loading";

export default function PedidosPage() {
  const [statusSelecionado, setStatusSelecionado] = useState("REALIZADO");
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "";
    if (path === "/pedidos") {
      getPedidos();
    }
  }, [location, statusSelecionado]);

  const getPedidos = async () => {
    try {
      setIsLoading(true);
      const user = localStorage.getItem("user");
      const decryptedUser = getDecrypted(user);
      const idCliente = decryptedUser.id;
      const response = await api.get(
        `/pedidos?status=${statusSelecionado}&resumo=0&id-cliente=${idCliente}`
      );
      setPedidos(response.data.listagem);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          margin: "4rem 0 2rem 1rem",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "5rem",
        }}
      >
        <h1 style={{ fontWeight: 400, color: "#3d3c3c", marginBottom: "2rem" }}>
          Meus pedidos
        </h1>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{ fontWeight: 500, color: "#3d3c3c", marginRight: "9rem" }}
          >
            Histórico
          </h2>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Status pedido"
              defaultValue="REALIZADO"
              value={statusSelecionado}
              style={{
                width: "14rem",
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
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <PedidoCard
              idRestaurante={pedido.restaurante.id_restaurante}
              opcao={pedido.opcoes}
              status={pedido.status}
              nomeRestaurante={pedido.restaurante.nome}
            />
          ))
        ) : (
          <h1
            style={{
              fontWeight: 500,
              fontSize: "1.3rem",
              color: "#f34f4f",
              marginTop: "6rem",
            }}
          >
            Nenhum pedido encontrado!
          </h1>
        )}
      </div>
      <Loading isLoading={isLoading} handleStop={() => setIsLoading(false)} />
    </div>
  );
}
