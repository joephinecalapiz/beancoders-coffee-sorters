/** @format */
import React, { useState, useEffect } from "react";
import "../.././css/customer.css";
import "../.././css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api_endpoint from "../../config";
import { useSelector } from 'react-redux'
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const CustomerArchived = () => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const [archiveError, setArchiveError] = useState(false);
  const [navVisible, showNavbar] = useState(true);
  const navigate = useNavigate(); // Use the hook here
  const [allCustomers, setAllCustomers] = useState([]);
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
  const [reloadCustomerData, setReloadCustomerData] = useState(null);
  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (customerId) => {
    if (openDropdownId === customerId) {
      // If the clicked dropdown is already open, close it
      setOpenDropdownId(null);
    } else {
      // Close the previously open dropdown (if any)
      setOpenDropdownId(customerId);
    }
  };

  const handleShowUpdateModal = (customer) => {
    setOpenDropdownId(null);
    setSelectedCustomer(customer);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = (customer) => {
    setSelectedCustomer(customer);
    handleShowUpdateModal(null);
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(api_endpoint + "/fetch-archive/" + user_id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data.archiveds;
      setAllCustomers(data);
      setArchiveError(false)
      // console.log(data.archiveds)
    } catch (error) {
      // console.error("Error fetching customer archived data:", error);
      if (error.response && error.response.data.status === 'No Customers Found') {
        setArchiveError(true);
        // console.error("Error fetching customer data:", error);
      }
    }
  };

  // console.log(allCustomers);

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(api_endpoint + "/delete-customer/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer archived data");
      }
      // Update customer data after successful archive
      fetchCustomers();
      setOpenDropdownId(null);
    } catch (error) {
      console.error("Error deleting or fetching customer data:", error);
    }
    setOpenDropdownId(null);
  };

  useEffect(() => {
    document.title = "Customer Archived";

    if (selectedMonth !== null && selectedYear !== null) {
      fetchCustomers();
    }
  }, [selectedMonth, selectedYear]);

  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (e) => {
    console.log("Search input changed:", e.target.value);
    setSearchText(e.target.value);
  };

  const filteredCustomers = allCustomers.filter((customer) => {
    const registrationDate = new Date(customer.created_at);
    const matchesSearchText =
      customer && customer.customerName
        ? customer.customerName.toLowerCase().includes(searchText.toLowerCase())
        : false;

    // Check if selectedMonth is not null, and if it is, don't apply the month filter
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

  const totalCustomers = allCustomers.length;

  return (
    <>
      <Topbar
        onToggleSidebar={toggleSidebar}
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <div
        className={`main relative z-5 inset-0 mt-16  ${!navVisible ? "sm:ml-60" : "sm:ml-16"
          }`}
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className={`mx-auto ${navVisible ? "" : ""}`}>
          <div className="header">
            <div className="md:pl-5 md:pr-5 pr-2 pl-2 pb-5 pt-0.5 ">
              <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
                Customer Archives
              </h1>
            </div>
          </div>
          <div className="search-and-button mt-16">
            <div className="dark:text-textTitle p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
              {/* Total number of customer */}
              <div className="poppins-font font-bold">
                Total: {totalCustomers}
              </div>
              {/* Search bar */}
              <input
                type="text"
                placeholder="Search Customers"
                value={searchText}
                onChange={handleSearchInputChange}
                className="px-4 py-2 poppins-font   border rounded focus:outline-none search-bar dark:text-textTitle dark:bg-container"
                style={{ width: "50%", maxWidth: "1000px" }}
              />
            </div>
          </div>
          <div className="calendar">
            <div className="p-5">
              <div className="flex md:grid grid-rows-1 gap-2 md:grid-cols-2 md:grid-rows-1">
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
                <div className="md:mb-0 mb-1 dark:text-textTitle mobile:justify-self-center  flex items-center">
                  <label
                    htmlFor="yearSelect"
                    className="font-bold md:ml-2 ml-6"
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

          <div className="md:pl-2 md:pr-2 pr-2 pl-2">
            <div
              className="md:p-5 md:pt-10 pt-10 "
              style={{
                transition: "margin-left 0.3s ease",
                marginTop: "-10px",
              }}
            >
              <div className="shadow mx-auto overflow-hidden overflow-x-auto order-b border-gray-200 sm:rounded-lg">
                <div className="max-h-[420px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200 customers-table table-auto">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                        >
                          Id number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                        >
                          Date Archived
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                        >
                          Customer Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                        >
                          Phone Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                        >
                          Address
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:text-textTitle dark:bg-container custom-table">
                      {(reloadCustomerData || sortedFilteredCustomers).map(
                        (customer) => (
                          <tr key={customer.id}>
                            <td className="poppins-font">{customer.id}</td>
                            <td className="poppins-font">
                              {new Date(customer.created_at).toLocaleDateString()}
                            </td>
                            <td className="poppins-font">
                              {customer.customerName}
                            </td>
                            <td className="poppins-font">{customer.phoneNum}</td>
                            <td className="poppins-font">{customer.address}</td>
                            <td className="poppins-font">
                              <button
                                onClick={() => toggleDropdown(customer.id)}
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 16 3"
                                >
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                              </button>
                              {openDropdownId === customer.id && (
                                <div
                                  id="dropdownDotsHorizontal"
                                  className="absolute mt-2 w-56 origin-top-right z-10 divide-y divide-gray-100 rounded-lg shadow bg-white dark:bg-dark dark:divide-gray-600 mr-5"
                                  style={{ top: "100", right: "0" }}
                                >
                                  <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                  >
                                    <li>
                                      <button
                                        onClick={() =>
                                          deleteCustomer(customer.id)
                                        }
                                        className="poppins-font flex items-center justify-center px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        <span className="delete pr-2">
                                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>                                    </span>
                                        Permanent Delete
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  <div>
                    {archiveError && (
                      <p className="items-center justify-center text-center text-primary dark:text-textTitle">No customer archives found!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerArchived;
