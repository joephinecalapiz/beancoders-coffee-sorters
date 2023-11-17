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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to match your month options (1 - 12)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState({
    value: currentMonth,
    label: monthOptions[currentMonth - 1].label, // Get the label for the current month
  });
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (e) => {
    console.log("Search input changed:", e.target.value);
    setSearchText(e.target.value);
  };

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    console.log("navVisible:", navVisible);

    document.title = "History Customer Status";

    if (navVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navVisible]);

  useEffect(() => {
    document.title = "Customer History";

    if (selectedMonth !== null && selectedYear !== null) {
      fetchData();
    }
  }, [selectedMonth, selectedYear]);

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
    }
  };

  const filteredCustomers = allHistory.filter((customer) => {
    const registrationDate = new Date(customer.created_at);
    const matchesSearchText =
      customer && customer.customerName
        ? customer.customerName.toLowerCase().includes(searchText.toLowerCase())
        : false;

    const monthFilter =
      selectedMonth !== null
        ? registrationDate.getMonth() + 1 === selectedMonth.value
        : true;

    return (
      monthFilter &&
      (!selectedYear || registrationDate.getFullYear() === selectedYear) &&
      matchesSearchText
    );
  });

  const sortedFilteredCustomers = filteredCustomers.sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="header">
        <div className="pl-5 pb-5 pt-0.5 pr-5">
          <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
            Customer History
          </h1>
        </div>
      </div>
      <div className="search-and-button mt-20">
        <div className="dark:text-textTitle p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
          <div className="poppins-font font-bold"></div>

          <input
            type="text"
            placeholder="Search Customers"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-4 py-2 poppins-font  border rounded focus:outline-none search-bar dark:text-textTitle dark:bg-container"
            style={{ width: "90%", maxWidth: "1500px" }}
          />
        </div>
      </div>
      <div className="calendar">
        <div className="p-5">
          <div className="grid grid-rows-1 gap-3 md:grid-cols-2 md:grid-rows-1">
            <div className="relative dark:text-textTitle mobile:justify-self-center z-10 md:mb-0 flex items-center justify-end">
              <label
                htmlFor="monthSelect"
                className="font-bold"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Month:
              </label>
              <div className="ml-2">
                <Select
                  id="monthSelect"
                  options={monthOptions}
                  value={selectedMonth}
                  onChange={setSelectedMonth}
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
            <div className="mb-5 dark:text-textTitle  md:mb-0 mobile:justify-self-center  flex items-center">
              <label
                htmlFor="yearSelect"
                className="font-bold"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Year:
              </label>
              <div className="ml-2">
                <input
                  type="number"
                  id="yearSelect"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border rounded px-2 py-2 w-20 dark:bg-container focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div
          className="p-5"
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
                  {sortedFilteredCustomers.map((historyItem) => (
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
