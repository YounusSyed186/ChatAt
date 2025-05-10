
import React from 'react'
import Sidebar from './SideBar'
import { Navigate } from 'react-router-dom'
import authState from '../../zestand/authStates'



const DashboardLayout = () => {
  const userLoggedIn = authState((state) => state.userLoggedIn);
  if (!userLoggedIn) {
    return <Navigate to={"/auth/login"} />
  }
  return (
    <>
      <Sidebar />

    </>

  )
}

export default DashboardLayout