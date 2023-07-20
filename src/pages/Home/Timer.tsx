import React, { FC, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Stack } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSettings } from "../../app/selectors";
import { increaseCurrentTask } from "./taskSlice";
import audioTimerCompleted from "./assets/timer-complete.wav";

const numToString = (num: number) =>
  num >= 10 ? num.toString() : "0" + num.toString();

const getDate = (num: number) => moment().add(num, "m").toDate();

const audio = new Audio(audioTimerCompleted);
const playTimerCompleted = () => audio.play();

interface TimerStatus {
  state: "work" | "shortBreak" | "longBreak";
  pomoPassed: number;
}

const Timer: FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const [status, setStatus] = useState<TimerStatus>({
    pomoPassed: 0,
    state: "work",
  });

  const { seconds, minutes, pause, isRunning, resume, restart } = useTimer({
    expiryTimestamp: getDate(settings.workTime),
    onExpire: handleExpire,
    autoStart: false,
  });

  useEffect(() => {
    switch (status.state) {
      case "work":
        restart(getDate(settings.workTime), false);
        break;
      case "shortBreak":
        restart(getDate(settings.shortBreakTime));
        break;
      case "longBreak":
        restart(getDate(settings.longBreakTime));
        break;
    }
  }, [settings.longBreakTime, settings.shortBreakTime, settings.workTime]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleExpire() {
    switch (status.state) {
      case "work":
        dispatch(increaseCurrentTask());
        const pomoPassed = status.pomoPassed + 1;
        if (pomoPassed >= settings.longBreakInterval) {
          setStatus({ state: "longBreak", pomoPassed: 0 });
          restart(getDate(settings.longBreakTime), false);
        } else {
          setStatus({ state: "shortBreak", pomoPassed });
          restart(getDate(settings.shortBreakTime), false);
        }
        break;
      default:
        setStatus({ ...status, state: "work" });
        restart(getDate(settings.workTime), false);
        break;
    }
    playTimerCompleted();
  }

  return (
    <Card
      sx={{ backgroundColor: "#c96d6d", width: "80%", alignSelf: "center" }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{ fontSize: 24, color: "white" }}
          gutterBottom
        >
          {status.state === "work"
            ? "Time to work"
            : status.state === "shortBreak"
            ? "Short break"
            : "Long break"}
        </Typography>
        <Typography
          variant="h2"
          component="div"
          sx={{ fontSize: 100, color: "white" }}
        >
          {numToString(minutes)}:{numToString(seconds)}
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ justifyContent: "center" }}>
          {isRunning ? (
            <Button
              onClick={pause}
              sx={{
                backgroundColor: "white",
                width: "35%",
                fontSize: "24px",
                ":hover": { color: "white", bgcolor: "#db6b63" },
              }}
            >
              Pause
            </Button>
          ) : (
            <Button
              onClick={resume}
              sx={{
                backgroundColor: "white",
                width: "35%",
                fontSize: "24px",
                ":hover": { color: "white", bgcolor: "#db6b63" },
              }}
            >
              Start
            </Button>
          )}
          <IconButton
            onClick={handleExpire}
            aria-label="delete"
            size="large"
            sx={{ fontSize: "34px", color: "white" }}
          >
            <SkipNextIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Timer;
