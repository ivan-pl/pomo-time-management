import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app/App";
import theme from "./app/theme";
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter basename="/pomo-time-management">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
