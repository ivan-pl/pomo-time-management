import React, { FC, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { auth } from "../../services/firebase";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithGithub from "./SignInWithGithub";
import { useAppDispatch } from "../../app/hooks";
import { setAuthCredentials } from "./authSlice";

const Copyright: FC<any> = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href="./">
      Pomo time management
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSuccess = ({ user }: UserCredential) => {
    dispatch(setAuthCredentials(user));
    navigate("/");
  };
  const handleError = (error: Error) => setErrorMsg(error.message);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "white",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Box sx={{ mt: 1 }}>
          <SignInWithGoogle
            onSuccess={handleSuccess}
            onError={handleError}
            auth={auth}
          />
          <SignInWithGithub
            onSuccess={handleSuccess}
            onError={handleError}
            auth={auth}
          />
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
