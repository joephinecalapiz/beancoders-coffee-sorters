/** @format */
import React, { useState, useEffect } from "react";
import api_endpoint from "../../config";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import UpdateCustomer from "../ModalScreen/UpdateCustomer";
import Modal from "../../component/Modal";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerInfo } from "../../../redux/userActions";

const Customers = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const customerInfo = useSelector(state => state.user.customers);
  const [navVisible, showNavbar] = useState(false);
  const navigate = useNavigate(); // Use the hook here
  const [allCustomers, setAllCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState(true); //experimental --erickson
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [newCustomerKiloOfBeans, setKiloOfBeans] = useState("");
  const [reloadCustomerData, setReloadCustomerData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [CustomerError, setCustomerError] = useState(false);
  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomerInfo({ user_id, token }));
  }, [dispatch]);

  // console.log(customerInfo)

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

  useEffect(() => {
    document.title = "Customers";
    // const cachedCustomerData = sessionStorage.getItem("customerData");

    // if (cachedCustomerData) {
    //   setAllCustomers(JSON.parse(cachedCustomerData));
    // }

    if (selectedMonth !== null && selectedYear !== null) {
      fetchCustomers();
    }
  }, [selectedMonth, selectedYear]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${api_endpoint}/customers/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = response.data.customer;
      setAllCustomers(data);
      // sessionStorage.setItem("customerData", JSON.stringify(data.customer));
      setCustomerError(false)
    } catch (error) {
      if (error.response && error.response.data.customer === 'Customer Not Found') {
        setCustomerError(true);
        // console.error("Error fetching customer data:", error);
      }
    }
  };

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCustomerName("");
    setNewCustomerPhoneNumber("");
    setNewCustomerAddress("");
    setKiloOfBeans("");
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setNewCustomerName("");
    setNewCustomerPhoneNumber("");
    setNewCustomerAddress("");
    setKiloOfBeans("");
  };

  const getCustomerPostHistory = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString();

      // Get the selected year and month from the state
      const selectedYearValue = selectedYear;
      const selectedMonthValue = selectedMonth ? selectedMonth.value : null;

      const response = await fetch(api_endpoint + "/add-customer/" + user_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          user_id: user_id,
          customerName: newCustomerName,
          phoneNum: newCustomerPhoneNumber,
          address: newCustomerAddress,
          //kiloOfBeans: newCustomerKiloOfBeans,
          registrationDate: currentDate,
        }),
      });
      if (response.status === 422) {
        alert("Customer is already in the database");
      }
      if (!response.ok) {
        throw new Error("Fail to add customer");
      }
      if (response.status === 200) {
        // const newCustomer = await response.json();
        setIsFetching(true);
        // setAllCustomers((prevCustomers) => {
        //   // Update state with the new customer data
        //   const updatedCustomers = [...prevCustomers, newCustomer.customer];
        //   // Update session storage with the updated data
        //   // sessionStorage.setItem(
        //   //   "customerData",
        //   //   JSON.stringify(updatedCustomers)
        //   // );
        //   return updatedCustomers;
        // });
        fetchCustomers();
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const updateCustomerDetails = async (id) => {
    try {
      const currentDate = new Date().toISOString();

      const response = await fetch(api_endpoint + "/edit-customer/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          customerName: newCustomerName,
          phoneNum: newCustomerPhoneNumber,
          address: newCustomerAddress,
          registrationDate: currentDate,
        }),
      });
      if (response.status === 422) {
        alert("Customer is already in the database");
      }

      if (response.status === 200) {
        // Update the customer data in both state and session storage
        setAllCustomers((prevCustomers) => {
          const updatedCustomers = prevCustomers.map((customer) => {
            if (customer.id === id) {
              // Update the customer details
              return {
                ...customer,
                customerName: newCustomerName,
                phoneNum: newCustomerPhoneNumber,
                address: newCustomerAddress,
              };
            }
            return customer;
          });
          // Update session storage with the updated data
          // sessionStorage.setItem(
          //   "customerData",
          //   JSON.stringify(updatedCustomers)
          // );
          return updatedCustomers;
        });
      }
    } catch (error) {
      console.error(error);
    }
    closeUpdateModal();
  };

  const archivedCustomer = async (id) => {
    try {
      const response = await fetch(api_endpoint + `/archive-customer/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 422) {
        alert("Customer is already archive in the database");
      }

      if (!response.ok) {
        throw new Error("Failed to archive customer");
      }

      if (response.status === 200) {
        fetchCustomers();
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pb-5 pt-0.5">
          <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
            Customers
          </h1>
        </div>
      </div>
      <div className="search-and-button mt-16">
        <div className="dark:text-textTitle p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
          <div className="poppins-font font-bold">Total: {totalCustomers}</div>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search Customers"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-4 py-2 poppins-font  border rounded focus:outline-none search-bar dark:text-textTitle dark:bg-container"
            style={{ width: "80%", maxWidth: "800px" }}
          />
          {/* Add New button */}
          <button
            onClick={openModal}
            className="px-4 py-2 poppins-font font-medium text-white rounded focus:outline-none"
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
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
              border: "none",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
            }}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="calendar">
        <div className="p-5">
          <div className="flex md:grid grid-rows-1 gap-2 md:grid-cols-2 md:grid-rows-1">
            <div className="relative  dark:text-textTitle mobile:justify-self-center z-10 md:mb-0 flex items-center justify-end">
              <label htmlFor="monthSelect" className="poppins-font font-bold">
                Month:
              </label>
              <div className="ml-2 poppins-font font-seminold">
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
                className="font-bold md:ml-2 ml-6 "
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Year:
              </label>
              <div className="ml-2 poppins-font font-bold">
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
            <div className="max-h-[350px] overflow-y-auto">
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
                      Date Added
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
                    (customer, index) => (
                      <tr key={customer.id}>
                        <td className="poppins-font">{index + 1}</td>
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
                                    onClick={() => {
                                      // Navigate to the desired page
                                      navigate(
                                        `/customers/customerstatus/${customer.customerName}/${customer.id}`
                                      );
                                    }}
                                    className="poppins-font flex items-center justify-center px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <span className="history pr-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" /></svg>
                                    </span>
                                    History
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() =>
                                      handleShowUpdateModal(customer)
                                    }
                                    className="poppins-font flex items-center justify-center px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <span className="edit pr-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                    </span>
                                    Update
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() =>
                                      archivedCustomer(customer.id)
                                    }
                                    className="poppins-font flex items-center justify-center px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    <span className="archive pr-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24"
                                      >
                                        <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z" />
                                      </svg>
                                    </span>
                                    Archive
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                          {/* <button
                          onClick={() => handleSeeMore(customer.customerName)}
                          className="see-more-button focus:outline-none"
                        >
                          Receipt
                        </button> */}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <div>
              {CustomerError && (
                    <p className="items-center justify-center text-center text-primary dark:text-textTitle">No Customer found. Please add new customer!</p>
                  )}
              </div>
            </div>
            {selectedCustomer && (
              <UpdateCustomer
                show={showUpdateModal}
                onClose={handleCloseUpdateModal}
                customer={selectedCustomer}
                update={fetchCustomers}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 text-center poppins-font text-black dark:text-textTitle">
          Customer
        </h2>
        {/* form for adding a new customer */}
        <form onSubmit={getCustomerPostHistory}>
          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newCustomerName"
              className="block font-medium poppins-font"
            >
              Name
            </label>
            <input
              type="text"
              id="newCustomerName"
              value={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            />
          </div>

          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newCustomerPhoneNumber"
              className="block font-medium poppins-font"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="newCustomerPhoneNumber"
              value={newCustomerPhoneNumber}
              onChange={(e) => setNewCustomerPhoneNumber(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            />
          </div>

          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newCustomerAddress"
              className="block font-medium poppins-font"
            >
              Address
            </label>
            <textarea
              id="newCustomerAddress"
              value={newCustomerAddress}
              onChange={(e) => setNewCustomerAddress(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              rows={4}
              style={{ height: "70px", wordWrap: "break-word" }}
              required
            />
          </div>

          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Add Customer
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className=" hover:bg-red-700 dark:text-textTitle hover:text-white text-black font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Customers;
