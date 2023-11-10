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
import AdminSidebar from "../component/AdminSidebar";
import Topbar from "../component/AdminTopbar";

const ManageUsers = () => {
  const [navVisible, showNavbar] = useState(false);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const axiosInstance = AxiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
  }); // Example: 5 requests per second

  const [allUsers, setAllSorters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newSorterPhoneNumber, setNewSorterPhoneNumber] = useState("");
  const [newSorterAddress, setNewSorterAddress] = useState("");
  const [newSorterDateHired, setNewSorterDateHired] = useState("");
  const [searchText, setSearchText] = useState("");
  const filteredSorters = allUsers.filter((users) =>
    users.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedFilteredSorters = filteredSorters.sort((a, b) => a.id - b.id);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // Add code to get the user_id from local storage
  const user_id = localStorage.getItem("id");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Manage Users";

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const headers = {
      Authorization: "Bearer " + token,
    };
    axiosInstance
      .get(api_endpoint + "/allusers/", { headers })
      .then((response) => {
        const data = response.data;
        setAllSorters(data.user);
      });
    
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

  // const handleAddNewSorter = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   const user_id = localStorage.getItem("user_id");
  //   try {
  //     const response = await axiosInstance.post(
  //       api_endpoint + "/add/sorter",
  //       {
  //         user_id: user_id,
  //         sorterName: newSorterName,
  //         phoneNum: newSorterPhoneNumber,
  //         address: newSorterAddress,
  //         dateHired: newSorterDateHired,
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(response.status);
  //     console.log(token);
  //     console.log(user_id);
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error adding sorter:", error);
  //     // Handle error scenarios if needed
  //   }
  // };

  const handleCancel = () => {
    closeModal();
  };

 

  const totalUsers = allUsers.length;

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
                Manage Users
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
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search Sorters"
              value={searchText}
              onChange={handleSearchInputChange}
              className="px-4 py-2 dark:text-textTitle dark:bg-container border rounded focus:outline-none search-bar"
              style={{ width: "80%", maxWidth: "800px" }}
            />
            {/* Add New button */}
            {/* <button
              onClick={openModal}
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
              Add New
            </button> */}
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
              <table className="min-w-full divide-y divide-gray-200 table-auto">
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
                      Date Registered
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
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-50 cursor-pointer"
            onClick={closeModal}
          ></div>
          <div className="modal-container bg-white p-10 max-w-sm mx-auto rounded z-50">
            <span
              className="modal-close absolute top-4 right-4 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4 poppins-font">
              Add New Sorter
            </h2>

            <form onSubmit={handleAddNewSorter}>
              <div className="mb-4">
                <label
                  htmlFor="newSorterName"
                  className="block font-medium poppins-font"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="newSorterName"
                  value={newSorterName}
                  onChange={(e) => setNewSorterName(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newSorterPhoneNumber"
                  className="block font-medium poppins-font"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="newSorterPhoneNumber"
                  value={newSorterPhoneNumber}
                  onChange={(e) => setNewSorterPhoneNumber(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newSorterAddress"
                  className="block font-medium poppins-font"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="newSorterAddress"
                  value={newSorterAddress}
                  onChange={(e) => setNewSorterAddress(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newSorterDateHired"
                  className="block font-medium poppins-font"
                >
                  Date Hired:
                </label>
                {/*DatePicker*/}
                <DatePicker
                  id="newSorterDateHired"
                  selected={newSorterDateHired}
                  onChange={(date) => setNewSorterDateHired(date)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
                >
                  Add Sorter
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
