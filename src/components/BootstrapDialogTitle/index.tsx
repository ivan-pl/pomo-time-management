import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

export default function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1 }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
