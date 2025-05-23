import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from '../client/_navbar'
import Footer from '../client/_footer'

const { Content } = Layout

const LayoutClient = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ marginTop: 0 }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default LayoutClient