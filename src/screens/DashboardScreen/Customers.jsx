/** @format */
import React, { useState, useEffect } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import api_endpoint from "../../config";
import "../.././css/customer.css";
import "../.././css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Customers = () => {
  const [navVisible, showNavbar] = useState(false);
  const navigate = useNavigate(); // Use the hook here

  const handleSeeMore = (customerId) => {
    navigate(`/receipt/${customerId}`); // Use the navigate function directly
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    document.title = "Customers";
    // Fetch customers after selectedMonth and selectedYear are set
    if (selectedMonth !== null && selectedYear !== null) {
      fetchCustomers();
    }
  }, [selectedMonth, selectedYear]);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (e) => {
    console.log("Search input changed:", e.target.value);
    setSearchText(e.target.value);
  };

  const filteredCustomers = allCustomers.filter((customer) => {
    if (!selectedMonth && !selectedYear && !searchText) {
      return true; // Include all customers if no month, year, or search text is selected
    }

    const registrationDate = new Date(customer.created_at);
    const matchesSearchText = customer.customerName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return (
      (!selectedMonth ||
        registrationDate.getMonth() + 1 === selectedMonth.value) &&
      (!selectedYear || registrationDate.getFullYear() === selectedYear) &&
      matchesSearchText
    );
  });

  const sortedFilteredCustomers = filteredCustomers.sort((a, b) => b.id - a.id);

  const totalCustomers = allCustomers.length;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCustomerName("");
    setNewCustomerPhoneNumber("");
    setNewCustomerAddress("");
  };

  const handleAddNewCustomer = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const currentDate = new Date().toISOString();

      // Get the selected year and month from the state
      const selectedYearValue = selectedYear;
      const selectedMonthValue = selectedMonth.value;

      const response = await fetch(api_endpoint + "/add/customer", {
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
          registrationDate: currentDate,
          year: selectedYearValue, // Use the selected year
          month: selectedMonthValue, // Use the selected month value
        }),
      });
      if (!response.ok) {
        throw new Error("Fail to add customer");
      }
      const newCustomer = await response.json();
      setAllCustomers([...allCustomers, newCustomer]);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

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

  console.log(sortedFilteredCustomers);

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}>
        <div className="header">
          <div className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}>
            <div className="flex items-center">
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                }}
                className="text-black mt-16 mb-3"
              >
                Customers
              </h1>
            </div>
            <br />
            <br />
          </div>
        </div>

        <div className="search-and-button">
          <div
            className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "margin-left 0.3s ease",
              marginTop: "-80px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* select month */}
            <div
              className="flex mb-15 ml-6"
              style={{
                position: "relative", // Add relative positioning to the container
                zIndex: 2, // Higher z-index value to appear above the table
              }}
            >
              <label
                htmlFor="monthSelect"
                className="mr-2 bold"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Month:
              </label>
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
                  }),
                }}
              />
              <label
                htmlFor="yearSelect"
                className="mr-2 bold ml-4"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Year:
              </label>
              <input
                type="number"
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border rounded px-3 py-2 w-20 focus:outline-none focus:border-blue-400 poppins-font"
                required
              />
            </div>
            Total: {totalCustomers}
            <input
              type="text"
              placeholder="Search Customers"
              value={searchText}
              onChange={(e) => {
                console.log("Search input value:", e.target.value);
                handleSearchInputChange(e);
              }}
              className="px-4 py-2 border rounded focus:outline-none search-bar"
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

        <div className="table-container">
          <div
            className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
            style={{
              transition: "margin-left 0.3s ease",
              marginTop: "-20px",
            }}
          >
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 customers-table">
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
                      Date
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
                      Kilo beans
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      History
                    </th>
                  </tr>
                </thead>
                <tbody className="custom-table">
                  {sortedFilteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="poppins-font">{customer.id}</td>
                      <td className="poppins-font">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </td>
                      <td className="poppins-font">{customer.customerName}</td>
                      <td className="poppins-font">{customer.phoneNum}</td>
                      <td className="poppins-font">{customer.address}</td>
                      <td className="poppins-font">2 kilo</td>
                      <td className="poppins-font">
                        <button
                          onClick={() => handleSeeMore(customer.customerName)}
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal-overlay fixed inset-0 bg-black opacity-50 cursor-pointer"
            onClick={closeModal}
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
            <form onSubmit={handleAddNewCustomer}>
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
              <div className="mb-4">
                <label
                  htmlFor="kiloOfBeans"
                  className="block font-medium poppins-font"
                >
                  Kilo of Beans:
                </label>
                <input
                  type="number"
                  id="kiloOfBeans"
                  // value={kiloOfBeans}
                  // onChange={(e) => setKiloOfBeans(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div>

              <div class="flex justify-between">
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
