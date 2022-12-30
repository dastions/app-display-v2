import React, { Fragment, useState, useEffect } from "react";

import { Text, Alert, Pane, Card, Heading, Button, CrossIcon, ConfirmIcon, BarcodeIcon, TruckIcon } from "evergreen-ui";

const Display = ({data, ...props}) => {
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [paneClass, setPaneClass] = useState('disabledPane');

  const [net, setNet] = useState('0');
  const [tare, setTare] = useState('0');
  const [weight, setWeight] = useState('0');
  const [code, setCode] = useState('0');


  useEffect(() => {
    setConfirmEnabled(data?.bascula?.visor?.weight < 200 )
  }, [data]);

  const showHideCalculation = () => {
    setPaneClass("disabledPane")
  }

  const calculateNet = () => {
    try {
        console.log("Calculate Net")
        setNet(Math.abs(parseInt(weight) - parseInt(tare)));
    } catch {
        setNet("---")
    }
  }

  return (
    <Fragment>
      <Pane width={1000}>
        <Pane 
        clearfix
        float="left"
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
            onClick={showHideCalculation}
            position="flex"
            >
            <Pane display="flex">
                <TruckIcon textAlign="left" size={30} color="dark" position="absolute"></TruckIcon>
            </Pane>
            <Heading marginTop={22} className="textDisplay">{ weight} Kg</Heading>
        </Card>

        <Card
            backgroundColor="#FFEFD2"
            elevation={1}
            display="flex"
            flexDirection="column"
            height="auto"
            width={240}
            minHeight={110}
            overflowY="auto"
            padding={16}
            borderRadius={4}
            marginBottom="auto"
            textAlign="left"
            marginLeft={20}
            className={paneClass}
            >
                <Heading size={400}>Tara</Heading>
                <Heading size={900} textAlign="right">{tare} Kg</Heading>
            </Card>

            <Card
                backgroundColor="#DCF2EA"
                elevation={1}
                display="flex"
                flexDirection="column"
                height="auto"
                width={240}
                minHeight={110}
                overflowY="auto"
                padding={16}
                borderRadius={4}
                marginBottom="auto"
                textAlign="left"
                marginLeft={20}
                className={paneClass}
            >
                <Heading size={400}>Neto</Heading>
                <Heading size={900} textAlign="right">{net} Kg</Heading>
            </Card>
        </Pane>
        <Pane 
        clearfix
        float="left"
        marginTop={16}
        marginBottom={16}
        display="flex"
        >
        <Card
            width={480}
            height={110}
            elevation={1}
            padding={16}
            textAlign="right"
            className='weightDisplay'
        >
        <Heading size={700}>
            <Pane display="flex">
            <BarcodeIcon textAlign="left" size={30}></BarcodeIcon>
            </Pane>
        </Heading>
        <Heading className="textDisplay">
            {data?.bascula?.qr?.code || "---"}
        </Heading>
        </Card>
        <Pane display="flex" justifyContent="flex-end" >
        {/* <Button height={56} appearance="minimal" intent="danger" iconAfter={CrossIcon}   marginLeft={"auto"}> Clear </Button> */}
            <Button disabled={!isConfirmEnabled} height={56} appearance="primary" intent="success" iconAfter={ConfirmIcon} marginLeft={20}> Guardar Pesada </Button>
        </Pane>
        </Pane>
      </Pane>
      <Pane bottom={20} position="absolute">
        <Alert
        intent="none"
        title={data?.status?.message || "Sistema de Pesaje automático Truck & Scales"}
        margin={32}
        />
      </Pane>
    </Fragment>
  );
};

export default Display;
