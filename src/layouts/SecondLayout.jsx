import React from 'react'
import HeaderSecond from '../components/HeaderSecond/HeaderSecond'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

export const SecondLayout = () => {
  return (
    <> 
        <HeaderSecond />
        <Outlet />
        <Footer />
    </>
  )
}
