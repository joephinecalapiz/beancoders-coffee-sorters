// Import React and other necessary libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../../Sidebar.css";
import "../../dashboard.css"; // Import the newly created CSS file

const Dashboard = () => {
  const [navVisible, showNavbar] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  return (
    <>
      <Sidebar visible={navVisible} show={showNavbar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}>
        <div className="p-5 sm:ml-32">
          <h1 className="text-black mb-5 dashboard-title">Dashboard</h1>

          <div className="grid grid-cols-1 gap-12 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
              <div className="flex items-center justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title">Pieces of Bad Beans</h1>
                  <h1 className="text-black data-size">60 pieces</h1>
                </div>
              </div>
              <div className="flex items-center justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title">Pieces of Good Beans</h1>
                  <h1 className="text-black data-size">60 pieces</h1>
                </div>
              </div>
              <div className="flex items-center justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title">KG of Bad Beans</h1>
                  <h1 className="text-black data-size">60 kilograms</h1>
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
