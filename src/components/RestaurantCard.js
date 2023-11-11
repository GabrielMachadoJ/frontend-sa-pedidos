import { Ticket } from "@phosphor-icons/react";
import Logo from "../assets/logo.png";

export default function RestaurantCard() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        height: "7rem",
        width: "25rem",
      }}
    >
      <div
        style={{
          width: "7rem",
          height: "7rem",
          backgroundImage: `url(${Logo})`,
          backgroundSize: "cover",
          padding: ".5rem",
          boxShadow: "0px 0px 5px 0px rgba(77, 73, 73, 0.75)",
          borderRadius: "1rem",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: ".8rem",
        }}
      >
        <span
          style={{
            fontWeight: "500",
            marginBottom: ".5rem",
          }}
        >
          Didge Steakhouse - Tubarão
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            color: "#a39e9e",
            marginBottom: ".5rem",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              color: "#ff9558",
              fontWeight: "bold",
            }}
          >
            ⭐3.8
          </span>
          <span style={{ margin: "0 .3rem" }}> | </span>
          Lanches
          <span style={{ margin: "0 .3rem" }}> | </span>
          1.5 km
        </span>
        <span style={{ color: "#a39e9e", marginBottom: ".5rem" }}>
          25-35min <span style={{ margin: "0 .3rem" }}> | </span>{" "}
          <span style={{ color: "#13c51b" }}>Grátis</span>
        </span>
        <div
          style={{
            width: "100%",
            backgroundColor: "#c4e1f741",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: ".2rem .4rem",
            borderRadius: ".3rem",
          }}
        >
          <Ticket
            color="#4e6aac"
            size={20}
            style={{
              marginRight: ".3rem",
            }}
          />
          <span
            style={{ color: "#4e6aac", fontSize: ".9rem", fontWeight: 500 }}
          >
            Cupom de R$ 5 disponível
          </span>
        </div>
      </div>
    </div>
  );
}
