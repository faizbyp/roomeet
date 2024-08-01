"use client";

import NavButton from "./NavButton";
import AppBar from "@/components/home/components/AppBar";
import { Box, useMediaQuery } from "@mui/material";

interface WrapperChild {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperChild) => {
  const mobile = useMediaQuery("(max-width:480px)");

  return (
    <>
      <AppBar admin />
      <Box sx={{ mt: 16, px: 24 }}>{children}</Box>
      {mobile && <NavButton admin />}
    </>
  );
};

export default Wrapper;
