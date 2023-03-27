import { Button, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import React, { useCallback, useRef, useState } from 'react'
import { findZ } from '../../components/utilities/zTble';
import { findChiCuadradoInv } from '../../components/utilities/chiCuadrado';
import { getDMaxP } from '../../components/utilities/kolmogorovSmirnof';
import Swal from 'sweetalert2';

export const Pruebas = () => {

    const [selectedTest, setSelectedTest] = useState("");
    const [inputMethod, setInputMethod] = useState("manual");
    const [fileContent, setFileContent] = useState([])
    const [aceptacionMedios, setAceptacionMedios] = useState(0)
    //KS
let aceptacion = 0;
  let frecuencys = [];
  let cantidadIntervalos = 0;
  let alfa = 0;
  let min = 0;
  let max = 0;
  let maxRLessMinR = 0;
  let frecuenciasAcumuladas  = [];
  let p_obj = [];
  let frecuenciasEsperadasAcumuladas = [];
  let p_esp = [];
  let dif = [];
  let maxDif = 0;
  let dMaxP = 0;
  let estaAprobado = '';

    //==========
    const handleFileChange = useCallback((files) => {
        setFile(files[0]);
    }, []);
    const [opciones, setOpciones] = useState({
        seleccion: "",
        archivo: null,
    });

    const handleSubirArchivo = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setFileContent(event.target.result.split(','));
        };
        reader.readAsText(file);
    };
    const handleTestChange = useCallback((event) => {
        setSelectedTest(event.target.value);
    }, []);
    const calcularPromedio = () => {
        let data = fileContent.map(data => Number(data))
        let suma = 0;

        for (let i = 0; i < data.length; i++) {
            suma += data[i]; // Suma los elementos del array
        }

        return suma / data.length;
    }

    const calcularVarianza = (datos, media) => {
        let sumaCuadrados = 0;
        let n = datos.length;

        for (let i = 0; i < n; i++) {
            sumaCuadrados += Math.pow((datos[i] - media), 2);
        }

        return sumaCuadrados / n;
    }

    

    const handleInputChange = (event) => {
        setInputMethod(event.target.value);
    };
     
    


    //=================================================================

    const getDMaxPP= (alfa)=> {
        dMaxP = getDMaxP(alfa);
      }
    
    const  getMaxDif = ()=> {
        dif.forEach(actual => {
          if (actual > maxDif) {
            maxDif = actual;
          }
        });
      }
    
     const  muestro = ()=>  {
        let datosParaMostrar = [];
        for (let i = 0; i < cantidadIntervalos; i++) {
          datosParaMostrar.push(
            [
              frecuencys[i], 
              frecuenciasAcumuladas[i],
              p_obj[i],
              frecuenciasEsperadasAcumuladas[i],
              p_esp[i],
              dif[i]
            ]
          );
        }
        return datosParaMostrar;
      }
    
     const calcularDif = ()=> {
        for (let i = 0; i < cantidadIntervalos; i++) {
          dif.push(Math.abs(p_obj[i] - p_esp[i]));
        }
      }
    
    const  calcularPEsp =()=> {
        frecuenciasEsperadasAcumuladas.forEach(actual => {
          p_esp.push(Math.abs(actual/50));
        });
      }
    
    const  calcularFrecuenciasEsperadasAcumuladas= ()=> {
        let frecuenciaEsperada = 50 / cantidadIntervalos;
        let actual = 0;
        let acumulador = 0;
        for (let i = 0; i < cantidadIntervalos; i++) {
          acumulador = frecuenciaEsperada + actual;
          frecuenciasEsperadasAcumuladas.push(acumulador);
          actual = acumulador;
        }
      }
    
    const  calcularP_obj =()=> {
        frecuenciasAcumuladas.forEach(actual => {
          p_obj.push(actual/50);
        });
      }
    
    const  calcularFrecuenciasAcumuladas = () => {
        let acumulador  = 0;
        frecuencys.forEach(actual => {
          acumulador += actual;
          frecuenciasAcumuladas.push(acumulador);
        });
      }
    
    


    //=================================================================
    const aplicarPruebaKs = ()=>{
        alfa = 100 - aceptacion;
        aceptacion = aceptacion / 100;
        console.log(aceptacion,'aceptacioin')
        alfa = alfa / 100;
        calcularFrecuenciasAcumuladas();
        calcularP_obj();
        calcularFrecuenciasEsperadasAcumuladas();
        calcularPEsp();
        calcularDif();
        getMaxDif();
        getDMaxPP(alfa);
        estaAprobado = maxDif <= dMaxP ? 'Si' : 'No';
        if(estaAprobado==='Si'){
            Swal.fire('Logro pasar la prueba de chi cuadrado satisfactoriamente')
        }else if(estaAprobado==='No'){
            Swal.fire('No logro pasar la prueba ')
        }
    }



    
    const aplicarPruebaPoker=()=>{

let data = fileContent.map(data => Number(data))
let aceptacion = 95;
let frecuenciaPoker = {};
let estadisticoPoker = 0;
let chiCuadradoInv = 0;
let estaAprobado = '';

// Agrupamos los datos en pares
let pares = data.map(d => d.toString().padStart(5, '0'))
                .join('')
                .match(/.{5}/g);

// Calculamos la frecuencia de cada tipo de mano de poker
pares.forEach(par => {
  let counts = {};
  [...par].forEach(c => counts[c] = counts[c] ? counts[c] + 1 : 1);
  let valores = Object.values(counts).sort().join('');
  if (frecuenciaPoker[valores]) {
    frecuenciaPoker[valores]++;
  } else {
    frecuenciaPoker[valores] = 1;
  }
});

// Calculamos el estadístico de prueba para la frecuencia observada
Object.values(frecuenciaPoker).forEach(f => estadisticoPoker += Math.pow(f, 2));
estadisticoPoker = (16 / 5000) * estadisticoPoker - 5000;

// Buscamos el valor crítico de chi-cuadrado para el nivel de confianza
let gradosDeLibertad = Object.keys(frecuenciaPoker).length - 1;
let alfa = (100 - aceptacion) / 100;
chiCuadradoInv = findChiCuadradoInv(alfa, gradosDeLibertad);

// Verificamos si la hipótesis nula se rechaza o no
estaAprobado = (estadisticoPoker < chiCuadradoInv) ? 'Si' : 'No';
if(estaAprobado==='Si'){
    Swal.fire('Logro pasar la prueba de chi cuadrado satisfactoriamente')
}else if(estaAprobado==='No'){
    Swal.fire('No logro pasar la prueba ')
}



        
    }
    const aplicarPruebaChiCuadrado = ()=>{
        console.log('Prueba de chi cuadrado')
        let frecuencys = [];
        let cantidadIntervalos = 0;
        let aceptacion  = 0;
            
        let chiCuadrado  = [];
        let frecuenciaEsperada  = 0;
        let totalChiCuadrado  = 0;
        let gradosDeLibertad  = 0;
        let chiCuadradoInv  = 0;
        let estaAprobado  = '';
        frecuenciaEsperada = 50 / 10;
        
        frecuencys.forEach(actual => {
        let actualChi = Math.pow((actual - frecuenciaEsperada), 2) / 
        frecuenciaEsperada;
        chiCuadrado.push(actualChi);
        totalChiCuadrado += actualChi;
        })

        gradosDeLibertad = (2 - 1) * (10 - 1);
        let alfa = (100 - aceptacion)/100;

        chiCuadradoInv = findChiCuadradoInv(alfa, gradosDeLibertad);
        estaAprobado = (totalChiCuadrado < chiCuadradoInv) ? 'Si' : 'No';
        if(estaAprobado==='Si'){
            Swal.fire('Logro pasar la prueba de chi cuadrado satisfactoriamente')
        }else if(estaAprobado==='No'){
            Swal.fire('No logro pasar la prueba ')
        }
    }
   

    const aplicarPruebaVarianza = () => {
       
        let data = fileContent.map(data => Number(data))
        let aceptacion = 0;
        let alfa = 0;
        let promedio = 0;
        let unoMenosAlfaEntreDos = 0;
        let z = 0;
        let limiteInferior = 0;
        let limiteSuperior = 0;
        let estaAprobado = '';
        alfa = 100 - aceptacion;
        aceptacion = aceptacion / 100;
        alfa = alfa / 100;
        let n = data.length;
        promedio = calcularPromedio();
        unoMenosAlfaEntreDos = 1 - (alfa / 2);
        z = findZ(unoMenosAlfaEntreDos);
        limiteInferior = (1 / 2) - (z * (1 / Math.sqrt(12 * n)));
        limiteSuperior = (1 / 2) + (z * (1 / Math.sqrt(12 * n)));
        estaAprobado = promedio >= limiteInferior &&
        promedio <= limiteSuperior ? 'Si' : 'No';
        if(estaAprobado==='Si'){
            Swal.fire('Logro pasar la prueba de varianza satisfactoriamente')
        }else if(estaAprobado==='No'){
            Swal.fire('No logro pasar la prueba ')
        }
    }

    const aplicarPruebaMedias = () => {
        let data = fileContent.map(data => Number(data))
        let promedio = calcularPromedio()
        const media = data.reduce((acc, curr) => acc + curr, 0) / data.length;
        const desviacionEstandar = Math.sqrt(data.reduce((acc, curr) => acc + Math.pow(curr - media, 2), 0) / (data.length - 1));
        const valorCritico = 1.96; // Para una prueba de dos colas
        const errorEstandar = desviacionEstandar / Math.sqrt(data.length);
        const intervaloConfianzaInferior = media - (valorCritico * errorEstandar);
        const intervaloConfianzaSuperior = media + (valorCritico * errorEstandar);
        if (promedio >= intervaloConfianzaInferior && promedio <= intervaloConfianzaSuperior) {
            setAceptacionMedios(1); 
        } else {
            setAceptacionMedios(0); 
        }
        if(aceptacionMedios===1){
            Swal.fire('Logro pasar la prueba de medias satisfactoriamente')
        }else if(aceptacionMedios===0){
            Swal.fire('No logro pasar la prueba ')
        }
    }
    const ejecutarPrueba = () => {
        switch (selectedTest) {
            case 'prueba-medias':
                aplicarPruebaMedias()
                break;
            case 'prueba-varianza':
                aplicarPruebaVarianza()
                break;
            case 'prueba-chi2':
                aplicarPruebaChiCuadrado()
                break;
            case 'prueba-ks':
                aplicarPruebaKs()
                break;
            case 'prueba-poker':
                aplicarPruebaPoker()
                break;

        }
    }


    return (
        <Container>
            <Typography variant="h4" component="h1" align="center">
                Pruebas
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Seleccione una prueba</InputLabel>
                <Select value={selectedTest} onChange={handleTestChange}>
                    <MenuItem value="prueba-medias">Prueba de medias</MenuItem>
                    <MenuItem value="prueba-varianza">Prueba de varianza</MenuItem>
                    <MenuItem value="prueba-ks">Prueba KS</MenuItem>
                    <MenuItem value="prueba-chi2">Prueba Chi^2</MenuItem>
                    <MenuItem value="prueba-poker">Prueba de poker</MenuItem>
                </Select>
            </FormControl>
            <RadioGroup
                row
                aria-label="input-method"
                name="input-method"
                value={inputMethod}
                onChange={handleInputChange}
            >
                <FormControlLabel
                    value="manual"
                    control={<Radio />}
                    label="Ingresar manualmente"
                />
                <FormControlLabel
                    value="archivo"
                    control={<Radio />}
                    label="Subir archivo"
                />
            </RadioGroup>
            {inputMethod === "archivo" ? (
                <div>
                    <input type="file" onChange={handleSubirArchivo} />
                    {fileContent}
                </div>
            ) : (
                <div>

                </div>
            )}

            <Button variant="contained" color="primary" onClick={ejecutarPrueba} fullWidth>
                Ejecutar prueba
            </Button>
        </Container>
    );
}
