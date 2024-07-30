"use client";
import { Poppins } from "next/font/google";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: "#cfcfcf",
  100: "#b7b7b7",
  200: "#a1a1a1",
  300: "#8a8a8a",
  400: "#757575",
  500: "#606060",
  600: "#4c4c4c",
  700: "#383838",
  800: "#262626",
  900: "#202020",
};

const PRIMARY = {
  main: "#009788",
};

const SECONDARY = {
  main: "#818285",
};

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
};

const ERROR = {
  main: "#EF3E36",
};

const palette = {
  common: { black: "#000", white: "#fff", green: "#4ef542", red: "#f2573f" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.5),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[400],
  },
  background: {
    paper: "#fafafa",
    default: GREY[100],
    neutral: GREY[200],
    card: GREY[700],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h4: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
  },
  palette: palette,
  spacing: 1,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, textTransform: "none" },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: "3.5rem",
          "&.Mui-disabled": {
            "& svg": { color: palette.text.disabled },
          },
          "&:hover": {
            backgroundColor: alpha(palette.grey[500], 0.16),
          },
          "&.Mui-focused": {
            backgroundColor: palette.action.focus,
            border: {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              color: "white",
            },
          },
          color: palette.grey[0],
        },
        input: {
          "&::placeholder": {
            opacity: 1,
            color: palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: alpha(palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.grey[500], 0.12),

          "&:hover": {
            backgroundColor: alpha(palette.grey[500], 0.16),
          },
          "&.Mui-focused": {
            backgroundColor: palette.action.focus,
          },
          "&.Mui-disabled": {
            backgroundColor: palette.action.disabledBackground,
          },
        },
        underline: {
          "&:before": {
            borderBottomColor: alpha(palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(palette.grey[500], 0.32),
            borderWidth: "medium",
          },
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.action.disabledBackground,
            },
          },
          "&:hover": {
            backgroundColor: alpha(palette.grey[500], 0.16),
          },
          "&.Mui-focused": {
            backgroundColor: palette.action.focus,
            "& .MuiOutlinedInput-notchedOutline": {
              color: "white",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            color: "#e0e0e0",
          },
          "&.Mui-focused": {
            color: "#ffffff",
            borderColor: "#ffffff",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          zIndex: 3000,
        },
      },
    },
  },
});

export default theme;
