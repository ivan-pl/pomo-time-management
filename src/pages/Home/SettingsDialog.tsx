import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import BootstrapDialogTitle from "../../components/BootstrapDialogTitle";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: FC<Props> = (props) => {
  return (
    <Dialog {...props}>
      <BootstrapDialogTitle onClose={props.onClose}>
        Settings
      </BootstrapDialogTitle>
      <DialogContent dividers>Some content</DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
