import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'

export const CongruenciaLineal = () => {
    const [semilla, setSemilla] = useState("");
    const [k, setK] = useState("");
    const [c, setC] = useState("");
    const [g, setG] = useState("");
    const [a,setA] = useState(0)
    const [m,setM] = useState(0)
    const [minimo, setMinimo] = useState("");
    const [maximo, setMaximo] = useState("");
    const [numeros, setNumeros] = useState([]);
    let numerosGenerados = [];
    const handleGenerarNumeros = () => {
        setA(1+(2*k));
        setM(Math.pow(2,g))
        let xi = parseInt(semilla);
        let ri, ni,riLess,niLess;
        
        for (let i = 0; i < 50; i++) {
          let xiN = ((parseInt(a) * xi) + parseInt(c)) % parseInt(m);
          console.log(xiN)
          riLess = xiN/(m-1)
          console.log(minimo,'minimo')
          niLess = minimo+((maximo-minimo)*riLess)
          ri = xiN / m;
          console.log(ri,m,'ri')
          ni = parseFloat(minimo) + parseFloat((maximo - minimo) * ri);
          console.log(minimo, (maximo - minimo) * ri,'ni')

          numerosGenerados.push({'i':i,'xi':xiN,'riLess':riLess,'NiLess':niLess,'ri':ri,'ni':ni});
          xi = xiN
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
        label="K"
        name="k"
        value={k}
        onChange={(e) => setK(e.target.value)}
    />
    <TextField
        label="c"
        name="c"
        value={c}
        onChange={(e) => setC(e.target.value)}
    />
    <TextField
        label="g"
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
                                    <TableCell>{numero.ri}</TableCell>
                                    <TableCell>{numero.ni}</TableCell>


                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )}
    </>
  )
}
