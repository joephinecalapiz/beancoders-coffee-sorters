/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../component/Modal"; // Import the Modal component
import axios from "axios";
import api_endpoint from "../../config";

const Status = () => {
  const [navVisible, showNavbar] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomer] = useState([]);
  const [sorters, setSorter] = useState([]);
  const [status, setAllStatus] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (sorted) => {
    if (openDropdownId === sorted) {
      // If the clicked dropdown is already open, close it
      setOpenDropdownId(null);
    } else {
      // Close the previously open dropdown (if any)
      setOpenDropdownId(sorted);
    }
  };

  const handleSearchInputChange = (e) => {
    console.log("Search input changed:", e.target.value);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    axios
      .get(`${api_endpoint}/fetch-status/${user_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const fetchAllStatus = response.data.status;
        sessionStorage.setItem("statusData", JSON.stringify(fetchAllStatus));
        setAllStatus(fetchAllStatus);
      })
      .catch((error) => {
        console.error();
      });
  }, [status]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    axios
      .get(`${api_endpoint}/customers/${user_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const fetchCustomerData = response.data.customer;
        sessionStorage.setItem(
          "customerData",
          JSON.stringify(fetchCustomerData)
        );
        setCustomer(fetchCustomerData);
      });
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    axios
      .get(`${api_endpoint}/sorters/${user_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const fetchSorterData = response.data.sorters;
        sessionStorage.setItem("sorterData", JSON.stringify(fetchSorterData));
        setSorter(fetchSorterData);
      });
  }, []);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    document.title = "Status";
  }, []);

  useEffect(() => {
    const cachedCustomerData = sessionStorage.getItem("customerData");
    if (cachedCustomerData) {
      setCustomer(JSON.parse(cachedCustomerData));
    }
    const cachedSorterData = sessionStorage.getItem("sorterData");
    if (cachedSorterData) {
      setSorter(JSON.parse(cachedSorterData));
    }
    const cachedStatusData = sessionStorage.getItem("statusData");
    if (cachedStatusData) {
      setAllStatus(JSON.parse(cachedStatusData));
    }
  }, []);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerKiloOfBeans, setKiloOfBeans] = useState("");

  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSorterChange = (e) => {
    setNewSorterName(e.target.value);
  };

  const handleCustomerChange = (e) => {
    setNewCustomerName(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const postData = {
      user_id: user_id,
      customerName: newCustomerName,
      sorterName: newSorterName,
      kiloOfBeans: newCustomerKiloOfBeans,
      status: newStatus,
    };

    axios
      .post(api_endpoint + "/add-status", postData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          closeModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    // Close the modal when the "Cancel" button is clicked
    closeModal();
  };

  const setToOngoing = async (statusId) => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const response = await fetch(
        api_endpoint + "/update-status/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: "Ongoing",
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
        const fetchAllStatus = response.data.status;
        sessionStorage.setItem("statusData", JSON.stringify(fetchAllStatus));
        setAllStatus(fetchAllStatus);
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
        api_endpoint + "/update-status/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: "Finished",
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
        const fetchAllStatus = response.data.status;
        sessionStorage.setItem("statusData", JSON.stringify(fetchAllStatus));
        setAllStatus(fetchAllStatus);
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  const setToCancelled = async (statusId) => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      const response = await fetch(
        api_endpoint + "/update-status/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: "Cancelled",
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
        const fetchAllStatus = response.data.status;
        sessionStorage.setItem("statusData", JSON.stringify(fetchAllStatus));
        setAllStatus(fetchAllStatus);
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pb-5 pt-0.5">
          <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
            Status
          </h1>
        </div>
      </div>

      <div className="search-and-button mt-16">
        <div className="p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search Sorters"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-4 py-2 poppins-font dark:text-textTitle dark:bg-container border rounded focus:outline-none search-bar"
            style={{ width: "80%", maxWidth: "850px" }}
          />

          {/* Add New button */}
          <button
            onClick={openModal}
            className="px-4 py-2 poppins-font font-semibold text-white rounded bg-[#512615] text-shadow shadow-md border-none text-shadow focus:outline-none "
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#C4A484";
              e.target.style.transition = "background-color 0.3s ease";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#512615";
              e.target.style.transition = "background-color 0.3s ease";
            }}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="md:pl-5 md:pr-5 pr-2 pl-2">
        <div
          className="md:p-5 pt-10"
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-20px",
          }}
        >
          <div className="shadow mx-auto overflow-hidden overflow-x-auto order-b border-gray-200 sm:rounded-lg">
            <div className="max-h-[470px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 customers-table table-auto">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Customer's Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Sorter's Name
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
                      receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="custom-table bg-white dark:text-textTitle dark:bg-container divide-y divide-gray-200">
                  {status
                    .filter((sorted) =>
                      sorted.customerName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((sorted) => (
                      <tr key={sorted.id}>
                        <td className="poppins-font">
                          {new Date(sorted.created_at).toLocaleDateString()}
                        </td>

                        <td className="poppins-font">{sorted.customerName}</td>
                        <td className="poppins-font">{sorted.sorterName}</td>
                        <td className="poppins-font">
                          <button
                            onClick={() => toggleDropdown(sorted.id)}
                            className="inline-flex items-center p-2 text-base font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            {sorted.status}
                          </button>
                          {openDropdownId === sorted.id && (
                            <div
                              id="dropdownDotsHorizontal"
                              className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg shadow bg-white dark:divide-gray-600 mr-5"
                              style={{ top: "50", left: "50" }}
                            >
                              <ul
                                className="py-2 text-base poppins-font text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton"
                              >
                                <li>
                                  <button
                                    onClick={() => setToOngoing(sorted.id)}
                                    className={`block px-4 py-2 mx-auto w-full ${
                                      sorted.status === "Ongoing"
                                        ? "bg-brown hover:bg-gray-100 text-white"
                                        : ""
                                    } dark:hover:bg-lightBrown dark:hover:text-white`}
                                  >
                                    Ongoing
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => setToFinished(sorted.id)}
                                    className={`block px-4 py-2 mx-auto w-full ${
                                      sorted.status === "Finished"
                                        ? "bg-brown hover:bg-gray-100  text-white"
                                        : ""
                                    } dark:hover:bg-lightBrown dark:hover:text-white`}
                                  >
                                    Finished
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => setToCancelled(sorted.id)}
                                    className={`block px-4 py-2 mx-auto w-full ${
                                      sorted.status === "Cancelled"
                                        ? "bg-brown hover:bg-gray-100 text-white"
                                        : ""
                                    } dark:hover:bg-lightBrown dark:hover:text-white`}
                                  >
                                    Cancelled
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                        <td className="poppins-font">
                          <button
                            onClick={() => {
                              navigate(`/status/receipt/${sorted.id}`);
                            }}
                            className="see-more-button focus:outline-none"
                          >
                            Receipt
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 text-center poppins-font text-black dark:text-textTitle">
          Status
        </h2>
        {/* Add your form or content for adding a new customer */}
        <form onSubmit={handleAddNew}>
          {/* CUSTOMER'S NAME */}
          <div className="mb-4">
            <label
              htmlFor="newCustomer"
              className="block font-medium poppins-font"
            >
              Customer's Name
            </label>
            <select
              id="newCustomer"
              value={newCustomerName}
              onChange={handleCustomerChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            >
              <option value=" ">Select Customers</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.customerName}>
                  {customer.customerName}
                </option>
              ))}
            </select>
          </div>
          {/* SORTERS NAME */}
          <div className="mb-4">
            <label
              htmlFor="newSorter"
              className="block font-medium poppins-font"
            >
              Sorter's Name
            </label>
            <select
              id="newSorter"
              value={newSorterName}
              onChange={handleSorterChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            >
              <option value=" ">Select Sorter</option>
              {sorters.map((sorter) => (
                <option key={sorter.id} value={sorter.sorterName}>
                  {sorter.sorterName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="kiloOfBeans"
              className="block font-medium poppins-font"
            >
              Kilo of Beans
            </label>
            <input
              type="text"
              id="newCustomerKiloOfBeans"
              value={newCustomerKiloOfBeans}
              onChange={(e) => setKiloOfBeans(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            />
          </div>
          {/* STATUS   */}
          <div className="mb-4">
            <label
              htmlFor="newStatus"
              className="block font-medium poppins-font"
            >
              Status
            </label>
            <select
              id="newStatus"
              value={newStatus}
              onChange={handleStatusChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            >
              <option value=" "> </option>
              <option value="Finished">Finished</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Add Sorting
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className=" hover:bg-red-700 text-black hover:text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Status;
