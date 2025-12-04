import React, { Fragment, useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Text, Alert, Pane, Card, Heading, Button, CrossIcon, ConfirmIcon, BarcodeIcon, TruckIcon } from "evergreen-ui";

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
    <Fragment>
      <Pane width={1000} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Pane
          marginTop={16}
          marginBottom={16}
          display="flex"
        >
          <Card
            width={480}
            minHeight={110}
            elevation={1}
            padding={16}
            textAlign="right"
            className='weightDisplay'
            position="flex"
          >
            <Pane display="flex">
              <TruckIcon textAlign="left" size={30} color="dark" position="absolute"></TruckIcon>
            </Pane>
            <Heading marginTop={22} className="textDisplay">{weight} Kg</Heading>
          </Card>
        </Pane>
        
        {/* QR abajo */}
        <Pane
          marginTop={16}
          marginBottom={16}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            width={480}
            minHeight={300}
            elevation={1}
            padding={16}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading size={600} marginBottom={16} color="muted">
              Código QR del Peso
            </Heading>
            {weight && weight !== '0' ? (
              <QRCodeSVG
                value={weight}
                size={200}
                level="H"
                marginSize={4}
              />
            ) : (
              <Heading size={400} color="muted">
                Esperando peso...
              </Heading>
            )}
            <Heading size={400} marginTop={16} color="muted">
              Peso: {weight} Kg
            </Heading>
          </Card>
        </Pane>
      </Pane>
    </Fragment>
  );
};

export default Display;
