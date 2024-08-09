import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./main-layout";
import Wrapper from "@/common/Wrapper";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Roomeet",
  description: "Created By R&F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <Box component="main" sx={{ color: "#fafafa" }}>
        {children}
      </Box>
    </MainLayout>
  );
}
