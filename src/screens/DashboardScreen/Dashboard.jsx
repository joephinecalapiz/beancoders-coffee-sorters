/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Sidebar />

      <Topbar />
    </>
  );
};

export default Dashboard;
