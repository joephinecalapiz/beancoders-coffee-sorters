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

const Feedbacks = () => {
  const [navVisible, showNavbar] = useState(false);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  const axiosInstance = AxiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
  }); // Example: 5 requests per second

  const [allUsers, setAllFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newSorterPhoneNumber, setNewSorterPhoneNumber] = useState("");
  const [newSorterAddress, setNewSorterAddress] = useState("");
  const [newSorterDateHired, setNewSorterDateHired] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const toggleDropdown = (sorted) => {
    if (openDropdownId === sorted) {
      // If the clicked dropdown is already open, close it
      setOpenDropdownId(null);
    } else {
      // Close the previously open dropdown (if any)
      setOpenDropdownId(sorted);
    }
  };

  useEffect(() => {
    document.title = "Feedbacks";

    fetchFeedbacks();
  }, []); // Empty dependency array, so this effect runs only once

  const filteredSorters = allUsers.filter((feedbacks) =>
    feedbacks.full_name.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedFilteredSorters = filteredSorters.sort((a, b) => a.id - b.id);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const response = await axiosInstance.get(
        api_endpoint + "/fetch-feedback/" + user_id
      );

      const data = response.data.data;
      setAllFeedbacks(data);
      sessionStorage.setItem("feedbackData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

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

  const setToPending = async (statusId) => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const response = await fetch(
        api_endpoint + "/update-feedback/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: "Pending",
          }),
        }
      );
      if (response.status === 422) {
        alert("Status is already updated in the database");
      }
      if (!response.ok) {
        throw new Error("Fail to update the status");
      }
      if (response.status === 200) {
        fetchFeedbacks();
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  const setToFinished = async (statusId) => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const response = await fetch(
        api_endpoint + "/update-feedback/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: "Solved",
          }),
        }
      );
      if (response.status === 422) {
        alert("Status is already updated in the database");
      }
      if (!response.ok) {
        throw new Error("Fail to update the status");
      }
      if (response.status === 200) {
        fetchFeedbacks();
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  // const setToCancelled = async (statusId) => {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let user_id = localStorage.getItem("user_id");

  //     const response = await fetch(
  //       api_endpoint + "/update-feedback/" + statusId,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //         body: JSON.stringify({
  //           status: "Cancelled",
  //         }),
  //       }
  //     );
  //     if (response.status === 422) {
  //       alert("Status is already updated in the database");
  //     }
  //     if (!response.ok) {
  //       throw new Error("Fail to update the status");
  //     }
  //     if (response.status === 200) {
  //       fetchFeedbacks();
  //       setOpenDropdownId(null);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setOpenDropdownId(null);
  // };

  useEffect(() => {
    const cachedCustomerData = sessionStorage.getItem("feedbackData");
    if (cachedCustomerData) {
      setAllFeedbacks(JSON.parse(cachedCustomerData));
    }
  }, []);

  const totalUsers = allUsers.length;

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pt-0.5 mb-16 ">
          <h1 className="text-black poppins-font font-bold bg-white dark:text-textTitle dark:bg-container mt-5 text-base p-3 rounded-lg shadow-xl">
            Feedbacks
          </h1>
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
            <div className="max-h-[460px] overflow-y-auto">
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
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 sort-table dark:text-textTitle dark:bg-container">
                  {sortedFilteredSorters.map((feedback, index) => (
                    <tr key={feedback.id}>
                      <td className="poppins-font">{index + 1}</td>
                      <td className="poppins-font">{feedback.full_name}</td>
                      <td className="poppins-font">
                        {feedback.coffee_bean_ai_sorter && feedback.website
                          ? 'Coffee Bean Sorter and Website'
                          : feedback.coffee_bean_ai_sorter
                            ? 'Coffee Bean'
                            : feedback.website
                              ? 'Website'
                              : 'None'}
                      </td>
                      <td className="poppins-font">{feedback.message}</td>
                      <td className="poppins-font">
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </td>
                      <td className="poppins-font">
                        <button
                          onClick={() => toggleDropdown(feedback.id)}
                          className="inline-flex items-center p-2 text-base font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          {feedback.status === 'Solved' ? feedback.status : ''}
                        </button>
                        {openDropdownId === feedback.id && (
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
                                  onClick={() => setToPending(feedback.id)}
                                  className={`block px-4 py-2 mx-auto w-full ${
                                    feedback.status === "Pending"
                                    ? "bg-brown hover:bg-gray-100 text-white"
                                    : ""
                                } dark:hover:bg-lightBrown dark:hover:text-black text-black`}
                                >
                                  Pending
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => setToFinished(feedback.id)}
                                  className={`block px-4 py-2 mx-auto w-full ${
                                    feedback.status === "Finished"
                                    ? "bg-brown hover:bg-gray-100 text-white"
                                    : ""
                                } dark:hover:bg-lightBrown dark:hover:text-black text-black`}
                                >
                                  Solved
                                </button>
                              </li>
                              {/* <li>
                                <button
                                  onClick={() => setToCancelled(feedback.id)}
                                  className={`block px-4 py-2 mx-auto w-full ${
                                    feedback.status === "Cancelled"
                                      ? "bg-brown hover:bg-gray-100 text-white"
                                      : ""
                                  } dark:hover:bg-gray-600 dark:hover:text-white`}
                                >
                                  Cancelled
                                </button>
                              </li> */}
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

export default Feedbacks;
