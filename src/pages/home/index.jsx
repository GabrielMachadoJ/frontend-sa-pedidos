import AliceCarousel from "react-alice-carousel";
import Header from "../../components/Header";
export default function Home() {
  const items = [
    <div
      style={{
        backgroundColor: "red",
        width: "3rem",
        marginRight: "1rem",
      }}
    >
      opt 1
    </div>,
    <div
      style={{
        backgroundColor: "blue",
        width: "3rem",
        marginRight: "1rem",
      }}
    >
      opt 2
    </div>,
    <div style={{ backgroundColor: "green", width: "3rem" }}>opt 3</div>,
  ];
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "70%",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          <AliceCarousel mouseTracking items={items} />
        </div>
      </div>
    </>
  );
}
