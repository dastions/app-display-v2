import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import MainLogo from "../logo.png";
import { Pane, Card, Heading, AddIcon } from "evergreen-ui";
import "../App.css";

const Display = ({ data, ...props }) => {
  const [weight, setWeight] = useState("0");
  const [qrSize, setQrSize] = useState(500);
  const [stable, setStable] = useState(false);

  useEffect(() => {
    if (data?.visor?.weight) {
      const weightValue = parseInt(data.visor.weight.trim()) || 0;
      setWeight(weightValue.toString());
    }

    if (
      data?.visor &&
      Object.prototype.hasOwnProperty.call(data.visor, "stable")
    ) {
      setStable(Boolean(data.visor.stable));
    }
  }, [data]);

  useEffect(() => {
    const updateQrSize = () => {
      const calculatedSize = Math.min(window.innerHeight * 0.46, 500);
      setQrSize(calculatedSize);
    };

    updateQrSize();
    window.addEventListener("resize", updateQrSize);
    return () => window.removeEventListener("resize", updateQrSize);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          padding={16}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
          backgroundColor="transparent"
        >
          {/* Peso arriba */}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Card
              elevation={1}
              padding={2}
              width="68vw"
              height="18.5vh"
              backgroundColor="#FFB020"
              textAlign="right"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              position="relative"
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={MainLogo}
                  alt=""
                  style={{
                    height: "100%",
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <Heading
                marginTop={0}
                fontSize="clamp(60px, 9.3vh, 100px)"
                paddingRight={20}
                className="weight-heading"
              >
                {weight} Kg
              </Heading>
            </Card>
          </div>

          {/* QR abajo */}
          <div className="qr-container">
            <Heading
              size={1000}
              className="qr-title"
              style={{ color: "white" }}
            >
              Código QR del Peso
            </Heading>
            <QRCodeSVG
              value={weight}
              bgColor="#ffffff"
              size={qrSize}
              level="H"
              marginSize={2}
            />
            <Heading
              size={1000}
              className="qr-weight"
              style={{ color: "white" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1vh",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6em",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    opacity: 0.9,
                  }}
                >
                  Estado
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 22px",
                    borderRadius: 999,
                    backgroundColor: stable ? "#16a34a" : "#facc15",
                    color: "#111827",
                    fontSize: "0.7em",
                    fontWeight: 700,
                    fontFamily:
                      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.25), 0 10px 20px rgba(0,0,0,0.35)",
                  }}
                >
                  {stable ? "Estable" : "Pesando..."}
                </span>
              </div>
            </Heading>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Display;
