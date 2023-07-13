import React, { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";

import ResponsiveIconButton from "../../components/ResponsiveIconButton";
import { useAppDispatch } from "../../app/hooks";
import { clearAuthCredentials } from "../Login/authSlice";

const MenuBar: FC = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthCredentials());
    navigate("./login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AlarmOnIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PomoTM
          </Typography>
          <ResponsiveIconButton
            color="inherit"
            sx={{ margin: "0 6px" }}
            startIcon={<SettingsIcon />}
          >
            Settings
          </ResponsiveIconButton>
          <ResponsiveIconButton
            color="inherit"
            sx={{ margin: "0 6px" }}
            startIcon={<AssessmentIcon />}
          >
            Report
          </ResponsiveIconButton>
          <ResponsiveIconButton
            color="inherit"
            sx={{ margin: "0 6px" }}
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </ResponsiveIconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
