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
import { addNewTask } from "../taskSlice";
import { addNewTask as addNewTaskApi } from "../../../services/firebase/addNewTask";

interface Props {
  open: boolean;
  onClose: () => void;
}

type InputForm = Omit<Task, "id">;

const AddTaskDialog: FC<Props> = (props) => {
  const { onClose: handleClose } = props;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<InputForm>({
    defaultValues: {
      actPomodoros: 0,
      date: new Date().toISOString().slice(0, 10),
      estPomodoros: 1,
      name: "",
    },
  });

  const onSubmit = async (data: InputForm) => {
    try {
      const id = await addNewTaskApi(data);
      dispatch(addNewTask({ ...data, id }));
      handleClose();
      reset();
    } catch (e) {
      if (e instanceof Error) setErrorMsg(e.toString());
    }
  };

  return (
    <Dialog {...props}>
      <BootstrapDialogTitle onClose={handleClose}>
        Add task
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
