/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/sorting_status.css";
import "../.././css/Sidebar.css";
import Select from "react-select";

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

  const [selectedMonth, setSelectedMonth] = useState(null);

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

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
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div className="flex items-center justify-end mb-15 mr-6">
            <label
              htmlFor="monthSelect"
              className="mr-2 bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
              }}
            >
              Month:
            </label>

            <Select
              id="monthSelect"
              options={monthOptions}
              value={selectedMonth}
              onChange={setSelectedMonth}
              isSearchable={false} // Add this line to disable keyboard input
              clearable={false}
              styles={{
                option: (provided) => ({
                  ...provided,
                  fontFamily: "'Poppins', sans-serif",
                }),
              }}
            />
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
            <span
              style={{
                display: "block",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "24px",
                marginBottom: "1px",
              }}
            >
              Customer's Name:
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "20px",
                textDecoration: "underline",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Peter Robante
            </span>
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
