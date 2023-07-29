import React from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";

const Customers = () => {
  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="m-auto p-4 sm:ml-64">
      <div className="flex justify-between items-center mt-20">
          <h1 className="text-black text-32px">Customers</h1>
          <button
              onClick={() => handleAddNewCustomer()}
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
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id num
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerData.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
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
    </>
  );
};

const handleSeeMore = (customerName) => {
  // For demonstration purposes, we'll display an alert with the customer's name as the history
  alert(`History for ${customerName}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
};

const handleAddNewCustomer = () => {
  // Replace this function with the logic to add a new customer
  console.log("Add New Customer button clicked!");
};

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


export default Customers;
