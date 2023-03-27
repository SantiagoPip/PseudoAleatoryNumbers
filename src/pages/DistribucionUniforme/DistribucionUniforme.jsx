import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react'

export const DistribucionUniforme = () => {
    const [cantidadIntervalos, setCantidadIntervalos] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [distribucionUniformeList, setDistribucionUniformeList] = useState([]);
      
    const [ri, setRi] = useState(() => Math.random());
    const [ni, setNi] = useState(() => 0);
    
    const generarNumero = (min, max) => {
      const r = Math.random();
      const n = min + ((max - min)/10) * r;
      setRi(r);
      setNi(n);
      return n;
    }
    
    const onSubmit = () => {
        let distribucionUniformeListTemp = [];
        let NiTemp = [];
        let RiTemp = [];
        for (let i = 0; i < cantidadIntervalos; i++) {
            let RiInit = Math.random();
            let NiInit = min+((max-min)/10)*RiInit
            const n = generarNumero(min,max)
            distribucionUniformeListTemp.push({'Ni': RiInit, "Ri": NiInit});
            NiTemp.push(n);
            RiTemp.push(ri);
        }
        setDistribucionUniformeList(distribucionUniformeListTemp);
        setNi(NiTemp);
        setRi(RiTemp);
    };

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

                        label="Minimo"
                        name="min"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                    />
                    <TextField
                                            type='number'

                        label="Maximo"
                        name="max"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                    />

                    <br />
                    <Button type="button" variant="contained" color="primary" sx={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', display: 'block', margin: '1rem' }} onClick={() => onSubmit()}>
                        Generar números aleatorios
                    </Button>
                </form>
            </Box>
            <div>
        {/* Aquí muestra la tabla con los números generados */}
        {distribucionUniformeList.length > 0 && (
             <TableContainer component={Paper}>
             <Table>
                 <TableHead>
                     <TableRow >
                         <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ri</TableCell>
                         <TableCell style={{ backgroundColor: '#333', fontFamily: 'Arial', fontSize: '16px', color:'#FFFFFF' }}>Ni</TableCell>
                     </TableRow>
                 </TableHead>
                 <tbody>
                     {distribucionUniformeList.map((numero, index) => (
                         <TableRow key={index}>
                             <TableCell>{numero.xi1}</TableCell>
                             <TableCell>{numero.Ri}</TableCell>
                             <TableCell>{numero.Ni}</TableCell>

                         </TableRow>
                     ))}
                 </tbody>
             </Table>
         </TableContainer>)}
            
            
            
       

      </div>
      <div>
        
        
      </div>
        </div>
    )
}
