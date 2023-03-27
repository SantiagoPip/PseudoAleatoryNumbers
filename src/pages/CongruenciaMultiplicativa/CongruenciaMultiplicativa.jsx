import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'

export const CongruenciaMultiplicativa = () => {
    const [semilla, setSemilla] = useState("");
    const [t, setT] = useState("");
    const [g,setG] = useState("")
    const [m,setM] = useState(0)
    const [intervalos, setIntervalos] = useState("");
    const [porcentaje, setPorcentaje] = useState("");
    const [minimo, setMinimo] = useState("");
    const [maximo, setMaximo] = useState("");
    const [numeros, setNumeros] = useState([]);
    const [a, setA] = useState(0);
    let Ri = []
    let Ni = []
    let numerosGenerados = [];
    const handleGenerarNumeros = () => {
      setA((8*t)+3)
      setM(Math.pow(2,g))
      let actualX = parseInt(semilla);
      for (let i = 0; i < 50; i++) {
        let riLess = actualX/(m-1)
        Ri.push(riLess)
        let niLess = minimo+((maximo-minimo)*riLess)
        Ni.push(niLess)
        let Riact = actualX/m
        let Niact = minimo+((maximo-minimo)*Riact)
        actualX = (a*actualX)%m
        numerosGenerados.push({'i':i,'xi':actualX,'RiLess':riLess,'NiLess':niLess,'Ri':Riact,'Ni':Niact });
      }
      setNumeros(numerosGenerados);
    }
  return (
    <>
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
        value={minimo}
        onChange={(e) => setMinimo(e.target.value)}
    />
    <TextField
        label="Valor máximo"
        name="maximo"
        value={maximo}
        onChange={(e) => setMaximo(e.target.value)}
    />
  
      <TextField
        label="T"
        name="t"
        value={t}
        onChange={(e) => setT(e.target.value)}
    />
    <TextField
        label="G"
        name="g"
        value={g}
        onChange={(e) => setG(e.target.value)}
    />
 
   
    <Button onClick={handleGenerarNumeros} variant="contained" color="primary" sx={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', display: 'block', margin: '1rem' }}>
        Aceptar
    </Button>
</form>
</Box>
{numeros.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >                               
                                 <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>i</TableCell>

                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>xi</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ri</TableCell>
                                <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ni</TableCell>


                            </TableRow>
                        </TableHead>
                        <tbody>
                            {numeros.map((numero, index) => (
                                <TableRow key={index}>
                                    <TableCell>{numero.i}</TableCell>
                                    <TableCell>{numero.xi}</TableCell>
                                    <TableCell>{numero.RiLess}</TableCell>
                                    <TableCell>{numero.NiLess}</TableCell>

                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )}
    </>
  )
  
}
