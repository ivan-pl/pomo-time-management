import React, { FC, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

import AddTaskDialog from "./dialogs/AddTaskDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTodoList } from "../../app/selectors";
import { getTodoList } from "../../services/firebase/getTodoList";
import { setTodoList } from "./taskSlice";

const TodoList: FC = () => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectTodoList);

  useEffect(() => {
    getTodoList().then((list) => {
      dispatch(setTodoList(list));
    });
  }, []);

  return (
    <>
      <Stack px={3} gap={1}>
        <Stack alignItems={"center"} color={"white"}>
          <Typography variant="h5">Current task</Typography>
          <Typography variant="body1">Something todo</Typography>
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
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <Checkbox edge="end" />
              <ListItemButton>
                <ListItemText primary={task.name} />
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
    </>
  );
};

export default TodoList;
