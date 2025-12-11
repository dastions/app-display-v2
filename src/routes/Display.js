import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Pane, Card, Heading, TruckIcon } from "evergreen-ui";

const Display = ({ data, ...props }) => {
  const [weight, setWeight] = useState('0');
  const [code, setCode] = useState('0');

  useEffect(() => {
    if (data?.visor?.weight) {
      const weightValue = parseInt(data.visor.weight.trim()) || 0;
      setWeight(weightValue.toString());
    }

    if (data?.visor?.qr?.code) {
      setCode(data.visor.qr.code);
    }
  }, [data]);

  return (
    <div className="display-wrapper">
      <div className="display-content">
        <Card
          minHeight={300}
          padding={16}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className="main-display-card"
        >
          {/* Peso arriba */}
          <div className="weight-card-container">
            <Card
              elevation={1}
              padding={16}
              textAlign="right"
              className='weightDisplay'
            >
              <div className="truck-icon-container">
                <TruckIcon size={30} color="dark"></TruckIcon>
              </div>
              <Heading marginTop={16} className="textDisplay">{weight} Kg</Heading>
            </Card>
          </div>
          
          {/* QR abajo */}
          <div className="qr-card-content">
            <Heading size={1000} className="qr-title" color="muted">
              Código QR del Peso
            </Heading>
            {weight && weight !== '0' ? (
              <QRCodeSVG
                value={weight}
                size={200}
                level="H"
                marginSize={4}
                className="qr-code"
              />
            ) : (
              <Heading size={700} className="qr-waiting" color="muted">
                Esperando peso...
              </Heading>
            )}
            <Heading size={700} className="qr-weight" color="muted">
              Peso: {weight} Kg
            </Heading>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Display;
