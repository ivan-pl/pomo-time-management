import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

import BootstrapDialogTitle from "../../components/BootstrapDialogTitle";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: FC<Props> = (props) => {
  const { onClose: handleClose } = props;
  return (
    <Dialog {...props}>
      <BootstrapDialogTitle onClose={handleClose}>
        Settings
      </BootstrapDialogTitle>
      <DialogContent dividers>Some content</DialogContent>
      <DialogActions>
        <Button sx={{ bgcolor: "white", color: "black" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ bgcolor: "white", color: "green" }} onClick={handleClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
