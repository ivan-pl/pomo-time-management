import React, { FC } from "react";
import { useSignInWithGithub } from "react-firebase-hooks/auth";
import { GithubLoginButton } from "react-social-login-buttons";
import { Auth, UserCredential } from "firebase/auth";

type Props = {
  onSuccess: (user: UserCredential) => void;
  onError: (error: Error) => void;
  auth: Auth;
};

const SignIn: FC<Props> = ({ onSuccess, onError, auth }) => {
  const [signInWithGithub, user, , error] = useSignInWithGithub(auth);
  if (user) {
    onSuccess(user);
  }
  if (error) {
    onError(error);
  }

  return <GithubLoginButton onClick={() => signInWithGithub()} />;
};

export default SignIn;
