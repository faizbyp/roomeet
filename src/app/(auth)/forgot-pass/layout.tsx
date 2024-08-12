"use client";

import { Box, Container } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        background: "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(/img/buildings.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          justifyContent: "center",
          px: 16,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
