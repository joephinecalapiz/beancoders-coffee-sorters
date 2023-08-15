/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../../Sidebar.css";
import "../../dashboard.css";
import axios from "axios";
import api_endpoint from "../../config";
const Dashboard = () => {
  const [navVisible, showNavbar] = useState(false);
  const [beanCount, setBeanCount] = useState("");

  useEffect(() => {
    axios.get(api_endpoint + "/count").then((response) => {
      const bean = response.data.beans;
      setBeanCount(bean);
    });
  });

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}>
        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
          }}
        >
          <h1 className="text-black mb-5 dashboard-title">Dashboard</h1>

          <div className="grid grid-cols-1 gap-12 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
              <div className="flex items-center justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title">Pieces of Bad Beans</h1>
                  <h1 className="text-black data-size">
                    {beanCount.bad} pieces
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title">
                    Pieces of Good Beans
                  </h1>
                  <h1 className="text-black data-size">
                    {beanCount.good} pieces
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title">KG of Bad Beans</h1>
                  <h1 className="text-black data-size">
                    {beanCount.kilograms} kilograms
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
