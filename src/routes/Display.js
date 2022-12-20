import React, { Fragment, useState, useEffect } from "react";

import { Text, Alert, Pane, Card, Heading, Button, CrossIcon, ConfirmIcon, BarcodeIcon, TruckIcon } from "evergreen-ui";

const Display = ({data, ...props}) => {
  const [isConfirmEnabled, setConfirmEnabled] = useState(false);
  const [calculationPane, setCalculationPane] = useState('none');

  const [net, setNet] = useState('0');
  const [tare, setTare] = useState('0');
  const [weight, setWeight] = useState('0');
  const [code, setCode] = useState('0');


  useEffect(() => {
    console.log(data)
    setConfirmEnabled(data?.bascula?.visor?.weight < 200 )
  }, [data]);

  const showHideCalculation = () => {
    setCalculationPane(calculationPane === 'none' ? 'flex' : 'none');
  }

  const calculateNet = () => {
    try {
        console.log("Calculate Net")
        setNet(parseInt() - parseInt());
    } catch {
        setNet("---")
    }
  }

  return (
    <Fragment>
      <Pane>
        <Card
        minWidth={480}
        minHeight={110}
        maxWidth={480}
        maxHeight={160}
        elevation={1}
        padding={16}
        textAlign="right"
        className='weightDisplay'
        onClick={showHideCalculation}
        >
            <Pane display="flex">
                <TruckIcon textAlign="left" size={30} color="dark" position="absolute"></TruckIcon>
            </Pane>
            <Heading marginTop={22} className="textDisplay">{   weight || "00.000"} Kg</Heading>
        </Card>
        <Pane display={calculationPane} flex={1} flexDirection="column" position="relative">
            <Pane clearfix
                float="left"
                marginTop={16}
                marginBottom={16}
                display="flex"
            >
                <Pane>
                    <Button
                        appearance="minimal"
                        maxWidth={200}
                        minWidth={200}
                        marginRight={16}
                        height="100%"
                        width="100%"
                        padding={0}
                    >
                        <Card
                        backgroundColor="#FFEFD2"
                        elevation={1}
                        display="flex"
                        flexDirection="column"
                        height="auto"
                        maxWidth={200}
                        minWidth={200}
                        overflowY="auto"
                        padding={16}
                        borderRadius={4}
                        marginBottom="auto"
                        width="100%"
                        textAlign="left"
                        >
                        <Heading size={400}>Tara</Heading>
                        <Heading size={900} textAlign="right">{tare} Kg</Heading>
                        </Card>
                    </Button>
                </Pane>

                <Pane position="absolute" right={0}>
                    <Button
                        appearance="minimal"
                        maxWidth={200}
                        minWidth={200}
                        height="100%"
                        width="100%"
                        padding={0}
                    >
                        <Card
                            backgroundColor="#DCF2EA"
                            elevation={1}
                            display="flex"
                            flexDirection="column"
                            height="auto"
                            maxWidth={200}
                            minWidth={200}
                            overflowY="auto"
                            padding={16}
                            borderRadius={4}
                            marginBottom="auto"
                            width="100%"
                            textAlign="left"
                        >
                        <Heading size={400}>Neto</Heading>
                        <Heading size={900} textAlign="right">{net} Kg</Heading>
                        </Card>
                    </Button>
                </Pane>
            </Pane>
        </Pane>

        <Card
            marginTop={16}
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
        <Pane display="flex" justifyContent="flex-end" marginTop={16}>
        {/* <Button height={56} appearance="minimal" intent="danger" iconAfter={CrossIcon}   marginLeft={"auto"}> Clear </Button> */}
            <Button disabled={!isConfirmEnabled} height={56} appearance="primary" intent="success" iconAfter={ConfirmIcon} marginLeft={16}> Guardar Pesada </Button>
        </Pane>
      </Pane>
      <Pane>
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
