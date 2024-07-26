import { ButtonBase } from "@mui/material";

export const PrimaryBtn = ({ children, ...props }: any) => {
  return (
    <ButtonBase
      sx={[
        {
          px: 18,
          py: 8,
          backgroundColor: "primary.main",
          borderRadius: 4,
          fontWeight: "500",
          fontFamily: "Poppins",
        },
        {
          "&:hover": {
            backgroundColor: "primary.light",
          },
        },
      ]}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export const SecondaryBtn = ({ children, ...props }: any) => {
  return (
    <ButtonBase
      sx={[
        {
          px: 18,
          py: 8,
          backgroundColor: "secondary.main",
          borderRadius: 4,
          fontWeight: "500",
          fontFamily: "Poppins",
        },
        {
          "&:hover": {
            backgroundColor: "secondary.light",
          },
        },
      ]}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export const DangerBtn = ({ children, ...props }: any) => {
  return (
    <ButtonBase
      sx={[
        {
          px: 18,
          py: 8,
          backgroundColor: "error.main",
          borderRadius: 4,
          fontWeight: "500",
          fontFamily: "Poppins",
        },
        {
          "&:hover": {
            backgroundColor: "error.light",
          },
        },
      ]}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export const LinkBtn = ({ children, ...props }: any) => {
  return (
    <ButtonBase
      sx={[
        {
          px: 18,
          py: 8,
          borderRadius: 4,
          fontWeight: "500",
          fontFamily: "Poppins",
          color: "primary.main",
          textDecoration: "underline",
        },
        {
          "&:hover": {
            color: "primary.light",
          },
        },
      ]}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};
