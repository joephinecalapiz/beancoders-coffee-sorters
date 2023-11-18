/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ".././css/sorter.css";
import ".././css/datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AxiosRateLimit from "axios-rate-limit";
import api_endpoint from "../config";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';

const ManageUsers = () => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.token);
  const [navVisible, showNavbar] = useState(false);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const axiosInstance = AxiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
  }); // Example: 5 requests per second

  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const filteredSorters = allUsers.filter((users) =>
    users.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedFilteredSorters = filteredSorters.sort((a, b) => a.id - b.id);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const deleteKeys = (id) => {
    setKeyToDelete(id);
    openModal();
  };
  
  useEffect(() => {
    document.title = "Manage Users";

    fetchUsers();
    // const token = localStorage.getItem("token");
    // const role = localStorage.getItem("role");
    // const headers = {
    //   Authorization: "Bearer " + token,
    // };
    // axiosInstance
    //   .get(api_endpoint + "/allusers/", { headers })
    //   .then((response) => {
    //     const data = response.data;
    //     setAllSorters(data.user);
    //   });
  }, []); // Empty dependency array, so this effect runs only once

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setKeyToDelete(null);
  };

  const handleCancel = () => {
    closeModal();
  };

  const toggleDropdown = (user) => {
    if (openDropdownId === user) {
      // If the clicked dropdown is already open, close it
      setOpenDropdownId(null);
    } else {
      // Close the previously open dropdown (if any)
      setOpenDropdownId(user);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        api_endpoint + "/delete-user/" + keyToDelete,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user data");
      }

      // Update customer data after successful archive
      fetchUsers();
    } catch (error) {
      console.error("Error deleting or fetching user data:", error);
    } finally {
      // Close the modal after deletion
      closeModal();
    }
  };

  const setEnabled = async (statusId) => {
    try {
      const response = await fetch(
        api_endpoint + "/disabled-user/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            disabled: false,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Fail to enabled the user");
      }
      if (response.status === 200) {
        setOpenDropdownId(null);
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  const setToDisabled = async (statusId) => {
    try {
      const response = await fetch(
        api_endpoint + "/disabled-user/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            disabled: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Fail to enabled the user");
      }
      if (response.status === 200) {
        setOpenDropdownId(null);
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(api_endpoint + "/allusers", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
  
      const data = await response.json();
      setAllUsers(data.user);
      sessionStorage.setItem("userData", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const cachedCustomerData = sessionStorage.getItem("userData");
    if (cachedCustomerData) {
      setAllUsers(JSON.parse(cachedCustomerData));
    }
  }, []);

  const totalUsers = allUsers.length;

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pt-0.5 mb-2">
          <h1 className="text-black poppins-font font-bold bg-white dark:text-textTitle dark:bg-container mt-5 text-base p-3 rounded-lg shadow-xl">
            Manage Users
          </h1>
        </div>
      </div>
      <div className="search-and-button mt-20">
        <div className="p-5 dark:text-textTitle px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
          {/* Total number of sorters */}
          <div className="poppins-font font-bold">Total: {totalUsers}</div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search Sorters"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-4 py-2 poppins-font dark:text-textTitle dark:bg-container border rounded focus:outline-none search-bar"
            style={{ width: "50%", maxWidth: "1000px" }}
          />
        </div>
      </div>
      <div className="md:pl-5 md:pr-5 pr-2 pl-2 p-5">
        <div
          className="md:p-5"
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-20px",
          }}
        >
          <div className="shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <div className="max-h-[450px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 table-auto customers-table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Id num
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Date Registered
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Last Login
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 sort-table dark:text-textTitle dark:bg-container">
                  {sortedFilteredSorters.map((user, index) => (
                    <tr key={user.id}>
                      <td className="poppins-font">{index + 1}</td>
                      <td className="poppins-font">{user.name}</td>
                      <td className="poppins-font">{user.email}</td>
                      <td className="poppins-font">
                        <button
                          onClick={() => toggleDropdown(user.id)}
                          className="inline-flex items-center p-2 text-base font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          {user.disabled ? (
                            <span style={{ color: 'red' }}>Disabled</span>
                          ) : (
                            <span style={{ color: 'green' }}>Active</span>
                          )}
                        </button>
                        {openDropdownId === user.id && (
                          <div
                            id="dropdownDotsHorizontal"
                            className="absolute z-10 mt-4 md:w-32 w-10 divide-y divide-gray-100  shadow-lg bg-white dark:divide-gray-600 "
                            style={{ top: "50", left: "50" }}
                          >
                            <ul
                              className="py-2 text-base poppins-font text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconHorizontalButton"
                            >
                              <li>
                                <button
                                  onClick={() => setEnabled(user.id)}
                                  className={`block px-4 py-2 mx-auto w-full ${
                                    user.disabled === false
                                    ? "bg-brown hover:bg-gray-100 text-white"
                                    : ""
                                } dark:hover:bg-lightBrown dark:hover:text-black text-black`}
                                >
                                  Enabled
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => setToDisabled(user.id)}
                                  className={`block px-4 py-2 mx-auto w-full ${
                                    user.disabled === true
                                      ? "bg-brown hover:bg-gray-100 text-white"
                                      : ""
                                  } dark:hover:bg-lightBrown dark:hover:text-black text-black`}
                                >
                                  Disabled
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                      <td className="poppins-font">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="poppins-font">
                        {user.last_login ? new Date(user.last_login).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true
                        }) : 'N/A'}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteKeys(user.id)}
                          className="delete-button "
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {keyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            {/* Add padding to the modal content */}
            <div className="modal-content py-4 text-left px-6">
              {/* Title */}
              <div className="mb-4">
                <p className="text-lg text-gray-700 justify-start">
                  Are you sure you want to delete this user?
                </p>
              </div>

              {/* Buttons */}
              <div className="modal-buttons flex justify-center">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 justify-center hover:bg-red-600 text-white font-bold py-2 px-6 rounded mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-black justify-center hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
