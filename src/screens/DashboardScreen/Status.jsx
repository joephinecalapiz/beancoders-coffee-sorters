/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import Modal from "../../component/Modal"; // Import the Modal component
import "../.././css/status.css";
import axios from "axios";
import api_endpoint from "../../config";

const Status = () => {
  const [navVisible, showNavbar] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomer] = useState([]);
  const [sorters, setSorter] = useState([]);
  const [status, setAllStatus] = useState([]); 

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    axios.get(api_endpoint + '/fetch-status/' + user_id, 
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    ).then((response)=>{
      const fetchAllStatus = response.data.status;
      setAllStatus(fetchAllStatus) 
    }).catch((error) => {
      console.error();
    });
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    axios.get(api_endpoint + '/customers/' + user_id,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    ).then((response) => {
        console.log(response.data)
        const fetchCustomerData = response.data.customer
        setCustomer(fetchCustomerData);
      });
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    axios.get(api_endpoint + '/sorters/' + user_id,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    ).then((response) => {
        console.log(response.data)
        const fetchSorterData = response.data.sorters
        setSorter(fetchSorterData);
      });
  }, []);

  const handleSeeMore = (customer) => {
    setSelectedCustomer(customer);
  };

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    document.title = "Status";
  }, []);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSorterChange = (e) => {
    setNewSorterName(e.target.value);
  };

  const handleCustomerChange = (e) => {
    setNewCustomerName(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = (event) => {
    event.preventDefault();
    console.log("Customer Name:", newCustomerName);
    console.log("Sorter Name:", newSorterName);
    console.log("Status:", newStatus);

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const postData = {
      'user_id' : user_id,
      'customerName': newCustomerName,
      'sorterName' : newSorterName,
      'status' : newStatus
    };

    axios.post(api_endpoint + '/add-status' , postData , {
      headers : {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      if(response.status === 200){
        closeModal();
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  const handleCancel = () => {
    // Close the modal when the "Cancel" button is clicked
    closeModal();
  };

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div
        className={`App ${navVisible ? "content-shift-right" : ""}`}
        style={{ backgroundColor: "#d4d4d4" }}
      >
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
          </div>
        </div>

        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "margin-left 0.3s ease",
            marginTop: "-30px",
          }}
        >
          <input
            type="text"
            placeholder="Search Sorters"
            className="px-4 py-2 border rounded focus:outline-none search-bar"
          />

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
            }}
          >
            Add New
          </button>
        </div>

        <div
          className={`p-5 ${navVisible ? "ml-0" : "sm:ml-64"}`}
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-20px",
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
                {status.map((sorted) => (
                  <tr key={sorted.id} className="sort-table">
                    <td className="poppins-font">{new Date(sorted.created_at).toLocaleString()}</td>
                    <td className="poppins-font">{sorted.sorterName}</td>
                    <td className="poppins-font">{sorted.customerName}</td>
                    <td className="poppins-font">{sorted.status}</td>
                    <td className="poppins-font">
                      <button
                        onClick={() => {
                          navigate(`/customerstatus/${sorted.customerName}`);
                        }}
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
          {/* CUSTOMER'S NAME */}
          <div className="mb-4">
            <label
              htmlFor="newCustomer"
              className="block font-medium poppins-font"
            >
              Customer's Name:
            </label>
            <select
              id="newCustomer"
              value={newCustomerName}
              onChange={handleCustomerChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            >
              <option value=" ">Select Customers</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.customerName}>{customer.customerName}</option>
              ))
              }
            </select>
          </div>
          {/* SORTERS NAME */}
          <div className="mb-4">
            <label
              htmlFor="newSorter"
              className="block font-medium poppins-font"
            >
              Sorter's Name:
            </label>
            <select
              id="newSorter"
              value={newSorterName}
              onChange={handleSorterChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            >
              <option value=" ">Select Sorter</option>
              {sorters.map(sorter => (
                <option key={sorter.id} value={sorter.sorterName}>{sorter.sorterName}</option>
              ))
              }
            </select>
          </div>
          {/* STATUS   */}
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
