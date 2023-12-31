/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/LandingScreen/AuthScreen/Login";
import Landing from "./screens/LandingScreen/Landing";
import "./index.css";
import "./css/sidebar.css";
import "./css/dashboard.css";
import "./css/sorter.css";
import "./css/status.css";
import "./css/profile.css";
import "./css/customer.css";
import "./css/datepicker.css";
import "./css/receipt.css";
import "./css/topbar.css";
import Signup from "./screens/LandingScreen/AuthScreen/Signup";
import CompanyDetails from "./screens/LandingScreen/AuthScreen/CompanyDetails";
import About from "./screens/LandingScreen/About";
import ContactUs from "./screens/LandingScreen/ContactUs";
import RootPage from "./screens/RootPage";
import AdminRootPage from "./superadmin/RootPage";
import logo from "./assets/logo.png";

function App() {
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

  if (authenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={logo} alt="Beans Logo" className="w-32 h-32" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/company" element={<CompanyDetails />} />
        <Route
          exact
          path="/*"
          element={authenticated ? <RootPage /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/superadmin/*"
          element={authenticated ? <AdminRootPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
