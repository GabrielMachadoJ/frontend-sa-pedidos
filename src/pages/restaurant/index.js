import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
} from "@mui/material";
import { Minus, Plus } from "@phosphor-icons/react";
import { usePedidoContext } from "../../context/usePedido";
import { apiLaudelino } from "../../service/api";
import Header from "../../components/Header";
import Notification from "../../components/Notification";

export default function Restaurant() {
  const location = useLocation();
  const idRestaurante = location.pathname.split("/")[2];
  const { name, descricaoRestaurante, cep } = location.state;
  const [openModalOpcao, setOpenModalOpcao] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState({});
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [opcoesPorSecao, setOpcoesPorSecao] = useState({});
  const {
    handleSetItensPedido,
    handleChangeIdCardapio,
    handleSetNomeRestaurante,
    nomeRestaurante,
    handleSetCepRestaurante,
  } = usePedidoContext();
  const [isLoading, setIsLoading] = useState(false);
  const [opcaoExistenteNoCarrinho, setOpcaoExistenteNoCarrinho] =
    useState(null);
  const [response, setResponse] = useState(null);
  const { itensPedido, handleSetIdRestaurante } = usePedidoContext(); // Adicione esta linha
  const [responseData, setResponseData] = useState(null);
  const [opcoesPermitidas, setOpcoesPermitidas] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "error",
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const URL = process.env.REACT_APP_URL_LAUDELINO;

  useEffect(() => {
    const getCardapioRestaurante = async () => {
      try {
        setIsLoading(true);
        const resp = await apiLaudelino.get(
          `/cardapios?id-restaurante=${idRestaurante}`
        );
        const responseData = resp.data.listagem[0];
        setResponseData(responseData);
        handleChangeIdCardapio(responseData?.id);
        setResponse(resp);

        const opcoesIds = responseData?.opcoes.map((opcao) => opcao.id);

        if (itensPedido.length === 0) {
          setOpcoesPermitidas(opcoesIds || []);
        }

        const opSecao = {};
        const opcoesPromises = [];

        for (const opcao of responseData?.opcoes || []) {
          const nomeSecao = opcao.secao.nome;
          if (!opSecao[nomeSecao]) {
            opSecao[nomeSecao] = [];
          }

          const descricaoResp = await apiLaudelino.get(
            `/opcoes/id/${opcao.id}`
          );
          const descricao = descricaoResp.data?.descricao || "";
          const opcaoComDescricao = { ...opcao, descricao };
          opSecao[nomeSecao].push(opcaoComDescricao);
          opcoesPromises.push(opcaoComDescricao);
        }
        handleSetCepRestaurante(cep);
        handleSetIdRestaurante(idRestaurante);
        await Promise.all(opcoesPromises);
        setOpcoesPorSecao(opSecao);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (Object.keys(opcoesPorSecao).length === 0) {
      getCardapioRestaurante();
    }
  }, [idRestaurante, handleChangeIdCardapio, itensPedido]);

  useEffect(() => {
    if (nomeRestaurante) {
      if (nomeRestaurante === name) {
        handleSetNomeRestaurante(name);
      }
    } else if (name) {
      handleSetNomeRestaurante(name);
    }
  }, [location]);

  const handleCloseModal = () => {
    setOpenModalOpcao(false);
  };

  const handleAddOpcao = (op) => {
    const idRestauranteSelecionado =
      localStorage.getItem("id_restaurante") || "";

    if (
      idRestauranteSelecionado &&
      idRestauranteSelecionado !== idRestaurante
    ) {
      setNotification({
        open: true,
        message:
          "Não é possível adicionar uma opção de um restaurante diferente.",
        type: "error",
      });
      return;
    }

    const opcaoExistente = itensPedido.find((item) => item.opcao.id === op.id);

    setOpcaoExistenteNoCarrinho(opcaoExistente);
    setQuantidadeSelecionada(opcaoExistente ? opcaoExistente.qtd : 1);
    setOpcaoSelecionada(op);
    setOpenModalOpcao(true);
  };

  const handleAdicionarAoCarrinho = () => {
    if (opcaoSelecionada) {
      handleSetItensPedido({
        opcao: opcaoSelecionada,
        qtd: quantidadeSelecionada,
      });
      handleSetNomeRestaurante(name);
      setQuantidadeSelecionada(1);

      localStorage.setItem("id_restaurante", idRestaurante);

      handleCloseModal();
    }
  };

  const handleAddItem = () => {
    setQuantidadeSelecionada((prevQuantidade) => prevQuantidade + 1);
  };

  const handleRemoveItemQtd = () => {
    if (quantidadeSelecionada > 1) {
      setQuantidadeSelecionada((prevQuantidade) =>
        Math.max(prevQuantidade - 1, 1)
      );
    }
  };

  const SecaoComponent = ({ secaoNome, opcoes }) => (
    <div style={{ margin: "4rem 6rem" }}>
      <h2
        style={{
          fontSize: "1.6rem",
          fontWeight: 400,
          marginBottom: "1.2rem",
          color: "red",
        }}
      >
        {secaoNome}.
      </h2>
      <Grid
        container
        spacing={2}
        style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
      >
        {opcoes.map((opcao) => (
          <Grid key={opcao.id} item xs={12} sm={6} md={6} lg={6}>
            <div
              style={{
                border: "2px solid #e4d9d97a",
                marginBottom: "1rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => handleAddOpcao(opcao)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "10rem",
                  padding: ".8rem",
                  boxSizing: "border-box",
                }}
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
                    {opcao.descricao}
                  </p>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 400 }}>
                    A partir de R$ {`${opcao.preco}`.replace(".", ",")}
                  </h2>
                </div>
                <div
                  style={{ borderLeft: "2px solid #e4d9d97a", width: "10rem" }}
                >
                  <img
                    src={`${URL}/opcoes/id/${opcao.id}/foto`}
                    alt="Imagem Redonda"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${URL}/restaurantes/id/${idRestaurante}/foto)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "18rem",
          borderBottom: "1px solid #b4abab",
        }}
      />
      <div style={{ margin: "3rem 0", display: "flex", alignItems: "center" }}>
        <div
          style={{
            margin: "1rem 1rem 0rem 6rem",
            borderRadius: "50%",
            overflow: "hidden",
            width: "12rem",
            height: "12rem",
            border: "2px solid #ebe2e2",
          }}
        >
          <Notification
            handleClose={handleCloseNotification}
            open={notification.open}
            message={notification.message}
            type={notification.type}
          />
          <img
            src={`${URL}/restaurantes/id/${idRestaurante}/foto`}
            alt="Imagem Redonda"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{name}</span>
        <span style={{ fontSize: "1rem" }}> {descricaoRestaurante} </span>
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
          <div style={{ display: "flex" }}>
            <div style={{ width: "10rem", marginRight: ".6rem" }}>
              <img
                src={`${URL}/opcoes/id/${opcaoSelecionada.id}/foto`}
                alt="Imagem Redonda"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                    onClick={handleRemoveItemQtd}
                    style={{
                      borderRadius: 0,
                      cursor:
                        quantidadeSelecionada === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <Minus size={20} color="#c62828" />
                  </IconButton>
                  <h4>{quantidadeSelecionada}</h4>
                  <IconButton
                    onClick={handleAddItem}
                    style={{ borderRadius: 0 }}
                  >
                    <Plus size={20} color="#c62828" />
                  </IconButton>
                </div>
                <Button
                  size="large"
                  color="error"
                  variant="contained"
                  onClick={handleAdicionarAoCarrinho}
                >
                  Adicionar &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; R$
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
