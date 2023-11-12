/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import Select from "react-select";
import { useParams } from "react-router-dom";
import axios from "axios";
import api_endpoint from "../../config";
import Skeleton from "react-loading-skeleton";

const SortingStatus = () => {
  const [navVisible, showNavbar] = useState(false);
  const { customerName, customerId } = useParams();
  const [allHistory, setAllHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    console.log("navVisible:", navVisible);

    document.title = "History Customer Status";

    // Add this code to control the body's overflow
    if (navVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navVisible]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        const response = await axios.get(
          `${api_endpoint}/fetch-history/${user_id}/${customerId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const history = response.data;
        setAllHistory(history.history);
        setIsLoading(false); // Data fetching is complete
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // Handle error (e.g., set an error state)
      }
    };

    fetchData();
  }, [customerId]);

  useEffect(() => {
    if (!selectedMonth) return;

    const fetchMonthData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        const response = await axios.get(
          `${api_endpoint}/fetch-history/${user_id}/${customerId}?month=${selectedMonth.value}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const history = response.data;
        setAllHistory(history.history);
        setIsLoading(false); // Data fetching is complete
      } catch (error) {
        console.error("Error fetching month data:", error);
        // Handle error (e.g., set an error state)
      }
    };

    fetchMonthData();
  }, [selectedMonth, customerId]);

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
    {/* <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} /> */}
      {/* <Topbar
        onToggleSidebar={toggleSidebar}
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      /> */}
      <div className="header">
             <div className="pl-5 pb-5 pt-0.5 pr-5">
          <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
            Customers
          </h1>
        </div>
          </div>
          <div className="search-and-button">
            <div
              className={`p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins 
            ${navVisible ? "px-10" : "sm:ml-44"}`}
            >
              <div className="font-poppins">
                <span className="poppins-font  font-semibold block text-24px mb-1 dark:text-textTitle">
                  Customer's Name:
                </span>
                <br />
                <span className="poppins-font font-semibold ml-1 block text-20px underline mb-20 dark:text-textDesc">
                  {customerName}
                </span>
              </div>

              <div className="flex dark:text-textTitle items-center justify-end mr-6 z-10">
                <label
                  htmlFor="monthSelect"
                  className="mr-2 font-bold poppins-font"
                >
                  Month:
                </label>

                <Select
                  id="monthSelect"
                  options={monthOptions}
                  value={selectedMonth}
                  onChange={(selectedOption) =>
                    setSelectedMonth(selectedOption)
                  }
                  isSearchable={false}
                  clearable={false}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#000",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontFamily: "'Poppins', sans-serif",
                      color: "#333",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="px-4">
            <div
              className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
              style={{
                transition: "margin-left 0.3s ease",
                marginTop: "-20px",
              }}
            >
              <div className="shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <div className="max-h-[450px] overflow-y-auto">
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
                    <tbody className="bg-white dark:text-textTitle dark:bg-container divide-y divide-gray-200 custom-table">
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
                          <td className="poppins-font text-center">
                            {historyItem.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default SortingStatus;
