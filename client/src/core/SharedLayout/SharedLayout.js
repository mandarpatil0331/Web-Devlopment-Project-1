import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar/Navbar'

const SharedLayout = () => {
  return (<>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>)
}

export default SharedLayout