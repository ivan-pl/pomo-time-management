import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Alert, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import BootstrapDialogTitle from "../../components/BootstrapDialogTitle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSettings } from "../../app/selectors";
import { setSettings } from "./settingsSlice";
import { setSettings as setSettingsApi } from "../../services/firebase/setSettings";
import type { SettingsSlice } from "./settingsSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputValidationRule = { required: true, min: 1 };

const SettingsDialog: FC<Props> = (props) => {
  const { onClose: handleClose } = props;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const currentSettings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<SettingsSlice>({
    values: currentSettings,
  });

  const onSubmit = async (data: SettingsSlice) => {
    try {
      const response = await setSettingsApi(data);
      if (response) {
        dispatch(setSettings(data));
        handleClose();
      }
    } catch (e) {
      if (e instanceof Error) setErrorMsg(e.toString());
    }
  };

  return (
    <Dialog {...props}>
      <BootstrapDialogTitle onClose={handleClose}>
        Settings
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="workTime"
              control={control}
              rules={inputValidationRule}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Work time"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">minutes</InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="shortBreakTime"
              control={control}
              rules={inputValidationRule}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Short break"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">minutes</InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="longBreakTime"
              control={control}
              rules={inputValidationRule}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Long break"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">minutes</InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="longBreakInterval"
              control={control}
              rules={inputValidationRule}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Long break interval"
                />
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button sx={{ bgcolor: "white", color: "black" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          sx={{ bgcolor: "white", color: "green" }}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
