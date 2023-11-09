import React, { useCallback, useState } from "react";
import Header from "../../components/Header";
import { CaretCircleRight, CaretCircleLeft } from "@phosphor-icons/react";
import { Button, IconButton, ThemeProvider, createTheme } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useScreenSizeContext } from "../../context/useScreenSize";

const theme = createTheme({
  palette: {
    primary: { main: "rgb(255, 42, 0)" },
  },
});

export default function Home() {
  const [swiperRef, setSwiperRef] = useState();
  const { screenWidth } = useScreenSizeContext();

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

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

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
                : 4
            }
            loop={true}
            onSwiper={setSwiperRef}
            className="mySwiper"
          >
            {mock.map((categoria) => (
              <SwiperSlide>
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
            width: "100%",
            marginLeft: "6rem",
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
            Todos os restaurantes
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "7rem",
              height: "6rem",
              backgroundColor: "red",
              borderRadius: ".3rem",
              padding: "1rem",
              boxShadow: "0px 0px 5px 0px rgba(77, 73, 73, 0.75)",
            }}
          >
            restaurante 01
          </div>
          <div
            style={{
              width: "5rem",
              height: "4rem",
              backgroundColor: "red",
            }}
          >
            restaurante 01
          </div>
          <div
            style={{
              width: "5rem",
              height: "4rem",
              backgroundColor: "red",
            }}
          >
            restaurante 01
          </div>
          <div
            style={{
              width: "5rem",
              height: "4rem",
              backgroundColor: "red",
            }}
          >
            restaurante 01
          </div>
          <div
            style={{
              width: "5rem",
              height: "4rem",
              backgroundColor: "red",
            }}
          >
            restaurante 01
          </div>
        </div>
      </div>
    </>
  );
}
