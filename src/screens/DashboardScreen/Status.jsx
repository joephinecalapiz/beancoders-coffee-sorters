/** @format */

import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import Modal from "../../component/Modal"; // Import the Modal component

const Status = () => {
  const navigate = useNavigate();
  const [navVisible, showNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState(""); // Add this state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = (event) => {
    event.preventDefault();
    // Perform the logic to add a new customer here
    // For example, you can access the new customer name with "newCustomerName" state
    console.log("New customer name:", newCustomerName);
    // Close the modal after submission
    closeModal();
  };

  const handleCancel = () => {
    // Close the modal when the "Cancel" button is clicked
    closeModal();
  };

  return (
    <>
      <Sidebar visible={navVisible} show={showNavbar} />
      <Topbar />
      <div className="App">
        <div className="m-auto p-4 sm:ml-64">
          <div className="flex justify-between items-center mt-20">
            <h1 className="text-black text-32px">Status</h1>
            <button
              onClick={openModal}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none"
            >
              Add New
            </button>
          </div>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-2xl font-semibold mb-4">Add New Customer</h2>
            {/* Add your form or content for adding a new customer */}
            <form onSubmit={handleAddNew}>
              {/* Your form inputs go here */}
              {/* For example: */}
              <div className="mb-4">
                <label htmlFor="customerName">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              {/* Add other input fields for customer details */}
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
          </Modal>

          <div className="overflow-x-auto">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sorter's Name
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
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Show
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedData.map((sorted) => (
                    <tr key={sorted.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sorted.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sorted.sorterName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sorted.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sorted.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleSeeMore(customer.show)}
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
    </>
  );
};

const sorterData = [
  {
    id: 1,
    name: "John Dela Cruz",
    phoneNumber: "0912-345-6789",
    address: "123 Kagay-anon St., Cagayan de Oro City",
    dateHired: "2023-07-25",
  },
  {
    id: 2,
    name: "Jenny Santos",
    phoneNumber: "0987-654-3210",
    address: "456 Xavier St., Cagayan de Oro City",
    dateHired: "2023-07-26",
  },
  {
    id: 3,
    name: "Alfredo Reyes",
    phoneNumber: "0922-123-4567",
    address: "789 Limketkai Ave., Cagayan de Oro City",
    dateHired: "2023-07-27",
  },
];

// Static customer data for each row
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

const sortedData = [
  {
    date: "2023-07-28",
    sorterName: sorterData[0].name,
    customerName: customerData[0].name,
    status: "Pending",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[1].name,
    customerName: customerData[1].name,
    status: "Cancelled",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[2].name,
    customerName: customerData[2].name,
    status: "Finished",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[0].name,
    customerName: customerData[3].name,
    status: "Pending",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[1].name,
    customerName: customerData[4].name,
    status: "Pending",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[2].name,
    customerName: customerData[5].name,
    status: "Finished",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[0].name,
    customerName: customerData[6].name,
    status: "Pending",
  },
  {
    date: "2023-07-28",
    sorterName: sorterData[1].name,
    customerName: customerData[7].name,
    status: "Pending",
  },
  // Add more rows here with the desired data
];

export default Status;
