"use client";

import NavButton from "./NavButton";
import AppBar from "@/components/home/components/AppBar";
import { Box, Container, useMediaQuery } from "@mui/material";

interface WrapperChild {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperChild) => {
  const mobile = useMediaQuery("(max-width:480px)");

  return (
    <>
      <AppBar admin />
      <Container maxWidth="md" sx={{ my: 8, px: 16 }}>
        {children}
      </Container>
      {mobile && <NavButton admin />}
    </>
  );
};

export default Wrapper;
