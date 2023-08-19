/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/sorting_status.css";
import "../.././css/Sidebar.css";
import api_endpoint from "../../config";

const SortingStatus = () => {
  const [navVisible, showNavbar] = useState(false);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    document.title = "Customer Status";

    // Add this code to control the body's overflow
    if (navVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navVisible]);

  const navigate = useNavigate();

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
          {" "}
          <div className="flex items-center justify-center mb-1">
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
              }}
              className="text-black mt-16 mb-1"
            >
              Customer Status
            </h1>
          </div>
        </div>

        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-30px",
          }}
        >
          <div
          className="flex items-center justify-end mb-15" // Add flex and justify-end
          style={{
            transition: "margin-left 0.3s ease",
            marginRight: "20px", // Adjust the margin
          }}
        >
          <label htmlFor="monthSelect" className="mr-2 poppins-font">
            Month:
          </label>
          <select
            id="monthSelect"
            className="px-4 py-2 border rounded focus:outline-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
            >
              <option value="1" style={{ fontFamily: "'Poppins', sans-serif" }}>January</option>
              <option value="2" style={{ fontFamily: "'Poppins', sans-serif" }}>February</option>
              <option value="3" style={{ fontFamily: "'Poppins', sans-serif" }}>March</option>
              <option value="4" style={{ fontFamily: "'Poppins', sans-serif" }}>April</option>
              <option value="5" style={{ fontFamily: "'Poppins', sans-serif" }}>May</option>
              <option value="6" style={{ fontFamily: "'Poppins', sans-serif" }}>June</option>
              <option value="7" style={{ fontFamily: "'Poppins', sans-serif" }}>July</option>
              <option value="8" style={{ fontFamily: "'Poppins', sans-serif" }}>August</option>
              <option value="9" style={{ fontFamily: "'Poppins', sans-serif" }}>September</option>
              <option value="10" style={{ fontFamily: "'Poppins', sans-serif" }}>October</option>
              <option value="11" style={{ fontFamily: "'Poppins', sans-serif" }}>November</option>
              <option value="12" style={{ fontFamily: "'Poppins', sans-serif" }}>December</option>
            </select>
          </div>
        </div>

        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-40px",
            fontSize: "15px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div style={{ fontFamily: "'Poppins', sans-serif" }}>
          <span style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: "24px", marginBottom: "1px" }}>Customer's Name:</span>
          <span style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: "20px", textDecoration: "underline", fontWeight: "bold", marginBottom: "20px",}}>Peter Robante</span>
        </div>

          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="status-table min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                  >
                    Sorter's Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                  >
                    Show
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200"></tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortingStatus;
