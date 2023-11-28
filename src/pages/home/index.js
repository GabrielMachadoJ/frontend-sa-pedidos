import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import { CaretCircleRight, CaretCircleLeft } from "@phosphor-icons/react";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useScreenSizeContext } from "../../context/useScreenSize";
import RestaurantCard from "../../components/RestaurantCard";
import { api } from "../../service/api";

const theme = createTheme({
  palette: {
    primary: { main: "rgb(255, 42, 0)" },
  },
});

export default function Home() {
  const [swiperRef, setSwiperRef] = useState();
  const { screenWidth } = useScreenSizeContext();
  const [restaurantes, setRestaurantes] = useState([]);
  const [restaurantesToSend, setRestaurantesToSend] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const mock = [
    {
      nome: "JAPONESA",
    },
    {
      nome: "HAMBURGUER",
    },
    {
      nome: "PIZZA",
    },
    {
      nome: "FITNESS",
    },
    {
      nome: "MARMITA",
    },
    {
      nome: "CAFETERIA",
    },
    {
      nome: "FAST FOOD",
    },
    {
      nome: "FOOD TRUCK",
    },
    {
      nome: "PUB",
    },
    {
      nome: "BRASILEIRA",
    },
  ];

  useEffect(() => {
    getRestaurants();
  }, [page]);

  useEffect(() => {
    if (restaurantes.length > 0) {
      getImagensRestaurantes();
    }
  }, [restaurantes]);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const getRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/restaurantes?nome=&id-categoria=239&pagina=${page}`
      );

      const totalDePaginas = response.data?.totalDePaginas;
      setTotalPage(totalDePaginas);

      const restaurants = response.data?.listagem;

      if (restaurants.length > 0) {
        setRestaurantes(restaurants);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImagensRestaurantes = async () => {
    try {
      const promises = restaurantes.map(async (restaurante) => {
        if (restaurante.status === "A") {
          const response = await api.get(
            `/restaurantes/id/${restaurante.id}/foto`,
            {
              responseType: "arraybuffer",
            }
          );

          const arrayBufferView = new Uint8Array(response.data);
          const blob = new Blob([arrayBufferView], { type: "image/png" });
          const imageUrl = URL.createObjectURL(blob);

          return {
            ...restaurante,
            url_imagem: imageUrl,
          };
        }

        return restaurante;
      });

      const updatedRestaurantes = await Promise.all(promises);
      setRestaurantesToSend(updatedRestaurantes);
    } catch (error) {
      // Trate os erros aqui
    }
  };
  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "4rem",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            fontFamily: "Roboto",
            textAlign: "start",
            marginBottom: "3rem",
          }}
        >
          Qual o prato para hoje?
        </span>
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <IconButton onClick={handlePrevious}>
              <CaretCircleLeft
                style={{
                  zIndex: "15",
                  height: "2rem",
                  width: "2rem",
                }}
                color="#726c6c"
              />
            </IconButton>
          </div>
          <Swiper
            cssMode={true}
            navigation={true}
            mousewheel={true}
            slidesPerView={
              screenWidth >= 1900
                ? 9
                : screenWidth >= 1250
                ? 7
                : screenWidth >= 900
                ? 5
                : screenWidth <= 550
                ? 2
                : 3
            }
            loop={true}
            onSwiper={setSwiperRef}
            className="mySwiper"
          >
            {mock.map((categoria, index) => (
              <SwiperSlide key={index}>
                <ThemeProvider theme={theme}>
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    style={{
                      width: "7rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {categoria.nome}
                  </Button>
                </ThemeProvider>
              </SwiperSlide>
            ))}
          </Swiper>
          <div>
            <IconButton onClick={handleNext}>
              <CaretCircleRight
                style={{
                  zIndex: "15",
                  height: "2rem",
                  width: "2rem",
                }}
                color="#726c6c"
              />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "4rem",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontFamily: "Roboto",
              textAlign: "start",
              margin: "1rem 0",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "85vw",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Todos os restaurantes{" "}
              <Pagination
                showFirstButton={false}
                count={totalPage}
                variant="outlined"
                onChange={(e, value) => setPage(Number(value) - 1)}
              />
            </div>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <RestaurantCard restaurantes={restaurantesToSend} />
        </div>
      </div>
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
