"use client";

import { Fab, Popover } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";

const NavButton = ({ admin }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    handleClose();
  }, [pathname]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="fixed bottom-0 right-0 p-5 ">
      <Fab color="primary" aria-label="add" onClick={(e) => handleClick(e)}>
        <MenuIcon />
      </Fab>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <NavMenu admin={admin} />
      </Popover>
    </div>
  );
};

export default NavButton;
