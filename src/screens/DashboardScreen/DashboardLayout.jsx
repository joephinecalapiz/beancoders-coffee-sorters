/** @format */

// DashboardLayout.jsx
import React from "react";
import Sidebar from "../../component/Sidebar";
import Dashboard from "./Dashboard";

const DashboardLayout = ({ navVisible, setNavVisible }) => {
  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default DashboardLayout;
