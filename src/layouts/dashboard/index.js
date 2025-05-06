
import React from 'react'
import Sidebar from './SideBar'
import { Navigate } from 'react-router-dom'

const isAuthenticated=true;

const DashboardLayout = () => {
  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />
  }
  return (
    <>
      <Sidebar/>
      
    </>

  )
}

export default DashboardLayout