"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          background:
            "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(/img/buildings.jpg)",
          backgroundSize: "cover",
        }}
      >
        {/* <Image
          src="/img/kpn-corp.png"
          alt="KPN Corp"
          width={431}
          height={117}
          sizes="50%, 50%"
          style={{ borderRadius: 16 }}
        /> */}
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Roomeet
        </Typography>
        <Typography variant="h3" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Book your meeting room
        </Typography>
        <Link href="/dashboard" passHref>
          <Button variant="contained">Start Now</Button>
        </Link>
      </Box>
    </>
  );
}
