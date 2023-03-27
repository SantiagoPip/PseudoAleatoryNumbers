import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'

export const DistribucionNormal = () => {

    const [cantidadIntervalos, setCantidadIntervalos] = useState(0);
    const [cantidadXi, setCantidadXi] = useState(0);
    const [Ni, setNi] = useState([]);
    const [distribucionNormalList, setDistribucionNormalList] = useState([]);
    let promedio = 0
    let desviacionEstandar = 0;
    const [Ri, setRi] = useState([]);
    const [aceptacion, setAceptacion] = useState(0);
    let newXi = [];


    const onSubmit = () => {
        for (let i = 0; i < cantidadXi; i++) {
            newXi.push(Math.ceil(Math.random() * 20));
        }
        promedio = calcularPromedio();
        calcularDistribucionEstandar();
        let newNi = [];
        let newRi = [];
        let newDistribucionNormalList = [];
        for (let i = 0; i < 50; i++) {
            let RiInit = Math.random();
            let elevado = ((RiInit - promedio) / (Math.pow(desviacionEstandar, 2)));
            let numerador = Math.exp((-1 / 2) * elevado);
            let denominador = Math.sqrt(desviacionEstandar * Math.PI * 2);
            let NiInit = numerador / denominador;;
            newNi.push(NiInit);
            newRi.push(RiInit);
            console.log(promedio, 'Ni')
            newDistribucionNormalList.push({ 'Ni': NiInit, 'Ri': RiInit });
        }
        setNi(newNi);
        setRi(newRi);
        setDistribucionNormalList(newDistribucionNormalList);
    }
    const calcularDistribucionEstandar = () => {

        let length = newXi.length;
        for (let i = 0; i < length; i++) {
            desviacionEstandar += (Math.abs(newXi[i] - promedio)) ^ 2;
        }
        desviacionEstandar = Math.sqrt(desviacionEstandar / length);
    }
    const calcularPromedio = () => {
        let promedio = 0;
        let length = newXi.length;

        for (let i = 0; i < length; i++) {
            promedio += newXi[i];
        }
        console.log('Promedio', newXi)
        return (promedio / length);
    }
    return (
        <div>
            <Box sx={{ marginTop: '2rem' }}>

                <form>

                    <TextField
                        type='number'
                        label="Cantidad de intervalos"
                        name="cantidadIntervalos"
                        value={cantidadIntervalos}
                        onChange={(e) => setCantidadIntervalos(e.target.value)}
                    />

                    <TextField
                        type='number'

                        label="xi"
                        name="xi"
                        value={cantidadXi}
                        onChange={(e) => setCantidadXi(e.target.value)}
                    />
                    <TextField
                        type='number'

                        label="aceptacion"
                        name="aceptacion"
                        value={aceptacion}
                        onChange={(e) => setAceptacion(e.target.value)}
                    />
                    <br />
                    <Button type="button" variant="contained" color="primary" sx={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', display: 'block', margin: '1rem' }} onClick={() => onSubmit()}>
                        Generar números aleatorios
                    </Button>
                </form>
            </Box>
            {<div>

                {distribucionNormalList.length > 0 && (
                    <TableContainer>

                <Table>
                <TableHead>
                            <TableRow >
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ri</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ni</TableCell>


                            </TableRow>
                        </TableHead>
                    <tbody>
                        {distribucionNormalList.map((distribucionNorma, index) => (
                            <TableRow key={index}>
                                <TableCell>{distribucionNorma.Ri}</TableCell>
                                <TableCell>{distribucionNorma.Ni}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
                    </TableContainer>
                )}
            </div>}
        </div>
    );
}
