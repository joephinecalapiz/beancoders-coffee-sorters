import React, { useState, useEffect } from "react";
import api_endpoint from "../../config";
import { useDispatch, useSelector } from 'react-redux'
import { updateCustomerInfo } from "../../../redux/services/customer/customerAction";

const UpdateCustomer = ({ show, onClose, customer, update }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user_id = useSelector(state => state.auth.user_id);
    const [customerId, setCustomerId] = useState(customer.id);
    const [newCustomerName, setNewCustomerName] = useState(customer.customerName);
    const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState(customer.phoneNum);
    const [newCustomerAddress, setNewCustomerAddress] = useState(customer.address);
    const [newCustomerKiloOfBeans, setKiloOfBeans] = useState("");
    // const [closeModal, setCloseModal] = useState(onClose);

    const closeModal = () => {
        onClose();
    };

    const updateCustomer = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString();
    
        const customerData = {
          user_id: user_id,
          customerName: newCustomerName,
          phoneNum: newCustomerPhoneNumber,
          address: newCustomerAddress,
          registrationDate: currentDate,
        };
    
        // Dispatch the addCustomerInfo thunk
        dispatch(updateCustomerInfo({ customerId, token, customerData }))
          .then(() => {
            // // Check if the thunk was fulfilled successfully
            // if (updateCustomerInfo.fulfilled.match(resultAction)) {
            console.log('Customer Update Successfully');
            //   update();
            // } else {
            //   // Handle the case where the thunk was rejected or pending
            //   console.error('Add Customer Failed');
            // }
            update();
          })
          .catch((error) => {
            // Handle errors that occurred during the dispatching of the thunk
            console.error('Error dispatching updateCustomerInfo:', error);
          });
          closeModal();
      };

    // const updateCustomerDetails = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const currentDate = new Date().toISOString();

    //         const response = await fetch(api_endpoint + "/edit-customer/" + customerId, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + token,
    //             },
    //             body: JSON.stringify({
    //                 customerName: newCustomerName,
    //                 phoneNum: newCustomerPhoneNumber,
    //                 address: newCustomerAddress,
    //                 //kiloOfBeans: newCustomerKiloOfBeans,
    //                 registrationDate: currentDate,
    //                 // year: selectedYearValue, // Use the selected year
    //                 // month: selectedMonthValue, // Use the selected month value
    //             }),
    //         });
    //         if (response.status === 422) {
    //             alert("Customer is already in the database");
    //         }

    //         update();

    //         if (!response.ok) {
    //             throw new Error("Fail to add customer");
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    //     closeModal();
    // };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            {/* <div
                className="modal-overlay fixed inset-0 bg-black opacity-50 cursor-pointer"
                onClick={show}
            ></div> */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white dark:bg-container dark:text-textTitle p-8 max-w-sm mx-auto z-50 rounded">
                {/* <span
                    className=" absolute top-4 right-4 text-xl cursor-pointer"
                    onClick={() => onClose}
                >
                    &times;
                </span> */}
                <h2 className="text-2xl font-semibold mb-4 text-center poppins-font">
                    Update Customer
                </h2>
                <form onSubmit={updateCustomer}>
                    <div className="mb-4">
                        <label
                            htmlFor="newCustomerName"
                            className="block font-medium poppins-font"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="newCustomerName"
                            value={newCustomerName}
                            onChange={(e) => setNewCustomerName(e.target.value)}
                            className="border rounded px-3 py-2 w-full dark:text-primary focus:outline-none focus:border-blue-400 poppins-font"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="newCustomerPhoneNumber"
                            className="block font-medium poppins-font"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="newCustomerPhoneNumber"
                            value={newCustomerPhoneNumber}
                            onChange={(e) => setNewCustomerPhoneNumber(e.target.value)}
                            className="border rounded px-3 py-2 w-full dark:text-primary focus:outline-none focus:border-blue-400 poppins-font"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="newCustomerAddress"
                            className="block font-medium poppins-font"
                        >
                            Address
                        </label>
                        <textarea
                            id="newCustomerAddress"
                            value={newCustomerAddress}
                            onChange={(e) => setNewCustomerAddress(e.target.value)}
                            className="border rounded px-3 py-2 w-full  dark:text-primary focus:outline-none focus:border-blue-400 poppins-font"
                            rows={4}
                            style={{ height: "70px", wordWrap: "break-word" }}
                            required
                        />
                    </div>
                    {/* <div className="mb-4">
                <label
                  htmlFor="kiloOfBeans"
                  className="block font-medium poppins-font"
                >
                  Kilo of Beans:
                </label>
                <input
                  type="text"
                  id="newCustomerKiloOfBeans"
                  value={newCustomerKiloOfBeans}
                  onChange={(e) => setKiloOfBeans(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                  required
                />
              </div> */}

                    <div className="flex flex-col gap-4 justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
                        >
                            Update Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="hover:bg-red-700 text-black hover:text-white dark:text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCustomer;