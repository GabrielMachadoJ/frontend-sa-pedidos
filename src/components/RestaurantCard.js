import { Ticket } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

export default function RestaurantCard(params) {
  const { restaurantes: restauranteData, img } = params;
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    if (restauranteData.length > 0) {
      console.log(restauranteData);
      setRestaurantes(restauranteData);
    }
  }, [restauranteData]);

  return restaurantes.length > 0 ? (
    <Grid container spacing={2}>
      {restaurantes.map(
        (rest) =>
          rest.status === "A" && (
            <Grid item key={rest.id} xs={12} sm={6} md={4} lg={3}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/restaurant/${rest.id}`}
                state={{
                  url: rest.url_imagem ?? "",
                  name: rest.nome ?? "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "1px solid #e0e0e0",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "7rem",
                      backgroundImage: `url(${rest.url_imagem ?? ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: ".5rem",
                      boxShadow: "0px 0px 5px 0px rgba(77, 73, 73, 0.75)",
                      borderRadius: "0.5rem 0.5rem 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                  <div
                    style={{
                      padding: ".8rem",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "500",
                        marginBottom: ".5rem",
                        fontSize: "1.2rem",
                        color: "#2e2424",
                      }}
                    >
                      {rest.nome}
                    </span>
                    <span
                      style={{
                        color: "#a39e9e",
                        marginBottom: ".5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <span style={{ color: "#ff9558", fontWeight: "bold" }}>
                        ⭐4.8
                      </span>{" "}
                      | {rest.categoria.nome} | 1.5 km
                    </span>
                    <span style={{ color: "#a39e9e", marginBottom: ".5rem" }}>
                      25-35min |{" "}
                      <span style={{ color: "#13c51b" }}>Grátis</span>
                    </span>
                    <div
                      style={{
                        backgroundColor: "#c4e1f741",
                        display: "flex",
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
                        style={{
                          color: "#4e6aac",
                          fontSize: ".9rem",
                          fontWeight: 500,
                        }}
                      >
                        Cupom de R$ 5 disponível
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Grid>
          )
      )}
    </Grid>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Skeleton variant="rounded" width={290} height={180} />
      </Grid>
    </Grid>
  );
}
