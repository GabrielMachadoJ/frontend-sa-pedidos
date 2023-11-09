import React from "react";
import Slider from "react-slick";
import styles from "./style.module.css";
import Header from "../../components/Header";
import { CaretCircleRight, CaretCircleLeft } from "@phosphor-icons/react";
import { Button, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "rgb(255, 42, 0)" },
  },
});

export default function Home() {
  const { card, container } = styles;
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          centerMode: true,
        },
      },
      {
        breakpoint: 1380,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{
          marginLeft: "2rem",
        }}
      >
        <CaretCircleRight
          onClick={onClick}
          className={className}
          style={{
            ...style,
            display: "block",
            zIndex: "15",
            height: "2rem",
            width: "2rem",
          }}
          color="#726c6c"
        />
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <CaretCircleLeft
        onClick={onClick}
        className={className}
        style={{
          ...style,
          zIndex: "15",
          height: "2rem",
          width: "2rem",
        }}
        color="#726c6c"
      />
    );
  }

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

  return (
    <>
      <Header />
      <div className={container}>
        <div
          style={{
            width: "70%",
          }}
        >
          <Slider {...settings}>
            {mock.map((categoria) => (
              <ThemeProvider theme={theme}>
                <Button color="primary" variant="contained" className={card}>
                  {categoria.nome}
                </Button>
              </ThemeProvider>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
