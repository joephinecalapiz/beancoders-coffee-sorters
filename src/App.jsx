/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/AuthScreen/Login";
import Landing from "./screens/Landing";
import About from "./screens/about";
import "./index.css";
// import ".../../css/index.css";
import ".../.././css/Sidebar.css";
import Signup from "./screens/AuthScreen/Signup";
import Dashboard from "./screens/DashboardScreen/Dashboard";
import Sorters from "./screens/DashboardScreen/Sorters";
import Customers from "./screens/DashboardScreen/Customers";
import Status from "./screens/DashboardScreen/Status";
import Profile from "./screens/ProfileScreen/Profile";
import SortingStatus from "./screens/DashboardScreen/SortingStatus";
import Receipt from "./screens/ReceiptScreen/Receipt";
import CompanyDetails from "./screens/AuthScreen/CompanyDetails";

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

  // useEffect(() => {
  //   const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  //   if (prefersDarkMode) {
  //     document.body.classList.add('dark:bg-dark');
  //   } else {
  //     document.body.classList.remove('dark:bg-dark');
  //   }
  // }, []);

  useEffect(() => {
    if (authenticated && window.location.pathname === "/login") {
      window.location.replace("/dashboard");
    }
  }, [authenticated]);

  if (authenticated === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"} >
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
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
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
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
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
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
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
        <Route path="/company" element={<CompanyDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="customer/customerstatus/:customerName"
          element={<SortingStatus />}
        />
        <Route path="status/receipt/:customerId" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
