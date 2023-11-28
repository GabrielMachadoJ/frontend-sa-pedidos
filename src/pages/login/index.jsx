import { Button, Card, TextField } from "@mui/material";
import imgLogin from "../../assets/img-login.png";
import { Link } from "react-router-dom";
import { useScreenSizeContext } from "../../context/useScreenSize";
import { apiKauan } from "../../service/api";
import { useState } from "react";

export default function Login() {
  const { screenWidth } = useScreenSizeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const body = JSON.stringify({
      email,
      senha: password,
    });
    // const resp = await apiKauan.post("/auth", body);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#faf6f6",
      }}
    >
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: screenWidth >= 1920 ? "50%" : "95%",
          height: screenWidth >= 1920 ? "65%" : "75%",
        }}
      >
        <Card
          style={{
            display: screenWidth <= 400 ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "100%",
            backgroundColor: "#FF2A00",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "#f5f5f1",
                fontSize: "2.2rem",
                fontWeight: "500",
              }}
            >
              Falta pouco{" "}
            </span>
            <span
              style={{
                color: "#f5f5f1",
                fontSize: "2.2rem",
                fontWeight: "500",
              }}
            >
              para matar{" "}
            </span>
            <span
              style={{
                color: "#f5f5f1",
                fontSize: "2.2rem",
                fontWeight: "500",
              }}
            >
              {" "}
              sua fome!
            </span>
          </div>
          <img height={250} width={370} src={imgLogin} alt="imagem do login" />
        </Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            width: screenWidth <= 400 ? "100%" : "50%",
          }}
        >
          <h2
            style={{
              marginBottom: "2.5rem",
              fontSize: "3rem",
              color: "#30302e",
            }}
          >
            Login
          </h2>
          <TextField
            fullWidth
            id="email"
            label="Usuário"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginBottom: "1rem",
              backgroundColor: "#e0e9f383",
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            id="password"
            label="Senha"
            variant="outlined"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginBottom: "2rem",
              backgroundColor: "#e0e9f383",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/home"}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#FF2A00",
                padding: ".5rem 2rem",
              }}
              onClick={() => handleLogin()}
            >
              Entrar
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
