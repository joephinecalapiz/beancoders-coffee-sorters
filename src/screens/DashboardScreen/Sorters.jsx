/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const Sorters = () => {
  const navigate = useNavigate();
  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="m-auto p-4 sm:ml-64">
      <div className="flex justify-between items-center mt-20">
          <h1 className="text-black text-32px">Sorters</h1>
          <button
              onClick={() => handleAddNewSorter()}
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
    </>
  );
};

const handleSeeMore = (sorterName) => {
  // For demonstration purposes, we'll display an alert with the sorter's name as the history
  alert(`History for ${sorterName}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
};

const handleAddNewSorter = () => {
  // Replace this function with the logic to add a new sorter
  console.log("Add New Customer button clicked!");
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
