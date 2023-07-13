import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: FC<Props> = (props) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>Some content</DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
