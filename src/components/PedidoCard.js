import { Divider } from "@mui/material";

export default function PedidoCard({
  id,
  idRestaurante,
  status,
  nomeRestaurante,
  opcao,
  valorTotal,
})
{
  const statusFormatado = status.replace(/_/g, ' ');
  return (
    <div
      style={{
        margin: "2rem 1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        width: "30rem",
        border: "1px solid #cbcbcf6e",
        borderRadius: ".4rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            marginRight: ".6rem",
            borderRadius: "50%",
            overflow: "hidden",
            width: "3.5rem",
            height: "3.5rem",
            border: "1px solid #cc6262",
          }}
        >
          <img
            src={`https://cardapios-mktplace-api-production.up.railway.app/restaurantes/id/${idRestaurante}/foto`}
            alt="Imagem Redonda"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "1.4rem", fontWeight: 400 }}>
            {nomeRestaurante}
          </span>
          <span
            style={{ fontSize: ".9rem", fontWeight: 500, color: "#979494" }}
          >
             {statusFormatado} -  Pedido n° {id}
          </span>
        </div>
      </div>
      <Divider style={{ margin: "1rem 0 .5rem 0" }} />
      {opcao.map((op) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "1.3rem",
              height: "1.3rem",
              backgroundColor: "#9794943f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: ".2rem",
              margin: "0 .5rem .5rem 0",
            }}
          >
            {op.qtde_itens}
          </div>
          <h3 style={{ fontSize: "1rem", fontWeight: 400, color: "#979494b6" }}>
            {op.nome}
          </h3>
        </div>
      ))}
      <Divider style={{ margin: "0.5rem 0 .5rem 0" }} />
      <div>
      <span
            style={{ fontSize: ".9rem", fontWeight: 500, color: "#979494" }}
          >
             Valor Total: R${valorTotal}
          </span>
      </div>
    </div>
  );
}
