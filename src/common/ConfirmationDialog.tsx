import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

function ConfirmationDialog({
  title,
  desc,
  action,
  response,
  color = "primary",
  type = "button",
  children,
}: any) {
  const [open, setOpen] = useState(false);

  const showDialog = () => {
    setOpen(true);
  };

  const hideDialog = () => {
    setOpen(false);
  };

  const confirmRequest = () => {
    response();
    hideDialog();
  };

  return (
    <>
      {children(showDialog)}
      {open && (
        <Dialog
          open={open}
          onClose={hideDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{desc}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={hideDialog} color="secondary">
              Cancel
            </Button>
            <Button type={type} variant="contained" onClick={confirmRequest} color={color}>
              {action ? action : "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ConfirmationDialog;
