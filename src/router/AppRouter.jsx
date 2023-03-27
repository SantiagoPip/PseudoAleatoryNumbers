import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CuadradosMedios } from '../pages/CuadradosMedios/CuadradosMedios'
import { CongruenciaLineal } from '../pages/CongruenciaLineal/CongruenciaLineal'
import { CongruenciaMultiplicativa } from '../pages/CongruenciaMultiplicativa/CongruenciaMultiplicativa'
import { DistribucionNormal } from '../pages/DistribucionNormal/DistribucionNormal'
import { DistribucionUniforme } from '../pages/DistribucionUniforme/DistribucionUniforme'
import { Pruebas } from '../pages/Pruebas/Pruebas'


export const AppRouter = () => {
  return (
    <>
    <Routes>
       
        <Route path = "/cuadradosMedios" element = {<CuadradosMedios/>}></Route>
        <Route path = "/congruenciaLineal" element = {<CongruenciaLineal/>}></Route>
        <Route path = "/congruenciaMultiplicativa" element = {<CongruenciaMultiplicativa/>}></Route>
        <Route path = "/distribucionNormal" element = {<DistribucionNormal/>}></Route>
        <Route path = "/distribucionUniforme" element = {<DistribucionUniforme/>}></Route>
        <Route path = "/pruebas" element = {<Pruebas/>}></Route>

        <Route path = "/*" element = {<CuadradosMedios/>}></Route>

    </Routes>
</>
  )
}
