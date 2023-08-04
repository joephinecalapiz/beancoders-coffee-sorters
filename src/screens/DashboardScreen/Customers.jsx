/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import api_endpoint from "../../config";

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);

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
      const response = fetch(api_endpoint + "/add/customer", {
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

  const handleSeeMore = (customerName) => {
    // For demonstration purposes, we'll display an alert with the customer's name as the history
    alert(
      `History for ${customerName}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    );
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="m-auto p-4 sm:ml-32">
        {/* Move "Customers" text to the top */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginTop: "60px",
          }}
          className="text-black mt-43 mb-5"
        >
          Customers
        </h1>

        {/* Add margin below the search bar and align the "Add New" button */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <button
              onClick={openModal}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none mr-2"
            >
              Add New
            </button>
            <input
              type="text"
              placeholder="Search Customers"
              className="flex-grow px-4 py-2 border rounded focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.phoneNum}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSeeMore(customer.customerName)}
                        className="text-blue-600 hover:text-blue-800 underline focus:outline-none"
                      >
                        See More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <h2 className="text-2xl font-semibold mb-4">Add New Customer</h2>
            <form onSubmit={handleAddNewCustomer}>
              <div className="mb-4">
                <label htmlFor="newCustomerName" className="block font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="newCustomerName"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newCustomerPhoneNumber"
                  className="block font-medium"
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="newCustomerPhoneNumber"
                  value={newCustomerPhoneNumber}
                  onChange={(e) => setNewCustomerPhoneNumber(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="newCustomerAddress"
                  className="block font-medium"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="newCustomerAddress"
                  value={newCustomerAddress}
                  onChange={(e) => setNewCustomerAddress(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
              >
                Create Customer
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
