import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Alert, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import BootstrapDialogTitle from "../../../components/BootstrapDialogTitle";
import { useAppDispatch } from "../../../app/hooks";
import type { Task } from "../../../types/task.type";
import { updateTask as updateTaskApi } from "../../../services/firebase/updateTask";
import { updateTask } from "../taskSlice";

interface Props {
  open: boolean;
  task: Task;
  onClose: () => void;
}

const UpdateTaskDialog: FC<Props> = (props) => {
  const { onClose: handleClose, task } = props;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<Task>({
    values: {
      id: task.id,
      actPomodoros: task.actPomodoros,
      date: task.date,
      estPomodoros: task.estPomodoros,
      name: task.name,
    },
  });

  const onSubmit = async (data: Task) => {
    try {
      const result = await updateTaskApi(data);
      if (!result) {
        throw new Error("Couldn't update database");
      }
      dispatch(updateTask(data));
      handleClose();
      reset();
    } catch (e) {
      if (e instanceof Error) setErrorMsg(e.toString());
    }
  };

  return (
    <Dialog {...props}>
      <BootstrapDialogTitle onClose={handleClose}>
        Update task
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} direction={"row"}>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Controller
              name="name"
              control={control}
              rules={{ required: true, minLength: 1 }}
              render={({ field }) => (
                <TextField {...field} type="text" label="Task description" />
              )}
            />

            <Controller
              name="actPomodoros"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Act"
                  variant="filled"
                  sx={{ width: "55px" }}
                />
              )}
            />

            <Controller
              name="estPomodoros"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Est"
                  sx={{ width: "55px" }}
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

export default UpdateTaskDialog;
