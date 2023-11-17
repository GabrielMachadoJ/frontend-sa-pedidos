import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";

export default function Restaurant() {
  const location = useLocation();
  const { url, name } = location.state;
  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
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
    </>
  );
}
