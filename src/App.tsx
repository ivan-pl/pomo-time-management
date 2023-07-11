import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

export const App: FC = () => (
  <Routes>
    <Route path="login" element={<div>Auth page</div>} />
    <Route path="/" element={<div>App page</div>} />
    <Route path="*" element={<div>404</div>} />
  </Routes>
);
