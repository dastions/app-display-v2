import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import MainLogo from "../logo.png";
import { Card, Heading } from "evergreen-ui";
import "../App.css";

const Display = ({ data, socketError, ...props }) => {
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
    <div className="display-container">
      {/* Banner de error de conexión */}
      {socketError && (
        <div className="connection-error-banner">
          <span className="connection-error-text">
            ⚠️ Error de conexión - Sin conexión a internet
          </span>
        </div>
      )}
      <div className="display-inner">
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
          <div className="display-weight-wrapper">
            <Card
              elevation={1}
              padding={2}
              width="100%"
              height="18.5vh"
              backgroundColor="#FFB020"
              textAlign="right"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              position="relative"
            >
              <div className="display-logo-container">
                <img
                  src={MainLogo}
                  alt=""
                  className="display-logo"
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
              className="qr-weight qr-weight-content"
            >
              <div className="status-container">
                <span className="status-label">
                  Estado
                </span>
                <span className={`status-badge ${stable ? 'stable' : 'weighing'}`}>
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
