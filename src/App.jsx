/** @format */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/AuthScreen/Login";
import Landing from "./screens/Landing";
import About from "./screens/about";

import Signup from "./screens/AuthScreen/Signup";
import Dashboard from "./screens/DashboardScreen/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
