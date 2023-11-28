import React from 'react'
import Admin from './components/Admin'
import { Outlet } from 'react-router-dom'

const MainHeader = () => {
  return (
    <div>
      <Admin />
      <Outlet />
    </div>
  )
}

export default MainHeader
