/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/AuthScreen/Login";
import Landing from "./screens/Landing";
import About from "./screens/about";
import "./index.css";
import "./sidebar.css";
import Signup from "./screens/AuthScreen/Signup";
import Dashboard from "./screens/DashboardScreen/Dashboard";
import Sorters from "./screens/DashboardScreen/Sorters";
import Customers from "./screens/DashboardScreen/Customers";
import Status from "./screens/DashboardScreen/Status";

function App() {
  const [navVisible, showNavbar] = useState(false);
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated && window.location.pathname === "/login") {
      window.location.replace("/dashboard");
    }
  }, [authenticated]);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Dashboard />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customers"
          element={
            authenticated ? (
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Customers />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/sorters"
          element={
            authenticated ? (
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Sorters />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/status"
          element={
            authenticated ? (
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Status />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
