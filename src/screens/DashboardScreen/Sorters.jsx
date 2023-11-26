/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AxiosRateLimit from "axios-rate-limit";
import Modal from "../../component/Modal";
import { useDispatch, useSelector } from 'react-redux'
import api_endpoint from "../../config";
import { fetchSorterInfo } from "../../../redux/userActions";
import beanlogo from '../../assets/beanlogo.png';

const Sorters = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const sorterInfo = useSelector(state => state.user.sorters);
  const { status, error } = useSelector((state) => state.user);
  const [sorterError, setSorterError] = useState(false);
  const [navVisible, showNavbar] = useState(false);
  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };
  const axiosInstance = AxiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = parseInt(error.response.headers["retry-after"]) || 1;
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return await axiosInstance.request(error.config);
      }
      return Promise.reject(error);
    }
  );
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSorterName, setNewSorterName] = useState("");
  const [newSorterPhoneNumber, setNewSorterPhoneNumber] = useState("");
  const [newSorterAddress, setNewSorterAddress] = useState("");
  const [newSorterDateHired, setNewSorterDateHired] = useState("");
  const [allSorters, setAllSorters] = useState([]);
  const [reloadSorterData, setReloadSorterData] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchSorterInfo({ user_id, token }));
  // }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      // setAllSorters(sorterInfo)
      setSorterError(false);
    }

    // Render error state
    if (status === 'failed') {
      setSorterError(true);
    }
  }, []);

  // console.log(sorterInfo)

  useEffect(() => {
    document.title = "Sorters";
    fetchSorters();
    // const cachedSorterData = sessionStorage.getItem("sorterData");
    // if (cachedSorterData) {
    //   setAllSorters(JSON.parse(cachedSorterData));
    // }
    // const headers = {
    //   Authorization: "Bearer " + token,
    // };
    // axiosInstance
    //   .get(`${api_endpoint}/sorters/${user_id}`, { headers })
    //   .then((response) => {
    //     const sorters = response.data;
    //     setAllSorters(sorters.sorters);
    //     // if (sessionStorage.getItem("sorterData") === null) {
    //     //   sessionStorage.setItem("sorterData", JSON.stringify(sorters.sorters));
    //     // }
    //   });
  }, []);

  const fetchSorters = async () => {
    dispatch(fetchSorterInfo({ user_id, token }));
    console.log(sorterInfo)
    setAllSorters(sorterInfo)
    setSorterError(false);
  };

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

  const handleAddNewSorter = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        api_endpoint + "/add/sorter",
        {
          user_id: user_id,
          sorterName: newSorterName,
          phoneNum: newSorterPhoneNumber,
          address: newSorterAddress,
          dateHired: newSorterDateHired,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // setAllSorters((prevSorters) => {
        //   const updatedSorters = [...prevSorters, response.data.sorter];
        //   sessionStorage.setItem("sorterData", JSON.stringify(updatedSorters));

        //   return updatedSorters;
        // });
        fetchSorters();
        closeModal();
      }
    } catch (error) {
      console.error("Error adding sorter:", error);
      // Handle error scenarios if needed
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const [searchText, setSearchText] = useState("");

  const filteredSorters = allSorters.filter((sorter) =>
    sorter.sorterName.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedFilteredSorters = filteredSorters.sort((a, b) => a.id - b.id);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const totalSorters = allSorters.length;
  // console.log(allSorters)

  // Render loading state
  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">
      <img src={beanlogo} alt="Beans Logo" className="w-32 h-32" />
    </div>;
  }

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pb-5 pt-0.5 mb-2 ">
          <h1 className="text-black poppins-font bg-white dark:text-textTitle dark:bg-container mt-5 font-bold text-base p-3 rounded-lg shadow-xl">
            Sorters
          </h1>
        </div>
      </div>
      <div className="search-and-button mt-16">
        <div className="dark:text-textTitle p-5 px-10 flex justify-between items-center transition-transform duration-300 ease-in -mt-20 font-poppins">
          <div className="poppins-font font-bold">Total: {totalSorters}</div>

          <input
            type="text"
            placeholder="Search Sorters"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-4 py-2 poppins-font dark:text-textTitle dark:bg-container border rounded focus:outline-none search-bar"
            style={{ width: "80%", maxWidth: "750px" }}
          />
          {/* Add New button */}
          <button
            onClick={openModal}
            className="px-4 py-2 text-white poppins-font font-bold rounded focus:outline-none poppins-font"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#C4A484";
              e.target.style.transition = "background-color 0.3s ease";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#74574D";
              e.target.style.transition = "background-color 0.3s ease";
            }}
            style={{
              backgroundColor: "#74574D",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
              border: "none",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
            }}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="md:pl-5 md:pr-5 pr-2 pl-2 p-5">
        <div
          className="md:p-5"
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-20px",
          }}
        >
          <br />
          <div className="shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <div className="max-h-[440px] overflow-y-auto">
              <table className=" min-w-full divide-y divide-gray-200  customers-table th table-auto ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                     
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Sorter's Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider table-header poppins-font"
                    >
                      Date Hired
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-center sort-table dark:text-textDesc dark:bg-container">
                  {(reloadSorterData || sortedFilteredSorters).map(
                    (sorter, index) => (
                      <tr key={sorter.id} className="hover:bg-lightBrown hover:text-textTitle">
                        <td className="poppins-font">{index + 1}</td>
                        <td className="poppins-font">{sorter.sorterName}</td>
                        <td className="poppins-font">{sorter.phoneNum}</td>
                        <td className="poppins-font">{sorter.address}</td>
                        <td className="poppins-font">
                          {new Date(sorter.dateHired).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div>
              {sorterError && (
                <p className="items-center justify-center text-center text-primary dark:text-textTitle">No sorters found. Please add new sorter!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold text-center mb-4 poppins-font text-black dark:text-textTitle">
          Sorter
        </h2>
        {/* form for adding a new sorter */}
        <form onSubmit={handleAddNewSorter}>
          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newSorterName"
              className="block font-medium poppins-font"
            >
              Name
            </label>
            <input
              type="text"
              id="newSorterName"
              value={newSorterName}
              onChange={(e) => setNewSorterName(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            />
          </div>

          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newSorterPhoneNumber"
              className="block font-medium poppins-font"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="newSorterPhoneNumber"
              value={newSorterPhoneNumber}
              onChange={(e) => setNewSorterPhoneNumber(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            />
          </div>

          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newSorterAddress"
              className="block font-medium poppins-font"
            >
              Address
            </label>
            <input
              type="text"
              id="newSorterAddress"
              value={newSorterAddress}
              onChange={(e) => setNewSorterAddress(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font dark:text-primary"
              required
            />
          </div>

          <div className="mb-4 dark:text-textTitle">
            <label
              htmlFor="newSorterDateHired"
              className="block font-medium poppins-font"
            >
              Date Hired
            </label>
            {/*DatePicker*/}
            <DatePicker
              id="newSorterDateHired"
              selected={newSorterDateHired}
              onChange={(date) => setNewSorterDateHired(date)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
              required
            />
          </div>

          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Add Sorter
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-black dark:text-textTitle hover:bg-red-700 hover:text-white  font-medium py-2 px-4 rounded focus:outline-none poppins-font"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Sorters;
