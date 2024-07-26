"use client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AuthProvider from "@/components/auth/AuthProvider";
import SWRegProvider from "@/lib/provider/SWRegProvider";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SWRegProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <html>
              <body className="text-neutral-50 line-clamp-none bg-neutral-800">
                <Box
                  sx={{
                    maxWidth: "480px",
                    mx: "auto",
                    px: 16,
                    backgroundColor: "#262626",
                    minHeight: "100svh",
                    position: "relative",
                  }}
                >
                  <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Toaster />
                      {children}
                    </LocalizationProvider>
                  </AppRouterCacheProvider>
                </Box>
              </body>
            </html>
          </ThemeProvider>
        </StyledEngineProvider>
      </SWRegProvider>
    </AuthProvider>
  );
}
