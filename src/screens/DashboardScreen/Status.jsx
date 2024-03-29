/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal"; // Import the Modal component
import axios from "axios";
import api_endpoint from "../../config";
import { useDispatch, useSelector } from 'react-redux'
import { addStatusInfo, fetchStatusInfo } from "../../../redux/services/status/statusAction";
import beanlogo from '../../assets/beanlogo.png';
import rpi_endpoint from "../../rpi-endpoint";

const Status = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const statusInfo = useSelector(state => state.statusInfo.allStatus);
  const [navVisible, showNavbar] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomer] = useState([]);
  const [sorters, setSorter] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerKiloOfBeans, setKiloOfBeans] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { status, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchStatusInfo({ user_id, token }));
  // }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      fetchStatus();
    }

    if (status === 'succeeded') {
      setAllStatus(statusInfo)
      setStatusError(false);
    }

    // Render error state
    if (status === 'failed') {
      setStatusError(true);
    }
  }, []);

  // console.log(statusInfo)

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
    document.title = "Status";
    fetchStatus();
    const cachedStatusData = sessionStorage.getItem("statusData");
    if (cachedStatusData) {
      setAllStatus(JSON.parse(cachedStatusData));
    }
  }, [status]);

  const fetchStatus = async () => {
    dispatch(fetchStatusInfo({ user_id, token }))
      .unwrap()
      .then(() => {
        // console.log(statusInfo)
        setAllStatus(statusInfo)
        setStatusError(false);
      })
      .catch((err) => {
        if (err && err.type === 'http') {
          setStatusError(true);
        }
      })
      .finally(() => {
        // setLoading(false);
        // setAllCustomers(customerInfo)
      });
  };

  useEffect(() => {
    axios
      .get(`${api_endpoint}/customers/${user_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const fetchCustomerData = response.data.customer;
        // sessionStorage.setItem("customerData", JSON.stringify(fetchCustomerData));
        setCustomer(fetchCustomerData);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${api_endpoint}/sorters/${user_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const fetchSorterData = response.data.sorters;
        // sessionStorage.setItem("sorterData", JSON.stringify(fetchSorterData));
        setSorter(fetchSorterData);
      });
  }, []);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  // useEffect(() => {
  //   const cachedCustomerData = sessionStorage.getItem("customerData");
  //   if (cachedCustomerData) {
  //     setCustomer(JSON.parse(cachedCustomerData));
  //   }
  //   const cachedSorterData = sessionStorage.getItem("sorterData");
  //   if (cachedSorterData) {
  //     setSorter(JSON.parse(cachedSorterData));
  //   }
  //   const cachedStatusData = sessionStorage.getItem("statusData");
  //   if (cachedStatusData) {
  //     setAllStatus(JSON.parse(cachedStatusData));
  //   }
  // }, []);

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

  const handleAddNew1 = (event) => {
    event.preventDefault();

    // const token = localStorage.getItem("token");
    // const user_id = localStorage.getItem("user_id");
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
          setAllStatus(statusInfo)
          setStatusError(false);
          closeModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStatus = async (e) => {
    e.preventDefault();
    setLoading(true);

    const statusData = {
      user_id: user_id,
      customerName: newCustomerName,
      sorterName: newSorterName,
      kiloOfBeans: newCustomerKiloOfBeans,
      status: newStatus,
    };

    // Dispatch the addCustomerInfo thunk
    dispatch(addStatusInfo({ token, statusData }))
      .then((resultAction) => {
        //console.log(statusData)
        // Check if the thunk was fulfilled successfully
        if (addStatusInfo.fulfilled.match(resultAction)) {
          setAllStatus(resultAction.payload)
          closeModal();
        } else {
          // Handle the case where the thunk was rejected or pending
          console.error('Add Status Failed');
        }
      })
      .catch((error) => {
        // Handle errors that occurred during the dispatching of the thunk
        console.error('Error dispatching addStatusInfo:', error);
        if (error && error.type === 'invalid') {
          setAddError(true);
          setLoading(false);
          closeModal();
        }
        setLoading(false);
      });
  };

  const handleCancel = () => {
    // Close the modal when the "Cancel" button is clicked
    closeModal();
  };

  const setToOngoing = async (statusId, customerId) => {
    try {
      // Optimistically update local state
      setAllStatus((prevStatus) => {
        const updatedStatus = prevStatus.map((status) =>
          status.id === statusId ? { ...status, status: "Ongoing" } : status
        );
        sessionStorage.setItem("statusData", JSON.stringify(updatedStatus));
        return updatedStatus;
      });

      const response = await fetch(api_endpoint + "/update-status/" + statusId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: "Ongoing",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the status");
      }

      const fetchAllStatus = await response.json();
      console.log(fetchAllStatus.status);

      // Update local state with the actual server response
      setAllStatus((prevStatus) => {
        const updatedStatus = prevStatus.map((status) =>
          status.id === statusId ? fetchAllStatus.status : status
        );
        sessionStorage.setItem("statusData", JSON.stringify(updatedStatus));
        return updatedStatus;
      });

      const rspns = await fetch(`${rpi_endpoint}/update_json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statusId: statusId,
          customerId: customerId,
          bad: 0
        }),
      });

      console.log(customerId);
      if (rspns.status === 200) {
        console.log(customerId);
        console.log("success");
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };


  const setToFinished = async (statusId, badCount, kiloOfBeans) => {
    const inGrams = kiloOfBeans * 1000;
    const totalGrams = inGrams * 10;
    const totalBadCount = badCount * 1;
    const goodBeanCount = totalGrams - totalBadCount;
    try {
      // update local state
      setAllStatus((prevStatus) => {
        const updatedStatus = prevStatus.map((status) =>
          status.id === statusId ? { ...status, status: "Finished" } : status
        );
        sessionStorage.setItem("statusData", JSON.stringify(updatedStatus));
        return updatedStatus;
      });

      const response = await fetch(
        api_endpoint + "/update-status/" + statusId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            goodCount: goodBeanCount,
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
      // if (response.status === 200) {
      //   // const fetchAllStatus = response.data.status;
      //   // // sessionStorage.setItem("statusData", JSON.stringify(fetchAllStatus));
      //   // setAllStatus(fetchAllStatus);
      //   dispatch(fetchStatusInfo({ user_id, token }));
      //   setAllStatus(statusInfo)
      //   setStatusError(false);
      //   setOpenDropdownId(null);
      // }
      const fetchAllStatus = await response.json();
      console.log(fetchAllStatus.status);

      // Update local state with the actual server response
      setAllStatus((prevStatus) => {
        const updatedStatus = prevStatus.map((status) =>
          status.id === statusId ? fetchAllStatus.status : status
        );
        sessionStorage.setItem("statusData", JSON.stringify(updatedStatus));
        return updatedStatus;
      });
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  const setToCancelled = async (statusId) => {
    try {
      // Optimistically update local state
      setAllStatus((prevStatus) => {
        const updatedStatus = prevStatus.map((status) =>
          status.id === statusId ? { ...status, status: "Cancelled" } : status
        );
        sessionStorage.setItem("statusData", JSON.stringify(updatedStatus));
        return updatedStatus;
      });

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
      // if (response.status === 200) {
      //   const fetchAllStatus = response.data.status;
      //   // sessionStorage.setItem("statusData", JSON.stringify(fetchAllStatus));
      //   setAllStatus(fetchAllStatus);
      //   // dispatch(fetchStatusInfo({ user_id, token }));
      //   // setAllStatus(statusInfo)
      //   setStatusError(false);
      //   setOpenDropdownId(null);
      // }
      const fetchAllStatus = await response.json();
      console.log(fetchAllStatus.status);

      // Update local state with the actual server response
      setAllStatus((prevStatus) => {
        const updatedStatus = prevStatus.map((status) =>
          status.id === statusId ? fetchAllStatus.status : status
        );
        sessionStorage.setItem("statusData", JSON.stringify(updatedStatus));
        return updatedStatus;
      });
    } catch (error) {
      console.error(error);
    }
    setOpenDropdownId(null);
  };

  // Render loading state
  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">
      <img src={beanlogo} alt="Beans Logo" className="w-32 h-32" />
    </div>;
  }

  const filteredStatus = allStatus.filter((status) =>
    status.customerName.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedFilteredStatus = filteredStatus.sort((a, b) => a.id - b.id);
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
            placeholder="Search Customer"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-4 py-2 poppins-font dark:text-textTitle dark:bg-container border rounded focus:outline-none search-bar"
            style={{ width: "80%", maxWidth: "850px" }}
          />

          {/* Add New button */}
          <button
            onClick={openModal}
            className="px-4 py-2 poppins-font font-semibold text-white rounded bg-[#74574D] text-shadow shadow-md border-none text-shadow focus:outline-none "
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#C4A484";
              e.target.style.transition = "background-color 0.3s ease";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#74574D";
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
                      Date
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
                      Bad Beans
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Good Beans
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Total Kilo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="sort-table dark:text-textDesc dark:bg-container divide-y divide-gray-200">
                  {sortedFilteredStatus
                    .filter((sorted) =>
                      sorted.customerName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((sorted, index) => (
                      <tr key={sorted.id} className="hover:bg-lightBrown hover:text-textTitle">
                        <td className="poppins-font">{index + 1}</td>
                        <td className="poppins-font">{sorted.customerName}</td>
                        <td className="poppins-font">{sorted.sorterName}</td>
                        <td className="poppins-font">
                          {new Date(sorted.created_at).toLocaleDateString()}
                        </td>
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
                                <li className="hover:bg-lightBrown hover:text-secondary mx-5 rounded-full">
                                  <button
                                    onClick={() => setToOngoing(sorted.id, sorted.customer_id)}
                                    className={`block px-4 py-2 mx-auto w-full rounded-full ${sorted.status === "Ongoing"
                                      ? "bg-brown hover:bg-gray-100 text-secondary"
                                      : ""
                                      } dark:hover:bg-lightBrown text-primary dark:hover:text-white`}
                                  >
                                    Ongoing
                                  </button>
                                </li>
                                <li className="hover:bg-lightBrown hover:text-secondary mx-5 rounded-full">
                                  <button
                                    onClick={() => setToFinished(sorted.id, sorted.badCount, sorted.kiloOfBeans)}
                                    className={`block px-4 py-2 mx-auto w-full rounded-full ${sorted.status === "Finished"
                                      ? "bg-brown hover:bg-gray-100  text-white"
                                      : ""
                                      } dark:hover:bg-lightBrown text-primary dark:hover:text-white`}
                                  >
                                    Finished
                                  </button>
                                </li>
                                <li className="hover:bg-lightBrown hover:text-secondary mx-5 rounded-full">
                                  <button
                                    onClick={() => setToCancelled(sorted.id)}
                                    className={`block px-4 py-2 mx-auto w-full rounded-full ${sorted.status === "Cancelled"
                                      ? "bg-brown hover:bg-gray-100 text-white"
                                      : ""
                                      } dark:hover:bg-lightBrown text-primary dark:hover:text-white`}
                                  >
                                    Cancelled
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                        <td className="poppins-font">{sorted.badCount} pcs.</td>
                        <td className="poppins-font">{sorted.goodCount} pcs.</td>
                        <td className="poppins-font">{sorted.kiloOfBeans} kg</td>
                        <td className="poppins-font">
                          <button
                            onClick={() => {
                              navigate(`/status/receipt/${sorted.id}`);
                            }}
                            className="text-primary dark:text-secondary underline focus:outline-none"
                          >
                            Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div>
                {statusError && (
                  <p className="items-center justify-center text-center text-primary dark:text-textTitle poppins-font ">No status found. Please add new status!</p>
                )}
                {addError && (
                  <p className="items-center justify-center text-center text-primary dark:text-textTitle">Sorter Already Added. Please try again!</p>
                )}
              </div>
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
        <form onSubmit={addStatus}>
          {/* CUSTOMER'S NAME */}
          <div className="mb-4 dark:text-textTitle">
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
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            >
              <option value="">Select Customers</option>
              {customers.map((customer) => (
                <option className="dark:text-primary" key={customer.id} value={customer.customerName}>
                  {customer.customerName}
                </option>
              ))}
            </select>
          </div>
          {/* SORTERS NAME */}
          <div className="mb-4 dark:text-textTitle">
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
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
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
          <div className="mb-4 dark:text-textTitle">
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
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            />
          </div>
          {/* STATUS   */}
          <div className="mb-4 dark:text-textTitle">
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
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            >
              <option value="">Select Status</option>
              <option value="Finished">Finished</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              {loading ? "Adding..." : "Add Status"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className=" hover:bg-red-700 text-black dark:text-textTitle hover:text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
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
