import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const Sorters = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newSorterPhoneNumber, setNewSorterPhoneNumber] = useState("");
  const [newSorterAddress, setNewSorterAddress] = useState("");
  const [newSorterDateHired, setNewSorterDateHired] = useState("");

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

  const handleAddNewSorter = (e) => {
    e.preventDefault();
    // Replace this logic with the code to add a new sorter
    console.log("New sorter details:");
    console.log("Name:", newSorterName);
    console.log("Phone Number:", newSorterPhoneNumber);
    console.log("Address:", newSorterAddress);
    console.log("Date Hired:", newSorterDateHired);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleSeeMore = (sorterName) => {
    // For demonstration purposes, we'll display an alert with the sorter's name as the history
    alert(`History for ${sorterName}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
  };

  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="m-auto p-4 sm:ml-64">
        <div className="flex justify-between items-center mt-20">
          <h1 className="text-black text-32px">Sorters</h1>
          <button
            onClick={openModal}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none"
          >
            Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id num
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sorter's Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Hired
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sorterData.map((sorter) => (
                  <tr key={sorter.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{sorter.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sorter.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sorter.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sorter.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sorter.dateHired}</td>
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
          <div className="modal-container bg-white p-10 max-w-sm mx-auto rounded z-50">
            <span className="modal-close absolute top-4 right-4 text-xl cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            <h2 className="text-2xl font-semibold mb-4">Add New Sorter</h2>
            <form onSubmit={handleAddNewSorter}>
              <div className="mb-4">
                <label htmlFor="newSorterName" className="block font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="newSorterName"
                  value={newSorterName}
                  onChange={(e) => setNewSorterName(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="newSorterPhoneNumber" className="block font-medium">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="newSorterPhoneNumber"
                  value={newSorterPhoneNumber}
                  onChange={(e) => setNewSorterPhoneNumber(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="newSorterAddress" className="block font-medium">
                  Address:
                </label>
                <input
                  type="text"
                  id="newSorterAddress"
                  value={newSorterAddress}
                  onChange={(e) => setNewSorterAddress(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="newSorterDateHired" className="block font-medium">
                  Date Hired:
                </label>
                <input
                  type="text"
                  id="newSorterDateHired"
                  value={newSorterDateHired}
                  onChange={(e) => setNewSorterDateHired(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                >
                  Create Sorter
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
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

export default Sorters;
