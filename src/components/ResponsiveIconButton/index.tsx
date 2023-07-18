import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints";

interface ResponsiveIconButtonProps extends ButtonProps {
  breakpoint: Breakpoint;
}

const ResponsiveIconButtonStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== "breakpoint",
})<ResponsiveIconButtonProps>(({ theme, breakpoint }) => ({
  fontSize: theme.typography.pxToRem(14),
  minWidth: "auto",

  [theme.breakpoints.down(breakpoint)]: {
    minWidth: 32,
    paddingLeft: 8,
    paddingRight: 8,
    "& .MuiButton-startIcon": {
      margin: 0,
    },
    "& .buttonText": {
      display: "none",
    },
  },
}));

export default function ResponsiveIconButton(
  props: ResponsiveIconButtonProps,
): JSX.Element {
  const { children, ...rest } = props;

  return (
    <ResponsiveIconButtonStyled variant="outlined" color="primary" {...rest}>
      <span className="buttonText">{children}</span>
    </ResponsiveIconButtonStyled>
  );
}

ResponsiveIconButton.defaultProps = {
  breakpoint: "sm",
};
