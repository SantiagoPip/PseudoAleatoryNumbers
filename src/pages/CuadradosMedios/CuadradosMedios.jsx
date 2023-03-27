import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'





export const CuadradosMedios = () => {

    const [semilla, setSemilla] = useState("");
    const [valorMinimo, setValorMinimo] = useState("");
    const [valorMaximo, setValorMaximo] = useState("");
    const [numerosGenerados, setNumerosGenerados] = useState([]);




    const handleGenerarNumeros = () => {
        let xi = parseInt(semilla);
        let xi2, ext, extra, ri, ni;
        let numerosGenerados = [];
        for (let i = 0; i < 50; i++) {
            xi2 = xi ** 2;
            ext = xi2.toString().padStart(8, '0').slice(2, 6);
            extra = parseInt(ext) / 10000;
            ri = parseFloat(extra.toFixed(4));
            ni = parseFloat(valorMinimo) + parseFloat((valorMaximo - valorMinimo) * ri);
            numerosGenerados.push({ xi, xi2, ext, extra, ri, ni });
            xi = parseInt(ext);
        }
        setNumerosGenerados(numerosGenerados);
        console.log(numerosGenerados)
    };

    return (
        <div>
            <Box sx={{ marginTop: '2rem' }}>

                <form>
                    <TextField
                        label="Semilla"
                        name="semilla"
                        value={semilla}
                        onChange={(e) => setSemilla(e.target.value)}
                    />
        
                    <TextField
                        label="Valor mínimo"
                        name="minimo"
                        value={valorMinimo}
                        onChange={(e) => setValorMinimo(e.target.value)}
                    />
                    <TextField
                        label="Valor máximo"
                        name="maximo"
                        value={valorMaximo}
                        onChange={(e) => setValorMaximo(e.target.value)}
                    />
                    <Button onClick={handleGenerarNumeros} variant="contained" color="primary" sx={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', display: 'block', margin: '1rem' }}>
                        Aceptar
                    </Button>
                </form>
            </Box>
            {numerosGenerados.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>xi</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>xi^2</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>extraccion</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ri</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ni</TableCell>

                            </TableRow>
                        </TableHead>
                        <tbody>
                            {numerosGenerados.map((numero, index) => (
                                <TableRow key={index}>
                                    <TableCell>{numero.xi}</TableCell>
                                    <TableCell>{numero.xi2}</TableCell>
                                    <TableCell>{numero.ext}</TableCell>
                                    <TableCell>{numero.ri}</TableCell>
                                    <TableCell>{numero.ni}</TableCell>

                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
