/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import Modal from "../../component/Modal"; // Import the Modal component
import "../.././css/status.css";

const Status = () => {
  const [navVisible, showNavbar] = useState(false);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    document.title = "Status";
  }, []);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

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
    console.log("Customer Name:", newCustomerName);
    console.log("Sorter Name:", newSorterName);
    console.log("Status:", newStatus);
    // Close the modal after submission
    closeModal();
  };

  const handleCancel = () => {
    // Close the modal when the "Cancel" button is clicked
    closeModal();
  };

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}>
        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
          }}
        >
          {" "}
          <div className="flex items-center">
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
              }}
              className="text-black mt-16 mb-3"
            >
              Sorting Status
            </h1>
            <button
              onClick={openModal}
              className="px-4 py-2 text-white rounded focus:outline-none ml-3 mt-12"
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
              }}
            >
              Add New
            </button>
          </div>
        </div>

        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
          }}
        >
          <input
            type="text"
            placeholder="Search Sorters"
            className="px-4 py-2 border rounded focus:outline-none search-bar"
          />
        </div>

        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
          }}
        >
          {" "}
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="sorted-table min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                    Sorter's Name
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
                  >
                    Show
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((sorted) => (
                  <tr key={sorted.id} className="sort-table">
                    <td className="poppins-font">{sorted.date}</td>
                    <td className="poppins-font">{sorted.sorterName}</td>
                    <td className="poppins-font">{sorted.customerName}</td>
                    <td className="poppins-font">{sorted.status}</td>
                    <td className="poppins-font">
                      <button
                        onClick={() => handleSeeMore(customer.show)}
                        className="see-more-button focus:outline-none"
                      >
                        See More...
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 poppins-font">
          Add New Customer
        </h2>
        {/* Add your form or content for adding a new customer */}
        <form onSubmit={handleAddNew}>
          <div className="mb-4">
            <label
              htmlFor="customerName"
              className="block font-medium poppins-font"
            >
              Customer's Name:
            </label>

            <input
              type="text"
              id="customerName"
              value={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newSorterName"
              className="block font-medium poppins-font"
            >
              Sorter's Name:
            </label>

            <input
              type="text"
              id="newSorterName"
              value={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newStatus"
              className="block font-medium poppins-font"
            >
              Status:
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

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Add Sorting
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
      </Modal>
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
