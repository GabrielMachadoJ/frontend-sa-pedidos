import {
  Button,
  Divider,
  IconButton,
  Paper,
  Radio,
  TextField,
} from "@mui/material";
import { CaretLeft, Lock, Ticket } from "@phosphor-icons/react";
import { useCupomContext } from "../context/useCupom";
import { useState } from "react";

export default function CupomDrawerContent({ setIsCupom }) {
  const [cupomSelecionado, setCupomSelecionado] = useState({});
  const [codigoCupom, setCodigoCupom] = useState("");
  const { cupons } = useCupomContext();

  const handleSelectCupom = () => {};

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={setIsCupom}>
          <CaretLeft size={22} color="#d32f2f" style={{ cursor: "pointer" }} />
        </IconButton>
        <h1
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#252525",
          }}
        >
          CUPONS
        </h1>
      </div>
      <Divider style={{ margin: ".5rem 0" }} />
      <div
        style={{
          width: "100%",
          height: "90%",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: ".9rem",
          }}
        >
          <TextField
            size="small"
            placeholder="Código de cupom"
            style={{ marginRight: "1rem" }}
          />
          <Button color="error" disabled={true}>
            Adicionar
          </Button>
        </div>
        <Divider style={{ margin: ".5rem 0 1rem 0" }} />
        <div
          style={{
            width: "100%",
            padding: "0 1.3rem",
          }}
        >
          <Paper elevation={3} style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: ".8rem",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Ticket
                  size={24}
                  color="rgba(19, 18, 18, 0.12)"
                  style={{
                    transform: "rotate(125deg)",
                    margin: "0 .7rem 0 0",
                  }}
                />
                <div>
                  <h1 style={{ color: "#585757", fontSize: "1rem" }}>
                    Sem cupom
                  </h1>
                  <h3
                    style={{
                      color: "#8d8888",
                      fontWeight: 400,
                      fontSize: ".8rem",
                    }}
                  >
                    Nenhum cupom aplicado
                  </h3>
                </div>
              </div>
              <Radio
                checked={cupomSelecionado.id_cupom === "sem_cupom"}
                onClick={() => setCupomSelecionado({ id_cupom: "sem_cupom" })}
                color="error"
              />
            </div>
          </Paper>

          {cupons?.map((cupom) => (
            <Paper
              key={cupom.id_cupom}
              elevation={3}
              style={{ marginBottom: "2rem" }}
            >
              <div style={{ padding: "1.3rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Ticket
                      size={24}
                      color="rgba(231, 5, 5, 0.616)"
                      style={{
                        transform: "rotate(125deg)",
                        margin: "0 1rem 0 0",
                      }}
                    />
                    <div>
                      <h1
                        style={{
                          color: "#585757",
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                      >
                        {`${cupom.percentual_de_desconto}% OFF para todos os resturantes`}
                      </h1>
                    </div>
                  </div>
                  <Radio
                    checked={cupomSelecionado.id_cupom === cupom.id_cupom}
                    color="error"
                    onClick={() => setCupomSelecionado(cupom)}
                  />
                </div>
                <h3
                  style={{
                    color: "#8d8888",
                    fontWeight: 400,
                    fontSize: ".8rem",
                    marginBottom: "2rem",
                  }}
                >
                  cupom disponível
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      fontSize: ".9rem",
                      color: "#2b2525",
                      fontWeight: 400,
                    }}
                  >
                    {`Válido até ${cupom.validade[2]}/${cupom.validade[1]}`}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: ".8rem",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  backgroundColor: "#e4e0e050",
                }}
              >
                <Lock size={12} />
                <h4
                  style={{
                    fontWeight: 500,
                    marginLeft: ".6rem",
                    fontSize: ".8rem",
                    color: "#888686ff",
                  }}
                >
                  Escolha forma de pagamento válida
                </h4>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
