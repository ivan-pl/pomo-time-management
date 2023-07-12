import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Error404 from "../pages/404";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const App: FC = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
);
