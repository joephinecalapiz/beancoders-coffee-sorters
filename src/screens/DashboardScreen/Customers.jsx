/** @format */
import React, { useState, useEffect } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import api_endpoint from "../../config";
import "../.././css/customer.css";
import "../.././css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import UpdateCustomer from "../ModalScreen/UpdateCustomer";

const Customers = () => {
  const [navVisible, showNavbar] = useState(false);
  const navigate = useNavigate(); // Use the hook here
  const [allCustomers, setAllCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
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
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [newCustomerKiloOfBeans, setKiloOfBeans] = useState("");
  const [reloadCustomerData, setReloadCustomerData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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
      // const cachedCustomerData = localStorage.getItem("customerData");
      // if (cachedCustomerData) {
      //   setAllCustomers(JSON.parse(cachedCustomerData));
      // }

      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + "/customers/" + user_id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }

      const data = await response.json();
      setAllCustomers(data.customer);
      //localStorage.setItem("customerData", JSON.stringify(data.customer));
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    document.title = "Customers";
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

  const archivedCustomer = async (id) => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const currentDate = new Date().toISOString();

      const response = await fetch(api_endpoint + "/archive-customer/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          user_id: user_id,
          customerName: newCustomerName,
          phoneNum: newCustomerPhoneNumber,
          address: newCustomerAddress,
          registrationDate: currentDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Fail to archive customer");
      }
      if (response.status === 200) {
        // const newCustomer = await response.json();
        // setAllCustomers([...allCustomers, newCustomer.customer]);
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomerPostHistory = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
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
          // year: selectedYearValue, // Use the selected year
          // month: selectedMonthValue, // Use the selected month value
        }),
      });
      if (response.status === 422) {
        alert("Customer is already in the database");
      }
      if (!response.ok) {
        throw new Error("Fail to add customer");
      }
      if (response.status === 200) {
        const newCustomer = await response.json();
        setAllCustomers([...allCustomers, newCustomer.customer]);
        //localStorage.setItem('customerData', JSON.stringify(data.customer));
        closeModal();
        //navigate(".");
      }
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  //console.log(sortedFilteredCustomers); //too many requests

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
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
                Customers
              </h1>
            </div>

            <div className="flex items-center"></div>
            <br />
            <br />
          </div>
        </div>
        <div className="search-and-button">
          <div
            className={`dark:text-textTitle p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins 
            ${navVisible ? "px-10" : "sm:ml-44"}`}
          >
            {/* Total number of customer */}
            Total: {totalCustomers}
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search Customers"
              value={searchText}
              onChange={handleSearchInputChange}
              className="px-4 py-2 border rounded focus:outline-none search-bar dark:text-textTitle dark:bg-container"
            />
            {/* Add New button */}
            <button
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
            </button>
          </div>
        </div>
        <div className="calendar">
          <div className={`p-5 ${navVisible ? "px-10" : "sm:ml-44"}`}>
            <div className="grid grid-rows-1 gap-3 md:grid-cols-2 md:grid-rows-1">
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
                        color: "#000"
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
              <div className="mb-5 dark:text-textTitle  md:mb-0 mobile:justify-self-center  flex items-center">
                <label
                  htmlFor="yearSelect"
                  className="font-bold"
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

        <div className="px-4">
          <div
            className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
            style={{
              transition: "margin-left 0.3s ease",
              marginTop: "-20px",
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
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Kilo beans
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:text-textTitle dark:bg-container custom-table">
                  {(reloadCustomerData || sortedFilteredCustomers).map((customer) => (
                    <tr key={customer.id}>
                      <td className="poppins-font">{customer.id}</td>
                      <td className="poppins-font">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </td>
                      <td className="poppins-font">{customer.customerName}</td>
                      <td className="poppins-font">{customer.phoneNum}</td>
                      <td className="poppins-font">{customer.address}</td>
                      {/* <td className="poppins-font">{customer.kiloOfBeans}</td> */}
                      <td className="poppins-font">
                        {/* <button
                          onClick={() => {
                            sessionStorage.setItem("customerId", customer.id);
                            navigate(
                              `/customers/customerstatus/${customer.customerName}`
                            );
                          }}
                          className="see-more-button focus:outline-none"
                        >
                          See More...
                        </button> */}
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
                            <path
                              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                            />
                          </svg>
                        </button>
                        {openDropdownId === customer.id && (
                          <div
                            id="dropdownDotsHorizontal"
                            className="absolute z-10 mt-2 w-56 origin-top-right z-10 divide-y divide-gray-100 rounded-lg shadow w-44 bg-white dark:bg-dark dark:divide-gray-600 mr-5"
                            style={{ top: '100', right: '0' }}
                          >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                              <li>
                                <button
                                  onClick={() => {
                                    // Navigate to the desired page
                                    navigate(`/customers/customerstatus/${customer.customerName}/${customer.id}`);
                                  }}
                                  className="block px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  History
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleShowUpdateModal(customer)}
                                  className="block px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Update
                                </button>
                              </li>
                              {/* <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Archived</a>
                              </li> */}
                            </ul>
                            <div className="py-2">
                            <button
                                  onClick={() => archivedCustomer(customer.id)}
                                  className="block px-4 py-2 mx-auto hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Archived
                                </button>
                            </div>
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
                  ))}
                </tbody>
              </table>
              {selectedCustomer && (
                <UpdateCustomer
                  show={showUpdateModal}
                  onClose={handleCloseUpdateModal}
                  customer={selectedCustomer}
                />
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-50 cursor-pointer"
            onClick={openModal}
          ></div>
          <div className="modal-container bg-white p-8 max-w-sm mx-auto rounded z-50">
            <span
              className="modal-close absolute top-4 right-4 text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4 poppins-font">
              Add New Customer
            </h2>
            <form onSubmit={getCustomerPostHistory}>
              <div className="mb-4">
                <label
                  htmlFor="newCustomerName"
                  className="block font-medium poppins-font"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="newCustomerName"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newCustomerPhoneNumber"
                  className="block font-medium poppins-font"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="newCustomerPhoneNumber"
                  value={newCustomerPhoneNumber}
                  onChange={(e) => setNewCustomerPhoneNumber(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newCustomerAddress"
                  className="block font-medium poppins-font"
                >
                  Address:
                </label>
                <textarea
                  id="newCustomerAddress"
                  value={newCustomerAddress}
                  onChange={(e) => setNewCustomerAddress(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  rows={4}
                  style={{ height: "70px", wordWrap: "break-word" }}
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label
                  htmlFor="kiloOfBeans"
                  className="block font-medium poppins-font"
                >
                  Kilo of Beans:
                </label>
                <input
                  type="text"
                  id="newCustomerKiloOfBeans"
                  value={newCustomerKiloOfBeans}
                  onChange={(e) => setKiloOfBeans(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div> */}

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
                >
                  Add Customer
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

export default Customers;
