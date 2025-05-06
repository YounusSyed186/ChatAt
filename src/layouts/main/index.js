import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from 'react-router-dom'


const isAuthenticated=false;

const MainLayout = () => {
  if (!isAuthenticated) {
      return <Navigate to={"/app"} />
    }
  return (
    <>
      <Container sx={{ height:"100vh" }} maxWidth="sm">
        <Stack spacing={5}>
        </Stack>

          <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
