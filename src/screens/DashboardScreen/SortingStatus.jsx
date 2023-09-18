/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import Select from "react-select";
import { useParams } from "react-router-dom";
import axios from "axios";
import api_endpoint from "../../config";
const SortingStatus = () => {
  const [navVisible, showNavbar] = useState(false);
  const { customerName } = useParams();
  const [allHistory, setAllHistory] = useState([]);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const customerId = sessionStorage.getItem("customerId");
    axios
      .get(api_endpoint + "/fetch-history/" + user_id + "/" + customerId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const history = response.data;
        setAllHistory(history.history);
      });
  }, []);

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
      <div className="max-w-8xl mx-auto pl-16">
        <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <Topbar onToggleSidebar={toggleSidebar} collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <div className={`mx-auto ${navVisible ? "" : ""}`}>
          <div className="header">
            <div
              className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
            >
              <div className="p-0.5 mb-2 w-full mt-6 relative">
                <h1 className="text-black bg-white mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                  History Customer Status
                </h1>
              </div>

              <div className="flex items-center"></div>
              <br />
              <br />
            </div>
          </div>
          <div className="search-and-button">
            <div
              className={`p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins 
            ${navVisible ? "px-10" : "sm:ml-44"}`}

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
                  {customerName}
                </span>
              </div>

              <div className="flex items-center justify-end mb-15 mr-6 z-10">
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
          </div>
          <div className="table-container">
            <div
              className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
              style={{
                transition: "margin-left 0.3s ease",
                marginTop: "-20px",
              }}
            >
              <div className="shadow overflow-hidden  overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 customers-table">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                      >
                        Sorter's Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center   text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                      >
                        Kilo of Beans
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 custom-table">
                    {allHistory.map((historyItem) => (
                      <tr key={historyItem.id}>
                        <td className="poppins-font text-center">
                          {new Date(historyItem.date).toLocaleDateString()}
                        </td>
                        <td className="poppins-font text-center">
                          {historyItem.sorterName}
                        </td>
                        <td className="poppins-font text-center">
                          {historyItem.kiloOfBeans} kilo
                        </td>
                        <td className="poppins-font text-center">Status</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortingStatus;
