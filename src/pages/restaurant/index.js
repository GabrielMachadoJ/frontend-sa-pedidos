import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import OpcaoCardapioImg from "../../assets/cardapio.png";
import { Minus, Plus } from "@phosphor-icons/react";
import { usePedidoContext } from "../../context/usePedido";

export default function Restaurant() {
  const location = useLocation();
  const idRestaurante = location.pathname.split("/")[2];
  const { url, name } = location.state;
  const [opcoesPorSecao, setOpcoesPorSecao] = useState({});
  const [openModalOpcao, setOpenModalOpcao] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState({});
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const { handleSetItensPedido, handleChangeIdCardapio } = usePedidoContext();
  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getCardapioRestaurante = async () => {
      try {
        setIsLoading(true);
        const resp = await api.get(
          `/cardapios?id-restaurante=${idRestaurante}`
        );
        const responseData = resp.data.listagem[0];
        handleChangeIdCardapio(responseData?.id);
        setResponse(resp);
        const opSecao = {};
        responseData?.opcoes?.forEach((opcao) => {
          const nomeSecao = opcao.secao.nome;
          if (!opSecao[nomeSecao]) {
            opSecao[nomeSecao] = [];
          }

          opSecao[nomeSecao].push(opcao);
          setOpcoesPorSecao(opSecao);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCardapioRestaurante();
  }, [location]);

  const handleCloseModal = () => {
    setOpenModalOpcao(false);
  };

  const handleAddOpcao = (op) => {
    setOpcaoSelecionada(op);
    setOpenModalOpcao(true);
  };

  const handleAddItem = () => {
    setQuantidadeSelecionada(quantidadeSelecionada + 1);
  };

  const handleRemoveItemQtd = () => {
    if (quantidadeSelecionada > 0) {
      setQuantidadeSelecionada(quantidadeSelecionada - 1);
    }
  };

  const SecaoComponent = ({ secaoNome, opcoes }) => {
    return (
      <div
        style={{
          display: "flex",
          padding: ".5rem",
          marginTop: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 400,
              marginBottom: "1.2rem",
            }}
          >
            {secaoNome}.
          </h2>
          <Grid container spacing={2}>
            {opcoes.map((opcao) => (
              <Grid key={opcao.id} item xs={12} sm={6} md={6} lg={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "47.5vw",
                    height: "10rem",
                    border: "1px solid #e4d9d97a",
                    padding: ".8rem",
                  }}
                  onClick={() => handleAddOpcao(opcao)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 400 }}>
                      {opcao.nome}
                    </h2>
                    <p style={{ fontSize: ".9rem", fontWeight: 300 }}>
                      Descrição aqui
                    </p>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 400 }}>
                      A partir de R$ {`${opcao.preco}`.replace(".", ",")}
                    </h2>
                  </div>
                  <div
                    style={{
                      borderLeft: "1px solid #e4d9d97a",
                      width: "10rem",
                    }}
                  >
                    <img
                      src={OpcaoCardapioImg}
                      alt="Imagem Redonda"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Isso garante que a imagem cubra completamente a área da div circular
                      }}
                    />
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "18rem",
          borderBottom: "1px solid #b4abab",
        }}
      />

      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden", // Garante que a imagem não ultrapasse os limites da div circular
            width: "10rem",
            height: "10rem", // Ajuste conforme necessário
            border: "1px solid #ebe2e2",
          }}
        >
          <img
            src={url}
            alt="Imagem Redonda"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Isso garante que a imagem cubra completamente a área da div circular
            }}
          />
        </div>
        <span style={{ fontSize: "1.5rem" }}>{name}</span>
      </div>
      {response
        ? Object.keys(opcoesPorSecao).map((secaoNome) => (
            <SecaoComponent
              key={secaoNome}
              secaoNome={secaoNome}
              opcoes={opcoesPorSecao[secaoNome]}
            />
          ))
        : ""}
      <Dialog
        open={openModalOpcao}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={"md"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ width: "10rem", marginRight: ".6rem" }}>
              <img
                src={OpcaoCardapioImg}
                alt="Imagem Redonda"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h2 style={{ marginBottom: "2rem" }}>{opcaoSelecionada.nome}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".6rem",
                  width: "35rem",
                }}
              >
                <h4 style={{ fontWeight: 400, fontSize: "1.1rem" }}>
                  R$ {`${opcaoSelecionada.preco}`.replace(".", ",")}
                </h4>
                <div
                  style={{
                    border: "1px solid #d6d3d3",
                    borderRadius: ".2rem",
                    padding: ".2rem .1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "8rem",
                  }}
                >
                  <IconButton
                    onClick={() => handleRemoveItemQtd()}
                    style={{
                      borderRadius: 0,
                      cursor:
                        quantidadeSelecionada === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    <Minus size={20} color="#c62828" />
                  </IconButton>
                  <h4>{quantidadeSelecionada}</h4>
                  <IconButton
                    onClick={() => handleAddItem()}
                    style={{ borderRadius: 0 }}
                  >
                    <Plus size={20} color="#c62828" />
                  </IconButton>
                </div>
                <Button
                  size="large"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleSetItensPedido({
                      opcao: opcaoSelecionada,
                      qtd: quantidadeSelecionada,
                    });
                    handleCloseModal();
                    setQuantidadeSelecionada(1);
                  }}
                >
                  Adicionar &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; R${" "}
                  {`${(opcaoSelecionada.preco * quantidadeSelecionada).toFixed(
                    2
                  )}`.replace(".", ",")}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
