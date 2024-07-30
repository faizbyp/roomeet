import { Typography, useMediaQuery } from "@mui/material";
import { Popover, Box, Avatar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import UserMenu from "@/common/UserMenu";
import { usePathname } from "next/navigation";
import NavMenu from "@/common/NavMenu";

const AppBar = ({ admin }: any) => {
  const mobile = useMediaQuery("(max-width:480px)");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorMenu, setAnchorMenu] = useState<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    handleClose();
  }, [pathname]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenu = (e: BaseSyntheticEvent) => {
    setAnchorMenu(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: "100%", zIndex: "50" }}>
      <Box
        sx={{
          height: "3rem",
          bgcolor: "#fafafa",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 8,
            height: "100%",
          }}
        >
          {!mobile && (
            <>
              <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <NavMenu admin={admin} />
              </Popover>
            </>
          )}
          <Typography sx={{ color: "primary.main" }}>ROOMEET</Typography>
          <IconButton className="p-0" onClick={handleUserMenu}>
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
          <UserMenu anchorEl={anchorMenu} handleClose={handleMenuClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default AppBar;
