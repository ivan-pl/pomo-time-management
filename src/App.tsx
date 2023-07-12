import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Error404 from "./pages/404";
import Home from "./pages/Home";

export const App: FC = () => (
  <Routes>
    <Route path="login" element={<div>Auth page</div>} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
);
