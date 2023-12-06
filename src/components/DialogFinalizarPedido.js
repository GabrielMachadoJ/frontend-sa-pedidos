import { Button, Dialog, Divider, IconButton, Paper } from "@mui/material";
import { CreditCard, House, MapPinLine, Money } from "@phosphor-icons/react";
import Loading from "./Loading";

export default function DialogFinalizarPedido({
  isFinalizandoPedido,
  setIsFinalizandoPedido,
  formaSelecionada,
  setFormaSelecionada,
  handleFinalizarPedido,
  adress,
  isLoading,
  handleStop,
}) {

  return (
    <Dialog
      open={isFinalizandoPedido}
      onClose={setIsFinalizandoPedido}
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
          <div
            style={{
              marginBottom: "1rem",
              width: "100%",
              height: "6.5rem",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <MapPinLine size={60} color="#6eb654" />
            <Divider orientation="vertical" />
            {adress && (
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
                  {adress.nome}
                </h1>
                <h3
                  style={{
                    fontWeight: 400,
                    fontSize: "1rem",
                  }}
                >
                  {`${adress.rua}, ${adress.cep} - ${adress.bairro}, ${adress.cidade} - ${adress.estado}`}
                </h3>
                <h3
                  style={{
                    fontWeight: 400,
                    fontSize: ".9rem",
                  }}
                >
                  {adress.complemento || ""}
                </h3>
              </div>
            )}
          </div>
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
            onClick={handleFinalizarPedido}
          >
            Fazer pedido
          </Button>
        </div>
      </div>
      <Loading isLoading={isLoading} handleStop={handleStop} />
    </Dialog>
  );
}
