/** @format */

import React, { useState } from "react";
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

  return (
	<BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/customers"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Customers />
              </div>
            }
          />
          <Route
            path="/sorters"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Sorters />
              </div>
            }
          />
          <Route
            path="/status"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <Status />
              </div>
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
