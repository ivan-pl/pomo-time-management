import React, { FC } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Auth, UserCredential } from "firebase/auth";

type Props = {
  onSuccess: (user: UserCredential) => void;
  onError: (error: Error) => void;
  auth: Auth;
};

const SignIn: FC<Props> = ({ onSuccess, onError, auth }) => {
  const [signInWithGoogle, user, , error] = useSignInWithGoogle(auth);
  if (user) {
    onSuccess(user);
  }
  if (error) {
    onError(error);
  }

  return <GoogleLoginButton onClick={() => signInWithGoogle()} />;
};

export default SignIn;
