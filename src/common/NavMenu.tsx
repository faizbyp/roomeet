import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const NavMenu = ({ admin }: any) => {
  const router = useRouter();

  return (
    <Paper>
      <MenuList>
        {admin ? (
          <>
            <MenuItem onClick={() => router.push("/admin")}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.3rem", color: "primary.main" }}>
                Home
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/admin/room")}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <MeetingRoomIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.3rem", color: "primary.main" }}>
                Rooms
              </ListItemText>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => router.push("/dashboard")}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.3rem", color: "primary.main" }}>
                Home
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/booklist")}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <BookmarkIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.3rem", color: "primary.main" }}>
                My Book List
              </ListItemText>
            </MenuItem>
            <MenuItem divider onClick={() => router.push("/dashboard/room")}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <MeetingRoomIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.3rem", color: "primary.main" }}>
                Rooms
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => router.push("/dashboard/book")}>
              <ListItemIcon sx={{ fontSize: "1.5rem" }}>
                <AddIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: "1.3rem", color: "primary.main" }}>
                New Book
              </ListItemText>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Paper>
  );
};
export default NavMenu;
