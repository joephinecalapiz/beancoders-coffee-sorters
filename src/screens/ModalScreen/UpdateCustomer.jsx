import React, { useState, useEffect } from "react";
import api_endpoint from "../../config";

const UpdateCustomer = ({ show, onClose, customer }) => {
    const [allCustomers, setAllCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(customer.id);
    const [newCustomerName, setNewCustomerName] = useState(customer.customerName);
    const [newCustomerPhoneNumber, setNewCustomerPhoneNumber] = useState(customer.phoneNum);
    const [newCustomerAddress, setNewCustomerAddress] = useState(customer.address);
    const [newCustomerKiloOfBeans, setKiloOfBeans] = useState("");
    // const [closeModal, setCloseModal] = useState(onClose);

    const closeModal = () => {
        onClose();
        console.log(onClose);
    };
    
    
    const updateCustomerDetails = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("token");
            let user_id = localStorage.getItem("user_id");
            const currentDate = new Date().toISOString();

            const response = await fetch(api_endpoint + "/edit-customer/" + customerId, {
                method: "PATH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    customerName: newCustomerName,
                    phoneNum: newCustomerPhoneNumber,
                    address: newCustomerAddress,
                    //kiloOfBeans: newCustomerKiloOfBeans,
                    registrationDate: currentDate,
                    // year: selectedYearValue, // Use the selected year
                    // month: selectedMonthValue, // Use the selected month value
                }),
            });
            if (response.status === 422) {
                alert("Customer is already in the database");
            }
            if (!response.ok) {
                throw new Error("Fail to add customer");
            }
            
        } catch (error) {
            console.error(error);
        }
        closeModal();
    };


      

    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            {/* <div
                className="modal-overlay fixed inset-0 bg-black opacity-50 cursor-pointer"
                onClick={show}
            ></div> */}
            <div className="modal-container bg-white p-8 max-w-sm mx-auto rounded">
                {/* <span
                    className=" absolute top-4 right-4 text-xl cursor-pointer"
                    onClick={() => onClose}
                >
                    &times;
                </span> */}
                <h2 className="text-2xl font-semibold mb-4 poppins-font">
                    Update Customer
                </h2>
                <form onSubmit={updateCustomerDetails}>
                    <div className="mb-4">
                        <label
                            htmlFor="newCustomerName"
                            className="block font-medium poppins-font"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="newCustomerName"
                            value={newCustomerName}
                            onChange={(e) => setNewCustomerName(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="newCustomerPhoneNumber"
                            className="block font-medium poppins-font"
                        >
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            id="newCustomerPhoneNumber"
                            value={newCustomerPhoneNumber}
                            onChange={(e) => setNewCustomerPhoneNumber(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="newCustomerAddress"
                            className="block font-medium poppins-font"
                        >
                            Address:
                        </label>
                        <textarea
                            id="newCustomerAddress"
                            value={newCustomerAddress}
                            onChange={(e) => setNewCustomerAddress(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 poppins-font"
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

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
                        >
                            Update Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none poppins-font"
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