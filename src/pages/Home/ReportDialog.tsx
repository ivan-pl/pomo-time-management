import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ReportDialog: FC<Props> = (props) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Report</DialogTitle>
      <DialogContent>Some content</DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
