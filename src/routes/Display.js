import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import MainLogo from "../logo.png"
import { Pane, Card, Heading, AddIcon } from "evergreen-ui";
import "../App.css";

const Display = ({ data, ...props }) => {
  const [weight, setWeight] = useState('0');
  const [code, setCode] = useState('0');
  const [qrSize, setQrSize] = useState(500);

  useEffect(() => {
    if (data?.visor?.weight) {
      const weightValue = parseInt(data.visor.weight.trim()) || 0;
      setWeight(weightValue.toString());
    }

    if (data?.visor?.qr?.code) {
      setCode(data.visor.qr.code);
    }
  }, [data]);

  useEffect(() => {
    const updateQrSize = () => {
      // Calcula el tamaño del QR basado en la altura del viewport
      // Mantiene un máximo de 500px para pantallas grandes
      const calculatedSize = Math.min(window.innerHeight * 0.46, 500);
      setQrSize(calculatedSize);
    };

    updateQrSize();
    window.addEventListener('resize', updateQrSize);
    return () => window.removeEventListener('resize', updateQrSize);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card
              elevation={1}
              padding={0}
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
              <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <img
                  src={MainLogo}
                  alt=""
                  style={{ 
                    height: '100%',
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <Heading marginTop={0} fontSize="clamp(60px, 9.3vh, 100px)" paddingRight={20} className="weight-heading">{weight} Kg</Heading>
            </Card>
          </div>

          {/* QR abajo */}
          <div className="qr-container">
            <Heading size={1000} className="qr-title">
              Código QR del Peso
            </Heading>
            <QRCodeSVG
              value={weight}
              bgColor="#ffffff"
              size={qrSize}
              level="H"
              marginSize={2}
            />
            <Heading size={1000} className="qr-weight">
              Peso: {weight} Kg
            </Heading>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Display;
