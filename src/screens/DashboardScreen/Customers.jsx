import React, { useState } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const Customers = () => {
  const [navVisible, showNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCustomerName("");
    setNewCustomerPhoneNumber("");
    setNewCustomerAddress("");
  };

  const handleAddNewCustomer = (e) => {
    e.preventDefault();
    console.log("New customer details:");
    console.log("Name:", newCustomerName);
    console.log("Phone Number:", newCustomerPhoneNumber);
    console.log("Address:", newCustomerAddress);
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

  return (
    <>
      <Sidebar visible={navVisible} show={showNavbar} />
      <Topbar />
      <div className="App">
        <div className="m-auto p-4 sm:ml-64">
          <div className="flex justify-between items-center mt-20">
            <h1 className="text-black text-32px mt-5 m-5">Customers</h1>
            <button
              onClick={openModal}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none"
            >
              Add New
            </button>
          </div>

          <input
            type="text"
            placeholder="Search Customers"
            className="px-4 py-2 border rounded-l focus:outline-none"
          />
          <div className="overflow-x-auto">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id num
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
                  {customerData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleSeeMore(customer.name)}
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

const customerData = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    phoneNumber: "0912-345-6789",
    address: "123 Kagay-anon St., Cagayan de Oro City",
  },
  {
    id: 2,
    name: "Maria Santos",
    phoneNumber: "0987-654-3210",
    address: "456 Xavier St., Cagayan de Oro City",
  },
  {
    id: 3,
    name: "Pedro Reyes",
    phoneNumber: "0922-123-4567",
    address: "789 Limketkai Ave., Cagayan de Oro City",
  },
  {
    id: 4,
    name: "Luz Fernandez",
    phoneNumber: "0917-888-7777",
    address: "101 Velez St., Cagayan de Oro City",
  },
  {
    id: 5,
    name: "Emmanuel Santos",
    phoneNumber: "0932-999-1111",
    address: "222 Masterson Ave., Cagayan de Oro City",
  },
  {
    id: 6,
    name: "Anna Reyes",
    phoneNumber: "0915-333-2222",
    address: "666 Hayes St., Cagayan de Oro City",
  },
  {
    id: 7,
    name: "Jose Gonzalez",
    phoneNumber: "0927-111-5555",
    address: "777 Tomas Saco St., Cagayan de Oro City",
  },
  {
    id: 8,
    name: "Rosario Lim",
    phoneNumber: "0944-444-3333",
    address: "999 Corrales Ave., Cagayan de Oro City",
  },
];

export default Customers;
