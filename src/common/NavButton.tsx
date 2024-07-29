"use client";

import {
  Box,
  Button,
  Fab,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ButtonCard from "./ButtonCard";
import { useRouter } from "next/navigation";

const NavButton = ({ admin }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
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
        <Paper>
          <MenuList>
            {admin ? (
              <MenuItem onClick={() => router.push("/admin")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={() => router.push("/dashboard")}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => router.push("/dashboard/booklist")}>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText>List Book</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => router.push("/dashboard/book")}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>New Book</ListItemText>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
};

export default NavButton;
