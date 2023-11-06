/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/LandingScreen/AuthScreen/Login";
import Landing from "./screens/LandingScreen/Landing";
import "./index.css";
// import ".../../css/index.css";
import ".../.././css/Sidebar.css";
import Signup from "./screens/LandingScreen/AuthScreen/Signup";
import Dashboard from "./screens/DashboardScreen/Dashboard";
import Sorters from "./screens/DashboardScreen/Sorters";
import Customers from "./screens/DashboardScreen/Customers";
import Status from "./screens/DashboardScreen/Status";
import Profile from "./screens/ProfileScreen/Profile";
import SortingStatus from "./screens/DashboardScreen/SortingStatus";
import Receipt from "./screens/ReceiptScreen/Receipt";
import CompanyDetails from "./screens/LandingScreen/AuthScreen/CompanyDetails";
import ManageUsers from "./superadmin/ManageUsers";
import api_endpoint from "./config";
import About from "./screens/LandingScreen/About";
import ContactUs from "./screens/LandingScreen/ContactUs";
import CustomerArchived from "./screens/Archives/CustomerArchived";
import StatusArchived from "./screens/Archives/StatusArchived";
import Error from "./screens/error";
import PermissionDenied from "./superadmin/Error";
import Feedbacks from "./superadmin/Feedbacks";

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
          path="/customer-archived"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                <CustomerArchived />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         <Route
          path="/status-archived"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                <StatusArchived />
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
        <Route
          path="/profile"
          element={
            authenticated ? (
              <div>
                <Profile />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customers/customerstatus/:customerName/:customerId"
          element={
            authenticated ? (
              <div>
                <SortingStatus />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/status/receipt/:customerId"
          element={
            authenticated ? (
              <div>
                <Receipt />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/error404" element={<Error />} /> */}
        <Route path="/company" element={<CompanyDetails />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route
          path="/customers/customerstatus/:customerName"
          element={<SortingStatus />}
        /> */}
        {/* <Route path="/status/receipt/:customerId" element={<Receipt />} /> */}
        <Route
          path="/manageusers"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                <ManageUsers />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/feedbacks"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                <Feedbacks />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* <Route from="**" to="/404" /> */}
        <Route
          path="/error404"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                <Error />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/permission-denied"
          element={
            authenticated ? (
              <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                <PermissionDenied />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
