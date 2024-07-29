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
      <AppBar />
      <Box sx={{ mt: 8 }}>{children}</Box>
      {mobile && <NavButton />}
    </>
  );
};

export default Wrapper;
