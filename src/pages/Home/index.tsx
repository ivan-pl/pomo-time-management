import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthCredentials } from "../../app/selectors";
import { isCredentialsValid } from "../../services/firebase/isCredentialsValid";
import { clearAuthCredentials, setAuthCredentials } from "../Login/authSlice";
import MenuBar from "./MenuBar";
import Timer from "./Timer";
import TodoList from "./TodoList";
import { fetchSettings } from "./settingsSlice";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { uid, token } = useAppSelector(selectAuthCredentials);

  useEffect(() => {
    if (uid && token) {
      isCredentialsValid()
        .then((isValid) => {
          if (!isValid) {
            throw new Error("Invalid credentials");
          }
          dispatch(setAuthCredentials({ uid, token }));
        })
        .catch(() => {
          dispatch(clearAuthCredentials());
          navigate("./login");
        })
        .then(() => {
          dispatch(fetchSettings());
        });
    } else {
      navigate("./login");
    }
  }, [uid, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack
      spacing={2}
      sx={{ maxWidth: "600px", minWidth: "350px", margin: "auto" }}
    >
      <MenuBar />
      <Timer />
      <TodoList />
    </Stack>
  );
};

export default Home;
