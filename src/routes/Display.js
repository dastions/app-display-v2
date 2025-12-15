import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import MainLogo from "../logo.png"
import { Pane, Card, Heading, AddIcon } from "evergreen-ui";

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
              padding={0}
              textAlign="right"
              className='weightDisplay'
              marginTop={20}
            >
              <div className="truck-icon-container" >
                <img
                  src={MainLogo}
                  alt=""
                  className="main-logo"
                />
              </div>
              <Heading marginTop={60} className="textDisplay">{weight} Kg</Heading>
            </Card>
          </div>
          
          {/* QR abajo */}
          <div className="qr-card-content">
              <QRCodeSVG
                value={weight}
                bgColor="#6f7381"
                size={280}
                level="H"
                marginSize={4}
                className="qr-code"
              />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Display;
