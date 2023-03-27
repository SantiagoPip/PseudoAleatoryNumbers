import React from 'react'
import { Navbar } from './components/navbar/Navbar'
import { AppRouter } from './router/AppRouter'
import { Header } from './components/header/Header'

export const App = () => {
  return (
    <>
    <Header/>
      <Navbar/>
    <AppRouter/>
    </>
  )
}

