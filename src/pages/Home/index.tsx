import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthCredentials } from "../../app/selectors";
import { isCredentialsValid } from "../../services/firebase/isCredentialsValid";
import { clearAuthCredentials, setAuthCredentials } from "../Login/authSlice";

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
        });
    } else {
      navigate("./login");
    }
  }, []);

  return <div>Application</div>;
};

export default Home;
