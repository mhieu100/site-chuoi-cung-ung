import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../client/_navbar'
import Footer from '../client/_footer'

const LayoutClient = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutClient