import React, { FC } from "react";
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

const TodoList: FC = () => (
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
      <ListItem
        key={"123"}
        secondaryAction={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      >
        <Checkbox edge="end" />
        <ListItemButton>
          <ListItemText primary="SomeTask" />
        </ListItemButton>
      </ListItem>
    </List>
    <Button
      startIcon={<AddIcon />}
      sx={{ color: "white", outline: "2px dashed #f1f1f1" }}
    >
      Add task
    </Button>
  </Stack>
);

export default TodoList;
