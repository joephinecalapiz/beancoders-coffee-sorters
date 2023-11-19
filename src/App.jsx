/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/LandingScreen/AuthScreen/Login";
import Landing from "./screens/LandingScreen/Landing";
import "./index.css";
// import ".../../css/index.css";
import ".../.././css/Sidebar.css";
import Signup from "./screens/LandingScreen/AuthScreen/Signup";
import CompanyDetails from "./screens/LandingScreen/AuthScreen/CompanyDetails";
import About from "./screens/LandingScreen/About";
import ContactUs from "./screens/LandingScreen/ContactUs";
import RootPage from "./screens/RootPage";
import AdminRootPage from "./superadmin/RootPage";
import beanlogo from './assets/beanlogo.png';
import Error from "./superadmin/Error";
import PermissionDenied from "./superadmin/DeniedAccess";
import Main from "./screens/mainpage";
import { useSelector } from 'react-redux'

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  // Access the token from the Redux state
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  if (authenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen backdrop-blur">
            <img src={beanlogo} alt="Beans Logo" className="w-32 h-32" />
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
          element={
            authenticated ? (
              <RootPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          exact
          path="/superadmin/*"
          element={
            authenticated ? (
              <AdminRootPage />
            ) : (
              <Navigate to="/login" />
            )

          }
        />
        <Route
          path="/error"
          element={
            <Main>
              <Error />
            </Main>

          }
        />
        <Route
          path="/superadmin/permission-denied/"
          element={
            <Main>
              <PermissionDenied />
            </Main>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
