/** @format */
import React, { useState, useEffect } from "react";
import "../.././css/customer.css";
import "../.././css/Sidebar.css";
import api_endpoint from "../../config";
import { useSelector } from 'react-redux'

const StatusArchived = () => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.token);
  const [navVisible, showNavbar] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
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

  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (e) => {
    console.log("Search input changed:", e.target.value);
    setSearchText(e.target.value);
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        api_endpoint + "/fetch-archive-status/" + user_id,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customer archived data");
      }
      const data = await response.json();
      setAllCustomers(data.archived_status);
      if (sessionStorage.getItem("archive status data") === null) {
        sessionStorage.setItem(
          "archive status data",
          JSON.stringify(data.archived_status)
        );
      }
    } catch (error) {
      console.error("Error fetching customer archived data:", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(
        api_endpoint + "/delete-archive-status/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer archived data");
      }
      // Update customer data after successful archive
      await fetchCustomers();

      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch archived customer data");
      }
    } catch (error) {
      console.error("Error deleting or fetching customer data:", error);
    }
  };

  const filteredCustomers = allCustomers.filter((customer) => {
    const matchesSearchText = customer.customerName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesSearchText;
  });

  const sortedFilteredCustomers = filteredCustomers.sort(
    (a, b) =>
      a.customerName
        .toLowerCase()
        .localeCompare(b.customerName.toLowerCase()) || a.id - b.id
  );

  useEffect(() => {
    document.title = "Status Archived";
    fetchCustomers();
  });

  const totalCustomers = allCustomers.length;

  return (
    <>
      <div className={`mx-auto ${navVisible ? "" : ""}`}>
        <div className="header">
          <div className="md:pl-5 md:pr-5 pr-2 pl-2 pb-5 pt-0.5">
            <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
              Status Archives
            </h1>
          </div>
        </div>
        <div className="search-and-button mt-20">
          <div className="dark:text-textTitle p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
            <div className="poppins-font font-bold">
              Total: {totalCustomers}
            </div>

            <input
              type="text"
              placeholder="Search Customers"
              value={searchText}
              onChange={handleSearchInputChange}
              className="px-4 py-2 border rounded focus:outline-none search-bar dark:text-textTitle dark:bg-container"
              style={{ width: "50%", maxWidth: "1000px" }}
            />
          </div>
        </div>
        <div className="md:pl-2 md:pr-2 pr-2 pl-2">
          <div
            className="md:p-5 md:pt-10 pt-5 "
            style={{
              transition: "margin-left 0.3s ease",
              marginTop: "-10px",
            }}
          >
            <div className="shadow mx-auto overflow-hidden overflow-x-auto order-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 customers-table table-auto">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Customer Number
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
                      Sorter Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Bean Weight
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:text-textTitle dark:bg-container custom-table">
                  {sortedFilteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="poppins-font">{customer.customer_id}</td>
                      <td className="poppins-font">{customer.customerName}</td>
                      <td className="poppins-font">{customer.sorterName}</td>
                      <td className="poppins-font">{customer.kiloOfBeans}</td>
                      <td className="poppins-font">{customer.status}</td>
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
                                  onClick={() => deleteCustomer(customer.id)}
                                  className="poppins-font flex items-center justify-center px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <span className="delete pr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>                                    </span>
                                    Permanent Delete
                                  </button>
                              </li>
                            </ul>
                          </div>
                        )}
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

export default StatusArchived;
