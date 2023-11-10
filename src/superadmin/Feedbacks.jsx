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

  const [allUsers, setAllSorters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newSorterPhoneNumber, setNewSorterPhoneNumber] = useState("");
  const [newSorterAddress, setNewSorterAddress] = useState("");
  const [newSorterDateHired, setNewSorterDateHired] = useState("");

  const [searchText, setSearchText] = useState("");

  const filteredSorters = allUsers.filter((feedbacks) =>
    feedbacks.full_name.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedFilteredSorters = filteredSorters.sort((a, b) => a.id - b.id);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Feedbacks";

    const user_id = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");
    axiosInstance
      .get(api_endpoint + "/fetch-feedback/" + user_id)
      .then((response) => {
        const data = response.data.data;
        setAllSorters(data);
      });
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

  const totalUsers = allUsers.length;

  return (
    <>
      <AdminSidebar
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <Topbar
        onToggleSidebar={toggleSidebar}
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <div className={`mx-auto ${navVisible ? "" : ""}`}>
        <div className="header">
          <div className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}>
            <div className="p-0.5 mb-2 w-full mt-6 relative">
              <h1 className="text-black bg-white poppins-font dark:text-textTitle dark:bg-container mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                Feedbacks
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
        <div className="px-4">
          <div
            className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
            style={{
              transition: "margin-left 0.3s ease",
              marginTop: "-20px",
            }}
          >
            <div className="shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
              <div className="max-h-[480px] overflow-y-auto">
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
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 sort-table dark:text-textTitle dark:bg-container">
                    {sortedFilteredSorters.map((feedback, index) => (
                      <tr key={feedback.id}>
                        <td className="poppins-font">{index + 1}</td>
                        <td className="poppins-font">{feedback.full_name}</td>
                        <td className="poppins-font">{feedback.message}</td>
                        <td className="poppins-font">
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </td>
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

export default Feedbacks;
