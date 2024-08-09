"use client";

import NavButton from "./NavButton";
import AppBar from "@/components/home/components/AppBar";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

interface WrapperChild {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperChild) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar />
      <Container maxWidth="md" sx={{ my: 8, px: 16 }}>
        {children}
      </Container>
      {mobile && <NavButton />}
    </>
  );
};

export default Wrapper;
