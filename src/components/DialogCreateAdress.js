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
import AdressImage from "../assets/adress.png";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function DialogCreateAdress({ isOpen, handleClose }) {
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
          <img width={300} height={180} src={AdressImage} />
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
            >
              Buscar
            </Button>
          </div>
          <TextField
            label="Apelido"
            required
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
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
