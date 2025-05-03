import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
const MainLayout = () => {
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
