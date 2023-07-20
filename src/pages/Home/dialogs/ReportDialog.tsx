import React, { FC, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

import LinearProgress from "@mui/material/LinearProgress";

import BootstrapDialogTitle from "../../../components/BootstrapDialogTitle";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectHistory, selectTodoList } from "../../../app/selectors";
import { getHistory as getHistoryApi } from "../../../services/firebase/getHistory";
import { setHistory } from "../taskSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ReportDialog: FC<Props> = (props) => {
  const { onClose: handleClose } = props;
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const todoList = useAppSelector(selectTodoList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHistoryApi()
      .then((history) => {
        dispatch(setHistory(history));
      })
      .finally(() => setLoading(false));
  }, [todoList]);

  return (
    <Dialog {...props}>
      <BootstrapDialogTitle onClose={handleClose}>Report</BootstrapDialogTitle>
      <DialogContent dividers sx={{ minWidth: "280px" }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Pomodoros&nbsp;(act/est)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((task) => (
                  <TableRow
                    key={task.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {task.date}
                    </TableCell>
                    <TableCell>{task.name}</TableCell>
                    <TableCell align="right">{`${task.actPomodoros}/${task.estPomodoros}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ bgcolor: "white", color: "black" }} onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
