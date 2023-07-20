import React, { FC, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import AddTaskDialog from "./dialogs/AddTaskDialog";
import UpdateTaskDialog from "./dialogs/UpdateTaskDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentTask, selectTodoList } from "../../app/selectors";
import { getTodoList } from "../../services/firebase/getTodoList";
import { deleteTask, setCurrentTask, setTodoList } from "./taskSlice";
import { addTaskToHistory } from "../../services/firebase/addTaskToHistory";
import type { Task } from "../../types/task.type";
import { ListItem } from "@mui/material";

const TodoList: FC = () => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectTodoList);
  const currentTask = useAppSelector(selectCurrentTask);

  useEffect(() => {
    getTodoList().then((list) => {
      dispatch(setTodoList(list));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Stack px={3} gap={1}>
        <Stack alignItems={"center"} color={"white"}>
          <Typography variant="h5">Current task</Typography>
          <Typography variant="body1">
            {currentTask ? currentTask.name : "Task not set"}
          </Typography>
        </Stack>
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Tasks
            </ListSubheader>
          }
          sx={{ bgcolor: "white" }}
        >
          {todoList.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton onClick={() => setUpdatedTask(task)}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemButton
                selected={currentTask?.id === task.id}
                onClick={() => dispatch(setCurrentTask(task.id))}
              >
                <Checkbox
                  edge="end"
                  sx={{ marginRight: "4px" }}
                  onChange={() => {
                    dispatch(deleteTask(task.id));
                    addTaskToHistory(task);
                  }}
                />
                <ListItemText primary={task.name} />
                <Typography variant="body1">
                  {task.actPomodoros}/{task.estPomodoros}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<AddIcon />}
          sx={{ color: "white", outline: "2px dashed #f1f1f1" }}
          onClick={() => setOpenAddTask(true)}
        >
          Add task
        </Button>
      </Stack>
      <AddTaskDialog open={openAddTask} onClose={() => setOpenAddTask(false)} />
      {updatedTask && (
        <UpdateTaskDialog
          open={!!updatedTask}
          onClose={() => setUpdatedTask(null)}
          task={updatedTask}
        />
      )}
    </>
  );
};

export default TodoList;
