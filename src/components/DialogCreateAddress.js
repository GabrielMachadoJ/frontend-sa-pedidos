import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import AddressImage from "../assets/address.png";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { apiCep, apiKauan } from "../service/api";
import { useState } from "react";
import Notification from "./Notification";
import { getDecrypted } from "../utils/crypto";
import Loading from "./Loading";
import { useAddressContext } from "../context/useAddress";

export default function DialogCreateAddress({ isOpen, handleClose }) {
  const [cepSelecionado, setCepSelecionado] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [apelido, setApelido] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getAddress } = useAddressContext();

  const handleBuscarCep = async () => {
    try {
      setIsLoading(true);
      const cep = cepSelecionado.replace(/\D/g, "");
      setCep(cep);
      const resp = await apiCep.get(`/ws/${cep}/json/`);
      const { bairro, complemento, uf, localidade, logradouro } = resp.data;
      setLogradouro(logradouro);
      setBairro(bairro);
      setCidade(localidade);
      setComplemento(complemento);
      setUf(uf);
    } catch (error) {
      setType("error");
      setMessage("Cep inválido!");
      setOpenAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCadastrarEndereco = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const decryptedUser = getDecrypted(user);
      console.log(decryptedUser);
      const userId = decryptedUser.id;
      const data = {
        nome: apelido,
        estado: uf,
        cidade,
        rua: logradouro,
        complemento,
        numeroDaCasa: numero,
        bairro,
        cep,
        id_cliente: userId,
        cliente: decryptedUser,
      };
      const body = JSON.stringify(data);
      const resp = await apiKauan.post("/enderecos", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status === 201) {
        getAddress(userId, token);
      }
    } catch (error) {
      setType("error");
      setMessage("erro ao cadastrar endereço!");
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img width={300} height={180} src={AddressImage} />
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: 500,
              color: "#2e2d2d",
              marginBottom: "2rem",
            }}
          >
            Onde você quer receber seu pedido?
          </h1>
          <div>
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              placeholder="Digite seu cep"
              size="small"
              onChange={(e) => setCepSelecionado(e.target.value)}
              InputProps={{
                style: {
                  padding: ".3rem .9rem",
                  background: "#ffffffcc",
                  boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlass size={32} color="#c62828" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              style={{ padding: ".7rem 1.5rem" }}
              variant="contained"
              color="error"
              size="large"
              onClick={() => handleBuscarCep()}
            >
              Buscar
            </Button>
          </div>
          <TextField
            label="Apelido"
            required
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
            style={{
              margin: ".6rem 0",
            }}
            InputProps={{
              style: {
                padding: ".1rem",
                width: "18rem",
                background: "#ffffffcc",
                boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
              },
            }}
            variant="outlined"
            size="small"
          />
          <div
            style={{
              width: "40rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              marginTop: ".2rem",
            }}
          >
            <TextField
              label="Logradouro"
              required
              fullWidth
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              InputProps={{
                style: {
                  padding: ".1rem",
                  background: "#ffffffcc",
                  boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
                },
              }}
              variant="outlined"
              size="small"
            />
          </div>
          <div
            style={{
              width: "40rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              marginTop: ".5rem",
            }}
          >
            <TextField
              label="Bairro"
              required
              fullWidth
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              style={{
                margin: "0 1rem .6rem 0",
              }}
              InputProps={{
                style: {
                  padding: ".1rem",
                  background: "#ffffffcc",
                  boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
                },
              }}
              variant="outlined"
              size="small"
            />{" "}
            <TextField
              label="Número"
              required
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              style={{
                margin: "0 1rem .6rem 0",
              }}
              InputProps={{
                style: {
                  padding: ".1rem",
                  background: "#ffffffcc",
                  boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
                },
              }}
              variant="outlined"
              size="small"
            />
            <FormControlLabel control={<Checkbox />} label="S/N" />
            <TextField
              label="Cidade"
              required
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              style={{
                margin: "0 0 .6rem 1rem",
                width: "18rem",
              }}
              InputProps={{
                style: {
                  padding: ".1rem",
                  background: "#ffffffcc",
                  boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
                },
              }}
              variant="outlined"
              size="small"
            />
          </div>
          <div
            style={{
              width: "40rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              marginTop: ".5rem",
            }}
          >
            <TextField
              fullWidth
              label="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              style={{
                margin: "0 0 .6rem 0",
                marginTop: ".5rem",
              }}
              InputProps={{
                style: {
                  padding: ".1rem",
                  background: "#ffffffcc",
                  boxShadow: "inset 0px 0px 5px 1px rgba(201, 198, 198, 0.548)",
                },
              }}
              variant="outlined"
              size="small"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="large"
            style={{ padding: ".7rem 1.5rem", marginTop: "1rem" }}
            onClick={() => handleCadastrarEndereco()}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
      <Notification
        handleClose={() => setOpenAlert(false)}
        message={message}
        open={openAlert}
        type={type}
      />
      <div>
        {" "}
        <Loading isLoading={isLoading} handleStop={() => setIsLoading(false)} />
      </div>
    </Dialog>
  );
}
