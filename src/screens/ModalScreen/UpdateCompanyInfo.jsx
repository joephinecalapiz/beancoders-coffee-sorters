import React, { useState, useEffect } from "react";
import api_endpoint from "../../config";
import Modal from "../../component/Modal";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const UpdateCompanyInfo = ({ show, onClose }) => {
    const [modalStep, setModalStep] = useState(1); // Track the current step of the modal
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [companyImage, setCompanyImage] = useState(null);
    // const [closeModal, setCloseModal] = useState(onClose);
    const [profileFileDataURL, setProfileFileDataURL] = useState(null);
    const [companyFileDataURL, setCompanyFileDataURL] = useState(null);


    const profileImageHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setProfileImage(selectedFile);
    };

    const companyImageHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setCompanyImage(selectedFile);
    };

    useEffect(() => {
        let profileFileReader, companyFileReader;
        let isProfileCancel = false, isCompanyCancel = false;

        if (profileImage) {
            profileFileReader = new FileReader();
            profileFileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isProfileCancel) {
                    setProfileFileDataURL(result);
                }
            };
            profileFileReader.readAsDataURL(profileImage);
        }

        if (companyImage) {
            companyFileReader = new FileReader();
            companyFileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCompanyCancel) {
                    setCompanyFileDataURL(result);
                }
            };
            companyFileReader.readAsDataURL(companyImage);
        }

        return () => {
            isProfileCancel = true;
            isCompanyCancel = true;

            if (profileFileReader && profileFileReader.readyState === 1) {
                profileFileReader.abort();
            }
            if (companyFileReader && companyFileReader.readyState === 1) {
                companyFileReader.abort();
            }
        };
    }, [profileImage, companyImage]);

    const closeModal = () => {
        onClose();
    };

    const handleNextStep = () => {
        setModalStep((step) => step + 1);
    };

    const handlePreviousStep = () => {
        setModalStep((step) => step - 1);
    };

    const updateCustomerDetails = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("token");
            let user_id = localStorage.getItem("user_id");
            const currentDate = new Date().toISOString();

            const response = await fetch(api_endpoint + "/edit-customer/" + customerId, {
                method: "PATCH",
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

    const handleSubmitCompanyInfo = async (e) => {
        // You can send the company info to the server here
        // Update user's company info in the database
        // Close the modal and update the state accordingly
        // setCompanyInfoMissing(false);
        // setModalStep(1);
        // setUserInfo(prevUserInfo => ({
        //   ...prevUserInfo,
        //   company: {
        //     name: companyName,
        //     address: companyAddress,
        //   },
        // }));
        // You might want to make an API call to update the company info in the database
    };

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleCompanyImageChange = (e) => {
        setCompanyImage(e.target.files[0]);
    };

    const handleUpdateCompanyImage = async (e) => {
        try {
            if (!companyImage) {
                return;
            }

            const formData = new FormData();
            formData.append("image", companyImage);

            const response = await axios.post(api_endpoint + "/fetch-info", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                // Profile image updated successfully
                // You can update the user's profile image state here if needed
                console.log("Company image updated");
            }
        } catch (error) {
            console.error("Error updating company image:", error);
        }
    };

    const handleUpdateProfileImage = async (e) => {
        try {
            if (!profileImage) {
                return;
            }

            const formData = new FormData();
            formData.append("image", profileImage);

            const response = await axios.post(api_endpoint + "/user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                // Profile image updated successfully
                // You can update the user's profile image state here if needed
                console.log("Profile image updated");
            }
        } catch (error) {
            console.error("Error updating profile image:", error);
        }
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className="modal fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="absolute inset-0 bg-black opacity-50"
        >
            <div className="rounded max-w-sm mx-auto z-50">
                <span
                    className="modal-close absolute top-4 right-4 text-xl cursor-pointer"
                    onClick={closeModal}
                >
                    &times;
                </span>

                {modalStep === 1 && (
                    <>
                        <h2 className="text-2xl font-semibold dark:text-textTitle mb-4 text-center" htmlFor='image'> Profile Avatar </h2>
                        {profileFileDataURL ?
                            <p className="">
                                {
                                    <img src={profileFileDataURL} alt="preview" />
                                }
                            </p> : null}
                        <input
                            type="file"
                            id='image'
                            onChange={profileImageHandler}
                            accept='.png, .jpg, .jpeg'
                            className="mb-2 mt-4 flex justify-center dark:text-textTitle"
                        />

                        {/* buttons */}
                        <div className="flex justify-center mt-4">
                            {/* <button
                                onClick={handleUpdateProfileImage}
                                className="bg-green-500 text-white rounded px-4 py-2"
                            >
                                Upload Image
                            </button> */}
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 ml-2 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 2 && (
                    <>
                        <h2 className="text-2xl font-semibold dark:text-textTitle mb-4 text-center" htmlFor='CompImage'> Company Image </h2>
                        {companyFileDataURL ?
                            <p className="">
                                {
                                    <img src={companyFileDataURL} alt="preview" />
                                }
                            </p> : null}
                        <input
                            type="file"
                            id='CompImage'
                            onChange={companyImageHandler}
                            accept='.png, .jpg, .jpeg'
                            className="mb-2 mt-4 flex justify-center dark:text-textTitle"
                        />
                        {/* ... buttons ... */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            {/* <button
                                onClick={handleUpdateCompanyImage}
                                className="bg-green-500 text-white rounded px-4 py-2"
                            >
                                Upload Image
                            </button> */}
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 ml-2 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 3 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Enter Company Name
                        </h2>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        />
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 4 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Company Phone Number
                        </h2>
                        <input
                            type="text"
                            value={companyPhoneNumber}
                            onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        />
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {modalStep === 5 && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Company Address
                        </h2>
                        <input
                            type="text"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
                        />
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleSubmitCompanyInfo}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default UpdateCompanyInfo;