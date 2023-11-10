/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ".././css/sorter.css";
import ".././css/datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AxiosRateLimit from "axios-rate-limit";
import api_endpoint from "../config";
import AdminSidebar from "../component/AdminSidebar";
import Topbar from "../component/AdminTopbar";

const GenerateKeys = () => {
  const [navVisible, showNavbar] = useState(false);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const axiosInstance = AxiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
  }); // Example: 5 requests per second

  const [allKeys, setAllKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newSorterPhoneNumber, setNewSorterPhoneNumber] = useState("");
  const [newSorterAddress, setNewSorterAddress] = useState("");
  const [newSorterDateHired, setNewSorterDateHired] = useState("");

  const [searchText, setSearchText] = useState("");

  const filteredKeys = allKeys.filter((keys) =>
    keys.created_at.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedFilteredKeys = filteredKeys.sort((a, b) => {
    // Parse the dates and compare them
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Manage Users";

    fetchKeys();

    const role = localStorage.getItem("role");

    // Check if the user_id is not 1 and navigate back if necessary
    if (role !== "1") {
      navigate("/permission-denied"); // Go back to the previous page
      // window.location.reload();
    }
  }, []); // Empty dependency array, so this effect runs only once

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSorterName("");
    setNewSorterPhoneNumber("");
    setNewSorterAddress("");
    setNewSorterDateHired("");
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleGenerateKeys = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await fetch(api_endpoint + "/generate-keys", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      fetchKeys();
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const deleteKeys = async (id) => {
    try {
      let token = localStorage.getItem("token");
      const response = await fetch(api_endpoint + "/delete-key/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete key data");
      }
      // Update customer data after successful archive
      await fetchKeys();
    } catch (error) {
      console.error("Error deleting or fetching key data:", error);
    }
  };

  const fetchKeys = async () => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + "/fetch-keys/" + user_id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }

      const data = await response.json();
      setAllKeys(data.random_key);
      //localStorage.setItem("customerData", JSON.stringify(data.customer));
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };


  const totalUsers = allKeys.length;

  return (
    <>
      <AdminSidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar
        onToggleSidebar={toggleSidebar}
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <div className={`mx-auto ${navVisible ? "" : ""}`}>
        <div className="header">
          <div className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}>
            <div className="p-0.5 mb-2 w-full mt-6 relative">
              <h1 className="text-black bg-white dark:text-textTitle dark:bg-container mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                Generate Keys
              </h1>
              {/* <div className="ml-auto" style={{ marginTop: "50px",fontFamily: "'Poppins', sans-serif", fontSize: "19px"}}>
                Total Sorter: {totalSorters}
              </div> */}
            </div>

            <div className="flex items-center"></div>
            <br />
            <br />
          </div>
        </div>
        <div className="search-and-button">
          <div
            className={`p-5 dark:text-textTitle px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins 
            ${navVisible ? "px-10" : "sm:ml-44"}`}
          >
            {/* Total number of sorters */}
            Total: {totalUsers}
            {/* Add New button */}
            <button
              onClick={handleGenerateKeys}
              className="px-4 py-2 text-white rounded focus:outline-none"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#C4A484";
                e.target.style.transition = "background-color 0.3s ease";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#512615";
                e.target.style.transition = "background-color 0.3s ease";
              }}
              style={{
                backgroundColor: "#512615",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                border: "none",
                textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
              }}
            >
              Generate New Key
            </button>
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
            <div className="shadow mx-auto overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 table-auto customers-table">
                <thead className="table-header">
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
                      Special Key
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 sort-table dark:text-textTitle dark:bg-container">
                  {sortedFilteredKeys.map((key, index) => (
                    <tr key={key.id}>
                      <td className="poppins-font">{index + 1}</td>
                      <td className="poppins-font">{key.special_key}</td>
                      <td className="poppins-font">
                        {new Date(key.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteKeys(key.id)}
                          className="delete-button"
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
    </>
  );
};

export default GenerateKeys;
