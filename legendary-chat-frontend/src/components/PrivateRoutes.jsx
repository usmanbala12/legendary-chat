import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    
  return (
    window.localStorage.getItem('legendaryChatUser') ? <Outlet /> : <Navigate to='/register' />
  )
}

export default PrivateRoutes