import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import MainLogo from "../logo.png"
import { Pane, Card, Heading, AddIcon } from "evergreen-ui";
import "../App.css";

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
    <div>
      <div>
        <Card
          minHeight={300}
          padding={16}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Peso arriba */}
          <div>
            <Card
              elevation={1}
              padding={0}
              width={1300}
              height={200}
              backgroundColor="#FFB020"
              textAlign="right"
              marginTop={20}
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              position="relative"
            >
              <div>
                <img
                  width={300}
                  src={MainLogo}
                  alt=""
                />
              </div>
              <Heading marginTop={0} fontSize={100} paddingRight={20} className="weight-heading">{weight} Kg</Heading>
            </Card>
          </div>

          {/* QR abajo */}
          <div className="qr-container">
            <Heading size={1000} className="qr-title">
              Código QR del Peso
            </Heading>
            <QRCodeSVG
              value={weight}
              bgColor="#6f7381"
              size={500}
              level="H"
              marginSize={4}
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
