/** @format */

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import { setCredentials } from "../redux/services/auth/authSlice.js";

store.dispatch(setCredentials())

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
